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

## inicie o bot

   ```bash
   npm start

Quando o terminal mostra o QR Code:

Abra o WhatsApp no ​​celular → Configurações → Aparelhos conectados → Conectar um aparelho .

Aponte a câmera para o QR Code exibido.
Boas práticas e uso responsável
Este projeto foi criado com fins educacionais e demonstra como automatizar envios usando o WhatsApp Web.
Antes de usar em produção, considere:

Enviar mensagens apenas para contatos que autorizaram a coleta.

Respeitar limites de envio do WhatsApp para evitar bloqueios de conta.

Personalize o conteúdo da mensagem para entregar algo útil para quem recebe.

---

Projeto mantido por **Diego Souza** ([dszcdev](https://github.com/dszcdev)).

Entre em contato:

[📲 Falar comigo no WhatsApp](https://wa.me/5511960621180)
