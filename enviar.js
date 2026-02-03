const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const XLSX = require('xlsx');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth()
});

function gerarDelayAleatorio(minSegundos, maxSegundos) {
    const min = minSegundos * 1000;
    const max = maxSegundos * 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('qr', (qr) => {
    console.log('\n========================================');
    console.log('Escaneie o QR Code abaixo com WhatsApp:');
    console.log('========================================\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('\n=== WhatsApp conectado com sucesso ===\n');
    
    const workbook = XLSX.readFile('Envios.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dados = XLSX.utils.sheet_to_json(sheet);
    
    console.log('Total de contatos: ' + dados.length + '\n');
    
    for (let i = 0; i < dados.length; i++) {
        const contato = dados[i];
        const nome = String(contato.nome || '');
        const mensagem = String(contato.mensagem || '');
        const mensagemPersonalizada = mensagem.replace('fulano', nome);
        const arquivo = String(contato.arquivo || '');
        const telefone = String(contato.telefone || '');
        
        console.log('\n========================================');
        console.log('Processando ' + (i + 1) + '/' + dados.length + ': ' + nome);
        console.log('Telefone: ' + telefone);
        console.log('========================================');
        
        let numeroFormatado = telefone.replace(/\D/g, '');
        
        if (!numeroFormatado.endsWith('@c.us')) {
            numeroFormatado = numeroFormatado + '@c.us';
        }
        
        console.log('Numero formatado: ' + numeroFormatado);
        
        try {
            console.log('Enviando mensagem de texto...');
            await client.sendMessage(numeroFormatado, mensagemPersonalizada);
            console.log('Mensagem enviada com sucesso');
            
            const delayAposMensagem = gerarDelayAleatorio(3, 7);
            console.log('Aguardando ' + (delayAposMensagem/1000).toFixed(1) + 's antes de enviar arquivo...');
            await sleep(delayAposMensagem);
            
            if (arquivo && arquivo !== 'N' && arquivo.trim() !== '') {
                console.log('Enviando arquivo: ' + arquivo);
                
                const caminhoArquivo = path.join(__dirname, 'arquivos', arquivo);
                
                if (require('fs').existsSync(caminhoArquivo)) {
                    const media = MessageMedia.fromFilePath(caminhoArquivo);
                    await client.sendMessage(numeroFormatado, media);
                    console.log('Arquivo enviado com sucesso');
                    
                    const delayAposArquivo = gerarDelayAleatorio(5, 10);
                    console.log('Aguardando ' + (delayAposArquivo/1000).toFixed(1) + 's apos envio do arquivo...');
                    await sleep(delayAposArquivo);
                } else {
                    console.log('ERRO: Arquivo nao encontrado: ' + caminhoArquivo);
                }
            }
            
            console.log('Contato ' + nome + ' finalizado com sucesso\n');
            
            if (i < dados.length - 1) {
                const delayEntreContatos = gerarDelayAleatorio(60, 120);
                const segundos = (delayEntreContatos/1000).toFixed(0);
                
                console.log('========================================');
                console.log('Aguardando ' + segundos + 's antes do proximo contato...');
                console.log('Proximo: ' + dados[i + 1].nome);
                console.log('========================================\n');
                
                const intervalo = 15000;
                let decorrido = 0;
                
                while (decorrido < delayEntreContatos) {
                    const restante = delayEntreContatos - decorrido;
                    const aguardar = Math.min(intervalo, restante);
                    
                    await sleep(aguardar);
                    decorrido += aguardar;
                    
                    if (decorrido < delayEntreContatos) {
                        const faltam = Math.ceil((delayEntreContatos - decorrido) / 1000);
                        console.log('  ... faltam ' + faltam + 's para proximo contato');
                    }
                }
            }
            
        } catch (erro) {
            console.log('ERRO ao processar ' + nome + ': ' + erro.message + '\n');
            
            if (i < dados.length - 1) {
                const delayErro = gerarDelayAleatorio(30, 60);
                console.log('Aguardando ' + (delayErro/1000).toFixed(0) + 's apos erro antes de continuar...\n');
                await sleep(delayErro);
            }
        }
    }
    
    console.log('\n========================================');
    console.log('TODOS OS CONTATOS FORAM PROCESSADOS');
    console.log('========================================\n');
    process.exit();
});

console.log('Iniciando WhatsApp Bot...\n');
client.initialize();