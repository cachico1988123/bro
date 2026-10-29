# Landing page do ebook (Elementor)

- `index.html`: bloco único (HTML + CSS + JS) para colar num widget **HTML** do Elementor.
  Use uma página em largura total ou o modelo "Elementor Canvas" (sem cabeçalho e rodapé do tema).
- `img/ebook-preview-*.jpg`: 3 pré-visualizações do ebook. Carregue-as em **Média** do WordPress e atualize `previews` no bloco `CONFIG`. Se não carregarem, a secção esconde-se sozinha.
- `bonus-checklist.md`: texto do bónus 1, para passar a PDF de 1 página.

## Antes de publicar (bloco `CONFIG` no fim do `index.html`)
1. `checkoutUrl`: link de checkout da Hotmart.
2. `email`, `privacyUrl`, `termsUrl`: contacto e páginas legais (criar no WordPress).
3. Confirmar que a garantia de 7 dias está ativa na Hotmart.
4. Texto "Quem escreveu": acrescentar a história do Tiago e uma foto.
5. Testemunhos: a secção está escondida (`hidden`); só ativar com testemunhos reais.
6. Meta Pixel: o clique nos botões dispara `InitiateCheckout` e o diagnóstico dispara `DiagnosticoIniciado` e `DiagnosticoConcluido`, só se o Pixel existir.
