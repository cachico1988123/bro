// Recebe os contactos do Simulador IMT Jovem e guarda-os na folha ativa.
// Instalação: Extensões > Apps Script, colar este código, Implementar > Nova implementação > App da Web
// (Executar como: eu; Quem tem acesso: qualquer pessoa). Copiar o link para "webhookUrl" no index.html.

var COLUNAS = ['data', 'nome', 'telemovel', 'email', 'valor', 'localizacao', 'compradores',
  'resultado', 'poupanca', 'imt_com', 'selo_com', 'consultor', 'origem'];

function doPost(e) {
  var folha = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (folha.getLastRow() === 0) folha.appendRow(COLUNAS);
  var dados = JSON.parse(e.postData.contents);
  folha.appendRow(COLUNAS.map(function (c) {
    var v = dados[c] === undefined ? '' : dados[c];
    return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
  }));
  return ContentService.createTextOutput('ok');
}
