# Decisões do Projeto

A IA foi utilizada como apoio na correção de bugs e na estruturação do app.

## Estrutura
- Components: componentes que complementam as telas. Foram separados para que o pin, o menu de categorias e o resumo do projeto possam ser reutilizados e as telas não fiquem enormes.
- Constants: utilizado para as categorias dos pins. Ficam em um único arquivo porque o menu, o pin no mapa e a tela de Detalhe leem os mesmos dados, então adicionar uma categoria exige mudar só um lugar.
- Screens: as telas principais (Login, Cadastro, Home e Detalhe).
- Services: acesso aos dados e validações. Foram separados das telas para que a tela cuide só da interface e, se o armazenamento for trocado por uma API, só os services precisem mudar.

## Armazenamento
Foi utilizado o AsyncStorage para guardar contas, sessão, pins e comentários no próprio aparelho. A escolha foi feita porque o app precisava funcionar no celular sem depender de um servidor, e o AsyncStorage permite testar o fluxo completo e manter os dados ao reabrir o app. A consequência é que os dados não são compartilhados entre usuários. Futuramente, contas, pins e comentários podem ser guardados em um banco de dados por meio de uma API, e os pins de alagamento podem receber leituras de sensores IoT.

## Cadastro
Antes de salvar a conta, o programa verifica se o usuário tem no mínimo 3 caracteres, se a senha tem no mínimo 6 e se a confirmação é igual à senha. Quando há erro, a mensagem aparece na tela, junto ao campo. As validações ficam no `validacao.ts`, em funções que só recebem valores e devolvem a mensagem, para serem fáceis de reaproveitar e testar.

O usuário e a senha são salvos em um JSON no AsyncStorage, na chave `account` (em `authService.ts`). Em seguida, o nome do usuário é guardado na chave `session` e o app vai para a Home com `navigation.reset`, em vez de `navigate`, para que o botão voltar não leve de volta ao Login.

Limitação: a senha é guardada em texto, sem hash. Isso é aceitável apenas no protótipo, em produção, a autenticação passaria por uma API, com a senha protegida por hash.

## Login
O login compara o usuário e a senha digitados com os guardados na chave `account`. Se estiverem errados, ou se não houver conta, uma mensagem aparece na tela. Quando estão corretos, a sessão é salva e o app usa `navigation.reset` para ir à Home, como no cadastro.

## Home
Ao abrir, o app pede permissão para obter a localização do usuário (recurso nativo) e centralizar o mapa. A localização foi escolhida porque o problema do app é geográfico: o mapa já abre onde o cidadão está. Enquanto a posição é obtida, aparece um indicador de carregamento, se a permissão for negada, uma mensagem de erro é exibida em vez de o app travar.

O app carrega o nome do usuário (chave `session`) e os pontos salvos. Para criar um ponto, o usuário aperta o botão, que ativa o modo marcar, e toca no mapa, o que cria um pin temporário. O modo precisa ser ativado antes para que um toque acidental ao navegar não crie pontos sem querer, e o pin temporário mostra o local escolhido antes da decisão. Em seguida, abre um menu para escolher a categoria (guardadas em `categorias.ts`) ou descartar. Ao escolher, o ponto vai para `pontosSalvos`, é salvo no aparelho e aparece no mapa.

Foi definido um limite de afastamento (zoom out) no mapa, para não exibir muitos pins de uma vez e manter o desempenho, sem precisar de uma solução mais complexa de agrupamento.

Ao tocar no avatar, abre um menu com o nome do usuário, o "Sobre o projeto" e o botão de sair. Ao sair, os dados da chave `session` são apagados e o app volta para o Login.

## Detalhe
Ao tocar em um pin, abre a tela com a categoria, a prioridade e a lista de comentários. A lista tem três estados (carregando, erro e vazio), para que o usuário sempre saiba o que está acontecendo, em vez de ver uma tela em branco. O formulário de comentário é validado e os comentários são salvos por ponto.