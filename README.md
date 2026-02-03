# bot-whatsapp-envio-

Bot em Node.js para envio de mensagens personalizadas e arquivos via WhatsApp Web a partir de uma planilha Excel.

## Visão geral

Este projeto lê uma planilha (`Envios.xlsx`) com os dados dos contatos e usa a biblioteca [whatsapp-web.js](https://wwebjs.dev/) para enviar:

- Mensagem de texto personalizada (substitui `fulano` pelo nome do contato).
- Arquivo de mídia (vídeo, imagem, PDF, etc.) a partir da pasta `arquivos/`.

O objetivo é servir como projeto educacional para automação de envios no WhatsApp Business / WhatsApp Web.

## Tecnologias

- Node.js
- whatsapp-web.js
- qrcode-terminal
- xlsx

## Estrutura de arquivos

- `enviar.js` – script principal de envio.
- `Envios.xlsx` – planilha de exemplo com os contatos.
- `arquivos/` – pasta onde ficam os arquivos a serem enviados.
- `package.json` – dependências e scripts do projeto.
- `.wwebjs_auth/` e `.wwebjs_cache/` – pastas geradas automaticamente pela sessão do WhatsApp Web.

## Formato da planilha (Envios.xlsx)

A planilha deve conter, no mínimo, as colunas:

- `nome` – nome do contato.
- `mensagem` – texto base da mensagem (pode conter a palavra `fulano` para ser substituída pelo nome).
- `arquivo` – nome do arquivo dentro da pasta `arquivos` (por exemplo, `video1.mp4`). Use `N` para não enviar arquivo.
- `telefone` – número completo com DDI e DDD (ex.: `5511999999999`).

## Como executar

1. Instale as dependências:

   ```bash
   npm install

Inicie o bot:

bash
npm start
No terminal, será exibido um QR Code.

Abra o WhatsApp no ​​celular → Configurações → Aparelhos conectados → Conectar um aparelho.

Aponte a câmera para o QR Code.

Após conectar, o script irá:

Ler todos os registros da planilha.

Envie uma mensagem de texto personalizada.

Se houver arquivo, envie a mídia correspondente.

Respeite intervalos aleatórios entre mensagens e entre contatos.

Avisos importantes
Use este projeto apenas com contatos que autorizaram a coleta de mensagens.

Envios em massa e sem consentimento podem resultar no bloqueio da conta pelo WhatsApp.

Este repositório tem fins exclusivamente educacionais.


