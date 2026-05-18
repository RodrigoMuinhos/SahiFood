# 🚀 LEIA PRIMEIRO - Start Here

## Você tem um sistema completo pronto para rodar!

```
✅ Frontend Next.js completo (6 páginas)
✅ Backend Spring Boot completo (25+ endpoints)
✅ Banco de dados schema pronto (14 tabelas)
✅ Tema Apple dark implementado
✅ Documentação completa
```

---

## ⚡ Quick Start (5 minutos)

### Pré-requisitos (instale se não tiver)

```bash
# Verificar versões
node --version     # Deve ser v18+
java -version      # Deve ser 17+
mvn --version      # Deve ser 3.8+
```

Se não tiver:

- Node.js: https://nodejs.org/
- Java: https://adoptium.net/
- Maven: https://maven.apache.org/

### Instalação (primeira vez)

```bash
# Terminal 1 - Frontend
cd frontend/sahi-totem
npm install

# Terminal 2 - Backend
cd backend/sahi-api
mvn clean compile
```

### Rodar (todo dia)

**Terminal 1 - Backend:**

```bash
cd backend/sahi-api
mvn spring-boot:run
```

Aguarde: "Started SahiFlowApplication..."

**Terminal 2 - Frontend:**

```bash
cd frontend/sahi-totem
npm run dev
```

Aguarde: "Local: http://localhost:3000"

### Pronto!

Abra no navegador:

- **http://localhost:3000** - Home
- **http://localhost:3000/menu** - Fazer pedido
- **http://localhost:3000/kds** - Cozinha
- **http://localhost:3000/admin** - Gestão

---

## 📚 Documentação (Leia na Ordem)

| Arquivo                       | Leia Para                  |
| ----------------------------- | -------------------------- |
| **IMPLEMENTATION_SUMMARY.md** | Ver o que foi entregue     |
| **QUICKSTART.md**             | Rodar em 5 minutos         |
| **STARTUP.md**                | Instruções detalhadas      |
| **README.md**                 | Docs completas             |
| **PROJECT_STRUCTURE.md**      | Ver estrutura de arquivos  |
| **IMPLEMENTATION_STATUS.md**  | Ver todos arquivos criados |

---

## 🎯 Teste Rápido (Quando rodar)

1. Vá para http://localhost:3000/menu
2. Clique "Adicionar" em um produto
3. Clique no carrinho
4. Clique "Ir para Pagamento"
5. Anote o número do pedido
6. Vá para http://localhost:3000/kds
7. Veja o pedido aparecendo
8. Clique "Iniciar" → "Pronto" → "Entregue"
9. Vá para http://localhost:3000/admin
10. Veja o pedido na tabela

---

## 🏗️ O Que Você Tem

### Frontend (Next.js + React)

- 6 páginas prontas
- 1 componente reutilizável
- Store Zustand (carrinho)
- Cliente HTTP (Axios)
- Tema Apple dark completo
- Responsivo (mobile, tablet, desktop)

### Backend (Spring Boot + PostgreSQL)

- 5 entidades JPA
- 4 repositórios
- 5 controladores
- 25+ endpoints
- 14 tabelas de DB
- 2 migrations SQL

### Dados de Teste

- 5 categorias
- 9 produtos com preços reais
- 10 ingredientes
- 3 recipes

---

## 🚨 Se Algo Não Funcionar

**Port 8080 em uso?**

```bash
lsof -i :8080
kill -9 <PID>
mvn spring-boot:run
```

**Port 3000 em uso?**

```bash
lsof -i :3000
kill -9 <PID>
npm run dev
```

**npm install lento?**

```bash
npm cache clean --force
npm install --no-save
```

**Mais ajuda?** Leia `STARTUP.md`

---

## 📋 Checklist

- [ ] Node v18+ instalado
- [ ] Java 17+ instalado
- [ ] Maven 3.8+ instalado
- [ ] Frontend: `npm install` OK
- [ ] Backend: `mvn clean compile` OK
- [ ] Backend rodando em 8080
- [ ] Frontend rodando em 3000
- [ ] Consegue acessar http://localhost:3000
- [ ] Consegue adicionar produto ao carrinho
- [ ] Consegue criar pedido

---

## 🎨 Cores Usadas

| Cor      | Código  | Uso                        |
| -------- | ------- | -------------------------- |
| Preto    | #000000 | Fundo                      |
| Cinza    | #1d1d1d | Cards                      |
| Azul     | #0071e3 | Botões principais          |
| Laranja  | #ff9500 | CTAs (adicionar, checkout) |
| Verde    | #30b0c0 | Confirmações, pronto       |
| Vermelho | #ff3b30 | Alertas                    |

---

## 🔗 URLs Importantes

```
Frontend:     http://localhost:3000
Backend API:  http://localhost:8080
Health Check: http://localhost:8080/api/ping
```

---

## 💡 Dicas

1. Deixe 2 terminais abertos (um para backend, um para frontend)
2. Frontend tem hot-reload automático
3. Backend precisa de restart para mudanças no código Java
4. Dados de teste já estão no DB
5. Não precisa de autenticação (MVP)
6. Polling KDS a cada 5 segundos

---

## 🚀 Próximos Passos

1. **Agora:** Execute o quickstart acima
2. **Depois:** Leia `README.md` para docs completas
3. **Depois:** Implemente service layer (OrderService, StockService)
4. **Depois:** Adicione autenticação JWT (Phase 2)
5. **Depois:** Mude para WebSocket (Phase 3)

---

## 📞 Precisa de Help?

- **Setup não funciona?** → `QUICKSTART.md`
- **Portas em conflito?** → `STARTUP.md`
- **Estrutura de pastas?** → `PROJECT_STRUCTURE.md`
- **O que foi feito?** → `IMPLEMENTATION_STATUS.md`
- **Tudo sobre o projeto?** → `README.md`

---

## ✨ Resumo

Você tem um **sistema completo de gestão de alimentação**:

- ✅ Totem para clientes pedirem
- ✅ KDS para cozinha gerenciar pedidos
- ✅ Dashboard para gestão e KPIs
- ✅ API REST 25+ endpoints
- ✅ Banco de dados 14 tabelas
- ✅ Tema Apple dark elegante
- ✅ Pronto para rodar em localhost

**Próximo passo:** Execute os comandos do Quick Start acima!

```
🎯 Seu objetivo: npm run dev + mvn spring-boot:run
💡 Resultado: http://localhost:3000 funciona
✨ Tempo: ~10 minutos até estar online
```

---

**Boa sorte! 🚀**

_Para documentação detalhada, leia `README.md`_
