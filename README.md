# 2GO Travel Web App

Portal de viagens e aplicação web da 2GO, desenvolvido em Next.js, com foco em roteiros personalizados, portal de destinos, SEO, captação de leads, consultoria premium e integração futura com app mobile.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js** (App Router & Turbopack)
- **React** (v19)
- **Tailwind CSS** (v4)
- **Supabase** (Banco de dados e autenticação)
- **JavaScript** (ES6+)
- **Vercel** (Deploy e infraestrutura)

---

## 🚀 Funcionalidades Principais

- **Página Inicial Premium**: Apresentação cinematográfica inspiracional com carrossel dinâmico de destinos (estilo Apple TV), progress bar linear e glassmorphism refinado.
- **Portal de Destinos Completo**: Diretório estruturado de países e cidades com dados dinâmicos de viagem.
- **Páginas de Roteiros**: Visualização interativa de roteiros diários pronta em estilo aplicativo móvel, com linha do tempo de eventos vertical e trânsito estimado.
- **Planejamento de Viagem Inteligente**: Simulador interativo onde o usuário escolhe parâmetros (destino, dias, estilo) e assiste ao roteiro tomando forma em tempo real.
- **Páginas de Custos**: Análise detalhada de custos de viagem (Mochileiro, Conforto, Luxo) por destino.
- **Blog Integrado**: Canal de conteúdo otimizado para atração orgânica de tráfego.
- **Checklist de Viagem Interativo**: Checklist de bagagem dinâmico protegido por barreira de captura de leads.
- **Conversão e Captura de Leads (CRO)**:
  - Modais de download e banners com barra de lead magnet.
  - Painel Administrativo de Controle (`/admin/dashboard`) para monitoramento de faturamento simulado, downloads, leads e logs de e-mails em tempo real.
- **Consultoria Premium VIP**: Fluxo de contratação de atendimento humano individualizado com checkout drawer interativo.
- **Área de Viajantes & Roteiros Públicos**: Perfil público compartilhável para viajantes com histórico de roteiros criados.
- **SEO Programático**: Estrutura dinâmica de sitemap, robots, metadados em múltiplos idiomas e geração automática de JSON-LD.
- **Design Responsivo**: Adaptado milimetricamente para resoluções de 320px até 1920px (mobile, tablet, desktop).

---

## 📂 Estrutura de Pastas

A organização do código-fonte segue a estrutura do Next.js App Router:

```text
2go-travel-next/
├── public/                 # Imagens, logotipos, fontes e arquivos estáticos
├── src/
│   ├── app/                # Rotas, layouts e estilos globais (Next.js App Router)
│   │   ├── admin/          # Dashboard CRO de monitoramento administrativo
│   │   ├── app/            # Landing page dedicada para download do aplicativo
│   │   ├── blog/           # Roteiro editorial e blog corporativo
│   │   ├── checklist-viagem/# Checklist de bagagem protegido por lead magnet
│   │   ├── destinos/       # Diretório e páginas de guias de destinos
│   │   ├── planejar/       # Simulador interativo de itinerários
│   │   ├── premium/        # Consultoria VIP com tiers de preços e checkout
│   │   ├── roteiros/       # Catálogo e timeline detalhada de roteiros
│   │   ├── viajantes/      # Painéis e perfis de usuários da comunidade
│   │   ├── globals.css     # Estilos globais e customização de tema do Tailwind CSS v4
│   │   └── layout.js       # Layout principal da aplicação com componentes comuns
│   ├── components/         # Componentes React reutilizáveis (Header, Footer, Modais, etc.)
│   └── lib/                # Camada lógica, integrações e mocks
│       ├── cms.js          # Mock Banco de Dados / CMS Headless (guias, destinos, roteiros)
│       ├── supabase.js     # Cliente Supabase com simulação local em LocalStorage
│       ├── i18n.js         # Dicionário multi-idioma (Português, Inglês, Espanhol)
│       ├── seoProgrammatic.js # Utilitários para SEO e metadados dinâmicos
│       └── aiInternal.js   # Lógica simulada de IA para montagem de roteiros
├── package.json            # Scripts e dependências do projeto
├── next.config.mjs         # Configurações do framework Next.js
└── jsconfig.json           # Configurações de caminhos absolutos (aliases)
```

---

## 💻 Como Rodar Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js (versão >= 18)** instalado em sua máquina.

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse a aplicação no seu navegador:
   - **URL Local**: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Como Gerar o Build de Produção

Para testar a compilação de produção e garantir que o Next.js gere todas as páginas estáticas (SSG) sem erros:

```bash
npm run build
```

---

## 🌐 Deploy na Vercel

O projeto está configurado e otimizado para publicação na Vercel. Ao conectar o repositório, utilize as seguintes configurações:

- **Framework Preset**: `Next.js`
- **Root Directory**: `.` (raiz do projeto)
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: Padrão da Vercel (gerado automaticamente)

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto contendo as seguintes chaves (caso queira integrar a um banco Supabase real):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

> 💡 **Nota sobre Fallback**: Caso as credenciais do Supabase não estejam preenchidas, o projeto ativará automaticamente uma **simulação local**. Todos os leads capturados, históricos de roteiros e favoritos serão salvos localmente no navegador utilizando o `LocalStorage`. Isso permite testar 100% das funcionalidades do site sem configurações adicionais!

---

## 📊 Status do Projeto

- **Fase Atual**: **MVP Avançado** com portal institucional refinado, timelines de roteiros em alta fidelidade estética (estilo mobile app), motor de SEO programático, fluxo completo de captação de leads e simulações ativas de dashboard.

---

## 🗺️ Próximas Fases de Desenvolvimento

- **Integração Real de Pagamentos**: Conectar com gateway (Stripe/Asaas) para a contratação dos planos de consultoria.
- **CMS Headless**: Integrar um CMS como Sanity ou Strapi para a gestão editorial de roteiros e blog.
- **Tracking Real de Afiliados**: Lógica de conversão e rastreamento para comissões de hotéis (Booking), voos e seguros.
- **Sincronização Ativa com App Mobile**: Integração total com banco de dados real para ler os roteiros gerados via Web no celular.
- **Login Real**: Ativar login via Supabase Auth (Google, Apple, E-mail OTP).
- **Internacionalização**: Habilitar tradução baseada em rotas (`/en/`, `/es/`).
- **Analytics Avançado**: Integração profunda com Google Tag Manager, Analytics e Pixel do Facebook.
