# SA'HI Flow - Sistema de Gestão de Serviços de Alimentação

Comida com Afeto - Sistema completo de autoatendimento, gestão de cozinha e administração.

## 🚀 Stack Tecnológico

### Frontend

- **Next.js 14.2.0** - Framework React com server-side rendering
- **React 18.3.1** - Biblioteca de componentes
- **TypeScript 5.4.4** - Type-safety
- **TailwindCSS 3.4.1** - Estilização com tema dark Apple
- **Zustand 4.4.7** - Gerenciamento de estado
- **Lucide React** - Ícones
- **Axios 1.7.2** - Cliente HTTP

### Backend

- **Java 17+** - Linguagem
- **Spring Boot 3.2.3** - Framework
- **PostgreSQL via Neon** - Banco de dados
- **Flyway** - Migrations de banco de dados
- **Maven** - Build tool

## 📋 Pré-requisitos

Instale antes de começar:

1. **Node.js 18+** - [https://nodejs.org/](https://nodejs.org/)
2. **Java 17+** - [https://jdk.java.net/](https://jdk.java.net/) ou [https://adoptium.net/](https://adoptium.net/)
3. **Maven 3.8+** - [https://maven.apache.org/](https://maven.apache.org/)
4. **Git** - [https://git-scm.com/](https://git-scm.com/)

## 🔧 Configuração Inicial

### Frontend - SA'HI Totem

```bash
cd frontend/sahi-totem

# 1. Instalar dependências
npm install

# 2. Verificar variáveis de ambiente (.env.local)
# Já deve estar configurado com:
# NEXT_PUBLIC_API_URL=http://localhost:8080
# NEXT_PUBLIC_APP_NAME=SAHI Flow
# NEXT_PUBLIC_ENV=development

# 3. Iniciar desenvolvimento
npm run dev
```

Frontend está em: **http://localhost:3000**

### Backend - SA'HI API

```bash
cd backend/sahi-api

# 1. Configurar credenciais Neon em application.properties
# Arquivo: src/main/resources/application.properties
# Exemplo:
# spring.datasource.url=jdbc:postgresql://your-neon-host/neondb?sslmode=require&preparedStatementCacheSize=0&preparedStatementCacheSizeMB=5&cancelQueryTimeout=10
# spring.datasource.username=your_user
# spring.datasource.password=your_password

# 2. Compilar e rodar
mvn spring-boot:run
```

Backend está em: **http://localhost:8080**

## 📊 Estrutura do Projeto

```
sahi-flow/
├── frontend/sahi-totem/          # Frontend Next.js
│   ├── src/
│   │   ├── app/                  # Pages (totem, menu, kds, admin)
│   │   ├── components/           # Reusable components
│   │   ├── lib/                  # Utilities (API, store, formatting)
│   │   ├── types/                # TypeScript interfaces
│   │   └── globals.css           # Theme CSS
│   ├── package.json
│   ├── tailwind.config.js        # Dark theme Apple
│   ├── tsconfig.json
│   └── .env.local
│
└── backend/sahi-api/             # Backend Java Spring Boot
    ├── src/main/java/
    │   └── br/com/sahi/
    │       ├── SahiFlowApplication.java
    │       ├── config/            # CORS, Security
    │       ├── entity/            # JPA entities
    │       ├── repository/        # Data repositories
    │       └── controller/        # REST endpoints
    ├── src/main/resources/
    │   ├── application.properties # Database config
    │   └── db/migration/          # Flyway SQL migrations
    └── pom.xml
```

## 🎨 Componentes da Interface

### Tela Inicial (localhost:3000)

- 3 botões para Totem, KDS e Gestão
- Tema dark com cores Apple

### Totem - Autoatendimento (localhost:3000/menu)

- Categorias de produtos
- Grid de produtos com preço e tempo de preparo
- Carrinho com resumo
- Checkout e confirmação de pedido

### KDS - Cozinha (localhost:3000/kds)

- Quadro de pedidos em 3 colunas: Na Fila, Em Preparo, Pronto
- Botões para mudar status
- Polling automático a cada 5 segundos
- Design otimizado para tela grande

### Gestão - Admin (localhost:3000/admin)

- Dashboard com KPIs
- Lista de pedidos recentes
- Total de vendas e ticket médio

## 🔌 Endpoints da API

### Produtos

- `GET /api/products` - Listar produtos
- `GET /api/products/{id}` - Produto específico
- `GET /api/products/category/{categoryId}` - Produtos por categoria

### Pedidos

- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/{id}` - Pedido específico
- `PATCH /api/orders/{id}/pay` - Marcar como pago (cria ticket de cozinha)
- `PATCH /api/orders/{id}/cancel` - Cancelar pedido

### Cozinha (KDS)

- `GET /api/kds/orders` - Fila FIFO de pedidos
- `GET /api/kds/orders/waiting` - Apenas aguardando
- `PATCH /api/kds/orders/{id}/start` - Iniciar preparo
- `PATCH /api/kds/orders/{id}/ready` - Marcar como pronto
- `PATCH /api/kds/orders/{id}/delivered` - Marcar como entregue

### Saúde

- `GET /api/ping` - Verifica se API está online
- `GET /api/health` - Status completo

## 📦 Dados Iniciais

O banco vem pré-carregado com:

**Categorias:**

- Sanduíches
- Bowls
- Café/Ovos
- Bebidas
- Conveniência

**Produtos:**

- KÉF Baguette - R$ 19,90 (4 min)
- ZÁATAR Bowl - R$ 22,90 (5 min)
- LEV Breakfast - R$ 13,90 (3 min)
- Água - R$ 4,00
- Refrigerante - R$ 6,00
- Suco Natural - R$ 8,00
- Chocolate - R$ 5,00
- Paçoca - R$ 3,50
- Cookie - R$ 4,00

## 🧪 Teste Completo

1. **Iniciar backend:**

   ```bash
   cd backend/sahi-api
   mvn spring-boot:run
   ```

2. **Iniciar frontend (em outro terminal):**

   ```bash
   cd frontend/sahi-totem
   npm run dev
   ```

3. **Abra navegador:**
   - Totem: http://localhost:3000
   - KDS: http://localhost:3000/kds
   - Admin: http://localhost:3000/admin
   - API: http://localhost:8080/api/ping

4. **Fluxo completo:**
   - Vá para http://localhost:3000/menu
   - Escolha produtos e adicione ao carrinho
   - Clique em "Ir para Pagamento"
   - Anote o número do pedido
   - Vá para http://localhost:3000/kds
   - Veja o pedido na coluna "NA FILA"
   - Clique "Iniciar" → "Marcar Pronto" → "Entregue"

## 🌐 Tema de Cores (Apple Dark)

```
Preto: #000000 (apple-black)
Cinza 900: #1d1d1d (apple-gray-900)
Cinza 700: #3a3a3a (apple-gray-700)
Cinza 400: #a0a0a0 (apple-gray-400)

Azul: #0071e3 (apple-blue) - Botões principais
Laranja: #ff9500 (apple-orange) - CTAs
Verde: #30b0c0 (apple-green) - Success
Vermelho: #ff3b30 (apple-red) - Erros

Texto: #f5f5f7 (branco Apple)
```

## 📱 Responsividade

- **Mobile (< 768px)**: 1 coluna
- **Tablet (768-1024px)**: 2 colunas
- **Desktop (> 1024px)**: 3-4 colunas

## 🚨 Troubleshooting

### Frontend não conecta ao backend

- Verificar se backend está rodando em 8080
- Verificar .env.local: `NEXT_PUBLIC_API_URL=http://localhost:8080`
- Limpar cache: `rm -rf .next && npm run dev`

### Backend com erro de conexão DB

- Verificar credenciais Neon em application.properties
- Testar: `psql postgresql://user:password@host/database`

### CORS error

- Verificar CorsConfig.java permite localhost:3000
- Limpar cache do navegador

## 📚 Referências

- [Next.js Docs](https://nextjs.org/docs)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Neon PostgreSQL](https://neon.tech/)

## 📄 Licença

Projeto educacional - 2024

---

**Desenvolvido com ❤️ - SA'HI Flow**
