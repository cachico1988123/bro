// Torna um HTML autónomo: embebe os tipos de letra (base64) e junta os 4 pesos do Raleway num só ficheiro variável.
const fs = require('fs');
const path = require('path');
const b64 = (f) => fs.readFileSync(path.join(__dirname, 'fonts', f)).toString('base64');
module.exports = function standalone(html) {
  html = html.replace(/@font-face\{font-family:Raleway;font-weight:\d+;src:url\(fonts\/Raleway-\d+\.ttf\)\}\s*/g, '');
  const faces = `@font-face{font-family:Prata;src:url(data:font/ttf;base64,${b64('Prata-Regular.ttf')}) format("truetype")}` +
    `@font-face{font-family:Raleway;font-weight:100 900;src:url(data:font/ttf;base64,${b64('Raleway-400.ttf')}) format("truetype")}`;
  html = html.replace(/@font-face\{font-family:Prata;src:url\(fonts\/Prata-Regular\.ttf\)\}/, faces);
  if (/url\(fonts\//.test(html)) throw new Error('Ficheiro de letra por embeber');
  // no ecrã, mostra as páginas centradas e separadas; na impressão, sem margens
  return html.replace('</style>', '@media screen{html,body{background:#0e0e0f}body{padding:10mm 0}.pg{margin:0 auto 8mm;box-shadow:0 6mm 20mm rgba(0,0,0,.5)}}</style>');
};
