Editar
perfeito 

agora detalhe o amixmo possivel 

tamabem deve haver um palanjametnod egetao e KDS com isso 

os batidores deve exitir, 

a gui deve ser enviada para o COzinheiro que apreera na TELA como um FIFO

deve ter contorle de saida controel de gestao controale de estoque, 

ficha tecnaia imagiene um cozinha e um KDS de auto nivel 
Pensamento interrompido

Abaixo está o planejamento completo do sistema SA’HI, pensando em:

Totem de autoatendimento
KDS para cozinha
Backoffice de gestão
Controle de estoque
Ficha técnica
Saída de produção
FIFO operacional
Gestão de perdas
Relatórios
Fluxo real de cozinha industrial

A ideia é tratar a SA’HI como uma operação pequena, mas com sistema de alto nível.

SA’HI — Sistema Operacional Completo
Visão geral

A SA’HI terá 4 camadas principais:

CLIENTE
↓
TOTEM DE AUTOATENDIMENTO
↓
KDS / COZINHA
↓
GESTÃO / ESTOQUE / RELATÓRIOS
1. Fluxo principal do pedido
Fluxo ideal
1. Cliente escolhe no totem
2. Cliente adiciona produtos ao carrinho
3. Cliente paga
4. Sistema confirma pagamento
5. Pedido entra automaticamente no KDS
6. Cozinha prepara em ordem FIFO
7. Cozinheiro marca como "em preparo"
8. Cozinheiro marca como "pronto"
9. Pedido aparece como pronto para retirada
10. Sistema baixa estoque pela ficha técnica
11. Venda entra no relatório de gestão
2. Módulos do sistema
Módulo 1 — Totem / Menu Digital

Interface usada pelo cliente.

Função

Permitir compra rápida, visual e intuitiva.

Deve ter:
tela inicial;
categorias;
produtos grandes;
fotos grandes;
descrição curta;
adicionais;
escolha de molho;
carrinho;
pagamento;
confirmação do pedido;
senha de retirada.
Módulo 2 — KDS / Tela da Cozinha

Tela usada pelo cozinheiro.

Função

Mostrar os pedidos pagos em ordem de chegada.

Deve operar em FIFO:
Primeiro pedido pago
↓
Primeiro pedido preparado
O cozinheiro vê:
número do pedido;
horário de entrada;
tempo em espera;
itens;
observações;
adicionais;
molho escolhido;
status.
Módulo 3 — Backoffice / Gestão

Tela usada pelos sócios ou operador.

Função

Controlar o negócio.

Deve ter:
vendas do dia;
pedidos;
estoque;
compras;
perdas;
ficha técnica;
produtos;
preços;
relatórios;
colaboradores;
descontos;
fechamento diário.
Módulo 4 — Estoque

Controle de ingredientes e produtos de conveniência.

Deve controlar:
estoque geral;
estoque de produção;
estoque de bebidas;
estoque de conveniência;
entrada;
saída;
perda;
validade;
estoque mínimo.
3. Arquitetura funcional do sistema
[TOTEM]
- Cardápio
- Carrinho
- Pagamento
- Pedido confirmado

        ↓

[API DE PEDIDOS]
- Cria pedido
- Valida pagamento
- Envia para cozinha
- Baixa estoque

        ↓

[KDS]
- Fila FIFO
- Em preparo
- Pronto
- Entregue

        ↓

[GESTÃO]
- Vendas
- Estoque
- CMV
- Perdas
- Relatórios
4. Status do pedido

O pedido precisa ter estados claros.

Status principais
Status	Significado
Aguardando pagamento	Cliente montou pedido, mas ainda não pagou
Pago	Pagamento confirmado
Na fila	Pedido entrou no KDS
Em preparo	Cozinheiro iniciou
Pronto	Pedido finalizado
Entregue	Cliente retirou
Cancelado	Pedido cancelado
Estornado	Pagamento devolvido
5. Fluxo visual do KDS
Tela da cozinha

A tela deve ser simples, sem poluição.

Colunas sugeridas:
NA FILA        EM PREPARO        PRONTO
Pedido 023     Pedido 021        Pedido 020
Pedido 024     Pedido 022        Pedido 019
Pedido 025
6. Modelo FIFO da cozinha
Regra

O pedido mais antigo aparece primeiro.

Exemplo:
Ordem	Pedido	Horário	Status
1	023	12:01	Na fila
2	024	12:03	Na fila
3	025	12:05	Na fila

O cozinheiro prepara primeiro o 023.

7. Cores do KDS por tempo

Para a cozinha, cor precisa indicar urgência.

Tempo em espera	Cor	Ação
0–4 min	Verde	normal
5–8 min	Amarelo	atenção
9–12 min	Laranja	atrasando
+12 min	Vermelho	prioridade
8. Card do pedido no KDS
Exemplo visual
PEDIDO #023
Entrada: 12:04
Tempo: 03:20

1x KÉF Baguette
- molho verde
- sem cebola
- extra queijo

1x Refrigerante lata

[INICIAR PREPARO]
9. Ações do cozinheiro

O cozinheiro não deve digitar nada.

Só botões grandes:

[INICIAR]
[PRONTO]
[ENTREGUE]
[PAUSAR ITEM]
[PROBLEMA]
10. Tela de detalhe do pedido no KDS

Ao tocar no pedido:

PEDIDO #023

KÉF Baguette
Pão: baguete
Carne: 100g
Queijo coalho: 30g
Mussarela: 1 fatia
Cebola roxa: sim
Molho: verde

Observações:
Sem cebola

Tempo alvo:
4 minutos

[MARCAR COMO PRONTO]
11. Ficha técnica integrada

A ficha técnica deve alimentar o estoque automaticamente.

Exemplo — KÉF Baguette
Ingrediente	Quantidade por unidade
Baguete	1/2 un
Carne refogada	100g
Queijo coalho	30g
Mussarela	1 fatia
Cebola roxa	15g
Tomate	20g
Alface	15g
Molho verde	20g
Manteiga/alho	10g

Quando vende 1 KÉF:

- 1/2 baguete
- 100g carne
- 30g queijo coalho
- 1 fatia mussarela
- 15g cebola roxa
- 20g tomate
- 15g alface
- 20g molho verde
- 10g manteiga/alho
12. Baixa automática de estoque
Quando baixar?

Existem 2 modelos.

Modelo A — Baixa ao pagar

Quando o pedido é pago, o estoque já baixa.

Vantagem

Controle imediato.

Risco

Se cancelar ou der problema, precisa estornar estoque.

Modelo B — Baixa ao marcar como pronto

Quando o cozinheiro marca como pronto, o estoque baixa.

Vantagem

Mais próximo da produção real.

Risco

Se esquecer de marcar, estoque fica errado.

Minha recomendação para SA’HI
Baixar estoque quando o pedido entra no KDS como “Pago / Na fila”.

E permitir:

Cancelar pedido → devolver estoque
Perda operacional → manter baixa e registrar perda

Isso é melhor para controle.

13. Estoque por camadas

Para a SA’HI, use 3 estoques.

1. Estoque Geral

Onde ficam compras maiores.

Exemplo:

arroz cru;
carne;
queijo;
pão;
bebidas fechadas;
descartáveis;
molhos fechados.
2. Estoque de Produção

O que está pronto para uso no turno.

Exemplo:

carne refogada pronta;
arroz temperado pronto;
molho verde pronto;
salada cortada;
ovos;
pão aberto para uso.
3. Estoque de Conveniência

Produtos vendidos direto.

Exemplo:

refrigerante lata;
água;
chocolate;
salgadinho;
paçoca;
cookie.
14. Fluxo de abastecimento
Compra
↓
Estoque Geral
↓
Pré-preparo
↓
Estoque de Produção
↓
Venda
↓
Baixa por ficha técnica
15. Controle de validade

Cada item preparado deve ter validade.

Exemplo
Item	Validade operacional
Carne refogada pronta	até 24h refrigerada
Arroz temperado	até 24h refrigerado
Molho verde	até 48h refrigerado
Salada cortada	mesmo dia
Ovo	validade do fornecedor
Pão baguete	dia
Pão artesano	validade da embalagem
Torrada da casa	24–48h bem armazenada
16. Etiqueta de produção

Cada preparo deve ter etiqueta.

Exemplo
SA’HI — PRODUÇÃO

Item: Carne refogada
Produzido em: 17/05 — 09:30
Validade: 18/05 — 09:30
Responsável: Matheus
Lote: CAR-1705-01
17. FIFO de estoque

O sistema deve orientar:

Primeiro que entra
↓
Primeiro que sai
Exemplo

Se existem dois lotes de molho verde:

Lote	Produção	Validade	Usar primeiro
MOL-1705-01	17/05 08:00	19/05 08:00	sim
MOL-1705-02	17/05 15:00	19/05 15:00	depois
18. Tela de estoque
Categorias
Ingredientes
Produção
Bebidas
Conveniência
Descartáveis
Limpeza
19. Card de estoque
CARNE REFOGADA
Disponível: 2,4 kg
Estoque mínimo: 800g
Validade mais próxima: hoje 22:00

[ENTRADA]
[SAÍDA]
[PERDA]
[PRODUZIR]
20. Controle de saída

Nem toda saída é venda.

Tipos de saída
Tipo	Exemplo
Venda	produto vendido no totem
Perda	queimou, caiu, venceu
Consumo interno	sócios/equipe
Brinde	torrada da casa
Ajuste	correção manual
Teste	degustação/foto/treinamento
21. Tela de saída manual
Registrar saída

Item: Pão artesano
Quantidade: 2 fatias
Motivo:
[Perda]
[Consumo interno]
[Brinde]
[Teste]
[Ajuste]

Observação:
________________

[Confirmar saída]
22. Controle de perdas

Perda precisa ser registrada sem burocracia.

Motivos padrão
vencido;
queimado;
caiu;
sobra do turno;
erro de preparo;
devolução;
teste/foto;
brinde.
23. Relatório de perdas
Item	Quantidade	Motivo	Custo
Baguete	2 un	sobra do turno	R$ 3,00
Molho verde	200g	vencido	R$ 2,40
Carne refogada	100g	erro de preparo	R$ 2,80
24. Gestão de compras
Tela de compras
Nova compra

Fornecedor: Mercado / Padaria / Atacadão
Data:
Itens:
- Carne moída
- Queijo
- Ovos
- Pão
- Bebidas

Valor total:
Forma de pagamento:
Responsável:
25. Entrada de estoque por compra

Exemplo:

Compra: 17/05

Carne moída: 5 kg — R$ 140,00
Custo por kg: R$ 28,00

Ovos: 30 un — R$ 24,00
Custo por unidade: R$ 0,80

Pão artesano: 1 pacote — R$ 13,43
Custo por fatia: calcular pelo número de fatias
26. Custo médio

O sistema deve calcular custo médio.

Exemplo

Compra 1:

Carne 5 kg por R$ 140
Custo: R$ 28/kg

Compra 2:

Carne 5 kg por R$ 160
Custo: R$ 32/kg

Custo médio:

R$ 30/kg
27. CMV por produto

O sistema precisa calcular o custo do prato.

Fórmula
CMV = custo dos ingredientes usados no produto
Exemplo simplificado — KÉF
Ingrediente	Custo estimado
Baguete 1/2	R$ 1,10
Carne 100g	R$ 2,80
Queijo coalho 30g	R$ 1,20
Mussarela	R$ 0,90
Salada	R$ 0,80
Molho	R$ 0,50
Manteiga/alho	R$ 0,40
Papel/descartável	R$ 0,60

Custo estimado: R$ 8,30
Preço: R$ 19,90
Margem bruta: R$ 11,60
CMV: 41,7%

28. Alertas de CMV

O sistema deve alertar:

CMV	Status
até 30%	ótimo
31–40%	aceitável
41–45%	atenção
acima de 45%	revisar preço ou ficha
29. Ficha técnica dentro do sistema
Tela da ficha técnica
Produto: KÉF Baguette
Preço: R$ 19,90
Tempo alvo: 4 min
Categoria: Sanduíches

Ingredientes:
- Baguete: 0,5 un
- Carne refogada: 100g
- Queijo coalho: 30g
- Mussarela: 1 fatia
- Cebola roxa: 15g
- Tomate: 20g
- Alface: 15g
- Molho verde: 20g

Custo estimado:
R$ 8,30

CMV:
41,7%

Margem:
R$ 11,60
30. Ficha técnica operacional para cozinha

Além da ficha de custo, precisa ter ficha de preparo.

Exemplo
KÉF Baguette

1. Abrir baguete
2. Passar manteiga/alho
3. Selar na chapa
4. Adicionar carne quente
5. Adicionar queijos
6. Finalizar com salada
7. Adicionar molho
8. Prensar levemente
9. Cortar e servir

Tempo alvo: 4 minutos
Ponto crítico: não encharcar o pão
31. Modo preparo no KDS

O KDS pode mostrar a ficha resumida quando o cozinheiro toca no produto.

KÉF Baguette
Tempo alvo: 4 min

Montagem:
1. Pão
2. Manteiga
3. Carne
4. Queijo
5. Salada
6. Molho
7. Prensar
32. Tela de produção do dia

Antes de abrir, o sistema pode mostrar:

Produção sugerida para hoje

Carne refogada: 2 kg
Arroz temperado: 1,5 kg
Molho verde: 800g
Salada cortada: 600g
Ovos separados: 30 un
Baguetes: 20 un
Pão artesano: 2 pacotes
33. Produção sugerida por meta de venda

Se a meta for 30 pedidos/dia:

Produto	Meta	Produção necessária
KÉF	15 un	1,5 kg carne
ZÁATAR	8 un	960g kafta
LEV	7 un	14 ovos
34. Controle de capacidade

O sistema deve saber quantos produtos ainda dá para vender.

Exemplo

Se há 900g de carne pronta:

KÉF usa 100g
ZÁATAR usa 120g

Então o sistema pode mostrar:

Ainda dá para vender:
- 9 KÉF
ou
- 7 ZÁATAR
35. Bloqueio automático no totem

Se ingrediente acabar, o produto deve sair do menu.

Exemplo

Acabou ovo:

LEV Breakfast
Indisponível no momento

Acabou carne:

KÉF Baguette indisponível
ZÁATAR Bowl indisponível
36. Estoque crítico

Alertas no painel:

Atenção:
- Carne refogada abaixo do mínimo
- Molho verde vence hoje
- Refrigerante lata com apenas 4 unidades
- Pão artesano com validade próxima
37. Mapa de dependência dos produtos
Ingredientes críticos
Ingrediente	Produtos afetados
Carne refogada / kafta	KÉF, ZÁATAR
Molho verde	KÉF, ZÁATAR, LEV
Baguete	KÉF
Arroz	ZÁATAR
Ovo	LEV
Pão artesano	LEV
Mussarela	KÉF, LEV
38. Produtos de conveniência no sistema

Produtos de conveniência não precisam de ficha técnica.

Eles têm estoque unitário.

Exemplo
Refrigerante lata
Estoque: 24 un
Custo unitário: R$ 3,20
Preço venda: R$ 6,00
Margem: R$ 2,80
39. Gestão de combos

Combos precisam baixar estoque dos itens internos.

Exemplo
Combo KÉF + Refri
Baixa:
- 1 KÉF pela ficha técnica
- 1 refrigerante lata
40. Desconto colaborador

Como vocês terão público interno e público externo, o sistema deve ter modo colaborador.

Formas de acesso
botão “Sou colaborador”;
senha simples;
QR Code;
cupom;
tag NFC no futuro.
Regras
Produto	Público	Colaborador
KÉF	R$ 19,90	R$ 16,90
ZÁATAR	R$ 22,90	R$ 19,90
LEV	R$ 13,90	R$ 11,90
41. Compensação do desconto

O desconto interno pode ser compensado por:

público externo pagando preço cheio;
combos;
bebidas;
conveniência;
adicionais.
42. Adicionais

Adicionais devem ter custo e estoque.

Exemplo
Adicional	Preço	Baixa estoque
Extra queijo	R$ 2,00	+1 fatia mussarela
Extra carne	R$ 4,00	+50g carne
Extra ovo	R$ 2,00	+1 ovo
Extra molho	R$ 1,00	+20g molho
43. Tela de gestão do dia

A tela principal do gestor deve mostrar:

Hoje

Vendas: R$ 428,70
Pedidos: 22
Ticket médio: R$ 19,48
Produtos vendidos: 26
CMV estimado: 38%
Lucro bruto estimado: R$ 265,80

Pedidos em andamento: 3
Tempo médio cozinha: 5m20s
Perdas: R$ 8,40
44. Indicadores principais
KPIs da SA’HI
Indicador	Por que importa
Vendas do dia	caixa
Ticket médio	qualidade comercial
CMV	margem
Tempo médio de preparo	eficiência
Pedidos por hora	demanda
Perdas	desperdício
Produto mais vendido	decisão de compra
Produto menos vendido	ajuste de cardápio
Estoque crítico	operação
Cancelamentos	problema de fluxo
45. Fechamento diário

No fim do dia, o sistema deve pedir:

Fechamento do dia

1. Conferir pedidos
2. Conferir vendas
3. Registrar perdas
4. Conferir estoque crítico
5. Registrar sobras
6. Fechar turno
46. Tela de fechamento
Resumo do dia

Vendas: R$ 612,40
Pedidos: 31
Ticket médio: R$ 19,75
CMV estimado: R$ 238,00
Lucro bruto: R$ 374,40

Perdas registradas: R$ 12,60

Produtos mais vendidos:
1. KÉF — 16 un
2. LEV — 9 un
3. ZÁATAR — 6 un

[FECHAR TURNO]
47. Controle de retirada

Depois que o pedido fica pronto:

Pedido #023 pronto
Retire no balcão

Pode aparecer em:

tela do balcão;
monitor pequeno;
painel no próprio totem;
aviso sonoro.
48. Tela de pedidos prontos
RETIRE SEU PEDIDO

023
024
026
49. Controle de entrega

Cozinha ou balcão marca:

[ENTREGUE]

Isso evita pedido parado como pronto.

50. Modo problema no KDS

Se faltar ingrediente ou der erro:

[PROBLEMA]

Opções:

falta ingrediente;
erro no pedido;
cliente solicitou alteração;
item queimou;
pagamento/pedido inconsistente.
51. Auditoria

Tudo precisa gerar log.

Exemplos
Pedido #023 criado às 12:01
Pagamento aprovado às 12:02
Enviado ao KDS às 12:02
Iniciado por Matheus às 12:04
Finalizado às 12:08
Entregue às 12:10
52. Permissões
Perfis
Perfil	Pode fazer
Cozinheiro	ver KDS, iniciar, pronto, entregue
Operador	ver pedidos, resolver problema
Gestor	estoque, preço, produto, relatório
Sócio	tudo
Admin técnico	configuração do sistema
53. Backoffice minimalista

Como você já prefere painel simples, o backoffice deve ter poucas palavras e ações diretas.

Menu lateral
Hoje
Pedidos
Estoque
Produção
Produtos
Compras
Perdas
Relatórios
Configurações
54. Tela “Hoje”

A mais importante.

SA’HI — Hoje

Vendas
R$ 428,70

Pedidos
22

Tempo cozinha
5m20s

Estoque crítico
3 itens

[Ver pedidos]
[Registrar compra]
[Registrar perda]
[Produção do dia]
55. Tela “Pedidos”
Pedidos

#023 — Pronto — R$ 25,90
#024 — Em preparo — R$ 19,90
#025 — Na fila — R$ 13,90
#026 — Entregue — R$ 22,90

Filtros:

todos;
na fila;
em preparo;
pronto;
entregue;
cancelado.
56. Tela “Produtos”
KÉF Baguette
R$ 19,90
Ativo
CMV: 41,7%

ZÁATAR Bowl
R$ 22,90
Ativo
CMV: 36%

LEV Breakfast
R$ 13,90
Ativo
CMV: 32%

Ações:

editar preço;
editar descrição;
editar foto;
ativar/desativar;
editar ficha técnica.
57. Tela “Ficha técnica”

Campos:

Produto
Categoria
Preço
Tempo alvo
Ingredientes
Quantidade
Unidade
Custo
Modo de preparo
Foto
Alergênicos
58. Tela “Produção”
Produção de hoje

[Produzir carne refogada]
[Produzir arroz temperado]
[Produzir molho verde]
[Preparar salada]
[Separar ovos]

Ao tocar:

Produzir molho verde

Quantidade produzida: 800g
Validade: 48h
Responsável: Rodrigo

[Salvar produção]
59. Tela “Compras”
Compras

+ Nova compra

Últimas:
17/05 — Mercado — R$ 182,40
16/05 — Padaria — R$ 36,00
15/05 — Atacado — R$ 220,00
60. Tela “Nova compra”
Fornecedor
Data
Produto
Quantidade
Valor total
Validade
Responsável

[Adicionar item]
[Salvar compra]
61. Tela “Perdas”
Registrar perda

Item
Quantidade
Motivo
Responsável
Observação

[Salvar perda]
62. Tela “Relatórios”

Relatórios simples:

Vendas por dia
Produtos mais vendidos
CMV por produto
Perdas por período
Tempo médio de preparo
Estoque consumido
Compras por fornecedor
63. Integração Totem + KDS + Estoque
Evento principal

Quando o pedido é pago:

{
  "event": "ORDER_PAID",
  "orderId": "023",
  "items": [
    {
      "product": "KÉF Baguette",
      "quantity": 1,
      "modifiers": ["molho verde", "extra queijo"]
    }
  ],
  "total": 21.90,
  "paidAt": "2026-05-17T12:02:00"
}

O sistema faz:

1. Cria pedido no KDS
2. Reserva/baixa estoque
3. Atualiza relatório de venda
4. Atualiza capacidade de produção
64. Modelo de dados principal
Entidades essenciais
Product
Category
Ingredient
Recipe
RecipeItem
Order
OrderItem
OrderModifier
Payment
KitchenTicket
StockItem
StockMovement
Purchase
Loss
ProductionBatch
User
Shift
65. Produto
Product
- id
- name
- category
- description
- price
- image
- active
- preparationTime
- hasRecipe
66. Ingrediente
Ingredient
- id
- name
- unit
- currentStock
- minimumStock
- averageCost
- expirationControl
67. Ficha técnica
Recipe
- id
- productId
- version
- active
RecipeItem
- recipeId
- ingredientId
- quantity
- unit
- lossPercentage
68. Pedido
Order
- id
- number
- status
- subtotal
- discount
- total
- customerType
- createdAt
- paidAt
- completedAt
69. Item do pedido
OrderItem
- orderId
- productId
- quantity
- unitPrice
- notes
70. KDS Ticket
KitchenTicket
- orderId
- status
- priority
- startedAt
- finishedAt
- deliveredAt
- station
71. Movimento de estoque
StockMovement
- ingredientId
- type
- quantity
- reason
- orderId
- purchaseId
- batchId
- userId
- createdAt

Tipos:

entrada;
venda;
perda;
produção;
ajuste;
consumo interno;
brinde.
72. Lote de produção
ProductionBatch
- ingredientId
- quantityProduced
- quantityAvailable
- producedAt
- expiresAt
- responsibleUser
- batchCode
73. Tela ideal para cozinha industrial
Layout físico
[Geladeira / insumos frios]
        ↓
[Pré-preparo]
        ↓
[Chapa]
        ↓
[Montagem]
        ↓
[Finalização]
        ↓
[Retirada]
74. Organização da cozinha SA’HI
Zona 1 — Armazenamento
geladeira;
estoque seco;
bebidas;
conveniência.
Zona 2 — Pré-preparo
corte de salada;
porcionamento de carne;
preparo de molho;
arroz;
ovos.
Zona 3 — Chapa
KÉF;
LEV;
aquecimento da kafta;
finalização.
Zona 4 — Montagem
pão;
salada;
molhos;
bowls;
papel kraft;
louça.
Zona 5 — Expedição
pedido pronto;
senha;
entrega no balcão.
75. Tela KDS por estação

Se crescer, separar por estação:

CHAPA
- KÉF
- LEV

BOWL
- ZÁATAR

EXPEDIÇÃO
- bebidas
- conveniência
- conferência

No começo, uma tela única basta.

76. Modo simples do KDS para MVP
Tela única
NA FILA
EM PREPARO
PRONTO

Isso é suficiente para começar.

77. Modo avançado do KDS
Futuro
CHAPA
BOWL
BEBIDAS
EXPEDIÇÃO

Cada item vai para sua estação.

78. SLA de preparo

Cada produto deve ter tempo alvo.

Produto	Tempo alvo
KÉF Baguette	4 min
ZÁATAR Bowl	5 min
LEV Breakfast	3 min
Bebida	30s
Conveniência	30s
79. Priorização do KDS

Regra padrão:

FIFO por horário de pagamento

Mas pode ter prioridade:

pedido atrasado;
pedido com poucos itens;
pedido refeito;
pedido manual.
80. Tela de alerta da cozinha
Pedido #023 atrasado
Tempo: 12m30s
Produto: KÉF Baguette

[Priorizar]
[Marcar problema]
81. Guia visual para o cozinheiro

Cada produto pode ter uma imagem de montagem.

Exemplo
KÉF Baguette
1. Pão
2. Carne
3. Queijo
4. Salada
5. Molho
6. Prensar

Com foto final do prato.

82. Checklist de abertura

Antes de vender:

Abertura SA’HI

[ ] Chapa limpa
[ ] Molho verde pronto
[ ] Carne pronta
[ ] Arroz pronto
[ ] Salada pronta
[ ] Ovos disponíveis
[ ] Pães disponíveis
[ ] Bebidas geladas
[ ] Totem online
[ ] KDS online
83. Checklist de fechamento
Fechamento SA’HI

[ ] Registrar sobras
[ ] Registrar perdas
[ ] Guardar produção válida
[ ] Descartar vencidos
[ ] Limpar chapa
[ ] Conferir estoque crítico
[ ] Fechar vendas
[ ] Desligar equipamentos
84. Painel de operação ao vivo
Operação agora

Pedidos na fila: 3
Em preparo: 2
Prontos: 1
Tempo médio: 4m40s
Produto mais pedido: KÉF
Estoque crítico: molho verde
85. Painel de estoque ao vivo
Capacidade restante

KÉF: 12 unidades
ZÁATAR: 8 unidades
LEV: 15 unidades

Atenção:
Molho verde: baixo
Refrigerante: 4 unidades
86. Gestão de disponibilidade

O gestor pode pausar produto:

KÉF Baguette
[Ativo] [Pausar]

Motivo:
- falta ingrediente
- cozinha sobrecarregada
- teste
- indisponível hoje

No totem aparece:

Indisponível no momento
87. Modo sobrecarga

Se a cozinha acumular muitos pedidos, o sistema pode:

Tempo estimado: 15 minutos

Ou pausar novos pedidos temporariamente.

88. Integração com pagamento

No MVP:

PIX manual/QR;
cartão externo;
confirmação manual ou automática.

No avançado:

TEF;
pinpad;
pagamento integrado;
emissão de comprovante.

Como você já trabalha com totem e TEF, a SA’HI pode nascer simples e evoluir para integração completa depois.

89. Impressão

Não é obrigatório no início se tiver KDS.

Mas pode ter:

comprovante do cliente;
etiqueta do pedido;
comanda de cozinha.
Melhor para começar
Sem impressão
Totem + KDS + tela de retirada

Menos custo e menos manutenção.

90. Modo offline

Como operação de comida não pode parar, pensar em modo offline simples:

Se internet cair:
- totem continua registrando pedido local
- pagamento pode ser manual
- KDS local continua
- sincroniza depois

Para MVP, pode ser local-first na rede interna.

91. Estrutura técnica recomendada

Como você já trabalha com arquitetura de totem, eu manteria algo assim:

Frontend
Totem PWA
KDS PWA
Backoffice PWA
Backend
API Java Spring Boot
PostgreSQL
WebSocket para KDS em tempo real
Redis opcional para fila/eventos
Comunicação
Totem → API → WebSocket → KDS
API → Estoque
API → Relatórios
92. Eventos em tempo real

O KDS precisa receber pedido sem atualizar tela.

Eventos:

ORDER_PAID
ORDER_SENT_TO_KITCHEN
ORDER_STARTED
ORDER_READY
ORDER_DELIVERED
ORDER_CANCELLED
STOCK_LOW
PRODUCT_UNAVAILABLE
93. WebSocket no KDS

Quando pedido é pago:

API envia evento para KDS:
Novo pedido #023

A tela atualiza automaticamente.

94. Regra de segurança

Pedido só entra na cozinha se:

Pagamento confirmado

Ou se o gestor permitir:

Pedido manual autorizado
95. Pedido manual

O gestor pode lançar pedido no balcão:

Novo pedido manual

Produto
Quantidade
Forma de pagamento
Observação

[Enviar para cozinha]
96. Produtos do menu atual
Sanduíches
KÉF Baguette — R$ 19,90

Meia baguete prensada na chapa com carne refogada, queijo coalho, mussarela, cebola roxa e molho verde da casa.

Bowls
ZÁATAR Bowl — R$ 22,90

Kafta artesanal no bowl com arroz temperado, cenoura, ervas frescas, alho frito e molho da casa.

Café / Ovos
LEV Breakfast — R$ 13,90

Pão artesano prensado com ovos cremosos e queijo mussarela.

Bebidas
água;
água com gás;
refrigerante lata;
suco;
energético pequeno.
Conveniência
chocolate;
paçoca;
cookie;
barrinha;
salgadinho pequeno;
bala/chiclete.
97. Card de produto no sistema
Nome: KÉF Baguette
Categoria: Sanduíches
Preço: R$ 19,90
Tempo alvo: 4 min
Ativo: sim
Controla estoque: sim
Tem ficha técnica: sim
Foto: kef.jpg
98. Card de conveniência
Nome: Refrigerante lata
Categoria: Bebidas
Preço: R$ 6,00
Custo: R$ 3,20
Estoque: 24
Controla estoque: sim
Tem ficha técnica: não
99. Regras de produto
Produto de cozinha

Tem:

ficha técnica;
tempo de preparo;
KDS;
estoque por ingrediente.

Exemplo:

KÉF;
ZÁATAR;
LEV.
Produto de conveniência

Tem:

estoque unitário;
custo unitário;
não vai para cozinha ou vai para expedição.

Exemplo:

refrigerante;
água;
chocolate.
100. Separação no KDS
Cozinha recebe:
KÉF;
ZÁATAR;
LEV.
Expedição recebe:
bebidas;
conveniência.
101. Conferência final

Antes de marcar como pronto, o sistema mostra:

Pedido #023

Cozinha:
✓ KÉF Baguette

Expedição:
✓ Refrigerante lata

[Marcar pedido pronto]
102. Evitar erro de entrega

Tela de pronto:

Pedido #023
Itens:
- KÉF Baguette
- Refrigerante lata

Confirmar entrega?
[ENTREGUE]
103. Painel para sócios Rodrigo e Matheus
Tela principal
SA’HI Gestão

Hoje
- Vendas: R$ 428,70
- Pedidos: 22
- Ticket médio: R$ 19,48
- CMV: 38%
- Perdas: R$ 8,40
- Tempo cozinha: 5m20s

Ações rápidas:
[Estoque]
[Produção]
[Pedidos]
[Relatórios]
104. Controle de colaboradores
Colaborador
Nome
Senha / QR / Tag
Desconto permitido
Limite diário
Histórico de compras
105. Limite de desconto colaborador

Para não virar prejuízo:

Cada colaborador:
até 1 refeição com desconto por dia

Ou:

Desconto apenas em horário específico
106. Gestão de preço

O sistema deve mostrar:

Preço atual: R$ 19,90
Custo atual: R$ 8,30
Margem: R$ 11,60
CMV: 41,7%

Sugestão:
Preço ideal para CMV 35%: R$ 23,70
107. Relatório de produto
KÉF Baguette

Vendidos hoje: 16
Faturamento: R$ 318,40
Custo estimado: R$ 132,80
Lucro bruto: R$ 185,60
Tempo médio: 4m30s
108. Relatório de hora
Vendas por horário

08h–09h: 3 pedidos
09h–10h: 5 pedidos
10h–11h: 2 pedidos
11h–12h: 8 pedidos
12h–13h: 14 pedidos

Isso ajuda a planejar produção.

109. Planejamento de produção por histórico

Depois de 7 dias, o sistema pode sugerir:

Segunda-feira:
Produzir 1,5 kg carne
Produzir 1 kg arroz
Separar 20 ovos
Comprar 15 baguetes
110. Estoque mínimo sugerido
Exemplo inicial
Item	Estoque mínimo
Carne pronta	800g
Arroz pronto	500g
Molho verde	300g
Ovos	12 un
Baguete	5 un
Pão artesano	1 pacote
Refrigerante	12 un
Água	12 un
111. Alertas inteligentes
Você vendeu 8 KÉF hoje.
Restam ingredientes para 4.
Comprar ou produzir mais?
112. Guia operacional de abertura
Antes de abrir
Ligar chapa.
Ligar totem.
Ligar KDS.
Conferir internet.
Conferir estoque de produção.
Liberar produtos no menu.
Conferir bebidas.
Abrir turno.
113. Guia operacional de pedido
Cliente compra
↓
Pedido entra no KDS
↓
Cozinheiro inicia
↓
Prepara
↓
Marca pronto
↓
Cliente retira
↓
Pedido entregue
114. Guia operacional de fechamento
Fechar venda no sistema.
Registrar perdas.
Registrar sobras.
Conferir estoque.
Limpar chapa.
Gerar relatório do dia.
Planejar compra do dia seguinte.
115. Telas necessárias do MVP
Totem
Home
Categorias
Produtos
Detalhe
Carrinho
Pagamento
Confirmação
KDS
Fila de pedidos
Detalhe do pedido
Prontos
Problemas
Gestão
Hoje
Pedidos
Produtos
Ficha técnica
Estoque
Compras
Produção
Perdas
Relatórios
116. Prioridade de desenvolvimento
Fase 1 — MVP funcional

Fazer primeiro:

Produtos
Totem
Pedido
Pagamento manual/simulado
KDS FIFO
Status do pedido
Tela de retirada
Fase 2 — Gestão básica

Depois:

Estoque simples
Ficha técnica
Baixa automática
Compras
Perdas
Relatório diário
Fase 3 — Gestão avançada

Depois:

Lotes
Validade
CMV real
Sugestão de produção
Desconto colaborador
Auditoria
BI
117. Regras de negócio essenciais
Pedido
pedido só vai para KDS após pagamento;
pedido recebe número sequencial;
pedido segue FIFO;
pedido pode ser cancelado antes de iniciar;
pedido iniciado só pode virar perda/estorno com permissão.
Estoque
produto de cozinha baixa por ficha técnica;
produto de conveniência baixa por unidade;
perda deve ter motivo;
compra aumenta estoque;
produção move estoque geral para estoque de produção;
validade deve priorizar FIFO.
KDS
ordem padrão por horário de pagamento;
pedidos atrasados mudam de cor;
cozinheiro só usa botões grandes;
pedido pronto vai para tela de retirada;
pedido entregue sai da tela.
118. Layout físico da cozinha com KDS
Ideal
ENTRADA / ESTOQUE
↓
PRÉ-PREPARO
↓
CHAPA
↓
MONTAGEM
↓
EXPEDIÇÃO
↓
BALCÃO
119. Onde colocar a tela KDS

A tela deve ficar:

visível da chapa;
longe de vapor direto;
em altura dos olhos;
com fonte grande;
fácil de tocar;
protegida de gordura.
Melhor opção

Tablet ou monitor na parede acima da área de montagem.

120. Tela de retirada

Pode ficar:

no balcão;
no próprio totem;
em monitor pequeno.

Texto:

PEDIDOS PRONTOS

023
024
025
121. Fluxo completo desenhado
CLIENTE
↓
Totem escolhe produto
↓
Carrinho
↓
Pagamento
↓
Pedido pago
↓
KDS recebe pedido
↓
FIFO cozinha
↓
Preparo
↓
Pronto
↓
Tela de retirada
↓
Entregue
↓
Relatório + estoque atualizado
122. O que isso cria para a SA’HI

Com esse sistema, a SA’HI deixa de ser apenas uma cozinha pequena e vira:

uma operação de food service automatizada

Com:

venda controlada;
produção rastreável;
estoque inteligente;
cozinha organizada;
pedido sem papel;
menos erro;
menos desperdício;
dados para crescer.
123. Nome interno do sistema

Sugestões:

SA’HI Flow

Sistema de operação da cozinha.

SA’HI KDS

Tela de cozinha.

SA’HI Gestão

Backoffice.

SA’HI Totem

Autoatendimento.

Minha recomendação:

SA’HI Flow

Porque une:

totem;
cozinha;
estoque;
gestão.
124. Resumo final
O sistema SA’HI precisa ter 4 telas centrais
1. Cliente

Totem de compra.

2. Cozinha

KDS FIFO.

3. Balcão

Pedidos prontos.

4. Gestão

Estoque, ficha técnica, vendas e relatórios.

125. Próximo passo técnico

O próximo passo é desenhar as telas:

Pacote de telas do SA’HI Flow
Totem Home
Totem Produtos
Totem Carrinho
KDS Cozinha
Tela de Retirada
Gestão Hoje
Estoque
Ficha Técnica
Produção
Relatório Diário

Essas 10 telas formam o MVP real.

agor a especifique alginguae que suamos reactnext e java springboot no back end

e banco de dados neon

jdbc:postgresql://ep-soft-mouse-apbpcb0n-pooler.c-7.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=npg_JCAHPe68hoGE&sslmode=require&channelBinding=require
Pensamento interrompido

Sim. A especificação técnica do SA’HI Flow pode ficar assim: frontend em React/Next.js, backend em Java Spring Boot e banco PostgreSQL hospedado no Neon.

Antes: você colou uma URL com usuário e senha reais do banco. Isso deve ser tratado como credencial exposta. Recomendo trocar/rotacionar essa senha no Neon e usar uma nova somente via variável de ambiente. Não coloque essa string direto no GitHub, README, print, Notion ou código.

Stack oficial do SA’HI Flow
Frontend
Next.js + React + TypeScript

Responsável por:

Totem de autoatendimento;
menu digital;
carrinho;
tela de pagamento;
tela de pedido confirmado;
painel de retirada;
KDS visual, se for web;
dashboard administrativo.
Backend
Java 21 + Spring Boot 3

Responsável por:

API REST;
autenticação;
pedidos;
produtos;
ficha técnica;
estoque;
KDS;
relatórios;
regras de negócio;
integração futura com pagamento;
baixa automática de estoque.
Banco de dados
PostgreSQL via Neon

Responsável por armazenar:

produtos;
categorias;
pedidos;
itens do pedido;
pagamentos;
fichas técnicas;
ingredientes;
movimentações de estoque;
compras;
perdas;
usuários;
permissões;
relatórios.
Arquitetura geral
[Totem Next.js]
      ↓ REST API
[Spring Boot API]
      ↓ JDBC/JPA
[Neon PostgreSQL]

[Spring Boot API]
      ↓ WebSocket/SSE
[KDS Cozinha]

[Spring Boot API]
      ↓ REST API
[Dashboard Gestão]
Separação correta
Next.js não acessa o banco diretamente

O fluxo correto é:

Next.js → Spring Boot → Neon PostgreSQL

Não faça:

Next.js → Neon PostgreSQL

Motivo:

evita expor senha do banco no frontend;
centraliza regra de negócio no backend;
melhora segurança;
facilita controle de estoque;
facilita auditoria;
facilita integração com pagamento/KDS.
Estrutura dos projetos
Opção recomendada
sahi-flow/
├── backend/
│   └── sahi-api/
│
├── frontend/
│   └── sahi-totem/
│
├── docs/
│   ├── ficha-tecnica.md
│   ├── arquitetura.md
│   └── cardapio.md
│
└── README.md
Backend — Spring Boot
Nome sugerido
sahi-api
Package base

Evite com.example.demo.

Use algo mais profissional:

br.com.sahi.flow

ou:

br.com.sahi.api

Minha recomendação:

br.com.sahi.flow
Dependências principais do backend

No Spring Initializr ou pom.xml, usar:

Spring Web
Spring Data JPA
PostgreSQL Driver
Spring Security
Validation
Lombok
Flyway Migration
Spring Boot DevTools

Opcional depois:

WebSocket
Actuator
Spring Mail
Testcontainers
pom.xml base
<dependencies>
    <!-- Web / REST API -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- JPA / Hibernate -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- PostgreSQL / Neon -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Validação -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Segurança / JWT futuro -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- Flyway para migrations -->
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
    </dependency>

    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-database-postgresql</artifactId>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- DevTools -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
</dependencies>
Configuração segura do Neon

Você colou esta URL:

jdbc:postgresql://ep-soft-mouse-apbpcb0n-pooler.c-7.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=...&sslmode=require&channelBinding=require

O ideal é não usar user e password dentro da URL.

Use assim:

DB_URL=jdbc:postgresql://ep-soft-mouse-apbpcb0n-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channelBinding=require
DB_USER=neondb_owner
DB_PASS=SUA_SENHA_NOVA_AQUI
application.properties

No backend:

spring.application.name=sahi-api

server.port=${PORT:8080}

# Database Neon/PostgreSQL
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.open-in-view=false

# Flyway
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration

# Timezone
spring.jackson.time-zone=America/Fortaleza

# CORS
app.frontend-origin=${FRONTEND_ORIGIN:http://localhost:3000}

# JWT futuro
app.jwt.secret=${JWT_SECRET:dev-secret-change-me}
app.jwt.expiration-ms=${JWT_EXPIRATION_MS:86400000}
.env local do backend

Arquivo:

backend/sahi-api/.env

Conteúdo:

PORT=8080

DB_URL=jdbc:postgresql://ep-soft-mouse-apbpcb0n-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channelBinding=require
DB_USER=neondb_owner
DB_PASS=SUA_SENHA_NOVA_AQUI

FRONTEND_ORIGIN=http://localhost:3000

JWT_SECRET=troque-esse-segredo-em-producao
JWT_EXPIRATION_MS=86400000
Importante: .gitignore

No backend, precisa ter:

.env
.env.*
!.env.example
target/

Crie também um .env.example sem senha real:

PORT=8080

DB_URL=jdbc:postgresql://SEU_HOST_NEON/neondb?sslmode=require&channelBinding=require
DB_USER=neondb_owner
DB_PASS=coloque_sua_senha_aqui

FRONTEND_ORIGIN=http://localhost:3000

JWT_SECRET=troque-esse-segredo
JWT_EXPIRATION_MS=86400000
Como rodar o backend no PowerShell

Na pasta do backend:

$env:PORT="8080"
$env:DB_URL="jdbc:postgresql://ep-soft-mouse-apbpcb0n-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channelBinding=require"
$env:DB_USER="neondb_owner"
$env:DB_PASS="SUA_SENHA_NOVA_AQUI"
$env:FRONTEND_ORIGIN="http://localhost:3000"
$env:JWT_SECRET="dev-secret-sahi"

mvn spring-boot:run
Teste simples de conexão

Crie um endpoint de teste:

package br.com.sahi.flow.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {

    @GetMapping("/api/ping")
    public String ping() {
        return "SA'HI API online";
    }
}

Teste no navegador:

http://localhost:8080/api/ping

Resposta esperada:

SA'HI API online
Estrutura de pacotes do backend
br.com.sahi.flow
├── SahiFlowApplication.java
│
├── config
│   ├── CorsConfig.java
│   └── SecurityConfig.java
│
├── product
│   ├── Product.java
│   ├── ProductController.java
│   ├── ProductService.java
│   ├── ProductRepository.java
│   └── dto
│
├── category
│   ├── Category.java
│   ├── CategoryController.java
│   ├── CategoryService.java
│   └── CategoryRepository.java
│
├── order
│   ├── Order.java
│   ├── OrderItem.java
│   ├── OrderController.java
│   ├── OrderService.java
│   └── OrderRepository.java
│
├── kitchen
│   ├── KitchenTicket.java
│   ├── KitchenController.java
│   └── KitchenService.java
│
├── stock
│   ├── Ingredient.java
│   ├── StockMovement.java
│   ├── StockController.java
│   ├── StockService.java
│   └── StockRepository.java
│
├── recipe
│   ├── Recipe.java
│   ├── RecipeItem.java
│   ├── RecipeController.java
│   └── RecipeService.java
│
├── purchase
│   ├── Purchase.java
│   ├── PurchaseItem.java
│   └── PurchaseService.java
│
├── loss
│   ├── LossRecord.java
│   └── LossService.java
│
├── report
│   ├── ReportController.java
│   └── ReportService.java
│
└── user
    ├── User.java
    ├── Role.java
    └── UserService.java
Frontend — Next.js
Nome sugerido
sahi-totem
Criar projeto
npx create-next-app@latest sahi-totem

Sugestão de respostas:

TypeScript: Yes
ESLint: Yes
Tailwind: Yes
App Router: Yes
src directory: Yes
Import alias: Yes
.env.local do frontend

Arquivo:

frontend/sahi-totem/.env.local

Conteúdo:

NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=SAHI Flow
NEXT_PUBLIC_ENV=development
Estrutura do frontend
src/
├── app/
│   ├── page.tsx
│   ├── menu/
│   │   └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── order-confirmed/
│   │   └── page.tsx
│   ├── kds/
│   │   └── page.tsx
│   ├── pickup/
│   │   └── page.tsx
│   └── admin/
│       └── page.tsx
│
├── components/
│   ├── ProductCard.tsx
│   ├── CategoryTabs.tsx
│   ├── CartSummary.tsx
│   ├── KdsOrderCard.tsx
│   └── AdminSidebar.tsx
│
├── lib/
│   ├── api.ts
│   └── money.ts
│
└── types/
    ├── product.ts
    ├── order.ts
    └── stock.ts
Cliente HTTP no Next.js

Arquivo:

src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return response.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar dados para API");
  }

  return response.json();
}
CORS no Spring Boot

Arquivo:

config/CorsConfig.java
package br.com.sahi.flow.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Value("${app.frontend-origin}")
    private String frontendOrigin;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(frontendOrigin)
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
Security temporário para desenvolvimento

Como o MVP precisa andar rápido, no começo pode liberar /api/**.

package br.com.sahi.flow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll()
                        .anyRequest().permitAll()
                )
                .build();
    }
}

Depois, entra JWT para painel administrativo.

Migrations com Flyway

Estrutura:

src/main/resources/db/migration/
└── V1__init_schema.sql
V1__init_schema.sql inicial
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    category_id UUID REFERENCES categories(id),
    name VARCHAR(160) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    preparation_time_minutes INTEGER,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    has_recipe BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    order_number INTEGER NOT NULL,
    status VARCHAR(40) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    discount NUMERIC(10,2) NOT NULL DEFAULT 0,
    total NUMERIC(10,2) NOT NULL,
    customer_type VARCHAR(40) NOT NULL DEFAULT 'PUBLIC',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    paid_at TIMESTAMP,
    started_at TIMESTAMP,
    ready_at TIMESTAMP,
    delivered_at TIMESTAMP,
    cancelled_at TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id),
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    notes TEXT
);

CREATE TABLE ingredients (
    id UUID PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    current_stock NUMERIC(12,3) NOT NULL DEFAULT 0,
    minimum_stock NUMERIC(12,3) NOT NULL DEFAULT 0,
    average_cost NUMERIC(10,4) NOT NULL DEFAULT 0,
    expiration_control BOOLEAN NOT NULL DEFAULT FALSE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE recipes (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id),
    version INTEGER NOT NULL DEFAULT 1,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE recipe_items (
    id UUID PRIMARY KEY,
    recipe_id UUID NOT NULL REFERENCES recipes(id),
    ingredient_id UUID NOT NULL REFERENCES ingredients(id),
    quantity NUMERIC(12,3) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    loss_percentage NUMERIC(5,2) NOT NULL DEFAULT 0
);

CREATE TABLE stock_movements (
    id UUID PRIMARY KEY,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id),
    movement_type VARCHAR(40) NOT NULL,
    quantity NUMERIC(12,3) NOT NULL,
    reason VARCHAR(120),
    order_id UUID REFERENCES orders(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE kitchen_tickets (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id),
    status VARCHAR(40) NOT NULL,
    priority INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    started_at TIMESTAMP,
    finished_at TIMESTAMP,
    delivered_at TIMESTAMP
);
Entidades principais
Product
package br.com.sahi.flow.product;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    private UUID id;

    @Column(nullable = false, length = 160)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    private String imageUrl;

    private Integer preparationTimeMinutes;

    @Column(nullable = false)
    private Boolean active;

    @Column(nullable = false)
    private Boolean hasRecipe;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (active == null) active = true;
        if (hasRecipe == null) hasRecipe = true;
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
Order
package br.com.sahi.flow.order;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private UUID id;

    @Column(nullable = false)
    private Integer orderNumber;

    @Column(nullable = false, length = 40)
    private String status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal discount;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(nullable = false, length = 40)
    private String customerType;

    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
    private LocalDateTime startedAt;
    private LocalDateTime readyAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime cancelledAt;

    @PrePersist
    public void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (status == null) status = "CREATED";
        if (discount == null) discount = BigDecimal.ZERO;
        if (customerType == null) customerType = "PUBLIC";
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
Endpoints principais
Produtos
GET    /api/products
GET    /api/products/active
POST   /api/products
PUT    /api/products/{id}
PATCH  /api/products/{id}/activate
PATCH  /api/products/{id}/pause
Pedidos
POST   /api/orders
GET    /api/orders
GET    /api/orders/{id}
PATCH  /api/orders/{id}/pay
PATCH  /api/orders/{id}/cancel
KDS
GET    /api/kds/orders
PATCH  /api/kds/orders/{id}/start
PATCH  /api/kds/orders/{id}/ready
PATCH  /api/kds/orders/{id}/delivered
PATCH  /api/kds/orders/{id}/problem
Estoque
GET    /api/stock
POST   /api/stock/movements
POST   /api/stock/purchases
POST   /api/stock/losses
GET    /api/stock/critical
Ficha técnica
GET    /api/recipes
GET    /api/recipes/product/{productId}
POST   /api/recipes
PUT    /api/recipes/{id}
Relatórios
GET    /api/reports/today
GET    /api/reports/products
GET    /api/reports/stock
GET    /api/reports/losses
Fluxo técnico do pedido
1. Cliente compra no Totem

Frontend envia:

POST /api/orders

Body:

{
  "items": [
    {
      "productId": "uuid-do-produto",
      "quantity": 1,
      "notes": "sem cebola"
    }
  ],
  "customerType": "PUBLIC"
}
2. Backend cria pedido

Status inicial:

CREATED
3. Pagamento confirmado
PATCH /api/orders/{id}/pay

Backend muda status:

PAID

E cria ticket no KDS:

WAITING
4. Pedido aparece no KDS
GET /api/kds/orders

Ordenado por:

created_at ASC

Isso garante FIFO.

5. Cozinheiro inicia
PATCH /api/kds/orders/{id}/start

Status:

IN_PREPARATION
6. Cozinheiro finaliza
PATCH /api/kds/orders/{id}/ready

Status:

READY
7. Pedido entregue
PATCH /api/kds/orders/{id}/delivered

Status:

DELIVERED
Status padronizados
Pedido
public enum OrderStatus {
    CREATED,
    WAITING_PAYMENT,
    PAID,
    SENT_TO_KITCHEN,
    IN_PREPARATION,
    READY,
    DELIVERED,
    CANCELLED,
    REFUNDED
}
KDS
public enum KitchenTicketStatus {
    WAITING,
    IN_PREPARATION,
    READY,
    DELIVERED,
    PROBLEM
}
Estoque
public enum StockMovementType {
    PURCHASE,
    SALE,
    LOSS,
    INTERNAL_CONSUMPTION,
    GIFT,
    ADJUSTMENT,
    PRODUCTION
}
Regra de baixa de estoque

Para o SA’HI, recomendo:

Baixar estoque quando o pedido for marcado como PAID e enviado para o KDS.

Fluxo:

Pedido pago
↓
Cria KDS ticket
↓
Baixa ingredientes pela ficha técnica
↓
Atualiza capacidade de venda

Se cancelar:

Cancelamento autorizado
↓
Estorna estoque

Se virar perda:

Problema na produção
↓
Mantém baixa
↓
Registra perda
WebSocket ou polling?
MVP simples

Use polling:

KDS consulta /api/kds/orders a cada 5 segundos

Mais simples para começar.

Versão melhor

Use WebSocket ou Server-Sent Events:

Pedido pago → backend envia evento → KDS atualiza na hora

Minha recomendação:

MVP: polling
Fase 2: WebSocket
Portas locais

Sugestão:

Frontend Next.js: http://localhost:3000
Backend Spring Boot: http://localhost:8080
Neon PostgreSQL: remoto
Scripts úteis
Backend
cd backend/sahi-api
mvn spring-boot:run
Frontend
cd frontend/sahi-totem
npm run dev
Deploy sugerido
Frontend
Vercel
Backend
Render, Railway, Fly.io ou VPS
Banco
Neon PostgreSQL
Variáveis de ambiente em produção
Backend
PORT=8080
DB_URL=jdbc:postgresql://ep-soft-mouse-apbpcb0n-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channelBinding=require
DB_USER=neondb_owner
DB_PASS=SENHA_ROTACIONADA
FRONTEND_ORIGIN=https://sahi.com.br
JWT_SECRET=segredo-forte-de-producao
JWT_EXPIRATION_MS=86400000
Frontend
NEXT_PUBLIC_API_URL=https://api.sahi.com.br
NEXT_PUBLIC_APP_NAME=SAHI Flow
NEXT_PUBLIC_ENV=production
Especificação formal para documentação

Você pode colocar assim no documento:

## Stack Técnica

O SA’HI Flow será desenvolvido com arquitetura web moderna separando frontend, backend e banco de dados.

### Frontend

O frontend será desenvolvido em React com Next.js e TypeScript, responsável pelas interfaces do totem de autoatendimento, cardápio digital, carrinho, confirmação de pedido, painel de retirada, KDS e dashboard administrativo.

### Backend

O backend será desenvolvido em Java 21 com Spring Boot 3, expondo uma API REST responsável pelas regras de negócio, pedidos, produtos, ficha técnica, controle de estoque, KDS, relatórios e integrações futuras de pagamento.

### Banco de Dados

O banco de dados será PostgreSQL hospedado no Neon, acessado exclusivamente pelo backend Spring Boot via JDBC/JPA. O frontend não acessa diretamente o banco, garantindo maior segurança e centralização das regras de negócio.

### Comunicação

A comunicação entre frontend e backend será feita via API REST. Para o KDS, o MVP poderá utilizar atualização periódica via polling, evoluindo posteriormente para WebSocket ou Server-Sent Events para atualização em tempo real.

### Segurança

Credenciais de banco, JWT e configurações sensíveis serão armazenadas em variáveis de ambiente. Nenhuma senha ou connection string sensível deverá ser versionada no repositório.
Checklist técnico imediato
Agora
Rotacionar a senha do Neon, porque foi exposta.
Criar repositório sahi-flow.
Criar projeto backend/sahi-api.
Criar projeto frontend/sahi-totem.
Configurar .env no backend.
Configurar .env.local no frontend.
Criar endpoint /api/ping.
Testar conexão Spring Boot → Neon.
Criar migrations Flyway.
Criar CRUD inicial de produtos.
Criar fluxo de pedido.
Criar tela KDS FIFO.
Resumo da stack
SA’HI Flow

Frontend:
- Next.js
- React
- TypeScript
- TailwindCSS

Backend:
- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Hibernate
- Flyway
- Spring Security

Banco:
- Neon PostgreSQL
- JDBC
- SSL obrigatório

Comunicação:
- REST API
- Polling no MVP
- WebSocket/SSE depois

Deploy:
- Vercel para frontend
- Render/Railway/VPS para backend
- Neon para banco


A arquitetura ideal para o SA’HI Flow deve ser simples no começo, mas já preparada para crescer. Como você quer totem + cardápio digital + KDS + estoque + ficha técnica + gestão, eu faria assim:

1. Arquitetura geral do SA’HI Flow
[Totem / Menu Digital - Next.js]
        ↓ HTTP/JSON
[API Backend - Java Spring Boot]
        ↓ JPA/Hibernate
[Neon PostgreSQL]

[API Backend]
        ↓ polling ou WebSocket
[KDS - Tela da Cozinha]

[API Backend]
        ↓
[Painel Administrativo]

[API Backend]
        ↓
[Controle de Estoque / Ficha Técnica / Relatórios]
Regra principal

O frontend nunca acessa o banco direto.

Sempre:

Next.js → Spring Boot → Neon PostgreSQL

Isso evita vazamento de senha, organiza regra de negócio e deixa o sistema mais profissional.

2. Módulos principais do sistema
2.1 Totem de autoatendimento

Responsável por:

exibir cardápio;
mostrar categorias;
montar carrinho;
permitir observações;
confirmar pedido;
enviar pedido para pagamento;
mostrar número do pedido;
liberar fluxo para cozinha.

Telas principais:

/menu
/product/[id]
/cart
/checkout
/order-confirmed
2.2 KDS — Kitchen Display System

A tela da cozinha deve funcionar como uma fila FIFO.

Pedido mais antigo aparece primeiro.

Status do pedido no KDS:

AGUARDANDO
EM_PREPARO
PRONTO
ENTREGUE
PROBLEMA
CANCELADO

Fluxo:

Pedido pago
↓
Entra no KDS
↓
Cozinheiro inicia
↓
Cozinheiro marca como pronto
↓
Pedido aparece para retirada
↓
Pedido é entregue
2.3 Gestão de produtos

Controla o cardápio.

Cada produto deve ter:

nome
descrição
preço
categoria
imagem
tempo médio de preparo
status ativo/inativo
tipo: sanduíche, bebida, conveniência, acompanhamento

Exemplo:

SA’HI Baguette
Categoria: Sanduíches
Preço: R$ XX,XX
Tempo: 8 min
Ativo: sim
2.4 Ficha técnica

A ficha técnica é o coração do controle.

Cada produto vendido precisa saber quais ingredientes consome.

Exemplo:

Produto: SA’HI Baguette Carne

Ingredientes:
- 1/2 baguete
- 120g carne
- 30g queijo
- 20g alface
- 20g tomate
- 15g molho
- 1 papel manteiga

Quando vende 1 unidade, o sistema baixa esses itens do estoque.

2.5 Estoque

Controle mínimo necessário:

ingrediente
unidade de medida
estoque atual
estoque mínimo
custo médio
validade
lote
status

Tipos de movimentação:

ENTRADA_COMPRA
SAIDA_VENDA
PERDA
AJUSTE
BRINDE
CONSUMO_INTERNO
PRODUCAO

Exemplo:

Venda de 1 SA’HI Baguette
↓
baixa 1/2 baguete
↓
baixa carne
↓
baixa queijo
↓
baixa embalagem
2.6 Painel administrativo

Responsável por:

cadastrar produtos;
alterar preços;
pausar item esgotado;
ver pedidos;
ver estoque;
ver perdas;
ver relatório diário;
cadastrar ficha técnica;
controlar CMV;
acompanhar operação.

Rotas:

/admin/dashboard
/admin/products
/admin/orders
/admin/kds
/admin/stock
/admin/recipes
/admin/reports
3. Arquitetura backend em camadas

No Spring Boot, use uma arquitetura limpa, mas sem exagerar.

Estrutura recomendada:

br.com.sahi.flow
├── config
├── shared
├── product
├── category
├── order
├── kitchen
├── stock
├── recipe
├── payment
├── report
└── user

Dentro de cada módulo:

product
├── Product.java
├── ProductRepository.java
├── ProductService.java
├── ProductController.java
├── dto
│   ├── ProductRequest.java
│   └── ProductResponse.java
└── mapper
    └── ProductMapper.java
4. Padrão correto de fluxo no backend
Controller

Recebe requisição HTTP.

Não coloca regra de negócio pesada aqui.

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    private final ProductService productService;

    @GetMapping
    public List<ProductResponse> list() {
        return productService.listActiveProducts();
    }
}
Service

Onde fica a regra de negócio.

@Service
public class ProductService {

    public List<ProductResponse> listActiveProducts() {
        return productRepository.findByActiveTrue()
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }
}
Repository

Acesso ao banco.

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByActiveTrue();
}
Entity

Representa tabela do banco.

@Entity
@Table(name = "products")
public class Product {
    @Id
    private UUID id;

    private String name;
    private BigDecimal price;
    private Boolean active;
}
5. Fluxo completo de pedido
5.1 Cliente escolhe no totem
Cliente seleciona sanduíche
↓
adiciona bebida ou item de conveniência
↓
confirma carrinho
↓
vai para pagamento
5.2 Frontend envia pedido
POST /api/orders

Exemplo:

{
  "items": [
    {
      "productId": "uuid-produto-1",
      "quantity": 1,
      "notes": "sem cebola"
    },
    {
      "productId": "uuid-produto-2",
      "quantity": 1
    }
  ]
}
5.3 Backend valida

O backend deve validar:

produto existe?
produto está ativo?
tem estoque suficiente?
preço está correto?
quantidade é válida?
5.4 Pedido é criado

Status inicial:

CREATED

Depois:

WAITING_PAYMENT
5.5 Pagamento aprovado

Status:

PAID

Ações automáticas:

criar ticket no KDS
baixar estoque pela ficha técnica
gerar número do pedido
enviar atualização para cozinha
5.6 Cozinha recebe

Status no KDS:

WAITING

Depois:

IN_PREPARATION
READY
DELIVERED
6. Banco de dados — modelo principal
Tabelas essenciais
categories
products
orders
order_items
ingredients
recipes
recipe_items
stock_movements
kitchen_tickets
users
payments
Relações principais
category 1 → N products

product 1 → 1 recipe

recipe 1 → N recipe_items

ingredient 1 → N recipe_items

order 1 → N order_items

order 1 → 1 kitchen_ticket

ingredient 1 → N stock_movements
7. Entidades centrais
Product
id
category_id
name
description
price
image_url
preparation_time_minutes
active
has_recipe
created_at
updated_at
Order
id
order_number
status
subtotal
discount
total
customer_type
created_at
paid_at
started_at
ready_at
delivered_at
cancelled_at
OrderItem
id
order_id
product_id
quantity
unit_price
notes
Ingredient
id
name
unit
current_stock
minimum_stock
average_cost
expiration_control
active
created_at
Recipe
id
product_id
version
active
created_at
RecipeItem
id
recipe_id
ingredient_id
quantity
unit
loss_percentage
StockMovement
id
ingredient_id
movement_type
quantity
reason
order_id
created_at
KitchenTicket
id
order_id
status
priority
created_at
started_at
finished_at
delivered_at
8. Estratégia para estoque
Estoque deve baixar quando?

Recomendado:

Baixar estoque quando o pagamento for aprovado.

Não baixe estoque só quando o cliente adiciona ao carrinho.

Motivo:

carrinho pode ser abandonado;
evita baixa falsa;
reduz erro operacional.
E se o pedido for cancelado?

Se cancelou antes de preparar:

estorna estoque

Se cancelou depois de preparar:

registra perda
E pão que sobrou?

Você já definiu uma boa regra:

Pão endurecido ou sobra vira torradinha de acompanhamento/brinde.

No sistema, isso entra como:

Movimentação: PRODUCAO ou REAPROVEITAMENTO

Exemplo:

Ingrediente: pão de forma
Saída: 300g
Motivo: produção de torradinhas

Ou:

Ingrediente: torradinha
Entrada: 20 porções
Origem: reaproveitamento
9. KDS — regra de fila FIFO

Consulta base:

SELECT *
FROM kitchen_tickets
WHERE status IN ('WAITING', 'IN_PREPARATION')
ORDER BY created_at ASC;

Na tela:

Pedido #001 — 21:10 — aguardando
Pedido #002 — 21:13 — aguardando
Pedido #003 — 21:15 — em preparo
Cores sugeridas no KDS
Aguardando: cinza
Em preparo: amarelo
Pronto: verde
Problema: vermelho
Atrasado: laranja
Tempo limite

Exemplo:

Sanduíche: 8 a 12 min
Bebida: imediato
Conveniência: imediato

Se passar do tempo:

marcar como atrasado
10. Frontend — organização no Next.js

Estrutura recomendada:

src/
├── app
│   ├── page.tsx
│   ├── menu
│   ├── cart
│   ├── checkout
│   ├── order-confirmed
│   ├── kds
│   ├── pickup
│   └── admin
│
├── components
│   ├── ProductCard.tsx
│   ├── CartButton.tsx
│   ├── CartSummary.tsx
│   ├── KdsOrderCard.tsx
│   ├── CategoryTabs.tsx
│   └── AdminTable.tsx
│
├── lib
│   ├── api.ts
│   ├── money.ts
│   └── date.ts
│
├── types
│   ├── product.ts
│   ├── order.ts
│   └── stock.ts
│
└── hooks
    ├── useCart.ts
    ├── useProducts.ts
    └── useKds.ts
11. Boas práticas no frontend
11.1 Não misturar regra de negócio pesada na tela

Evite:

export default function Page() {
  // regra de preço
  // regra de estoque
  // regra de pedido
  // regra de pagamento
}

Prefira:

Page → Componentes → Hooks → API
11.2 Criar tipos claros
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
  categoryName: string;
};
11.3 Criar função para dinheiro
export function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

Nunca espalhe toFixed(2) por todo o projeto.

11.4 Carrinho local

No MVP:

carrinho no estado do frontend

Depois:

carrinho persistido por sessão

Para totem, pode usar:

localStorage temporário

Mas sempre limpar após pedido confirmado.

11.5 Botões grandes no totem

Como é autoatendimento, a interface precisa ser:

botão grande
texto claro
poucas etapas
sem tela poluída
sem formulário longo

Regra boa:

máximo 3 toques até adicionar produto
máximo 5 toques até fechar pedido
12. Boas práticas no backend
12.1 Controller limpo

Controller só deve:

receber request
validar entrada
chamar service
retornar response

Não deve:

calcular estoque
calcular CMV
baixar ingrediente
criar regra de pedido
12.2 Service com regra de negócio

Exemplo:

@Transactional
public OrderResponse createOrder(CreateOrderRequest request) {
    validateProducts(request);
    validateStock(request);
    Order order = buildOrder(request);
    orderRepository.save(order);
    return mapper.toResponse(order);
}
12.3 Usar @Transactional

Sempre que alterar mais de uma tabela:

@Transactional
public void confirmPayment(UUID orderId) {
    Order order = findOrder(orderId);
    order.markAsPaid();

    stockService.decreaseStock(order);
    kitchenService.createTicket(order);

    orderRepository.save(order);
}

Isso garante:

ou tudo salva
ou nada salva

Evita pedido pago sem KDS ou estoque baixado pela metade.

12.4 Não usar double para dinheiro

Errado:

private double price;

Certo:

private BigDecimal price;

Dinheiro sempre com BigDecimal.

12.5 Usar DTOs

Não retorne Entity direto no Controller.

Evite:

@GetMapping
public List<Product> list() {
    return productRepository.findAll();
}

Prefira:

@GetMapping
public List<ProductResponse> list() {
    return productService.list();
}

Motivo:

protege campos internos;
evita vazamento de estrutura do banco;
facilita evolução da API.
12.6 Validação com Bean Validation
public record ProductRequest(
    @NotBlank String name,
    @NotNull @DecimalMin("0.01") BigDecimal price,
    @NotNull UUID categoryId
) {}
12.7 Tratamento global de erro

Crie um GlobalExceptionHandler.

Exemplo de resposta padronizada:

{
  "timestamp": "2026-05-17T22:10:00",
  "status": 400,
  "error": "Produto indisponível",
  "path": "/api/orders"
}

Não deixe erro feio do Java aparecer para o usuário.

13. Segurança
13.1 Nunca expor senha no código

Credenciais devem ficar em:

.env
variáveis do Render
variáveis da Vercel
variáveis do sistema

Nunca:

GitHub
README
print
código fonte
application.properties com senha real
13.2 JWT para admin

O totem pode operar com sessão controlada, mas o painel admin precisa de login.

Perfis:

ADMIN
COZINHA
CAIXA
ESTOQUE
GERENTE

Permissões:

ADMIN: tudo
COZINHA: ver e atualizar KDS
ESTOQUE: controlar estoque
CAIXA: pedidos e pagamentos
GERENTE: relatórios e produtos
13.3 CORS restrito

Em produção, não use:

.allowedOrigins("*")

Use:

https://sahi.com.br
https://totem.sahi.com.br
https://admin.sahi.com.br
14. Observabilidade

Mesmo no MVP, coloque:

Logs
pedido criado
pagamento aprovado
estoque baixado
ticket enviado para KDS
pedido pronto
erro de estoque
erro de pagamento
Health check
GET /actuator/health
Métricas importantes
pedidos por dia
tempo médio de preparo
produtos mais vendidos
itens em estoque crítico
perdas
cancelamentos
ticket médio
CMV
15. Deploy recomendado
Desenvolvimento local
Next.js: localhost:3000
Spring Boot: localhost:8080
Neon: remoto
Produção simples
Frontend: Vercel
Backend: Render ou Railway
Banco: Neon
Produção mais robusta depois
Frontend: Vercel ou Cloudflare Pages
Backend: AWS ECS/Fargate
Banco: Neon ou RDS PostgreSQL
Arquivos: S3/CloudFront
Fila: SQS ou RabbitMQ
16. Padrão de branches
main
develop
feature/menu-digital
feature/kds
feature/estoque
feature/ficha-tecnica
fix/order-status

Regra:

main = produção
develop = homologação/desenvolvimento
feature/* = novas funções
fix/* = correções
17. Padrão de commits

Use commits claros:

feat: add product catalog endpoint
feat: create kitchen ticket after payment
fix: prevent inactive product order
refactor: move stock logic to service
chore: configure neon datasource
docs: add architecture overview

Evite:

ajustes
teste
final
agora vai
correção
18. Boas práticas de banco
Use migrations

Use Flyway:

V1__init_schema.sql
V2__add_products.sql
V3__add_kitchen_tickets.sql
V4__add_stock_movements.sql

Não dependa de:

spring.jpa.hibernate.ddl-auto=update

Em produção, use:

spring.jpa.hibernate.ddl-auto=validate
Índices importantes

Criar índice para:

orders.status
orders.created_at
kitchen_tickets.status
kitchen_tickets.created_at
products.active
stock_movements.ingredient_id

Exemplo:

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_kitchen_status_created ON kitchen_tickets(status, created_at);
19. Regras críticas do sistema
Pedido não pode ser criado com produto inativo
Se produto ativo = false → bloquear venda
Pedido não pode ir para KDS sem pagamento
Sem pagamento aprovado → não aparece na cozinha
Produto com ficha técnica deve baixar estoque
Produto vendido → consulta receita → baixa ingredientes
Produto de conveniência pode baixar unidade direta

Exemplo:

Coca-Cola lata
↓
baixa 1 unidade do estoque
Item sem estoque deve sair do cardápio
estoque insuficiente → produto indisponível no totem
20. MVP técnico recomendado

Não tente fazer tudo de uma vez.

Fase 1 — Base
Produtos
Categorias
Cardápio
Carrinho
Pedido
KDS simples
Fase 2 — Estoque
Ingredientes
Ficha técnica
Baixa automática
Estoque mínimo
Perdas
Fase 3 — Gestão
Dashboard
Relatórios
CMV
Produtos mais vendidos
Controle por período
Fase 4 — Pagamento
Pix
Cartão
TEF
comprovante
integração fiscal futura
Fase 5 — Operação avançada
WebSocket no KDS
multiunidade
controle por usuário
auditoria
relatórios avançados
21. Arquitetura resumida profissional
SA’HI Flow é uma plataforma de autoatendimento para alimentação rápida e conveniência, composta por frontend Next.js, backend Java Spring Boot e banco PostgreSQL Neon.

O frontend opera as interfaces de totem, cardápio digital, carrinho, checkout, KDS e painel administrativo. O backend concentra as regras de negócio, controle de pedidos, produtos, ficha técnica, estoque, cozinha, pagamentos e relatórios. O banco PostgreSQL armazena os dados operacionais com rastreabilidade de pedidos, movimentações de estoque e status de produção.

A comunicação entre frontend e backend ocorre por API REST. O KDS utiliza fila FIFO, inicialmente com polling e evolução futura para WebSocket. O estoque é baixado automaticamente após confirmação de pagamento, usando a ficha técnica de cada produto.
22. Checklist de boas práticas
Código
usar TypeScript no frontend
usar Java 21 no backend
usar DTOs
usar Services
usar Repositories
usar @Transactional
usar BigDecimal para dinheiro
usar UUID como id
usar validação com @Valid
usar tratamento global de erro
não retornar Entity direto
não colocar regra de negócio no Controller
Banco
usar Flyway
usar índices
usar constraints
usar status padronizado
não usar ddl-auto update em produção
não salvar senha no código
API
rotas claras
respostas padronizadas
erros padronizados
versionamento futuro /api/v1
paginação em listas grandes
filtros por status e data
Segurança
JWT no admin
CORS restrito
senha em env
logs sem dados sensíveis
perfis de usuário
auditoria de ações críticas
Operação
health check
logs de pedido
logs de pagamento
logs de estoque
relatório diário
backup do banco
monitoramento de erro
23. Melhor decisão para agora

Para ser rápido e responsável, eu faria nesta ordem:

1. Criar backend Spring Boot limpo
2. Conectar no Neon com env vars
3. Criar Product + Category
4. Criar Order + OrderItem
5. Criar KDS simples
6. Criar frontend do menu
7. Criar carrinho
8. Criar tela da cozinha
9. Criar Ingredient + Recipe
10. Criar baixa de estoque

Essa ordem evita travar no complexo antes de ter o produto funcionando. Primeiro vende e aparece na cozinha. Depois controla estoque e gestão.


Complemento obrigatório do SA’HI Flow: pedido por QR Code no celular

Além do totem físico, o sistema precisa ter um fluxo mobile via QR Code, para o cliente pedir direto do celular durante a sessão, sem precisar levantar e ir até o totem.

A ideia é:

Totem para autoatendimento principal + QR Code para pedido rápido durante a permanência no local.

1. Como funciona para o cliente
Fluxo simples
Cliente vê um QR Code no balcão, mesa, parede, ficha ou display.
Escaneia com a câmera do celular.
Abre um menu digital responsivo, sem precisar instalar aplicativo.
Escolhe sanduíche, bebida ou item de conveniência.
Confirma o pedido.
Recebe uma tela com:
número do pedido;
status;
tempo estimado;
forma de retirada;
botão para acompanhar pedido.
2. Por que isso é importante

O cliente pode estar:

tatuando;
esperando atendimento;
sentado;
em uma sessão longa;
sem querer ir até o balcão;
com pressa;
querendo pedir mais uma bebida;
querendo repetir pedido.

Então o QR Code vira uma extensão do totem.

Frase de conceito

Peça do seu lugar. O SA’HI prepara. Você só acompanha.

3. Diferença entre Totem e QR Code
Canal	Uso principal
Totem físico	Compra principal, autoatendimento completo, experiência visual forte
QR Code no celular	Pedido rápido durante a sessão, recompra, bebida, conveniência
KDS cozinha	Recebe todos os pedidos em fila FIFO
Painel admin	Gestão de produtos, estoque, pedidos e relatórios
4. Tela mobile via QR Code
Tela 1 — Abertura

SA’HI
Comida com afeto

Texto:

Você está no SA’HI.
Escolha seu pedido e acompanhe tudo pelo celular.

Botões:

Ver cardápio
Acompanhar pedido
Chamar atendimento
Tela 2 — Identificação rápida

Campos:

Nome do cliente
Local / sessão / mesa / balcão
Observação opcional

Exemplo:

Nome: Rodrigo
Local: Sessão 02
Observação: entregar quando estiver pronto

Importante: não precisa cadastro completo no MVP.

Tela 3 — Menu digital

Categorias:

Sanduíches
Bebidas
Conveniência
Combos
Mais pedidos

Cards grandes:

SA’HI Baguette Carne
R$ 24,90
Pão baguete, carne, queijo, salada e molho especial.
[Adicionar]
Pão com Ovo SA’HI
R$ 13,90
Pão de forma artesano, ovo, queijo e toque da casa.
[Adicionar]
Brasa Árabe Bowl
R$ 22,90
Espeto, arroz temperado e acompanhamento.
[Adicionar]
Tela 4 — Carrinho

Resumo:

Produto
Quantidade
Adicionais
Observação
Total

Botões:

Continuar comprando
Enviar pedido
Limpar carrinho
Tela 5 — Confirmação do pedido

Após enviar:

Pedido recebido

Número: #1027
Status: Na fila
Tempo estimado: 15–20 min

Você pode acompanhar por esta tela.

Botões:

Acompanhar pedido
Fazer novo pedido
Voltar ao menu
5. Acompanhamento do pedido no celular

O cliente precisa ter uma resposta clara do pedido dele.

Status possíveis
Status	Texto para cliente
Recebido	Seu pedido entrou na fila
Em preparo	A cozinha começou seu pedido
Pronto	Seu pedido está pronto para retirada
Entregue	Pedido finalizado
Tela de acompanhamento
Pedido #1027

Status atual:
EM PREPARO

Itens:
1x SA’HI Baguette Carne
1x Coca-Cola Lata

Tempo estimado:
12 min

Local:
Sessão 02
6. Como isso entra no KDS da cozinha

Todo pedido, seja do totem ou do QR Code, cai na mesma fila da cozinha.

Regra

Pedido feito pelo QR Code deve entrar no KDS igual pedido feito no totem.

No KDS aparece:

#1027 — QR MOBILE
Cliente: Rodrigo
Local: Sessão 02
Entrada: 21:14

1x SA’HI Baguette Carne
- Sem cebola
- Molho separado

Status: Na fila
[Iniciar preparo]
7. Regra FIFO

A cozinha trabalha por ordem de chegada.

Prioridade padrão
Pedido pago ou confirmado
Pedido mais antigo
Pedido com maior tempo de espera
Pedido sinalizado como urgente pelo admin

Status no KDS:

Na fila
Em preparo
Pronto
Entregue
Cancelado
8. Pagamento no MVP

Como é consumo interno, dá para começar simples.

Opção inicial recomendada
Pedido via QR Code com pagamento no balcão

Fluxo:

Cliente pede pelo celular.
Cozinha recebe.
Pedido fica como Aguardando confirmação ou Confirmado.
Cliente paga no caixa/balcão.
Admin marca como pago/finalizado.
Evolução futura

Depois pode adicionar:

Pix QR Code;
pagamento no próprio celular;
integração com TEF;
carteira interna;
conta por sessão;
fechamento no final.
9. Modelo de dados necessário
Tabela qr_sessions

Representa uma sessão aberta pelo QR Code.

Campos:

id
session_code
customer_name
location_label
status
created_at
expires_at

Exemplo:

session_code: SAHI-SESSAO-02-20260517
customer_name: Rodrigo
location_label: Sessão 02
status: ACTIVE
Tabela orders

Pedido principal.

id
order_number
channel
customer_name
location_label
status
payment_status
total_amount
created_at
updated_at

Exemplo:

channel: QR_MOBILE
status: QUEUED
payment_status: PENDING_COUNTER
Tabela order_items

Itens do pedido.

id
order_id
product_id
product_name
quantity
unit_price
notes
Tabela order_status_history

Histórico do pedido.

id
order_id
old_status
new_status
changed_by
created_at

Isso ajuda em auditoria e controle.

10. Endpoints principais no Spring Boot
QR Code / sessão
POST /api/qr/session
GET /api/qr/session/{sessionCode}
Menu mobile
GET /api/menu/categories
GET /api/menu/products
GET /api/menu/products/{id}
Pedido
POST /api/orders
GET /api/orders/{orderNumber}
PATCH /api/orders/{id}/status
KDS
GET /api/kds/orders
PATCH /api/kds/orders/{id}/start
PATCH /api/kds/orders/{id}/ready
PATCH /api/kds/orders/{id}/delivered
11. Canais de pedido

No banco e no painel, todo pedido precisa ter origem.

TOTEM
QR_MOBILE
ADMIN
BALCAO

Assim o relatório mostra:

Origem	Uso
TOTEM	Pedido feito no autoatendimento
QR_MOBILE	Pedido feito pelo celular
ADMIN	Pedido lançado manualmente
BALCAO	Pedido direto no caixa
12. QR Code fixo ou dinâmico
QR Code fixo

Bom para começar.

Exemplo:

/sahi/menu?location=sessao-01
/sahi/menu?location=balcao
/sahi/menu?location=mesa-02

Vantagens:

barato;
simples;
imprime e cola;
não depende de gerar QR novo.
QR Code dinâmico

Melhor para controle avançado.

Exemplo:

/sahi/session/8F7K2

Vantagens:

expira;
vincula cliente;
evita pedido duplicado;
melhor para conta por sessão.
Recomendação

Para MVP:

Começar com QR Code fixo por local/sessão.

Depois evoluir para sessão dinâmica.

13. Onde colocar o QR Code

Locais úteis:

balcão;
parede próxima à espera;
mesa de apoio;
ficha técnica impressa;
cardápio físico;
display acrílico;
adesivo no ambiente;
tela inicial do totem;
embalagem;
papel manteiga personalizado.

Texto ao lado:

Peça pelo celular
Escaneie o QR Code e acompanhe seu pedido.
14. Regras de UX mobile

O menu digital precisa ser:

vertical;
rápido;
com cards grandes;
botão de compra visível;
sem cadastro obrigatório;
com poucos passos;
com status claro;
com botão “fazer novo pedido”;
responsivo;
escuro/classic, alinhado ao SA’HI Flow.
Regra principal

O cliente não pode pensar muito.
Ele precisa escanear, escolher e enviar.

15. Fluxo completo atualizado
Cliente no local
↓
Escaneia QR Code
↓
Abre menu digital no celular
↓
Escolhe produto
↓
Envia pedido
↓
Pedido entra no backend
↓
Pedido aparece no KDS da cozinha
↓
Cozinheiro prepara em FIFO
↓
Status atualiza
↓
Cliente acompanha pelo celular
↓
Pedido fica pronto
↓
Cliente retira ou recebe no local
↓
Admin finaliza
↓
Estoque e relatório são atualizados
16. Telas que precisam entrar no mapa UI/UX

Além das telas do totem, adicionar estas telas mobile:

Bloco QR Mobile
QR Landing
apresentação rápida;
botão “ver cardápio”.
Identificação
nome;
local/sessão;
observação.
Menu Mobile
categorias;
produtos;
botão adicionar.
Carrinho Mobile
resumo;
quantidade;
observação;
enviar pedido.
Pedido Recebido
número;
status;
tempo estimado.
Acompanhamento
timeline do pedido;
status em tempo real.
Novo Pedido
repetir pedido;
voltar ao menu.
Erro / indisponível
cozinha fechada;
produto indisponível;
pedido não encontrado.
17. Requisito técnico resumido
Frontend
Next.js
React
PWA mobile
Tailwind ou CSS modular
layout mobile-first
cards responsivos
estado do carrinho no browser
polling inicial para status do pedido
Backend
Java Spring Boot
REST API
camada service
DTOs
validação
controle de status
integração com KDS
baixa de estoque
logs de auditoria
Banco
Neon PostgreSQL
tabelas de pedidos;
produtos;
categorias;
estoque;
sessões QR;
histórico de status.
18. Regras de negócio importantes
Pedido via QR Code
só pode pedir se a loja estiver aberta;
produto indisponível não aparece ou aparece bloqueado;
pedido precisa gerar número único;
pedido precisa cair no KDS;
cliente precisa conseguir acompanhar;
admin precisa conseguir cancelar;
cozinha precisa conseguir marcar como pronto;
estoque precisa baixar quando o pedido for confirmado;
relatório precisa separar origem QR e Totem.
19. Texto para colocar no projeto

Pode usar assim:

O SA’HI Flow contará com um módulo de pedido via QR Code, permitindo que o cliente acesse o menu digital diretamente pelo celular durante sua permanência no estabelecimento. Esse fluxo reduz a necessidade de deslocamento até o totem físico e melhora a experiência em sessões longas, espera ou consumo interno.

Ao escanear o QR Code, o cliente acessa um cardápio digital responsivo, escolhe seus produtos, envia o pedido e acompanha o status em tempo real. O pedido entra automaticamente na fila da cozinha/KDS, respeitando a ordem FIFO e permitindo que o cozinheiro visualize, prepare e finalize os pedidos pela tela operacional.

O sistema diferencia pedidos feitos pelo totem, pelo QR Code mobile, pelo balcão e pelo painel administrativo, permitindo controle de estoque, gestão de produção, relatórios por canal e acompanhamento completo da operação.
20. Resumo objetivo

O SA’HI não deve depender só do totem.

Precisa ter:

Totem para autoatendimento completo
QR Code para pedido pelo celular
Menu digital responsivo
Pedido com número e status
Acompanhamento mobile
KDS FIFO na cozinha
Gestão de estoque
Relatório por origem do pedido

Isso deixa o sistema mais forte, mais vendável e mais adequado ao consumo interno.

Sim. O leitor de código de barras deve entrar como recurso central do SA’HI Flow, principalmente para os produtos de conveniência: bebidas, doces, snacks, água, energéticos, itens embalados etc.

A lógica é:

Produto embalado não precisa ser procurado manualmente. Escaneou, apareceu no carrinho.

Módulo: Código de Barras no Totem
Objetivo

Permitir que o totem leia o código de barras de produtos físicos para:

vender produtos rapidamente;
cadastrar novos produtos;
consultar preço;
controlar estoque;
reduzir erro manual;
acelerar atendimento;
facilitar operação de loja de conveniência.
1. Fluxo de venda pelo código de barras
Como funciona no totem
Cliente pega um produto físico.
Passa no leitor de código de barras.
O sistema identifica o produto.
Produto aparece automaticamente no carrinho.
Cliente pode continuar comprando.
Finaliza o pedido no totem.
Exemplo
Cliente escaneia: 7894900011517

Sistema encontra:
Coca-Cola Lata 350ml
R$ 6,00

Produto adicionado ao carrinho.
2. Tela do totem com leitor

Na tela principal do totem, deve existir uma área clara:

Escaneie seu produto

Passe o código de barras no leitor
ou escolha pelo menu.

Quando o produto for lido:

Produto adicionado

Coca-Cola Lata 350ml
R$ 6,00

[Adicionar mais]
[Ver carrinho]

Se o produto não existir:

Produto não encontrado

Este código ainda não está cadastrado.

Chame um atendente
ou escolha outro produto.
3. Fluxo para produtos de conveniência

Esse módulo é ideal para:

refrigerante;
água;
suco;
energético;
chocolate;
biscoito;
bala;
chiclete;
salgadinho;
itens embalados;
produtos de balcão;
itens promocionais.

Não precisa ser usado para os pratos preparados, porque esses entram pelo menu visual.

4. Separação por tipo de produto
Tipo	Entrada no sistema
Sanduíches SA’HI	Menu visual
Brasa Árabe Bowl	Menu visual
Pão com ovo	Menu visual
Bebidas embaladas	Código de barras ou menu
Snacks	Código de barras ou menu
Conveniência	Código de barras
Combos	Menu visual
Produto avulso	Código de barras
5. Cadastro de produto por código de barras

Além de vender, o sistema deve permitir cadastrar produtos escaneando o código.

Fluxo admin
Admin entra no painel.
Clica em Novo Produto.
Escaneia o código de barras.
Sistema preenche o campo barcode.
Admin informa:
nome;
categoria;
preço de venda;
custo;
estoque inicial;
imagem opcional;
status ativo/inativo.
Tela exemplo
Novo produto

Código de barras:
7894900011517

Nome:
Coca-Cola Lata 350ml

Categoria:
Bebidas

Custo:
R$ 3,80

Preço de venda:
R$ 6,00

Estoque inicial:
24 unidades

[Salvar produto]
6. Cadastro rápido no balcão

Também pode existir um modo mais rápido:

Produto não cadastrado

Código: 7890000000000

Deseja cadastrar agora?

[Sim, cadastrar]
[Cancelar]

Ao clicar em cadastrar:

Nome do produto
Preço de venda
Categoria
Estoque inicial
Salvar

Esse fluxo é bom para operação real, porque às vezes chega produto novo e o operador precisa colocar rápido no sistema.

7. Consulta de produto

O leitor também pode servir para consulta interna.

Tela admin
Consultar produto

Escaneie o código de barras

Resultado:

Coca-Cola Lata 350ml

Preço: R$ 6,00
Custo: R$ 3,80
Estoque: 18 unidades
Margem: R$ 2,20
Status: Ativo
8. Controle de estoque com código de barras

Cada venda baixa automaticamente o estoque.

Exemplo

Produto:

Coca-Cola Lata 350ml
Estoque atual: 24

Cliente escaneia e compra 1 unidade.

Depois da venda:

Estoque atual: 23

Se o cliente compra 3:

Estoque atual: 21
9. Entrada de estoque por código de barras

O leitor também deve facilitar a reposição.

Fluxo
Admin entra em Estoque.
Clica em Entrada de produtos.
Escaneia o produto.
Informa quantidade recebida.
Sistema soma ao estoque.

Exemplo:

Produto: Coca-Cola Lata 350ml
Estoque atual: 8

Quantidade recebida:
24

Novo estoque:
32
10. Saída manual / perda

Também precisa controlar perda, consumo interno e ajuste.

Tipos de movimentação
Tipo	Exemplo
Venda	Cliente comprou
Entrada	Compra de estoque
Perda	Produto vencido, quebrado ou danificado
Consumo interno	Sócios/equipe consumiram
Ajuste	Correção manual
Brinde	Produto dado ao cliente
11. Modelo de dados
Tabela products

Adicionar campo de código de barras.

products
- id
- name
- description
- category_id
- barcode
- sku
- cost_price
- sale_price
- stock_quantity
- min_stock
- image_url
- product_type
- active
- created_at
- updated_at
Campos importantes
barcode: código lido pelo leitor
sku: código interno opcional
product_type: PREPARED_FOOD, BEVERAGE, CONVENIENCE
stock_quantity: estoque atual
min_stock: estoque mínimo
active: produto aparece ou não para venda
12. Tabela de movimentação de estoque
stock_movements
- id
- product_id
- movement_type
- quantity
- previous_stock
- new_stock
- reason
- order_id
- created_by
- created_at
Exemplos de movement_type
SALE
PURCHASE_ENTRY
LOSS
INTERNAL_USE
GIFT
MANUAL_ADJUSTMENT
13. Endpoint para buscar produto por código

No backend Spring Boot:

GET /api/products/barcode/{barcode}

Resposta:

{
  "id": 12,
  "name": "Coca-Cola Lata 350ml",
  "barcode": "7894900011517",
  "salePrice": 6.00,
  "stockQuantity": 24,
  "active": true
}
14. Endpoint para cadastrar produto com barcode
POST /api/admin/products

Payload:

{
  "name": "Coca-Cola Lata 350ml",
  "barcode": "7894900011517",
  "categoryId": 2,
  "costPrice": 3.80,
  "salePrice": 6.00,
  "stockQuantity": 24,
  "minStock": 5,
  "productType": "BEVERAGE",
  "active": true
}
15. Endpoint para entrada de estoque
POST /api/admin/stock/entry

Payload:

{
  "barcode": "7894900011517",
  "quantity": 24,
  "reason": "Compra inicial"
}
16. Endpoint para baixa manual
POST /api/admin/stock/out

Payload:

{
  "barcode": "7894900011517",
  "quantity": 2,
  "movementType": "LOSS",
  "reason": "Produto vencido"
}
17. Como o leitor funciona tecnicamente

A maioria dos leitores USB funciona como teclado.

Ou seja:

o leitor lê o código;
envia os números para o campo ativo;
geralmente envia um Enter no final;
o sistema captura o valor e busca o produto.
Exemplo no frontend

No totem, pode existir um input invisível ou focado:

Campo de leitura ativo:
[ aguardando código de barras... ]

Quando o leitor envia:

7894900011517 + Enter

O frontend chama:

GET /api/products/barcode/7894900011517

Se encontrar, adiciona ao carrinho.

18. Regra de UX no totem

A tela precisa deixar claro que o cliente pode fazer de dois jeitos:

Escolha seu pedido

[Ver cardápio SA’HI]

ou

Escaneie bebidas e produtos de conveniência
Exemplo de tela
SA’HI Flow

O que você quer pedir?

[Sanduíches]
[Bebidas]
[Conveniência]
[Combos]

Escaneie aqui seu produto embalado
19. Regras de erro
Produto não cadastrado
Produto não encontrado.
Chame um atendente.
Produto sem estoque
Produto indisponível no momento.
Produto inativo
Produto temporariamente indisponível.
Código inválido
Código não reconhecido.
Tente novamente.
20. Boas práticas
Para venda
Não deixar produto sem preço.
Não vender produto com estoque zerado.
Confirmar visualmente o produto escaneado.
Permitir remover item do carrinho.
Tocar som curto ao adicionar produto.
Exibir nome, preço e quantidade.
Para cadastro
Não permitir código de barras duplicado.
Validar se o barcode tem tamanho aceitável.
Permitir editar preço depois.
Registrar quem cadastrou.
Registrar data de criação.
Separar produto ativo/inativo.
Para estoque
Toda entrada e saída deve gerar histórico.
Nunca alterar estoque sem movimentação registrada.
Estoque negativo deve ser bloqueado no MVP.
Produto com estoque baixo deve aparecer no painel.
21. Integração com KDS

Produtos de conveniência não precisam ir para a cozinha.

Regra
Produto	Vai para KDS?
Sanduíche	Sim
Brasa Árabe Bowl	Sim
Pão com ovo	Sim
Bebida lata	Não
Água	Não
Chocolate	Não
Snack	Não
Combo com comida	Parcialmente
Produto de conveniência	Não

Se o pedido tiver comida + bebida:

KDS recebe apenas os itens de preparo.
Admin/caixa vê pedido completo.

Exemplo:

Pedido #1032

KDS:
1x SA’HI Baguette Carne

Pedido completo:
1x SA’HI Baguette Carne
1x Coca-Cola Lata
1x Chocolate
22. Impacto no sistema

Com leitor de código de barras, o SA’HI Flow vira mais que cardápio digital.

Ele passa a ser:

PDV de autoatendimento;
controle de estoque;
venda de conveniência;
cadastro rápido de produto;
sistema de cozinha;
painel de gestão.
23. Atualização da arquitetura
Módulos principais
Totem UI
Menu QR Mobile
Admin Web
KDS Cozinha
Backend Spring Boot
Neon PostgreSQL
Barcode Scanner
Estoque
Relatórios
Fluxo com barcode
Produto físico
↓
Leitor de código de barras
↓
Totem UI
↓
Consulta backend
↓
Produto encontrado
↓
Adiciona ao carrinho
↓
Finaliza pedido
↓
Baixa estoque
↓
Relatório de venda
24. Requisito para o mapa UI/UX

Adicionar novas telas:

Telas do módulo barcode
Tela de escaneamento no totem
Produto encontrado
Produto não encontrado
Produto sem estoque
Cadastro rápido por barcode
Entrada de estoque por barcode
Consulta de produto
Histórico de movimentação
25. Texto para documentação
O SA’HI Flow contará com suporte a leitor de código de barras no totem, permitindo que produtos embalados e itens de conveniência sejam vendidos de forma rápida e precisa. O cliente poderá escanear bebidas, snacks e produtos avulsos diretamente no totem, adicionando-os automaticamente ao carrinho.

O mesmo recurso também será utilizado no painel administrativo para cadastro rápido de produtos, consulta de preço, entrada de estoque, baixa manual e controle de movimentações. Dessa forma, o sistema reduz erros operacionais, acelera o atendimento e transforma o totem em um PDV completo para consumo interno.
26. Recomendação prática para o MVP

Para começar, implementar nesta ordem:

Fase 1 — Venda por barcode
Campo de leitura no totem.
Buscar produto pelo código.
Adicionar ao carrinho.
Bloquear produto sem estoque.
Baixar estoque na venda.
Fase 2 — Cadastro por barcode
Admin escaneia código.
Cadastra nome, preço, custo e estoque.
Produto fica disponível no totem.
Fase 3 — Estoque avançado
Entrada por barcode.
Perda.
Consumo interno.
Brinde.
Relatório de estoque.
Fase 4 — Relatórios
Produtos mais vendidos.
Estoque baixo.
Margem por produto.
Venda por canal.
Venda por categoria.
27. Resumo direto

Sim, faz muito sentido.

O leitor de código de barras deve ser usado para:

vender bebida e conveniência;
cadastrar produto rápido;
consultar preço;
dar entrada em estoque;
controlar saída;
reduzir erro;
acelerar o uso do totem.

Isso combina muito com a proposta do SA’HI:

comida preparada + conveniência + autoatendimento + gestão inteligente.
Módulo: Vendedor Inteligente SA’HI
Objetivo

Quando o cliente escolher um prato, o sistema deve analisar o carrinho e sugerir itens complementares:

bebida;
doce;
snack;
molho extra;
item de conveniência;
combo pronto;
produto com estoque alto;
produto com melhor margem.
1. Como o totem deve se comportar
Exemplo prático

Cliente adicionou:

1x KÉF Baguette

O sistema percebe que ele não colocou bebida.

Então aparece:

Quer completar seu pedido?

Adicione uma bebida gelada por mais R$ 6,00.

Opções:

Coca-Cola Lata
Água
Suco
Energético

Botões:

[Adicionar Coca-Cola]
[Ver bebidas]
[Não, obrigado]
2. Regra de venda inteligente

O sistema deve observar o carrinho.

Se não tiver bebida

Oferecer:

Seu sanduíche combina com uma bebida gelada.

Sugestões:

refrigerante;
água;
suco;
energético.
Se não tiver doce

Oferecer:

Finalize com um doce?

Sugestões:

chocolate;
bombom;
cookie;
bala;
doce embalado.
Se tiver só bebida

Oferecer comida:

Quer transformar em lanche?

Sugestões:

KÉF Baguette;
LEV Breakfast;
ZÁATAR Bowl.
Se tiver sanduíche + bebida

Oferecer doce ou snack:

Combo quase completo. Quer adicionar um doce?

Sugestões:

chocolate;
snack;
biscoito;
sobremesa simples.
Se tiver produto de preparo

Oferecer conveniência:

Enquanto seu pedido fica pronto, leve também um item rápido.

Sugestões:

água;
doce;
snack;
chiclete;
bala;
energético.
3. Onde aparecem as ofertas
1. Na tela do produto

Ao abrir o sanduíche:

Combina com:
+ Coca-Cola Lata
+ Água
+ Chocolate
2. Ao adicionar ao carrinho

Depois que o cliente clica em Adicionar:

Produto adicionado.

Quer completar?
[Adicionar bebida]
[Adicionar doce]
[Ir para carrinho]
3. No carrinho

Antes de finalizar:

Seu pedido ainda não tem bebida.
Adicionar uma agora?
4. No checkout

Última tentativa:

Antes de pagar, complete seu combo.
4. Combos inteligentes

Os combos não precisam ser produtos fixos no começo. Podem ser montados automaticamente.

Combo base
Sanduíche + bebida
Combo completo
Sanduíche + bebida + doce
Combo sessão
Sanduíche + bebida + snack
Combo rápido
Pão com ovo + café/suco + doce
5. Exemplos de combos SA’HI
Combo KÉF
KÉF Baguette
+ Refrigerante lata
+ Chocolate

Preço sugerido: R$ 29,90

Uso:

cliente com fome;
pedido principal;
ticket maior.
Combo ZÁATAR
ZÁATAR Bowl
+ Água ou suco
+ Doce pequeno

Preço sugerido: R$ 31,90

Uso:

refeição mais completa;
consumo interno;
cliente em sessão longa.
Combo LEV
LEV Breakfast
+ Suco
+ Snack doce

Preço sugerido: R$ 22,90

Uso:

café rápido;
lanche mais leve;
início de turno.
Combo Conveniência
Bebida
+ Doce
+ Snack

Uso:

cliente que não quer comida;
espera rápida;
compra por impulso.
6. Tela de sugestão no totem
Modelo visual
Complete seu pedido

Seu KÉF Baguette combina com:

[ Coca-Cola Lata ]
R$ 6,00
Adicionar

[ Chocolate ]
R$ 4,00
Adicionar

[ Água ]
R$ 3,50
Adicionar

[Não quero completar]
7. Linguagem do vendedor inteligente

O texto precisa ser curto, direto e comercial.

Frases boas
Quer completar seu pedido?
Esse lanche combina com uma bebida gelada.
Adicione um doce para fechar o combo.
Falta uma bebida no seu pedido.
Leve também um item de conveniência.
Monte seu combo SA’HI.
Enquanto seu pedido fica pronto, escolha algo rápido.
8. Evitar frases ruins

Evitar:

Você esqueceu a bebida.
Seu pedido está incompleto.
Tem certeza que não quer?
Compre mais.

Melhor usar:

Quer completar?
Combina com seu pedido.
Adicionar ao combo.
9. Regras de recomendação
Regra 1 — Produto principal

Se o carrinho tem comida preparada:

oferecer bebida + doce/snack
Regra 2 — Produto seco

Se o carrinho tem doce/snack:

oferecer bebida
Regra 3 — Produto gelado

Se o carrinho tem bebida:

oferecer sanduíche ou doce
Regra 4 — Estoque alto

Se um produto está com estoque alto:

priorizar como sugestão
Regra 5 — Margem alta

Se dois produtos combinam, mostrar primeiro o de maior margem.

Exemplo:

Chocolate margem alta > água margem baixa
Regra 6 — Produto indisponível

Nunca sugerir produto com estoque zerado.

Regra 7 — Limite de sugestão

Mostrar no máximo 3 sugestões por tela.

Mais que isso vira poluição visual.

10. Estratégia para aumentar ticket médio
Ticket atual

Exemplo:

KÉF Baguette — R$ 19,90
Com bebida
KÉF Baguette + Refri — R$ 25,90
Com bebida + doce
KÉF Baguette + Refri + Chocolate — R$ 29,90

A diferença é grande.

O totem deve tentar levar o cliente de:

R$ 19,90

para:

R$ 25,90 a R$ 31,90
11. Produtos de conveniência como complemento
Categorias recomendadas
Bebidas
água;
refrigerante lata;
suco;
energético.
Doces
chocolate;
bombom;
cookie;
bala;
chiclete.
Snacks
biscoito;
salgadinho pequeno;
castanhas;
amendoim;
barra de cereal.
Extras SA’HI
molho extra;
maionese verde;
vinagrete;
torradinha de pão reaproveitado;
alho frito extra.
12. Produto preparado + conveniência

Essa é a lógica correta do combo:

Produto feito na cozinha
+
Produto pronto da conveniência

Exemplo:

KÉF Baguette
+ Coca-Cola Lata
+ Chocolate

A cozinha só prepara o sanduíche.

A conveniência é retirada junto ou entregue no balcão.

13. Como aparece no KDS

O KDS não precisa receber bebida e doce, a não ser que precise de preparo.

Pedido completo
Pedido #1041

1x KÉF Baguette
1x Coca-Cola Lata
1x Chocolate
KDS da cozinha recebe
Pedido #1041

1x KÉF Baguette
- Sem cebola
- Molho à parte
Painel admin/caixa vê
Pedido completo:
1x KÉF Baguette
1x Coca-Cola Lata
1x Chocolate
14. Modelo de dados para recomendação
Tabela product_recommendations
product_recommendations
- id
- trigger_product_id
- recommended_product_id
- recommendation_type
- priority
- active
- created_at
Exemplo
trigger_product: KÉF Baguette
recommended_product: Coca-Cola Lata
type: DRINK_PAIRING
priority: 1
15. Tipos de recomendação
DRINK_PAIRING
SWEET_PAIRING
SNACK_PAIRING
EXTRA_SAUCE
COMBO_UPSELL
HIGH_MARGIN
HIGH_STOCK
SESSION_ITEM
16. Recomendação por categoria

Além de produto por produto, dá para recomendar por categoria.

Exemplo

Se o cliente adicionou qualquer sanduíche:

recomendar categoria BEBIDAS

Se adicionou bebida:

recomendar categoria DOCES

Se adicionou bowl:

recomendar categoria BEBIDAS + EXTRAS
17. Endpoint de recomendação
Backend Spring Boot
POST /api/recommendations/cart

Payload:

{
  "items": [
    {
      "productId": 1,
      "quantity": 1
    }
  ]
}

Resposta:

{
  "title": "Quer completar seu pedido?",
  "message": "Seu KÉF Baguette combina com uma bebida gelada.",
  "recommendations": [
    {
      "productId": 12,
      "name": "Coca-Cola Lata",
      "price": 6.00,
      "reason": "Bebida mais escolhida com sanduíche"
    },
    {
      "productId": 18,
      "name": "Chocolate",
      "price": 4.00,
      "reason": "Doce para fechar o combo"
    }
  ]
}
18. Regra simples para o MVP

Não precisa começar com IA real.

Comece com regras fixas.

Exemplo de regra
SE carrinho contém sanduíche
E carrinho não contém bebida
ENTÃO oferecer bebida
SE carrinho contém sanduíche + bebida
E carrinho não contém doce
ENTÃO oferecer doce
SE carrinho contém bebida
E carrinho não contém comida
ENTÃO oferecer sanduíche

Isso já resolve 80% do problema.

19. Pseudológica
if cart.hasPreparedFood() and !cart.hasDrink():
    suggest(drinks)

if cart.hasPreparedFood() and !cart.hasSweet():
    suggest(sweets)

if cart.hasDrink() and !cart.hasPreparedFood():
    suggest(preparedFoods)

if cart.total < targetTicket:
    suggest(highMarginItems)

if product.stock <= 0:
    doNotSuggest(product)
20. Meta de ticket médio

Definir uma meta para o totem.

Exemplo
Ticket mínimo desejado: R$ 25,00
Ticket ideal: R$ 30,00

Se o carrinho estiver abaixo de R$ 25,00:

mostrar sugestão forte

Se estiver acima de R$ 30,00:

mostrar sugestão leve ou nenhuma
21. Telas novas no mapa UI/UX

Adicionar telas:

1. Produto adicionado
Produto adicionado ao carrinho.
Quer completar?
2. Sugestão de bebida
Falta uma bebida?
3. Sugestão de doce
Finalize com um doce.
4. Monte seu combo
Transforme em combo SA’HI.
5. Checkout com oferta final
Última chance de completar seu pedido.
6. Admin de recomendações
Escolha quais produtos aparecem como sugestão.
22. Painel admin de recomendações

O admin precisa conseguir configurar isso sem mexer no código.

Tela
Recomendações inteligentes

Quando cliente comprar:
[ KÉF Baguette ]

Oferecer:
[ Coca-Cola Lata ]
[ Chocolate ]
[ Água ]

Prioridade:
1, 2, 3

Status:
Ativo
23. Regras para combos no admin
Combo manual

Admin cria:

KÉF Combo
KÉF Baguette + Coca-Cola + Chocolate
R$ 29,90
Combo automático

Sistema monta:

Sanduíche + bebida + doce

com base no carrinho.

24. Como vender isso no conceito do produto

O SA’HI Flow deve ser apresentado assim:

O totem não apenas recebe pedidos. Ele atua como um vendedor inteligente, sugerindo bebidas, doces, snacks e itens de conveniência que combinam com o pedido principal. Isso aumenta o ticket médio, melhora a experiência do cliente e ajuda a girar produtos de estoque.
25. Versão curta para documentação
O SA’HI Flow contará com um módulo de venda inteligente, capaz de analisar o carrinho do cliente e sugerir complementos relevantes, como bebidas, doces, snacks e itens de conveniência. Quando o cliente adiciona um sanduíche ou prato preparado, o sistema pode oferecer uma bebida, um doce ou um item adicional para formar um combo.

As sugestões serão exibidas no totem e no menu digital mobile, respeitando estoque disponível, margem, categoria do produto e regras configuradas pelo administrador. Dessa forma, o sistema atua como um vendedor digital, aumentando o ticket médio e facilitando a compra de produtos complementares.
26. Prioridade de implementação
Fase 1 — Regras simples
Se tem sanduíche, oferecer bebida.
Se tem sanduíche + bebida, oferecer doce.
Se tem bebida, oferecer comida.
Não sugerir produto sem estoque.
Fase 2 — Combos
Criar combos fixos.
Criar preço promocional.
Exibir “economize R$ X”.
Fase 3 — Admin
Configurar recomendações.
Ativar/desativar sugestão.
Priorizar produto.
Fase 4 — Inteligência
Sugerir por histórico de venda.
Sugerir por margem.
Sugerir por estoque alto.
Sugerir por horário.
27. Recomendação final

Para o MVP, faça assim:

Tela principal
Sanduíches grandes.
Bebidas visíveis.
Conveniência visível.
Após adicionar sanduíche

Mostrar:

Quer completar com bebida?
Após adicionar bebida

Mostrar:

Quer fechar com um doce?
No checkout

Mostrar:

Monte seu combo SA’HI antes de finalizar.


