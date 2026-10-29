# Landing page do ebook (Elementor)

- `index.html`: bloco único (HTML + CSS + JS) para colar num widget **HTML** do Elementor.
  Use uma página em largura total ou o modelo "Elementor Canvas" (sem cabeçalho e rodapé do tema).
- `ebook/`: ebook v2 de 19 páginas. `Os-5-Maiores-Erros-v2.pdf` é o PDF final; `build.cjs` gera-o (`NODE_PATH=$(npm root -g) node build.cjs`) depois de editar o bloco `CFG` no topo (link da agenda, e-mail, WhatsApp). Os tipos de letra (Prata e Raleway, licença OFL) estão em `ebook/fonts/`.
- `ebook-ultima-pagina.md`: texto original da última página (já incluído no PDF).
- `img/ebook-preview-*.jpg`: 3 páginas do ebook v2 (erros 1, 2 e 3). Carregue-as em **Média** do WordPress e atualize `previews` no bloco `CONFIG`. Se não carregarem, a secção esconde-se sozinha.
- `bonus-checklist.md`: texto do bónus 1. Os PDFs finais são `ebook/Checklist-Antes-de-Investir-em-Anuncios.pdf` (1 página, escuro, para ecrã) e `ebook/Checklist-Antes-de-Investir-em-Anuncios-Impressao.pdf` (versão clara, poupa tinta), gerado por `ebook/checklist.cjs`. O link da agenda, o e-mail e o site vêm de `ebook/config.cjs`.

## Antes de publicar (bloco `CONFIG` no fim do `index.html`)
1. `checkoutUrl`: link de checkout da Hotmart.
2. `email`, `privacyUrl`, `termsUrl`: contacto e páginas legais (criar no WordPress).
3. Confirmar que a garantia de 7 dias está ativa na Hotmart.
4. Texto "Quem escreveu": acrescentar a história do Tiago e uma foto.
5. Testemunhos: a secção está escondida (`hidden`); só ativar com testemunhos reais.
6. Meta Pixel: o clique nos botões dispara `InitiateCheckout` e o diagnóstico dispara `DiagnosticoIniciado` e `DiagnosticoConcluido`, só se o Pixel existir.

## Versões em HTML (autónomas, sem ficheiros externos)
Em `html/`: `ebook.html`, `checklist.html` (escura) e `checklist-impressao.html` (clara). Têm os tipos de letra embebidos, abrem em qualquer browser e imprimem em A4 (Ctrl+P, sem margens, com "gráficos de fundo" ativos). Voltam a ser geradas por `ebook/build.cjs` e `ebook/checklist.cjs`.

## Checklist interativa para o site
`checklist-interativa.html`: bloco para colar num widget **HTML** do Elementor (página própria, por exemplo `/checklist/`). 14 perguntas sim/não, dica quando a resposta é "não", resultado com a lista do que resolver primeiro, botão para marcar a chamada, imprimir e recomeçar. Guarda as respostas só no dispositivo (localStorage). No bloco `CONFIG` do fim do ficheiro: `callUrl` (agenda) e `pdfUrl` (URL do PDF da checklist em Média; vazio esconde o botão). Dispara os eventos `ChecklistConcluida` e `ChecklistChamadaClick` do Meta Pixel, se existir.

## Texto para o SEO da página (Yoast, Rank Math ou o separador SEO do Elementor)
- Título (até 60 caracteres): `Guia: os 5 erros de quem não usa tráfego pago | VT`
- Descrição (até 155): `Ebook de 19 páginas para donos de negócios locais: os 5 erros que travam as vendas, um teste rápido por erro e um plano para esta semana. 10 €, com garantia de 7 dias.`
- Imagem para partilha (1200x630): use a capa do ebook.
- Marque a página como "indexável" e confirme que o Pixel da Meta está instalado no site (o `index.html` só dispara eventos, não instala o Pixel).

## Revisão da página (feita em 375, 768 e 1440 px)
Sem scroll horizontal, sem texto abaixo de 4.5:1 de contraste, títulos por ordem (H1, H2, H3), botões e ligações com pelo menos 44 px de altura, foco visível com o teclado. Corrigido na revisão: ligações do rodapé pequenas no telemóvel e falta do elemento `<main>`.
