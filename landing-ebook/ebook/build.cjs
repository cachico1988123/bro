// Gera o PDF do ebook (2.ª versão): node build.cjs
// Requer: playwright (já instalado). Saída: Os-5-Maiores-Erros-v2.pdf e ebook.html
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

/* ===================== CONFIG: edite aqui e volte a correr ===================== */
const CFG = {
  callUrl: 'https://COLOQUE-AQUI-O-LINK-DA-AGENDA',     // Calendly, Cal.com, etc.
  callLabel: 'COLOQUE-AQUI-O-LINK-DA-AGENDA',          // texto visível do link
  email: 'geral@vtgestoresdetrafego.pt',               // confirme
  whatsapp: '+351 000 000 000',                        // confirme
  site: 'vtgestoresdetrafego.pt',
  year: '2026',
};
/* =============================================================================== */

const TOTAL = 19;
const pages = [];
let n = 0;
const page = (cls, html) => { n++; pages.push(`<section class="pg ${cls || ''}">${html}<div class="ft"><span>Os 5 Maiores Erros · Tiago Violante</span><span>${n}</span></div></section>`); };
const cover = (html) => { n++; pages.push(`<section class="pg cover">${html}</section>`); };
const pill = (t) => `<span class="pill">${t}</span>`;
const li = (arr) => `<ul class="bul">${arr.map(x => `<li>${x}</li>`).join('')}</ul>`;
const steps = (arr) => `<ol class="steps">${arr.map((x, i) => `<li><b>${i + 1}</b><div>${x}</div></li>`).join('')}</ol>`;
const checks = (arr) => `<ul class="chk">${arr.map(x => `<li><i></i><span>${x}</span></li>`).join('')}</ul>`;
const take = (t) => `<div class="take">${t}</div>`;

/* ---------- 1. CAPA ---------- */
cover(`
  <div class="c-top"><span>Guia prático · Edição ${CFG.year}</span><span>VT Gestores de Tráfego</span></div>
  <div class="c-five" aria-hidden="true">5</div>
  <div class="c-mid">
    <h1>Os 5 Maiores Erros que os Donos de Negócios Cometem por Não Usar a Gestão de Tráfego Pago</h1>
    <p>O que está a travar as suas vendas, como confirmá-lo em 5 minutos e o que fazer já esta semana.</p>
  </div>
  <div class="c-by"><span>Por</span> Tiago Violante</div>
`);

/* ---------- 2. COMO USAR ---------- */
page('', `
  ${pill('Antes de começar')}
  <h2 class="t">Como usar este guia</h2>
  <p class="lead">Tem um bom produto, uma equipa dedicada e um negócio com potencial real, mas os clientes não aparecem como devia. Se isto lhe soa familiar, não está sozinho. A maioria dos donos de negócios locais passa por isto em algum momento.</p>
  <p>Este guia mostra os <b>5 erros</b> que mais vezes encontramos em negócios que ainda não usam o tráfego pago de forma estratégica. Para cada um, tem três coisas: o que acontece na prática, um <b>teste rápido</b> para confirmar se é o seu caso e <b>três ações</b> para fazer já esta semana.</p>
  <div class="two">
    <div class="card"><h3>O que este guia é</h3>${li(['Um mapa dos erros mais comuns e do raciocínio por trás de uma boa estratégia.', 'Um conjunto de testes e ações para fazer sozinho, com papel e caneta.', 'Uma forma de decidir com informação se, quando e como investir em anúncios.'])}</div>
    <div class="card"><h3>O que não é</h3>${li(['Um manual técnico de uma plataforma de anúncios.', 'Uma promessa de resultados garantidos. Ninguém os pode prometer.', 'Um substituto de uma boa oferta e de um bom atendimento.'])}</div>
  </div>
  <h3 class="sub">Índice</h3>
  <ol class="toc">
    <li><span>O que está realmente em jogo</span><i></i><b>3</b></li>
    <li><span>Erro 1 · Depender apenas do boca-a-boca e do orgânico</span><i></i><b>4</b></li>
    <li><span>Erro 2 · Investir em anúncios sem estratégia definida</span><i></i><b>6</b></li>
    <li><span>Erro 3 · Deixar os concorrentes ocuparem o seu espaço digital</span><i></i><b>8</b></li>
    <li><span>Erro 4 · Não medir o retorno do investimento</span><i></i><b>10</b></li>
    <li><span>Erro 5 · Tentar fazer tudo sozinho, sem especialização</span><i></i><b>12</b></li>
    <li><span>Os 4 números que decidem se está a ganhar ou a perder</span><i></i><b>14</b></li>
    <li><span>A conta que decide tudo</span><i></i><b>15</b></li>
    <li><span>Os 5 erros num relance</span><i></i><b>16</b></li>
    <li><span>A solução: gestão de tráfego estratégica</span><i></i><b>17</b></li>
    <li><span>Como escolher um gestor de tráfego</span><i></i><b>18</b></li>
    <li><span>O próximo passo</span><i></i><b>19</b></li>
  </ol>
`);

/* ---------- 3. EM JOGO ---------- */
page('roomy', `
  ${pill('O contexto')}
  <h2 class="t">O que está realmente em jogo</h2>
  <p class="lead">Hoje, muitas decisões de compra começam numa pesquisa, num vídeo ou numa publicação. Se o seu negócio não aparece nesses momentos, o cliente não fica à espera: escolhe quem aparecer.</p>
  <h3 class="sub">Onde o seu cliente pode encontrá-lo</h3>
  <div class="three">
    <div class="card"><div class="num">1</div><h3>Quando pesquisa</h3><p>Escreve no Google o que precisa e a sua zona. Quem aparece nesse momento tem a atenção de alguém que já quer comprar.</p></div>
    <div class="card"><div class="num">2</div><h3>Quando navega</h3><p>Passa pelo Instagram, pelo Facebook ou pelo YouTube sem procurar nada. Um bom anúncio apresenta-lhe o seu negócio antes de ele saber que precisa.</p></div>
    <div class="card"><div class="num">3</div><h3>Quando já o conhece</h3><p>Visitou o seu site e saiu. Com remarketing, volta a ver a sua mensagem e tem uma segunda oportunidade de decidir.</p></div>
  </div>
  <p>O tráfego pago é isto: pagar para colocar a sua mensagem à frente das pessoas certas, no momento certo. Não substitui um bom produto nem um bom atendimento. Multiplica o que já funciona.</p>
  <div class="gold">
    <h3>O que o tráfego pago não faz</h3>
    ${li(['Não corrige uma oferta pouco clara, um preço desajustado ou um atendimento lento.', 'Não dá resultados de um dia para o outro. Nas primeiras semanas há testes e ajustes.', 'Não funciona em piloto automático. Precisa de acompanhamento e de decisões com base em números.'])}
  </div>
  ${take('A questão não é se deve investir em tráfego pago. É se o está a fazer com estratégia.')}
`);

/* ---------- ERROS ---------- */
const errA = (k, title, intro, body, tk, roomy = true) => page(roomy ? 'roomy' : '', `${pill('Erro #' + k)}<h2 class="t">${title}</h2><p class="lead">${intro}</p>${body}${take(tk)}`);
const NOTES = `<div class="card notes"><h3>Anote aqui o que vai mudar</h3><div class="ruled"></div></div>`;
const errB = (k, quiz, week, extra, notes = true) => page('roomy', `
  ${pill('Erro #' + k + ' · Passar à prática')}
  <h2 class="t">Teste rápido e plano para esta semana</h2>
  <div class="two">
    <div class="card">
      <h3>Teste rápido</h3>
      <p class="mut">Responda com sinceridade. Dois ou mais “sim” significam que este erro é seu.</p>
      ${checks(quiz)}
    </div>
    <div class="card">
      <h3>Esta semana, faça isto</h3>
      ${steps(week)}
    </div>
  </div>
  ${notes ? extra.replace('<div class="take">', NOTES + '<div class="take">') : extra}
`);

// Erro 1
errA(1, 'Depender Apenas do Boca-a-Boca e das Redes Sociais Orgânicas',
  'O boca-a-boca é maravilhoso, até deixar de chegar. As publicações orgânicas têm um alcance limitado e variável: só uma parte dos seus seguidores as vê, e muito poucas pessoas fora dessa audiência. Está, em boa parte, a falar para quem já o conhece.',
  `<div class="two">
    <div class="gold"><h3>A realidade dolorosa</h3><p>Passa horas a criar conteúdo, a fazer publicações, a responder a comentários, e no final do mês as vendas continuam iguais. Isto não é falta de esforço. É falta de estratégia.</p></div>
    <div class="card"><h3>O que acontece sem tráfego pago</h3>${li(['Crescimento lento e imprevisível', 'Dependência total de algoritmos que mudam sem aviso', 'Incapacidade de escalar o negócio', 'Perda de clientes para concorrentes que anunciam', 'Frustração constante com resultados fracos'])}</div>
  </div>
  <h3 class="sub">Porque é que o boca-a-boca não chega</h3>
  <p>O boca-a-boca depende de quem já o conhece e de quando essas pessoas se lembram de falar de si. Não consegue prever quantos clientes novos vai ter no próximo mês, nem aumentar esse número quando precisa. Um canal que não controla não é um plano de crescimento.</p>`,
  'O tráfego pago bem gerido coloca a sua mensagem à frente das pessoas certas, no momento certo, sem ficar à espera de que o algoritmo o mostre.');
errB(1,
  ['Mais de metade dos seus clientes novos chega por recomendação.', 'Não consegue prever quantos clientes novos terá no próximo mês.', 'Nunca testou anúncios, ou testou uma vez e desistiu.', 'A sua presença online depende de publicar todos os dias.'],
  ['<b>Descubra de onde vêm os clientes.</b> Pergunte aos últimos 10 clientes “como nos conheceu?” e anote as respostas.', '<b>Arrume a sua ficha no Google.</b> Confirme que o Perfil da Empresa tem contactos, horário e fotografias atualizados. É gratuito e é onde muitos clientes o procuram primeiro.', '<b>Escolha um número.</b> Quantos clientes novos quer por mês? Escreva-o num papel.'],
  `<div class="card"><h3>Não abandone o orgânico</h3><p>O conteúdo orgânico constrói confiança e mostra quem é. O tráfego pago dá-lhe alcance e previsibilidade. Funcionam melhor juntos: o anúncio chama a atenção e o perfil cuidado convence quem vai espreitar.</p></div>
   ${take('Antes de gastar um euro, saiba de onde vêm hoje os seus clientes.')}`);

// Erro 2
errA(2, 'Investir em Anúncios Sem Estratégia Definida',
  'Há algo mais perigoso do que não anunciar: <b>anunciar sem estratégia</b>. Muitos donos de negócios experimentam impulsionar uma publicação no Facebook ou criar um anúncio no Google por conta própria e, quando não veem resultados, concluem que “o tráfego pago não funciona para o meu negócio”.',
  `<div class="three">
    <div class="card"><div class="num">1</div><h3>Dinheiro desperdiçado</h3><p>Anúncios sem segmentação correta atingem as pessoas erradas. Paga por cliques de quem nunca vai comprar o que vende.</p></div>
    <div class="card"><div class="num">2</div><h3>Decisões às cegas</h3><p>Sem acompanhar métricas, não sabe o que está a funcionar. O dinheiro vai-se embora sem deixar rasto.</p></div>
    <div class="card"><div class="num">3</div><h3>Resultados negativos</h3><p>Uma campanha mal estruturada pode prejudicar a perceção da sua marca e afastar clientes em vez de os atrair.</p></div>
  </div>
  <h3 class="sub">A diferença entre “anunciar” e “ter estratégia”</h3>
  <div class="vs">
    <div><h4>Sem estratégia</h4>${li(['“Vou promover esta publicação.”', 'Público: toda a gente da zona.', 'Objetivo: ver o que acontece.', 'Revisão: quando me lembrar.'])}</div>
    <div class="good"><h4>Com estratégia</h4>${li(['Um objetivo claro e medível.', 'Um público definido e uma mensagem para ele.', 'Uma página de destino pensada para a oferta.', 'Revisão regular com decisões baseadas em números.'])}</div>
  </div>`,
  'A gestão de tráfego pago não é apertar um botão e esperar. Combina segmentação, copywriting, design, análise de dados e otimização contínua.', false);
errB(2,
  ['Já carregou em “Promover” sem ter definido um objetivo.', 'Não consegue descrever, numa frase, o público que queria atingir.', 'Os seus anúncios levam à página inicial do site, e não a uma página feita para aquela oferta.', 'Deixou uma campanha a correr semanas sem a rever.'],
  ['<b>Escreva o briefing de uma linha:</b> “Quero [objetivo] de [público] em [zona], com [orçamento] por mês.”', '<b>Escolha um único objetivo por campanha:</b> mensagens, chamadas, pedidos de orçamento ou vendas. Misturar tudo dilui os resultados.', '<b>Decida para onde vai o clique.</b> Uma página, uma oferta, um botão.'],
  `<div class="gold"><h3>Exemplo ilustrativo de briefing</h3><p>“Quero 20 pedidos de orçamento por mês de proprietários de moradias em Braga, com 300&nbsp;€ por mês.”</p><p class="small">Exemplo inventado, só para mostrar o formato. Os seus números serão outros.</p></div>
   <div class="card"><h3>Dê tempo às campanhas</h3><p>As plataformas precisam de dados para aprender a quem mostrar o anúncio. Mudar tudo todos os dias impede essa aprendizagem. Defina um período de teste, observe e só depois ajuste.</p></div>
   ${take('Um anúncio sem objetivo é só uma despesa.')}`, false);

// Erro 3
errA(3, 'Deixar os Concorrentes Ocuparem o Seu Espaço Digital',
  'Enquanto não anuncia, os seus concorrentes estão a comprar exatamente o espaço que deveria ser seu. Nas pesquisas do Google, nos feeds do Instagram, nos vídeos do YouTube, eles aparecem e você não. O cliente que podia ter descoberto o seu negócio descobre o deles primeiro.',
  `<div class="quote"><span>“</span>No mundo digital, quem não é visto não é lembrado. E quem não é lembrado não vende.</div>
  <div class="two">
    <div class="card"><h3>O que o seu concorrente pode estar a fazer agora</h3>${li(['A aparecer no topo do Google quando pesquisam pelo seu serviço', 'A reaparecer para clientes que visitaram o seu site (remarketing)', 'A atrair seguidores de páginas semelhantes à sua', 'A testar diferentes mensagens e a descobrir o que converte'])}</div>
    <div class="gold"><h3>O custo da invisibilidade</h3><p>Cada mês sem anúncios é um mês em que cede território digital aos seus concorrentes. Recuperar esse terreno depois custa mais esforço do que tê-lo mantido desde o início.</p></div>
  </div>
  <h3 class="sub">Porque é que isto importa mais para o negócio local</h3>
  <p>Quem procura “[serviço] + [a sua cidade]” já tem uma necessidade e uma zona em mente. Há poucas oportunidades tão diretas como esta, e só as aproveita quem estiver lá na altura.</p>`,
  'Não precisa de estar em todo o lado. Precisa de estar onde o seu cliente procura, antes de o seu concorrente lá estar.', false);
errB(3,
  ['Não pesquisou o seu serviço e a sua cidade no Google nesta semana.', 'Quando pesquisa, aparecem anúncios de concorrentes e não os seus.', 'Quem visita o seu site não volta a ver nada seu depois.', 'Não sabe o que os seus concorrentes anunciam.'],
  ['<b>Pesquise como um cliente.</b> Teste três pesquisas (por exemplo, “[serviço] [cidade]”, “[serviço] perto de mim”, “[serviço] preço”) e anote quem aparece.', '<b>Espreite os anúncios dos concorrentes.</b> A Biblioteca de Anúncios da Meta é pública e gratuita: procure o nome deles e veja o que têm ativo.', '<b>Compare mensagens.</b> Escreva três coisas que eles dizem e que você não diz, e uma que só você pode dizer.'],
  `<div class="card"><h3>Atenção</h3><p>Ver o que o concorrente faz serve para perceber o mercado, não para o copiar. Copiar o preço ou a mensagem de outro negócio costuma dar o pior resultado: fica igual a todos os outros. O objetivo é descobrir o que o diferencia.</p></div>
   ${take('O seu concorrente não precisa de ser melhor. Basta aparecer primeiro.')}`);

// Erro 4
errA(4, 'Não Medir o Retorno do Investimento (ROI) das Ações de Marketing',
  'Gasta dinheiro em panfletos, feiras, patrocínios e redes sociais. Mas sabe exatamente quantos clientes trouxe cada ação? A maioria dos donos de negócios não sabe. Com o tráfego pago, cada passo pode ser medido: quantas pessoas viram o anúncio, quantas clicaram, quantas pediram contacto e quanto custou cada uma.',
  `<h3 class="sub">O ciclo que faz o negócio crescer</h3>
  <div class="cycle"><div><b>1</b>Definir objetivo</div><em>→</em><div><b>2</b>Lançar campanha</div><em>→</em><div><b>3</b>Medir resultados</div><em>→</em><div><b>4</b>Otimizar</div></div>
  <p class="mut center">E voltar ao passo 2, com o que aprendeu.</p>
  <h3 class="sub">Porque é que medir muda as decisões</h3>
  <div class="three">
    <div class="card"><div class="num">1</div><h3>Sabe o que funciona</h3><p>Vê que anúncio, que público e que mensagem trazem pedidos de contacto.</p></div>
    <div class="card"><div class="num">2</div><h3>Corta o que não funciona</h3><p>Deixa de pagar por aquilo que não traz clientes e redireciona o dinheiro.</p></div>
    <div class="card"><div class="num">3</div><h3>Investe com confiança</h3><p>Se cada 100&nbsp;€ lhe trazem clientes com lucro, aumentar o orçamento é uma decisão com base em factos.</p></div>
  </div>`,
  'Quando sabe quanto lhe custa cada cliente, decidir se aumenta o investimento deixa de ser um palpite. Passa a ser uma conta.');
errB(4,
  ['Não sabe quanto lucro lhe deixa, em média, um cliente novo.', 'Não sabe qual o canal que lhe traz mais clientes.', 'O seu site não tem rastreio instalado (por exemplo, Pixel da Meta ou Google Analytics).', 'Quando as vendas sobem ou descem, não sabe dizer porquê.'],
  ['<b>Instale o rastreio.</b> Peça a quem fez o seu site para confirmar que o Pixel da Meta e o Google Analytics estão a funcionar.', '<b>Pergunte sempre “como nos conheceu?”</b> e registe a resposta numa folha, em cada contacto novo.', '<b>Calcule o lucro por cliente</b> com a conta das páginas 14 e 15.'],
  `<div class="gold"><h3>O mínimo que deve medir</h3>${li(['Quantos contactos novos recebe por semana.', 'De onde vieram.', 'Quantos se tornaram clientes.', 'Quanto gastou para os conseguir.'])}</div>
   ${take('O que não se mede não se pode melhorar.')}`);

// Erro 5
errA(5, 'Tentar Fazer Tudo Sozinho, Sem Conhecimento Especializado',
  'O maior erro de todos é acreditar que pode, e deve, gerir os seus anúncios sozinho, entre as dezenas de outras responsabilidades que tem. A gestão de tráfego pago é uma especialidade que exige formação contínua, experiência prática e muitas horas de dedicação.',
  `<div class="three">
    <div class="card"><div class="num">1</div><h3>O seu tempo vale dinheiro</h3><p>Cada hora que passa a tentar perceber o Gestor de Anúncios é uma hora que não está a atender clientes, a vender ou a gerir a sua equipa.</p></div>
    <div class="card"><div class="num">2</div><h3>Os erros custam caro</h3><p>Um erro de segmentação, uma página de destino mal montada ou um pixel mal instalado podem custar centenas de euros em anúncios que nunca vão converter.</p></div>
    <div class="card"><div class="num">3</div><h3>A experiência acelera</h3><p>Quem já viu estes erros noutros negócios reconhece-os depressa e evita-os, em vez de os descobrir pelo caminho mais caro.</p></div>
  </div>
  <div class="gold"><h3>Uma comparação útil</h3><p>Tentar fazer anúncios sem experiência é como tentar fazer a sua própria contabilidade sem ser contabilista. Pode correr bem, mas o prejuízo, quando corre mal, pode ser grande.</p></div>
  <h3 class="sub">Isto não quer dizer que tenha de largar o controlo</h3>
  <p>Mesmo que contrate um profissional, é você quem conhece o negócio, o cliente e a margem. Perceber o essencial, que é para isso que serve este guia, permite-lhe fazer as perguntas certas e perceber se o trabalho está a correr bem.</p>`,
  'A decisão não é entre fazer sozinho ou pagar. É entre perder tempo e dinheiro a aprender, ou aprender o essencial e decidir com informação.', false);
errB(5,
  ['Gere os anúncios nos intervalos de outras tarefas.', 'Não saberia explicar a quem se destina o seu anúncio principal.', 'Já pagou por cliques e nunca viu um relatório do que aconteceu.', 'Sente que não tem tempo para testar e ajustar.'],
  ['<b>Calcule o valor da sua hora:</b> o rendimento mensal que quer ganhar a dividir pelas horas que trabalha. Quantas horas por semana gasta com anúncios?', '<b>Decida o modelo:</b> fazer sozinho, com método e tempo reservado, ou delegar.', '<b>Se delegar,</b> use as 7 perguntas da página 18 para escolher bem.'],
  `<div class="card"><h3>Exemplo ilustrativo</h3><p>Se a sua hora vale 25&nbsp;€ e gasta 4 horas por semana nos anúncios, são cerca de 400&nbsp;€ por mês em tempo, a somar ao orçamento de anúncios. Esse tempo faria falta noutro sítio?</p><p class="small">Números inventados para mostrar a conta. Use os seus.</p></div>
   ${take('O seu tempo é o recurso mais caro do negócio. Gaste-o onde só você pode fazer a diferença.')}`);

/* ---------- 14. OS 4 NÚMEROS ---------- */
page('', `
  ${pill('Passar à prática')}
  <h2 class="t">Os 4 números que decidem se está a ganhar ou a perder</h2>
  <p class="lead">Não precisa de ser analista. Precisa de conhecer estes quatro números e de saber o que cada um lhe diz.</p>
  <div class="metrics">
    <div class="card"><h3>CPA</h3><p class="mut">Custo por aquisição</p><p>Quanto gasta, em média, para conseguir um cliente.</p><div class="formula">Investimento ÷ nº de clientes</div><p class="small">Exemplo: 500&nbsp;€ ÷ 20 clientes = <b>25&nbsp;€ por cliente</b></p></div>
    <div class="card"><h3>ROAS</h3><p class="mut">Retorno sobre o investimento em anúncios</p><p>Quanto recebe em vendas por cada euro investido.</p><div class="formula">Vendas ÷ investimento</div><p class="small">Exemplo: 1&nbsp;500&nbsp;€ ÷ 500&nbsp;€ = <b>3</b>. Cada 1&nbsp;€ trouxe 3&nbsp;€ em vendas.</p></div>
    <div class="card"><h3>CTR</h3><p class="mut">Taxa de cliques</p><p>A percentagem de pessoas que clicam depois de verem o anúncio. Diz se a mensagem chama a atenção.</p><div class="formula">Cliques ÷ visualizações × 100</div><p class="small">Exemplo: 40 ÷ 2&nbsp;000 × 100 = <b>2&nbsp;%</b></p></div>
    <div class="card"><h3>LTV</h3><p class="mut">Valor do cliente ao longo da vida</p><p>Quanto vale um cliente durante toda a relação com o seu negócio, e não só na primeira compra.</p><div class="formula">Valor por compra × nº de compras</div><p class="small">Exemplo: 60&nbsp;€ × 3 compras = <b>180&nbsp;€</b></p></div>
  </div>
  <div class="gold"><h3>Atenção ao ROAS</h3><p>O ROAS mede <b>vendas</b>, não <b>lucro</b>. Um ROAS de 3 pode ser excelente num negócio com margem alta e ruinoso noutro com margem baixa. Na página seguinte vê como saber qual é o seu número mínimo.</p></div>
  ${take('Todos os exemplos neste guia são ilustrativos e servem só para explicar a conta.')}
`);

/* ---------- 15. A CONTA ---------- */
page('', `
  ${pill('Passar à prática')}
  <h2 class="t">A conta que decide tudo</h2>
  <p class="lead">Antes de definir o orçamento de anúncios, descubra quanto pode pagar por um cliente novo sem perder dinheiro. Preencha a coluna da direita com os seus números.</p>
  <table class="calc">
    <thead><tr><th></th><th>Passo</th><th>Exemplo</th><th>O seu negócio</th></tr></thead>
    <tbody>
      <tr><td>A</td><td>Preço médio de uma venda</td><td>60&nbsp;€</td><td></td></tr>
      <tr><td>B</td><td>Custos diretos dessa venda (material, mão de obra, comissões)</td><td>30&nbsp;€</td><td></td></tr>
      <tr><td>C</td><td>Lucro por venda <small>(A − B)</small></td><td>30&nbsp;€</td><td></td></tr>
      <tr><td>D</td><td>Quantas vezes, em média, um cliente compra</td><td>3</td><td></td></tr>
      <tr class="hl"><td>E</td><td>Lucro por cliente <small>(C × D)</small></td><td>90&nbsp;€</td><td></td></tr>
    </tbody>
  </table>
  <div class="two">
    <div class="card"><h3>O que pode pagar por um cliente</h3><p>O <b>teto</b> é o lucro por cliente (E). Acima disso, perde dinheiro em cada cliente que conquista.</p><p>Um <b>ponto de partida prudente</b> é não pagar mais do que o lucro da primeira venda (C). Com dados reais, pode ir mais longe.</p></div>
    <div class="card"><h3>O seu ROAS mínimo</h3><p>Para não perder dinheiro, o ROAS tem de ser pelo menos 1 ÷ margem.</p><div class="formula">Margem = C ÷ A = 30 ÷ 60 = 50&nbsp;%<br>ROAS mínimo = 1 ÷ 0,5 = <b>2</b></div></div>
  </div>
  <div class="gold"><h3>E se o ROAS for 3?</h3><p>Com 1&nbsp;500&nbsp;€ em vendas e 50&nbsp;% de margem, o lucro antes de anúncios é de 750&nbsp;€. Descontando 500&nbsp;€ de anúncios, sobram <b>250&nbsp;€</b>. É mais do que zero, mas muito menos do que “3” faz parecer.</p><p class="small">Conta simplificada: não inclui custos fixos, como renda ou salários.</p></div>
`);

/* ---------- 16. RELANCE ---------- */
page('roomy recapp', `
  ${pill('Resumo')}
  <h2 class="t">Os 5 erros num relance</h2>
  <p class="lead">Se se reconheceu em alguns destes erros, o importante agora é agir. Aqui tem a versão curta de cada um, com o primeiro passo.</p>
  <ol class="recap">
    <li><b>1</b><div><h3>Depender apenas do boca-a-boca e do orgânico</h3><p>O conteúdo orgânico chega a uma parte pequena da sua audiência. Não chega para crescer.</p><p class="step"><span>Primeiro passo</span> Descubra de onde vêm os seus últimos 10 clientes.</p></div></li>
    <li><b>2</b><div><h3>Investir em anúncios sem estratégia definida</h3><p>Anunciar sem estratégia é queimar dinheiro. Os resultados vêm da estrutura, não do acaso.</p><p class="step"><span>Primeiro passo</span> Escreva o briefing de uma linha.</p></div></li>
    <li><b>3</b><div><h3>Deixar os concorrentes ocuparem o seu espaço digital</h3><p>A invisibilidade online tem um custo real e crescente. Cada dia sem presença é terreno cedido.</p><p class="step"><span>Primeiro passo</span> Pesquise o seu serviço como um cliente.</p></div></li>
    <li><b>4</b><div><h3>Não medir o retorno das ações de marketing</h3><p>Sem dados, não há decisões inteligentes. Sem decisões inteligentes, não há crescimento.</p><p class="step"><span>Primeiro passo</span> Calcule o lucro por cliente (página 15).</p></div></li>
    <li><b>5</b><div><h3>Tentar fazer tudo sozinho, sem especialização</h3><p>O seu tempo vale dinheiro e um erro de anúncios pode sair caro. Faça sozinho com método ou delegue bem.</p><p class="step"><span>Primeiro passo</span> Calcule quanto vale a sua hora.</p></div></li>
  </ol>
`);

/* ---------- 17. SOLUÇÃO ---------- */
page('roomy', `
  ${pill('A solução')}
  <h2 class="t">Gestão de Tráfego Pago Estratégica</h2>
  <p class="lead">Agora que conhece os erros, chegou o momento de falar da solução. A gestão de tráfego pago estratégica não é um luxo. É uma ferramenta para qualquer negócio que queira crescer de forma previsível e controlada no ambiente digital.</p>
  <div class="three">
    <div class="card"><div class="num">1</div><h3>Segmentação precisa</h3><p>Chegamos às pessoas que têm mais probabilidade de comprar o que vende, por idade, localização, interesses e comportamento online.</p></div>
    <div class="card"><div class="num">2</div><h3>Campanhas com dados reais</h3><p>Cada campanha é acompanhada com números. Otimizamos de forma contínua para melhorar o retorno e eliminar o desperdício.</p></div>
    <div class="card"><div class="num">3</div><h3>Escalabilidade controlada</h3><p>Quando uma campanha funciona, aumentamos o investimento de forma inteligente, sem perder a rentabilidade.</p></div>
  </div>
  <h3 class="sub">O que inclui uma gestão estratégica</h3>
  <ol class="six">
    <li><b>1</b>Objetivo e números de partida (a conta da página 15)</li>
    <li><b>2</b>Público e mensagem pensados para o seu cliente</li>
    <li><b>3</b>Anúncios e criativos testados em paralelo</li>
    <li><b>4</b>Página de destino com um único próximo passo</li>
    <li><b>5</b>Rastreio instalado e a funcionar</li>
    <li><b>6</b>Revisão regular, com relatório em linguagem clara</li>
  </ol>
  ${take('Com uma estratégia clara, o seu negócio deixa de depender da sorte e passa a crescer com previsibilidade, controlo e resultados que pode medir.')}
`);

/* ---------- 18. ESCOLHER GESTOR ---------- */
page('roomy q7p', `
  ${pill('Antes de contratar')}
  <h2 class="t">Como escolher um gestor de tráfego</h2>
  <p class="lead">Se decidir delegar, estas 7 perguntas ajudam-no a separar quem trabalha com método de quem só promete. Faça-as a qualquer profissional ou agência, incluindo a nós.</p>
  <ol class="q7">
    <li><b>1</b><div><h3>Que objetivo vai medir e como?</h3><p>A resposta deve incluir números concretos, e não só “mais visibilidade”.</p></div></li>
    <li><b>2</b><div><h3>A conta de anúncios fica em meu nome?</h3><p>Deve ficar. Se um dia terminar a colaboração, os dados e o histórico são seus.</p></div></li>
    <li><b>3</b><div><h3>Que relatórios vou receber e com que frequência?</h3><p>Em linguagem clara, com custo por cliente e não só “cliques” e “gostos”.</p></div></li>
    <li><b>4</b><div><h3>Como cobra e quem paga o orçamento dos anúncios?</h3><p>O valor investido em anúncios deve ser claro e separado do valor do serviço.</p></div></li>
    <li><b>5</b><div><h3>Quanto tempo até haver dados para decidir?</h3><p>Uma resposta honesta fala em semanas de teste, e não em resultados no primeiro dia.</p></div></li>
    <li><b>6</b><div><h3>O que fazem eles e o que faço eu?</h3><p>Criativos, texto, página de destino, resposta aos contactos: combine quem faz o quê.</p></div></li>
    <li><b>7</b><div><h3>Que contrato é pedido?</h3><p>Desconfie de contratos longos sem forma de sair se os números não aparecerem.</p></div></li>
  </ol>
  <div class="warn"><h3>Sinais de alerta</h3>${li(['Promete resultados ou vendas garantidas.', 'Não explica o que vai fazer nem porquê.', 'Quer a conta de anúncios em nome dele.', 'Só fala de cliques e “gostos”, nunca de clientes e de lucro.'])}</div>
`);

/* ---------- 19. PRÓXIMO PASSO ---------- */
page('last roomy', `
  ${pill('O próximo passo')}
  <h2 class="t">E agora?</h2>
  <p class="lead">Chegou ao fim do guia. Se se reconheceu em algum destes 5 erros, não se preocupe: são comuns em negócios locais e é possível corrigi-los. O que importa agora é decidir o que faz a seguir.</p>
  <h3 class="sub">Em 3 passos, ainda esta semana</h3>
  ${steps(['<b>Volte à página do erro em que mais se reconheceu</b> e escreva, numa frase, o que vai mudar.', '<b>Preencha a checklist bónus</b> (1 página) antes de investir o primeiro euro em anúncios.', '<b>Marque a chamada de diagnóstico</b> se quiser uma opinião sobre o seu caso concreto.'])}
  <div class="gold call">
    <h3>O seu bónus: chamada de diagnóstico de 20 minutos</h3>
    <p>Por ter comprado este guia, tem direito a uma chamada de 20 minutos, sem custo. Nessa conversa vamos:</p>
    ${li(['perceber o seu negócio, o seu objetivo e o que já tentou;', 'indicar-lhe em qual dos 5 erros está a perder mais;', 'dizer-lhe o que faria sentido fazer primeiro, mesmo que seja sem a VT.'])}
    <p>No fim, se fizer sentido trabalharmos juntos, dizemos-lhe como. Se não fizer, fica na mesma com um plano claro. Sem compromisso e sem pressão.</p>
    <a class="btn" href="${CFG.callUrl}">Marcar a minha chamada</a>
    <p class="small">${CFG.callLabel}</p>
  </div>
  <div class="sign">
    <div><b>Tiago Violante</b> · VT Gestores de Tráfego<br>${CFG.site} · ${CFG.email} · ${CFG.whatsapp}</div>
    <p>Este guia partilha informação geral e não garante resultados. Os resultados de cada negócio dependem de vários fatores.</p>
  </div>
`);

if (n !== TOTAL) throw new Error('Índice desatualizado: ' + n + ' páginas, esperado ' + TOTAL);

const css = `
@font-face{font-family:Prata;src:url(fonts/Prata-Regular.ttf)}
@font-face{font-family:Raleway;font-weight:400;src:url(fonts/Raleway-400.ttf)}
@font-face{font-family:Raleway;font-weight:500;src:url(fonts/Raleway-500.ttf)}
@font-face{font-family:Raleway;font-weight:600;src:url(fonts/Raleway-600.ttf)}
@font-face{font-family:Raleway;font-weight:700;src:url(fonts/Raleway-700.ttf)}
@page{size:210mm 297mm;margin:0}
:root{--bg:#1b1c1d;--bg2:#232426;--line:#3a3b3e;--text:#cfcbbf;--mut:#a09d94;--gold:#d2ac47;--gold-l:#f2e782;--gold-d:#4b3f02;--ink:#1b1c1d;--bad:#e8907f}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--bg);-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Raleway,sans-serif;font-size:10.6pt;line-height:1.58;color:var(--text)}
.pg{position:relative;width:210mm;height:297mm;padding:19mm 17mm 24mm;background:var(--bg);page-break-after:always;overflow:hidden;display:flex;flex-direction:column;gap:5mm}
.pg>*{flex:none}
.pill{align-self:flex-start;font-size:8.2pt;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-l);background:var(--gold-d);padding:2mm 3.4mm;border-radius:1mm}
h2.t{font-family:Prata,serif;font-weight:400;font-size:2.36em;line-height:1.16;color:var(--gold-l)}
h3{font-family:Prata,serif;font-weight:400;font-size:1.17em;line-height:1.25;color:var(--gold-l);margin-bottom:2mm}
h3.sub{font-size:1.32em;margin:1mm 0 0}
h4{font-family:Raleway;font-size:9pt;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:2mm}
.lead{font-size:1.1em;line-height:1.62}
b{font-weight:700;color:#e6e2d6}
.mut{color:var(--mut)}.center{text-align:center}.small{font-size:8.6pt;color:var(--mut);margin-top:2mm}
p+p{margin-top:2.4mm}
.roomy{font-size:11.5pt;gap:6.5mm}.roomy .card,.roomy .gold,.roomy .warn{padding:6mm}.roomy .pill{font-size:8.2pt}
.pg.recapp{--lp:6.6mm}.pg.q7p{--lp:3.3mm}
.notes{flex:1 1 auto!important;display:flex;flex-direction:column;min-height:22mm}.ruled{flex:1;margin-top:1mm;background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 8.4mm,#4a4b4f 8.4mm,#4a4b4f 8.7mm);background-position:0 0}
.ft{position:absolute;left:17mm;right:17mm;bottom:10mm;display:flex;justify-content:space-between;border-top:.3mm solid var(--line);padding-top:3mm;font-size:8pt;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
.card,.warn{background:var(--bg2);border:.3mm solid var(--line);border-radius:2.4mm;padding:5mm}
.gold{background:var(--gold);color:var(--ink);border-radius:2.4mm;padding:5mm}
.gold h3,.gold b{color:var(--ink)}.gold .small{color:#4b3f02}
.warn{border-color:var(--bad)}.warn h3{color:var(--bad)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:5mm}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.num{width:8mm;height:8mm;border-radius:50%;background:var(--gold-d);color:var(--gold-l);font-family:Prata,serif;font-size:12pt;display:flex;align-items:center;justify-content:center;margin-bottom:3mm}
.three .card p{font-size:.93em;line-height:1.55}
.bul li{list-style:none;position:relative;padding-left:5mm;margin-bottom:1.8mm;font-size:.97em;line-height:1.5}
.bul li::before{content:"";position:absolute;left:0;top:2.1mm;width:1.7mm;height:1.7mm;border-radius:50%;background:var(--gold)}
.gold .bul li::before{background:var(--ink)}
.take{margin-top:auto;border-top:.3mm solid var(--gold);border-bottom:.3mm solid var(--gold);padding:5mm 2mm;text-align:center;font-family:Prata,serif;font-size:1.3em;line-height:1.4;color:var(--gold-l)}
.quote{text-align:center;font-family:Prata,serif;font-size:1.45em;line-height:1.4;color:#fff;padding:3mm 8mm}
.quote span{display:block;font-size:34pt;line-height:.6;color:var(--gold);height:8mm}
.chk li{list-style:none;display:flex;gap:3.2mm;margin-bottom:4.4mm;font-size:.97em;line-height:1.45}
.chk i{flex:none;width:4.6mm;height:4.6mm;border:.4mm solid var(--gold);border-radius:1mm;margin-top:.5mm}
.steps li{list-style:none;display:flex;gap:3.4mm;margin-bottom:4.6mm;font-size:.97em;line-height:1.5}
.steps li>b{flex:none;width:7mm;height:7mm;border-radius:50%;background:var(--gold);color:var(--ink);display:flex;align-items:center;justify-content:center;font-family:Prata,serif;font-weight:400;font-size:10.5pt}
.vs{display:grid;grid-template-columns:1fr 1fr;gap:5mm}
.vs>div{border:.3mm solid var(--line);border-radius:2.4mm;padding:4.6mm;background:var(--bg2)}
.vs h4{color:var(--mut)}.vs .good{border-color:var(--gold)}.vs .good h4{color:var(--gold-l)}
.cycle{display:flex;align-items:center;justify-content:space-between;gap:2mm}
.cycle div{flex:1;text-align:center;background:var(--bg2);border:.3mm solid var(--line);border-radius:2.4mm;padding:4mm 2mm;font-size:9.8pt;color:#e6e2d6}
.cycle b{display:block;font-family:Prata,serif;font-weight:400;font-size:15pt;color:var(--gold-l);margin-bottom:1mm}
.cycle em{font-style:normal;color:var(--gold);font-size:14pt}
.toc{margin-top:-1mm}.toc li{list-style:none;display:flex;align-items:baseline;gap:2mm;padding:1.3mm 0;font-size:10.2pt}
.toc i{flex:1;border-bottom:.3mm dotted var(--line);transform:translateY(-1mm)}.toc b{color:var(--gold-l);font-family:Prata,serif;font-weight:400}
.metrics{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.metrics .card h3{font-size:17pt;margin-bottom:.5mm}.metrics .card p{font-size:9.8pt;line-height:1.5}
.formula{margin:3mm 0 1mm;padding:2.6mm 3mm;background:var(--bg);border:.3mm dashed var(--gold);border-radius:1.6mm;color:var(--gold-l);font-size:9.8pt;font-weight:600}
.calc{width:100%;border-collapse:collapse;font-size:10pt}
.calc th{font-size:8pt;letter-spacing:.12em;text-transform:uppercase;text-align:left;color:var(--mut);font-weight:600;padding:2mm 3mm;border-bottom:.3mm solid var(--gold)}
.calc td{padding:3.2mm 3mm;border-bottom:.3mm solid var(--line);vertical-align:middle}
.calc td:first-child{width:8mm;font-family:Prata,serif;color:var(--gold-l)}.calc td:nth-child(3){width:24mm;color:#e6e2d6}.calc td:nth-child(4){width:40mm;background:#16171800;border-left:.3mm solid var(--line);box-shadow:inset 0 -.3mm 0 var(--gold)}
.calc small{color:var(--mut)}.calc tr.hl td{background:#232015}
.recap li,.q7 li{list-style:none;display:flex;gap:4mm;padding:var(--lp,3.6mm) 0;border-bottom:.3mm solid var(--line)}
.recap li:last-child,.q7 li:last-child{border-bottom:0}
.recap li>b,.q7 li>b{flex:none;width:9mm;height:9mm;border-radius:50%;background:var(--gold-d);color:var(--gold-l);font-family:Prata,serif;font-weight:400;font-size:13pt;display:flex;align-items:center;justify-content:center}
.recap h3,.q7 h3{font-size:1.14em;margin-bottom:1mm}.recap p,.q7 p{font-size:.93em;line-height:1.5}
.step{color:#e6e2d6}.step span{font-size:7.6pt;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--gold);margin-right:2mm}
.six{display:grid;grid-template-columns:1fr 1fr;gap:3mm 5mm}
.six li{list-style:none;display:flex;gap:3mm;align-items:flex-start;font-size:.95em;line-height:1.45}
.six b{flex:none;width:6mm;height:6mm;border-radius:50%;background:var(--gold);color:var(--ink);font-family:Prata,serif;font-weight:400;font-size:9pt;display:flex;align-items:center;justify-content:center;margin-top:.3mm}
.call .btn{display:inline-block;margin-top:4mm;background:var(--ink);color:var(--gold-l);text-decoration:none;font-weight:700;font-size:10.4pt;padding:3.4mm 7mm;border-radius:10mm}
.call .bul li{margin-bottom:1mm}
.sign{margin-top:auto;font-size:9.4pt;color:var(--mut);border-top:.3mm solid var(--line);padding-top:4mm}
.sign b{color:var(--gold-l)}.sign p{font-size:8pt;margin-top:2mm}
.last .ft{display:none}
/* capa */
.cover{padding:0;background:radial-gradient(120mm 90mm at 85% 12%,rgba(210,172,71,.2),transparent 70%),linear-gradient(170deg,#262628,#1b1c1d 50%,#1d1a10);gap:0;justify-content:space-between;padding:20mm 20mm 22mm}
.cover::before{content:"";position:absolute;inset:9mm;border:.35mm solid rgba(210,172,71,.45);pointer-events:none}
.c-top{display:flex;justify-content:space-between;font-size:8.6pt;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.c-five{position:absolute;right:20mm;top:36mm;font-family:Prata,serif;font-size:140mm;line-height:1;color:transparent;-webkit-text-stroke:.5mm rgba(210,172,71,.4)}
.c-mid{position:relative;margin-top:auto;margin-bottom:22mm}
.cover h1{font-family:Prata,serif;font-weight:400;font-size:34pt;line-height:1.14;color:var(--gold-l);max-width:150mm}
.cover p{margin-top:8mm;max-width:120mm;font-size:13pt;line-height:1.6;color:var(--text)}
.c-by{position:relative;border-top:.35mm solid rgba(210,172,71,.55);padding-top:5mm;font-size:12pt;letter-spacing:.14em;text-transform:uppercase;color:#fff;font-weight:600}
.c-by span{color:var(--gold);font-weight:500;margin-right:3mm}
`;
const html = `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><title>Os 5 Maiores Erros que os Donos de Negócios Cometem por Não Usar a Gestão de Tráfego Pago</title><style>${css}</style></head><body>${pages.join('\n')}</body></html>`;
const out = __dirname;
fs.writeFileSync(path.join(out, 'ebook.html'), html);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.join(out, 'ebook.html'));
  await p.evaluate(() => document.fonts.ready);
  // aviso de páginas com conteúdo a transbordar
  const over = await p.evaluate(() => [...document.querySelectorAll('.pg')].map((el, i) => {
    const top = el.getBoundingClientRect().top, kids = [...el.children].filter(c => !c.classList.contains('ft'));
    const ft = el.querySelector('.ft'), limit = ft ? ft.getBoundingClientRect().top - top : el.clientHeight;
    const t = kids.findIndex(c => c.classList.contains('take') || c.classList.contains('sign'));
    const prev = t > 0 ? kids[t - 1] : kids[kids.length - 1];
    const bottom = kids[kids.length - 1].getBoundingClientRect().bottom - top;
    return { page: i + 1, over: Math.round((bottom - limit) / 3.78), gap: t > 0 ? Math.round((kids[t].getBoundingClientRect().top - prev.getBoundingClientRect().bottom) / 3.78) : 0 };
  }));
  console.log(over.map(o => `p${o.page}${o.over > 0 ? ' TRANSBORDA ' + o.over + 'mm' : ''} vazio-antes-do-fecho=${o.gap}mm`).join('\n'));
  await p.pdf({ path: path.join(out, 'Os-5-Maiores-Erros-v2.pdf'), width: '210mm', height: '297mm', printBackground: true, preferCSSPageSize: true });
  await b.close();
})();
