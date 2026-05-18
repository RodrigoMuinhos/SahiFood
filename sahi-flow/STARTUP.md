# 🎬 STARTUP - Como Rodar SA'HI Flow

Instruções passo-a-passo para iniciar o sistema completo.

## ⚙️ Primeira Execução (Setup Completo)

### Passo 1: Frontend Setup (npm install)

```bash
cd frontend/sahi-totem
npm install
```

**Tempo:** ~2-3 minutos
**Resultado:** Pasta `node_modules/` criada com todas as dependências

### Passo 2: Backend Compilation

```bash
cd backend/sahi-api
mvn clean compile
```

**Tempo:** ~1-2 minutos (primeira vez é mais lenta)
**Resultado:** Pasta `target/` gerada, classes compiladas

## 🚀 Iniciar Sistema (Todo dia)

### Terminal 1 - Backend

```bash
cd backend/sahi-api
mvn spring-boot:run
```

**Aguarde até ver:**

```
Started SahiFlowApplication in X seconds (JVM running for Y seconds)
```

**Port:** 8080

### Terminal 2 - Frontend

```bash
cd frontend/sahi-totem
npm run dev
```

**Aguarde até ver:**

```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
```

**Port:** 3000

## ✅ Validar se Está Funcionando

### Health Check Backend

```bash
curl http://localhost:8080/api/ping
# Resposta: SA'HI API online ✓
```

### Acessar no Browser

| URL                         | O que aparece                        |
| --------------------------- | ------------------------------------ |
| http://localhost:3000       | Tela inicial com 3 botões            |
| http://localhost:3000/menu  | Cardápio com produtos                |
| http://localhost:3000/kds   | Tela da cozinha (vazia inicialmente) |
| http://localhost:3000/admin | Dashboard (vazio inicialmente)       |

## 🧪 Teste Completo (5 minutos)

### 1. Fazer um Pedido

```
http://localhost:3000/menu
→ Clique em "Adicionar" em qualquer produto
→ Clique no carrinho (número em cima)
→ Clique "Ir para Pagamento"
→ Anote o número do pedido (ex: #023)
```

### 2. Ver na Cozinha

```
http://localhost:3000/kds
→ Veja o pedido na coluna "NA FILA"
→ Clique "Iniciar"
→ Clique "Marcar Pronto"
→ Clique "Entregue"
```

### 3. Ver na Gestão

```
http://localhost:3000/admin
→ Veja o pedido na tabela
→ Total de vendas atualizado
```

## 🔌 Endpoints Para Testar

```bash
# Health
curl http://localhost:8080/api/ping

# Produtos
curl http://localhost:8080/api/products

# Categorias
curl http://localhost:8080/api/categories

# Pedidos
curl http://localhost:8080/api/orders

# Criar pedido
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderNumber": 1,
    "status": "CREATED",
    "subtotal": 50.00,
    "total": 50.00,
    "customerType": "PUBLIC"
  }'
```

## 🛑 Parar o Sistema

**Terminal 1 (Backend):**

```
Ctrl + C
```

**Terminal 2 (Frontend):**

```
Ctrl + C
```

## 🔄 Restart Rápido

```bash
# Terminal 1
Ctrl + C
mvn spring-boot:run

# Terminal 2
Ctrl + C
npm run dev
```

## 🧹 Limpar Cache

Se algo não funciona direito:

```bash
# Frontend
cd frontend/sahi-totem
rm -rf .next node_modules
npm install
npm run dev

# Backend
cd backend/sahi-api
mvn clean
mvn spring-boot:run
```

## 🔍 Logs Importantes

### Backend - Procure por:

```
Started SahiFlowApplication    ← Backend online
Executing SQL batch             ← Migrations rodando
Tomcat started on port 8080     ← Pronto para requisições
```

### Frontend - Procure por:

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## ⚠️ Erros Comuns

### "Port 8080 already in use"

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8080
kill -9 <PID>
```

### "Port 3000 already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### "Cannot find module 'next'"

```bash
cd frontend/sahi-totem
npm install
npm run dev
```

### "No such file or directory: pom.xml"

```bash
# Verificar se está na pasta certa
cd backend/sahi-api
ls -la  # Deve listar pom.xml

mvn spring-boot:run
```

### CORS Error no console

```
Backend offline ou CORS não configurado
→ Verificar se backend rodando em 8080
→ Verificar se frontend em 3000
→ Reiniciar ambos
```

## 📊 Estrutura de Pastas Durante Execução

```
sahi-flow/
├── frontend/sahi-totem/
│   ├── node_modules/        ← Criado após npm install
│   ├── .next/               ← Criado após npm run dev
│   ├── src/
│   └── package.json
│
├── backend/sahi-api/
│   ├── target/              ← Criado após mvn compile
│   ├── src/
│   └── pom.xml
│
└── README.md
```

## 💡 Dicas Profissionais

### Executar em Portas Diferentes

**Frontend em 3001:**

```bash
PORT=3001 npm run dev
```

**Backend em 8081:**

```bash
# Editar backend/sahi-api/src/main/resources/application.properties
server.port=8081
mvn spring-boot:run

# Depois atualizar .env.local do frontend
NEXT_PUBLIC_API_URL=http://localhost:8081
```

### Watch Mode (Auto Reload)

Frontend já tem por padrão (hot reload)
Backend recompila automaticamente com Maven

### Usar IDE (Recomendado)

**IntelliJ IDEA:**

```
Open project → sahi-api
Run → SahiFlowApplication
```

**VS Code:**

```
Instalar Extension Packs for Java
Run and Debug → Criar launch.json
```

## 📈 Checklist Final

- [ ] Node.js v18+ instalado (`node --version`)
- [ ] Java 17+ instalado (`java -version`)
- [ ] Maven 3.8+ instalado (`mvn --version`)
- [ ] Frontend dependencies instalado (`npm install`)
- [ ] Backend compilado sem erros (`mvn clean compile`)
- [ ] Backend rodando em 8080 (`mvn spring-boot:run`)
- [ ] Frontend rodando em 3000 (`npm run dev`)
- [ ] Health check retorna resposta (`curl http://localhost:8080/api/ping`)
- [ ] Browser abre localhost:3000 com 3 botões
- [ ] Produto pode ser adicionado ao carrinho
- [ ] Pedido aparece no KDS

## 🎯 Próximos Passos

1. Leia [README.md](./README.md) para documentação completa
2. Leia [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) para ver o que foi implementado
3. Explore o código, entenda a arquitetura
4. Implemente service layer (OrderService, StockService, KitchenService)
5. Adicione autenticação JWT
6. Mude para WebSocket para real-time

## 📞 Suporte Rápido

```
Pergunta: "Backend não conecta ao Neon"
Resposta: Verificar application.properties com credenciais corretas do Neon

Pergunta: "Frontend não aparece"
Resposta: npm run dev e aguardar "ready - started server"

Pergunta: "Carrinho não salva"
Resposta: Store Zustand é localStorage - abrir DevTools → Application → localStorage

Pergunta: "KDS não atualiza"
Resposta: Polling a cada 5 segundos, checar network tab no DevTools
```

---

**Pronto! Sistema SA'HI Flow está online** 🎉

```
Frontend: http://localhost:3000 ✅
Backend:  http://localhost:8080 ✅
KDS:      http://localhost:3000/kds ✅
Admin:    http://localhost:3000/admin ✅
```
