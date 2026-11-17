# Zela

> Zeladoria colaborativa do bairro: o morador marca no mapa os problemas da rua, escolhe a categoria e acompanha com comentários.

**Global Solution 2026.2 · CitizenTech · Engenharia de Software · FIAP**

---
## Sobre o Zela

O **Zela** é uma plataforma de zeladoria colaborativa que ajuda moradores a
identificar, registrar e acompanhar problemas do espaço público no próprio bairro,
como buracos, lixo acumulado, alagamentos, falta de iluminação e calçadas sem
acessibilidade.

Hoje, quem vê um problema na rua muitas vezes não sabe onde reportá-lo, e o que
é reportado raramente é acompanhado. O Zela transforma o celular em um canal
simples: o morador marca o local exato no mapa, escolhe a categoria do problema
e os vizinhos podem abrir o ponto e comentar, deixando o problema visível e
documentado.

Pensado para o cidadão comum, o app tem poucas telas, linguagem simples e
categorias com ícones e cores que indicam a prioridade de cada tipo de problema.
A proposta é aproximar a população do cuidado com a cidade, apoiando os
**ODS 11 (Cidades e comunidades sustentáveis)** e **ODS 10 (Redução das
desigualdades)**.


## Equipe

| Nome | RM |
|---|---|
| Erik Kaiyu Suguiyama | 559273 |
| Guilherme Vital | 560073 |
| Kayque Carvalho | 561189 |

> Os mesmos nomes e RM estão no array `authors` do `package.json`.

---

## Funcionalidades

- **Identificação:** cadastro e login com validação de campos; a sessão é lembrada ao reabrir o app.
- **Mapa:** localização atual do usuário (recurso nativo) com tratamento da permissão negada e estado de carregamento.
- **Marcar ponto:** toque no mapa abre um menu com 7 categorias (buracos, alagamentos, trânsito, lixo, iluminação, acessibilidade, riscos e segurança), cada uma com ícone, cor e prioridade.
- **Persistência:** os pontos ficam salvos no aparelho e voltam ao reabrir o app.
- **Detalhe do ponto:** categoria, prioridade e lista de comentários com estados de carregando, erro e vazio.
- **Comentários:** formulário validado, salvo por ponto.
- **Sobre o projeto:** mini menu sobre o mapa que resume o problema, a solução e os ODS.

## Telas

| Tela | Descrição |
|---|---|
| `LoginScreen` | Entrada com usuário e senha |
| `CadastroScreen` | Criação de conta com validação por campo |
| `HomeScreen` | Mapa, pins, menu do avatar e botão "Marcar ponto" |
| `DetalheScreen` | Informações do ponto e comentários |

## Recurso nativo

**Localização** (`expo-location`): a permissão em primeiro plano é solicitada ao abrir a Home. Se for negada, o app mostra uma mensagem de erro em vez de quebrar.

---

## Tecnologias

- React Native + Expo (Expo Go), **TypeScript em modo estrito**
- React Navigation (native stack)
- `react-native-maps` e `expo-location`
- `@react-native-async-storage/async-storage`
- `@expo/vector-icons`
- `react-native-safe-area-context`

## Como rodar

**Pré-requisitos:** Node.js LTS, app **Expo Go** no celular (Android ou iOS), celular e computador na mesma rede Wi-Fi.

```bash
# 1. instalar dependências
npm install

# 2. iniciar o servidor
npx expo start

# 3. escanear o QR Code com o Expo Go
```

Se algo não atualizar, limpe o cache com `npx expo start -c`.

**Verificação de tipos:**

```bash
npx tsc --noEmit
```

Resultado esperado: sem nenhuma saída (zero erros).

**Observação (Android):** o `react-native-maps` pode exigir uma chave da API do Google Maps em builds próprias. No Expo Go o mapa funciona sem configuração adicional.

---

## Organização do projeto

```
src/
  components/
    PontoMarker.tsx        pin customizado por categoria
    PontoMenu.tsx          menu de escolha da categoria
    SobreProjetoModal.tsx  resumo do projeto sobre o mapa
  constants/
    categorias.ts          dados das 7 categorias
  screens/
    LoginScreen.tsx
    CadastroScreen.tsx
    HomeScreen.tsx
    DetalheScreen.tsx
  services/
    authService.ts         conta e sessão
    pontosService.ts       leitura e gravação dos pontos
    comentariosService.ts  leitura e gravação dos comentários
    validacao.ts           funções puras de validação
  types.ts                 tipos de modelos e rotas
```

**Camada `services/`:** as telas não acessam o `AsyncStorage` diretamente; toda leitura, gravação e validação passa pelos services. Isso deixa a validação testável (funções puras) e facilita trocar o armazenamento local por uma API.

As decisões de arquitetura estão em [`DECISOES.md`](./DECISOES.md).

---

## Dados e privacidade

- Nenhum dado pessoal real é utilizado; contas, pontos e comentários de demonstração são **simulados**.
- Os dados ficam **apenas no aparelho** (AsyncStorage).
- Limitação conhecida: a senha é guardada em texto no armazenamento local, aceitável para o protótipo, mas **não** para produção. Em produção, a autenticação deve ser feita por um backend, com hash de senha e token armazenado em `expo-secure-store`.

## Limitações e próximos passos

- Os dados não são compartilhados entre usuários; integração com a API/banco de dados (disciplina de SOA) permitiria isso.
- Existe apenas uma conta por aparelho.
- Marcar o problema como "resolvido" ainda não persiste a mudança.
- Sugestões futuras: foto do problema pela câmera, filtro por categoria, lista de pontos do bairro, notificações de atualização.

## Registro de uso de IA

A IA foi utilizada na correção de bugs e auxilio na construção do APP.