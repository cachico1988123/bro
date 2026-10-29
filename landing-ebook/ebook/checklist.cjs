// Gera a checklist bónus (1 página A4) em duas versões: node checklist.cjs
// Saída: Checklist-Antes-de-Investir-em-Anuncios.pdf (ecrã, escura) e ...-Impressao.pdf (clara)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const CFG = require('./config.cjs');

const sections = [
  ['Objetivo', ['Sei o que quero que o anúncio faça (chamadas, pedidos de orçamento, reservas, vendas)?', 'Sei quantos clientes novos por mês preciso para valer a pena?']],
  ['Margem e orçamento', ['Sei quanto lucro me deixa, em média, um cliente novo?', 'Sei quanto posso pagar para conseguir um cliente e continuar a ter lucro?', 'O orçamento que reservei é dinheiro que posso gastar sem pôr o negócio em causa?']],
  ['Público e oferta', ['Sei descrever em duas frases quem é o meu cliente ideal e onde vive?', 'A minha oferta diz de forma clara o que vendo, a quem e porque me devem escolher?']],
  ['Destino do clique', ['O anúncio leva a uma página que explica a oferta e tem um único próximo passo claro?', 'A página abre depressa e funciona bem no telemóvel?', 'Respondo depressa a quem me contacta (idealmente no próprio dia)?']],
  ['Medição', ['Sei de onde veio cada contacto ou venda (Pixel, formulário, pergunta “como nos conheceu?”)?', 'Sei o que vou ver todas as semanas: custo por cliente novo (CPA), retorno (ROAS) e taxa de cliques (CTR)?']],
  ['Responsabilidade', ['Alguém vai acompanhar e ajustar as campanhas todas as semanas, com conhecimento para isso?', 'Tenho em conta o valor do meu tempo, se for eu a fazê-lo?']],
];
let q = 0;
const sec = sections.map(([t, items], i) => `<div class="sec"><h2><b>${i + 1}</b>${t}</h2><ul>${items.map(x => { q++; return `<li><i></i><span>${x}</span></li>`; }).join('')}</ul></div>`).join('');

const baseCss = `
@font-face{font-family:Prata;src:url(fonts/Prata-Regular.ttf)}
@font-face{font-family:Raleway;font-weight:400;src:url(fonts/Raleway-400.ttf)}
@font-face{font-family:Raleway;font-weight:600;src:url(fonts/Raleway-600.ttf)}
@font-face{font-family:Raleway;font-weight:700;src:url(fonts/Raleway-700.ttf)}
@page{size:210mm 297mm;margin:0}
:root{--bg:#1b1c1d;--bg2:#232426;--line:#3a3b3e;--text:#cfcbbf;--mut:#a09d94;--gold:#d2ac47;--gold-l:#f2e782;--gold-d:#4b3f02;--ink:#1b1c1d}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--bg);-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Raleway,sans-serif;font-size:10.2pt;line-height:1.5;color:var(--text)}
.pg{position:relative;width:210mm;height:297mm;padding:14mm 17mm 11mm;display:flex;flex-direction:column;gap:3.8mm;overflow:hidden;background:radial-gradient(120mm 80mm at 90% 0%,rgba(210,172,71,.18),transparent 70%),linear-gradient(170deg,#262628,#1b1c1d 45%,#1d1a10)}
.pg::before{content:"";position:absolute;inset:7mm;border:.35mm solid rgba(210,172,71,.4);pointer-events:none}
.pill{align-self:flex-start;font-size:8.2pt;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-l);background:var(--gold-d);padding:2mm 3.4mm;border-radius:1mm}
h1{font-family:Prata,serif;font-weight:400;font-size:22pt;line-height:1.16;color:var(--gold-l);max-width:165mm}
.lead{font-size:10.4pt;line-height:1.6;max-width:150mm}
.body{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.sec{background:var(--bg2);border:.3mm solid var(--line);border-radius:2.4mm;padding:3.8mm 4.4mm}
.sec h2{font-family:Prata,serif;font-weight:400;font-size:12.8pt;color:var(--gold-l);display:flex;align-items:center;gap:3mm;margin-bottom:2.8mm}
.sec h2 b{flex:none;width:7mm;height:7mm;border-radius:50%;background:var(--gold-d);color:var(--gold-l);font-family:Prata,serif;font-weight:400;font-size:10pt;display:flex;align-items:center;justify-content:center}
.sec li{list-style:none;display:flex;gap:3mm;margin-bottom:2.2mm;font-size:9.2pt;line-height:1.4}
.sec li:last-child{margin-bottom:0}
.sec i{flex:none;width:4.6mm;height:4.6mm;border:.4mm solid var(--gold);border-radius:1mm;margin-top:.4mm}
.score{display:flex;align-items:center;justify-content:space-between;gap:6mm;border-top:.3mm solid var(--gold);border-bottom:.3mm solid var(--gold);padding:3mm 2mm;font-family:Prata,serif;font-size:13pt;color:var(--gold-l)}
.score span.l{display:inline-block;width:20mm;border-bottom:.4mm solid var(--gold);margin:0 2mm}
.score small{font-family:Raleway;font-size:8.6pt;color:var(--mut);letter-spacing:.02em}
.result{margin-top:auto;background:var(--gold);color:var(--ink);border-radius:2.4mm;padding:5mm 7mm;display:flex;gap:7mm;align-items:center;justify-content:space-between}
.result h3{font-family:Prata,serif;font-weight:400;font-size:14pt;color:var(--ink);margin-bottom:1.6mm}
.result p{font-size:9.8pt;line-height:1.48}.result b{color:var(--ink)}
.btn{flex:none;display:inline-block;background:var(--ink);color:var(--gold-l);text-decoration:none;font-weight:700;font-size:9.8pt;padding:3.4mm 6mm;border-radius:10mm;white-space:nowrap}
.foot{display:flex;justify-content:space-between;font-size:8pt;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);border-top:.3mm solid var(--line);padding-top:3.4mm}
.foot b{color:var(--gold-l);font-weight:600}
`;
const printCss = `
:root{--bg:#fff;--bg2:#fff;--line:#d9d3c2;--text:#2b2b2b;--mut:#6a665b;--gold:#b8902f;--gold-l:#1b1c1d}
html,body{background:#fff}
.pg{background:#fff}
.pg::before{border:.35mm solid #b8902f}
.pill{background:transparent;border:.35mm solid var(--gold);color:var(--ink)}
.sec h2 b{background:var(--ink);color:#f2e782}
.sec i{border-color:var(--ink)}
.score{border-color:var(--gold)}
.result{background:#fff;color:var(--ink);border:.5mm solid var(--gold)}
.btn{background:transparent;color:var(--ink);border:.4mm solid var(--ink)}
.foot b{color:var(--ink)}
`;
const themes = [['', baseCss], ['-Impressao', baseCss + printCss]];
const makeHtml = (css) => `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><title>Checklist: o que confirmar antes de investir o primeiro euro em anúncios</title><style>${css}</style></head><body><section class="pg">
<span class="pill">Bónus do ebook · Checklist</span>
<h1>O que confirmar antes de investir o primeiro euro em anúncios</h1>
<p class="lead">Responda a cada ponto com sinceridade. Se houver mais de dois “não”, resolva-os antes de pôr dinheiro em anúncios.</p>
<div class="body">${sec}</div>
<div class="score"><span>Total de “não”:<span class="l"></span>/ ${q}</span><small>Conte os quadrados que deixou por marcar.</small></div>
<div class="result"><div><h3>Mais de dois “não”?</h3><p>Marque a <b>chamada de diagnóstico de 20 minutos</b>, sem custo e sem compromisso, e vemos juntos por onde começar.</p></div><a class="btn" href="${CFG.callUrl}">Marcar a chamada</a></div>
<div class="foot"><span><b>Tiago Violante</b> · VT Gestores de Tráfego</span><span>${CFG.site}</span></div>
</section></body></html>`;

(async () => {
  const b = await chromium.launch();
  for (const [suffix, css] of themes) {
    const file = path.join(__dirname, 'checklist' + suffix.toLowerCase() + '.html');
    fs.writeFileSync(file, makeHtml(css));
    const p = await b.newPage();
    await p.goto('file://' + file);
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => { const el = document.querySelector('.pg'); return el.scrollHeight - el.clientHeight; });
    console.log((suffix || '-Ecra') + ': transbordo ' + over + 'px, ' + q + ' itens');
    await p.pdf({ path: path.join(__dirname, 'Checklist-Antes-de-Investir-em-Anuncios' + suffix + '.pdf'), width: '210mm', height: '297mm', printBackground: true, preferCSSPageSize: true });
    await p.close();
  }
  await b.close();
})();
