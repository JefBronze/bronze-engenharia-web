# bronze-engenharia-web

Site público da Bronze Engenharia de Energia — [bronze-engenharia.com.br](https://www.bronze-engenharia.com.br): auditoria de faturas de energia Grupo A (média tensão) para indústrias, supermercados, hospitais, shoppings e redes de varejo.

Até outubro de 2026 esta página era a Data Joule em data-joule.com. Os domínios foram trocados: data-joule.com passou a servir o observatório de energia (repositório `bronze-web`), e esta página passou para a marca Bronze Engenharia. O nome do repositório ficou.

Uma única página (Next.js App Router, TypeScript), sem backend. O layout foi portado do projeto no Claude Design ("Data Joule.dc.html").

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

Sem variáveis obrigatórias. Para apontar o botão de WhatsApp para o número real, crie `.env.local`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=55DDDNÚMERO
```

## Comandos

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run start    # serve o build
npm run lint     # eslint
npm run icons    # regenera os PNGs de ícone a partir de public/favicon.svg
```

## Estrutura

```
app/
  layout.tsx           fontes (next/font), metadata, Analytics/Speed Insights
  page.tsx             a landing inteira (client component: FAQ acordeão)
  landing.module.css   tokens de cor/tipografia e todos os componentes
  globals.css          reset mínimo
  icon.svg             ícone da aba
public/
  favicon.svg + PNGs   ícones (gerados por scripts/generate-icons.mjs)
  .well-known/security.txt
next.config.ts         cabeçalhos de segurança (CSP restrita: só same-origin)
proxy.ts               só / , /privacidade, ícones e logos do e-mail são públicos; o resto dá 404
```

## Deploy

Vercel, branch `master`. CI (`.github/workflows/ci.yml`) roda `lint` e `build` em push/PR.

