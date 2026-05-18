# 🚀 QUICKSTART - SA'HI Flow

Guia rápido para colocar o sistema rodando em localhost em menos de 5 minutos.

## 🎯 Objetivo

Ter um sistema completo funcionando:

- ✅ Totem de autoatendimento (localhost:3000)
- ✅ KDS - Cozinha (localhost:3000/kds)
- ✅ Admin/Gestão (localhost:3000/admin)
- ✅ API REST (localhost:8080)

## 📋 Pré-requisitos

Instale ANTES de começar (se não tiver):

```bash
# Node.js (vem com npm)
node --version  # Deve ser v18+

# Java
java -version   # Deve ser 17+

# Maven
mvn --version   # Deve ser 3.8+
```

Se não tiver instalado:

- Node: https://nodejs.org/ (baixar LTS)
- Java: https://adoptium.net/ (baixar 17 LTS)
- Maven: https://maven.apache.org/download.cgi

## ⚡ Passo a Passo

### Terminal 1 - FRONTEND (Next.js)

```bash
# Entrar pasta frontend
cd frontend/sahi-totem

# Instalar dependências (primeira vez only)
npm install

# Iniciar servidor
npm run dev

# 🎉 Resultado esperado:
# ▲ Next.js 14.2.0
# - Local:        http://localhost:3000
```

### Terminal 2 - BACKEND (Spring Boot)

```bash
# Entrar pasta backend
cd backend/sahi-api

# Compilar e rodar
mvn spring-boot:run

# 🎉 Resultado esperado:
# Started SahiFlowApplication in X.XXX seconds
# ...listening on port 8080
```

## ✅ Verificar se Está Funcionando

### 1️⃣ Backend está online?

```bash
curl http://localhost:8080/api/ping
# Resposta: SA'HI API online ✓
```

### 2️⃣ Frontend carregando?

Abra no navegador: http://localhost:3000

Deve aparecer 3 botões: FAÇA SEU PEDIDO, KDS, GESTÃO

## 🧪 Teste Rápido

1. **Ir para menu:** http://localhost:3000/menu
2. **Adicionar produtos:** Clique em "Adicionar" em qualquer produto
3. **Ver carrinho:** Clique no ícone de carrinho
4. **Fazer pedido:** Clique em "Ir para Pagamento"
5. **Ver confirmação:** Anote o número do pedido
6. **Abrir KDS:** http://localhost:3000/kds
7. **Ver pedido na cozinha:** Clique "Iniciar" → "Marcar Pronto"
8. **Admin:** http://localhost:3000/admin

## 🎨 Acessos Principais

| Página       | URL                                | Descrição             |
| ------------ | ---------------------------------- | --------------------- |
| Início       | http://localhost:3000              | Menu inicial          |
| Totem        | http://localhost:3000/menu         | Cardápio e carrinho   |
| Cozinha      | http://localhost:3000/kds          | Tela da cozinha (KDS) |
| Gestão       | http://localhost:3000/admin        | Dashboard admin       |
| Health Check | http://localhost:8080/api/health   | Status API            |
| Produtos     | http://localhost:8080/api/products | API de produtos       |

## 🔥 Se Algo Não Funcionar

### "Cannot GET /api/categories"

**Solução:** Recompile o backend

```bash
cd backend/sahi-api
mvn clean compile
mvn spring-boot:run
```

### "Connection refused on 8080"

**Solução:** Backend não está rodando

```bash
# Terminal 2
cd backend/sahi-api
mvn spring-boot:run
```

### "Connection refused on 3000"

**Solução:** Frontend não está rodando

```bash
# Terminal 1
cd frontend/sahi-totem
npm run dev
```

### CORS Error no console

**Solução:** Reiniciar ambos terminais (backend depois frontend)

## 📦 Estrutura de Pastas

```
sahi-flow/
├── frontend/sahi-totem/    ← npm run dev (PORT 3000)
├── backend/sahi-api/       ← mvn spring-boot:run (PORT 8080)
├── README.md               ← Documentação completa
└── QUICKSTART.md           ← Este arquivo
```

## 💡 Dicas

- **Port 3000 já em uso?** Mude em next.config.js ou use: `npm run dev -- -p 3001`
- **Port 8080 já em uso?** Configure em application.properties: `server.port=8081`
- **Limpar cache frontend:** `rm -rf .next && npm run dev`
- **Forçar rebuild backend:** `mvn clean install && mvn spring-boot:run`

## 🎯 Próximos Passos

Após rodar tudo com sucesso:

1. Leia [README.md](./README.md) para docs completas
2. Explore [sahi.md](./sahi.md) para especificação de negócio
3. Teste fluxo completo de pedido

## 📞 Troubleshooting Avançado

**npm install lento?**

```bash
npm cache clean --force
npm install --no-save
```

**Maven dependencies não baixam?**

```bash
mvn clean dependency:resolve
mvn spring-boot:run
```

**Porta já em uso? Encontrar processo:**

Windows:

```powershell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

Mac/Linux:

```bash
lsof -i :8080
kill -9 <PID>
```

---

**🎉 Pronto! Sistema SA'HI Flow rodando em localhost!**

Documentação: Leia [README.md](./README.md)
