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
