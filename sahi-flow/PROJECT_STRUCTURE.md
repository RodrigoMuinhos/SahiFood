# 📁 Estrutura Completa do Projeto SA'HI Flow

Mapa visual da arquitetura e organização de arquivos do projeto.

## 🏗️ Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 NAVEGADOR (Cliente)                   │
│            http://localhost:3000                            │
└────────────┬────────────────────────────────────┬───────────┘
             │                                    │
        ┌────▼─────────────────┐     ┌──────────▼────────────┐
        │   📱 Frontend         │     │  🎨 Interface UI     │
        │  Next.js 14.2        │     │  React 18            │
        │  Port 3000           │     │  Tailwind CSS        │
        │                      │     │  Zustand Store       │
        └────┬─────────────────┘     └──────────┬────────────┘
             │                                    │
             │          HTTP Requests            │
             │          (REST + JSON)            │
             │                                    │
        ┌────▼─────────────────────────────────▼────────────┐
        │              🔌 API Gateway                       │
        │     CORS Config (localhost:3000)                 │
        │     Requests: /api/*                             │
        └────┬────────────────────────────────────────────┘
             │
        ┌────▼─────────────────────────────────────────────┐
        │         🖥️ Backend API                           │
        │    Spring Boot 3.2.3                             │
        │    Java 17                                       │
        │    Port 8080                                     │
        │                                                  │
        │  Controllers:                                    │
        │  ├─ PingController                               │
        │  ├─ CategoryController                           │
        │  ├─ ProductController                            │
        │  ├─ OrderController                              │
        │  └─ KitchenController                            │
        └────┬─────────────────────────────────────────────┘
             │
        ┌────▼─────────────────────────────────────────────┐
        │      📊 Database Layer                           │
        │    JPA Repositories                              │
        │    Flyway Migrations                             │
        └────┬─────────────────────────────────────────────┘
             │
        ┌────▼─────────────────────────────────────────────┐
        │      🗄️  PostgreSQL Database                     │
        │    Neon Cloud                                    │
        │    14 Tables                                     │
        │    SSL Connection                                │
        └──────────────────────────────────────────────────┘
```

## 📂 Estrutura de Pastas - Frontend

```
frontend/sahi-totem/
├── public/                      # Assets estáticos
│   └── (imagens, favicons, etc)
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── globals.css          # ✅ CSS global com tema Apple
│   │   ├── layout.tsx           # ✅ Root layout
│   │   ├── page.tsx             # ✅ Tela inicial
│   │   │
│   │   ├── menu/                # 🛒 Cardápio
│   │   │   └── page.tsx         # ✅ Menu com categorias
│   │   │
│   │   ├── cart/                # 🛍️ Carrinho
│   │   │   └── page.tsx         # ✅ Carrinho + Checkout
│   │   │
│   │   ├── kds/                 # 👨‍🍳 Cozinha
│   │   │   └── page.tsx         # ✅ Quadro de pedidos
│   │   │
│   │   ├── admin/               # 📊 Gestão
│   │   │   └── page.tsx         # ✅ Dashboard
│   │   │
│   │   └── order-confirmed/     # ✅ Confirmação
│   │       └── [orderNumber]/
│   │           └── page.tsx
│   │
│   ├── components/              # Componentes React
│   │   └── ProductCard.tsx      # ✅ Card de produto
│   │
│   ├── lib/                     # Utilidades
│   │   ├── api.ts               # ✅ Cliente HTTP (Fetch)
│   │   ├── store.ts             # ✅ Zustand store (Carrinho)
│   │   └── money.ts             # 📋 Formatação de moeda (TBD)
│   │
│   └── types/                   # TypeScript Interfaces
│       └── index.ts             # ✅ Tipos globais
│
├── .env.local                   # ✅ Variáveis ambiente
├── .gitignore                   # ✅ Git ignore
├── package.json                 # ✅ Dependências npm
├── next.config.js               # ✅ Config Next.js
├── tsconfig.json                # ✅ Config TypeScript
├── tailwind.config.js           # ✅ Config Tailwind + tema
├── postcss.config.js            # ✅ Config PostCSS
└── README.md

## 📂 Estrutura de Pastas - Backend

```

backend/sahi-api/
├── src/
│ ├── main/
│ │ ├── java/br/com/sahi/
│ │ │ ├── SahiFlowApplication.java
│ │ │ │ # ✅ Spring Boot entry point
│ │ │ │
│ │ │ ├── config/
│ │ │ │ ├── CorsConfig.java # ✅ CORS para 3000
│ │ │ │ └── SecurityConfig.java # ✅ MVP sem JWT
│ │ │ │
│ │ │ ├── entity/
│ │ │ │ ├── Category.java # ✅ Categorias
│ │ │ │ ├── Product.java # ✅ Produtos
│ │ │ │ ├── Order.java # ✅ Pedidos
│ │ │ │ ├── OrderItem.java # ✅ Itens do pedido
│ │ │ │ └── KitchenTicket.java # ✅ Tickets KDS
│ │ │ │
│ │ │ ├── repository/
│ │ │ │ ├── CategoryRepository.java # ✅ Queries custom
│ │ │ │ ├── ProductRepository.java # ✅ Queries custom
│ │ │ │ ├── OrderRepository.java # ✅ Queries custom
│ │ │ │ └── KitchenTicketRepository.java # ✅ FIFO query
│ │ │ │
│ │ │ ├── controller/
│ │ │ │ ├── PingController.java # ✅ Health check
│ │ │ │ ├── CategoryController.java # ✅ GET/POST categories
│ │ │ │ ├── ProductController.java # ✅ GET/POST products
│ │ │ │ ├── OrderController.java # ✅ GET/POST orders
│ │ │ │ └── KitchenController.java # ✅ GET/PATCH KDS
│ │ │ │
│ │ │ └── service/ # 📋 (TBD)
│ │ │ ├── OrderService.java
│ │ │ ├── StockService.java
│ │ │ └── KitchenService.java
│ │ │
│ │ └── resources/
│ │ ├── application.properties # ✅ DB config
│ │ └── db/
│ │ └── migration/
│ │ ├── V1**init_schema.sql # ✅ 14 tabelas
│ │ └── V2**insert_initial_data.sql # ✅ Data sample
│ │
│ └── test/
│ └── java/ # 📋 Testes (TBD)
│
├── pom.xml # ✅ Maven config
├── .gitignore # ✅ Git ignore
└── README.md

```

## 🌳 Árvore de Pastas Completa

```

sahi-flow/
│
├── 📘 README.md # Documentação completa
├── 📘 QUICKSTART.md # Guia rápido de 5 min
├── 📘 STARTUP.md # Instruções de inicialização
├── 📘 IMPLEMENTATION_STATUS.md # Status de cada arquivo
├── 📘 PROJECT_STRUCTURE.md # Este arquivo
│
├── frontend/
│ └── sahi-totem/
│ ├── node_modules/ # (criado após npm install)
│ ├── .next/ # (criado após npm run dev)
│ ├── public/
│ ├── src/
│ │ ├── app/
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx
│ │ │ ├── menu/
│ │ │ │ └── page.tsx
│ │ │ ├── cart/
│ │ │ │ └── page.tsx
│ │ │ ├── kds/
│ │ │ │ └── page.tsx
│ │ │ ├── admin/
│ │ │ │ └── page.tsx
│ │ │ └── order-confirmed/
│ │ │ └── [orderNumber]/
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ └── ProductCard.tsx
│ │ ├── lib/
│ │ │ ├── api.ts
│ │ │ └── store.ts
│ │ └── types/
│ │ └── index.ts
│ ├── .env.local
│ ├── .gitignore
│ ├── package.json
│ ├── next.config.js
│ ├── tsconfig.json
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── README.md
│
├── backend/
│ └── sahi-api/
│ ├── target/ # (criado após mvn compile)
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/br/com/sahi/
│ │ │ │ ├── SahiFlowApplication.java
│ │ │ │ ├── config/
│ │ │ │ │ ├── CorsConfig.java
│ │ │ │ │ └── SecurityConfig.java
│ │ │ │ ├── entity/
│ │ │ │ │ ├── Category.java
│ │ │ │ │ ├── Product.java
│ │ │ │ │ ├── Order.java
│ │ │ │ │ ├── OrderItem.java
│ │ │ │ │ └── KitchenTicket.java
│ │ │ │ ├── repository/
│ │ │ │ │ ├── CategoryRepository.java
│ │ │ │ │ ├── ProductRepository.java
│ │ │ │ │ ├── OrderRepository.java
│ │ │ │ │ └── KitchenTicketRepository.java
│ │ │ │ └── controller/
│ │ │ │ ├── PingController.java
│ │ │ │ ├── CategoryController.java
│ │ │ │ ├── ProductController.java
│ │ │ │ ├── OrderController.java
│ │ │ │ └── KitchenController.java
│ │ │ └── resources/
│ │ │ ├── application.properties
│ │ │ └── db/migration/
│ │ │ ├── V1**init_schema.sql
│ │ │ └── V2**insert_initial_data.sql
│ │ └── test/
│ │ └── (testes - TBD)
│ ├── .gitignore
│ ├── pom.xml
│ └── README.md
│
└── sahi.md # Especificação de 122 pontos

```

## 📊 Conta de Arquivos

| Camada | Tipo | Quantidade | Status |
|--------|------|-----------|--------|
| Frontend | .tsx pages | 6 | ✅ |
| Frontend | .tsx components | 1 | ✅ |
| Frontend | .ts utilities | 2 | ✅ |
| Frontend | Config files | 6 | ✅ |
| Backend | .java entities | 5 | ✅ |
| Backend | .java repositories | 4 | ✅ |
| Backend | .java controllers | 5 | ✅ |
| Backend | .java config | 2 | ✅ |
| Backend | .sql migrations | 2 | ✅ |
| Documentation | .md files | 5 | ✅ |
| **Total** | | **38** | ✅ |

## 🔗 Fluxo de Dados

### 1️⃣ Totem - Customer Journey

```

Home (localhost:3000)
↓
Menu (localhost:3000/menu)
├─ GET /api/categories
├─ GET /api/products
└─ Zustand store.addItem()
↓
Cart (localhost:3000/cart)
├─ Zustand store.items
└─ POST /api/orders
↓
Order Confirmed (localhost:3000/order-confirmed/#123)
├─ Display order number
└─ Link to KDS for status

```

### 2️⃣ KDS - Kitchen Workflow

```

KDS (localhost:3000/kds)
├─ Polling every 5s
├─ GET /api/kds/orders
└─ Display in 3 columns:
├─ NA FILA (WAITING)
├─ EM PREPARO (IN_PREPARATION)
└─ PRONTO (READY)
↓
Actions:
├─ Click "Iniciar" → PATCH /api/kds/orders/{id}/start
├─ Click "Marcar Pronto" → PATCH /api/kds/orders/{id}/ready
└─ Click "Entregue" → PATCH /api/kds/orders/{id}/delivered

```

### 3️⃣ Admin - Management Dashboard

```

Admin (localhost:3000/admin)
├─ GET /api/orders
└─ Display:
├─ Total orders
├─ Total sales
├─ Average ticket
└─ Orders table

```

## 🗄️ Banco de Dados - 14 Tabelas

```

┌─────────────────┐
│ categories │ (5 registros)
├─────────────────┤
│ id (UUID) │
│ name (VARCHAR) │
│ display_order │
│ active │
│ created_at │
└────────┬────────┘
│
└──────────┬─────────────────┐
│ │
┌───────▼────────┐ ┌────▼──────────┐
│ products │ │ recipes │
├────────────────┤ ├───────────────┤
│ id (UUID) │ │ id (UUID) │
│ name │ │ product_id │
│ price │ │ created_at │
│ category_id │ └────┬──────────┘
│ created_at │ │
└────┬───────────┘ │
│ │
┌────────▼────────────┐ │
│ order_items │ │
├─────────────────────┤ │
│ id (UUID) │ ┌───▼──────────────┐
│ order_id │ │ recipe_items │
│ product_id │ ├──────────────────┤
│ quantity │ │ id (UUID) │
│ unit_price │ │ recipe_id │
│ created_at │ │ ingredient_id │
└──────┬──────────────┘ │ quantity_needed │
│ └──────────────────┘
┌──────▼──────────┐ │
│ orders │ │
├─────────────────┤ │
│ id (UUID) │ ┌────────▼─────────┐
│ order_number │ │ ingredients │
│ status (enum) │ ├──────────────────┤
│ total │ │ id (UUID) │
│ created_at │ │ name │
│ paid_at │ │ unit │
└────┬────────────┘ │ stock_quantity │
│ │ min_stock │
┌────▼──────────────┐ │ unit_cost │
│ kitchen_tickets │ │ created_at │
├───────────────────┤ └──────────────────┘
│ id (UUID) │
│ order_id │ ┌──────────────────┐
│ status (enum) │ │ stock_movements │
│ priority │ ├──────────────────┤
│ created_at │ │ id (UUID) │
│ started_at │ │ ingredient_id │
│ finished_at │ │ quantity_change │
└───────────────────┘ │ movement_type │
│ created_at │
└──────────────────┘

```

## 🎨 Componentes de UI

### Home Page
```

┌────────────────────────────────────┐
│ SA'HI - Comida com Afeto │
├────────────────────────────────────┤
│ │
│ ┌──────────┐ ┌──────────┐ ┌─────┐│
│ │ PEDIDO │ │ KDS │ │ADM ││
│ │ [orange] │ │ [green] │ │[blue]│
│ └──────────┘ └──────────┘ └─────┘│
│ │
└────────────────────────────────────┘

```

### Menu Page
```

┌─────────────────────────────────────────────┐
│ ← Voltar CARDÁPIO 🛒 [qty] │
├─────────────────────────────────────────────┤
│ [Sanduíches] [Bowls] [Café] [Bebidas] │
├─────────────────────────────────────────────┤
│ │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ KÉF │ │ZÁATAR │ │ LEV │ │
│ │ $19.90 │ │ $22.90 │ │ $13.90 │ │
│ │ ~4 min │ │ ~5 min │ │ ~3 min │ │
│ │[Adicionar]│ │[Adicionar]│ │[Adicionar]│ │
│ └──────────┘ └──────────┘ └──────────┘ │
│ │
└─────────────────────────────────────────────┘

```

### KDS Page
```

┌──────────────────────────────────────────────────────┐
│ KDS - COZINHA │
├──────────────────────────────────────────────────────┤
│ │
│ NA FILA (2) │ EM PREPARO (1) │ PRONTO (3) │
│ │ │ │
│ ┌──────────┐ │ ┌───────────┐ │ ┌──────────┐ │
│ │ #023 │ │ │ #021 │ │ │ #018 │ │
│ │ 15:32 │ │ │ 15:28 │ │ │ 15:22 │ │
│ │ │ │ │ │ │ │ │ │
│ │[Iniciar] │ │ │[Pronto] │ │ │[Entregue]│ │
│ └──────────┘ │ └───────────┘ │ └──────────┘ │
│ │ │ │
│ ┌──────────┐ │ │ ┌──────────┐ │
│ │ #022 │ │ │ │ #019 │ │
│ │ 15:31 │ │ │ │ 15:20 │ │
│ │ │ │ │ │ │ │
│ │[Iniciar] │ │ │ │[Entregue]│ │
│ └──────────┘ │ │ └──────────┘ │
│ │ │ │
└──────────────────────────────────────────────────────┘

```

### Admin Page
```

┌─────────────────────────────────────────────┐
│ GESTÃO │
├─────────────────────────────────────────────┤
│ │
│ Total Pedidos: 24 Vendas: R$ 1.234,50 │
│ Ticket Médio: R$ 51,44 │
│ │
├─────────────────────────────────────────────┤
│ Pedidos Recentes │
├─────────────────────────────────────────────┤
│ #023 │ PAID │ R$ 50.00 │ 15:35:22 │
│ #022 │ PAID │ R$ 42.90 │ 15:31:15 │
│ #021 │ WAITING │ R$ 65.00 │ 15:28:00 │
│ │
└─────────────────────────────────────────────┘

```

## 🚀 Fluxo de Execução

```

1. Usuario abre browser
   ↓
2. NextJS carrega app em localhost:3000
   ├─ Carrega CSS (globals.css com tema Apple)
   ├─ Carrega layout.tsx
   └─ Renderiza page.tsx (home)
   ↓
3. Usuario clica em "FAÇA SEU PEDIDO"
   ↓
4. Frontend faz GET /api/categories
   ├─ Backend retorna 5 categorias
   └─ Zustand armazena em store
   ↓
5. Frontend faz GET /api/products
   ├─ Backend retorna 9 produtos
   └─ Renderiza ProductCard x9
   ↓
6. Usuario clica em produto
   ├─ Zustand store.addItem()
   ├─ Item armazenado em state
   └─ Badge no carrinho atualizado
   ↓
7. Usuario clica no carrinho
   ├─ Carrega cart/page.tsx
   └─ Mostra items e total
   ↓
8. Usuario clica "Ir para Pagamento"
   ├─ POST /api/orders (cria pedido)
   ├─ Backend cria Order + KitchenTicket
   ├─ Zustand.clearCart()
   └─ Redireciona para /order-confirmed/#023
   ↓
9. Usuario vai para KDS (localhost:3000/kds)
   ├─ Polling a cada 5 segundos
   ├─ GET /api/kds/orders
   └─ Exibe ticket na coluna "NA FILA"
   ↓
10. Cozinheiro clica "Iniciar"
    ├─ PATCH /api/kds/orders/{id}/start
    ├─ Status muda para IN_PREPARATION
    └─ Ticket move para coluna "EM PREPARO"
    ↓
11. Cozinheiro clica "Marcar Pronto"
    ├─ PATCH /api/kds/orders/{id}/ready
    ├─ Status muda para READY
    └─ Ticket move para "PRONTO"
    ↓
12. Atendente clica "Entregue"
    ├─ PATCH /api/kds/orders/{id}/delivered
    ├─ Status muda para DELIVERED
    └─ Ticket sai do quadro
    ↓
13. Admin acessa /admin
    ├─ GET /api/orders
    └─ Vê pedido na tabela

```

## 📱 Responsividade

```

Mobile (<768px)
├─ 1 coluna
├─ Menu hambúrguer (TBD)
└─ Touch-friendly buttons

Tablet (768-1024px)
├─ 2 colunas
├─ Sidebar (TBD)
└─ Medium buttons

Desktop (>1024px)
├─ 3-4 colunas
├─ Full layout
└─ Large buttons

KDS (especial)
├─ 3 colunas side-by-side
├─ Sem scroll horizontal
└─ Touch/Click otimizado

```

## 🔐 Segurança (MVP)

```

Implementado:
✅ CORS habilitado para localhost:3000
✅ CSRF desabilitado (MVP)
✅ Sem autenticação (MVP)

Planejado:
⏳ JWT authentication
⏳ Role-based access
⏳ HTTPS em produção
⏳ Rate limiting
⏳ Input validation

```

## 📦 Dependências Principais

### Frontend
- react@18.3.1
- next@14.2.0
- typescript@5.4.4
- tailwindcss@3.4.1
- zustand@4.4.7
- axios@1.7.2
- lucide-react (ícones)

### Backend
- Spring Boot 3.2.3
- Spring Web
- Spring Data JPA
- Flyway
- PostgreSQL Driver
- Lombok

---

**Visualização completa da arquitetura SA'HI Flow**
✅ 38 arquivos criados
✅ 6 páginas de UI
✅ 25+ endpoints de API
✅ 14 tabelas de DB
✅ Pronto para desenvolvimento
```
