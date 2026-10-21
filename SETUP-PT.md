# Como configurar o J.A.R.V.I.S. (guia rápido)

Este projeto é uma cópia de [adewaskar/jarvis](https://github.com/adewaskar/jarvis)
(licença MIT, © 2026 Aditya Dewaskar — veja `LICENSE`), importada do commit
`1c4016a`. O `README.md` original (em inglês) tem todos os detalhes.

## 1. Pré-requisitos (no seu computador)

- **Node.js 20+** — <https://nodejs.org>
- **Claude Code instalado e logado**:
  ```bash
  npm install -g @anthropic-ai/claude-code
  claude          # rode uma vez e faça login
  ```
  O JARVIS usa esse login. Não precisa de API key.
- **Chrome ou Edge**, numa janela de verdade (não num preview embutido —
  o preview bloqueia o microfone).

## 2. Instalar e rodar

```bash
git clone https://github.com/cachico1988123/bro.git
cd bro
git checkout claude/modest-goodall-lj8yqf
npm install
npm run setup      # checa a sua máquina, não altera nada
npm start          # sobe o "cérebro" (porta 8787) e a interface (porta 5173)
```

Abra <http://localhost:5173> no Chrome, clique em **INITIALISE**, permita o
microfone e diga **"Hey Jarvis"** (ou segure **Espaço** para falar sem a palavra
de ativação).

## 3. Opcional

- **Voz melhor (ElevenLabs):** copie `.env.example` para `.env.local` e/ou
  exporte `ELEVENLABS_API_KEY=...` antes de `npm start`. Nunca faça commit da chave.
- **Modelo/esforço:** `JARVIS_MODEL` e `JARVIS_EFFORT` (variáveis de ambiente).
- **Permitir ações reais** (mexer no celular, navegador, enviar coisas):
  `npm start -- --writes`. Por padrão fica só-leitura — leia `decideTool()` em
  `bridge/server.mjs` antes de ligar isso.

## Atalhos

| Tecla | Função |
|---|---|
| "Hey Jarvis" | Acordar |
| Espaço | Falar sem a palavra de ativação |
| Esc | Parar |
| D | Painel de diagnóstico (se não ouvir/falar) |
| T | Teste rápido de áudio |
