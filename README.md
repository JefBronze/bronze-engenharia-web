# data-joule-web

Site público da Data Joule — [data-joule.com](https://data-joule.com): auditoria de fatura de energia Grupo A para redes de supermercados.

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
```

## Deploy

Vercel, branch `master`. CI (`.github/workflows/ci.yml`) roda `lint` e `build` em push/PR.

## Pendências conhecidas

- Foto do fundador: o slot na seção "Quem somos" é um placeholder estilizado.
- "Política de privacidade (LGPD)" no rodapé ainda aponta para `#`.
