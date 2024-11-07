
## Instalação

A aplicação segue o conceito de Atomic Design, priorizando componentes reutilizáveis e bem definidos.

## Configuração

Para instalar as dependencias utilize:

`npm install`

Para iniciar o projeto utilize:

`npm run dev`

A aplicação deve iniciar na porta 3000

## Utilização

### Dashboard:

`/dashboard`

No Dashboard é possivel acessar os dados de transações, adicionar dinheiro a carteira e realizar ou reverter transações.

### Login

* **Rota** : `/login`
* **Descrição** : Na página de Login, os usuários podem inserir suas credenciais (e-mail e senha) para acessar sua conta. O formulário de login inclui validação em tempo real para garantir que os dados sejam preenchidos corretamente. Ao efetuar login com sucesso, os usuários são redirecionados para a página principal do Dashboard.

### Registro

* **Rota** : `/register`
* **Descrição** : Na página de Registro, novos usuários podem criar uma conta fornecendo informações necessárias, como nome, e-mail e senha. O formulário de registro também inclui validação para garantir que todos os campos sejam preenchidos corretamente e que a senha atenda aos critérios de segurança. Após o registro bem-sucedido, os usuários serão redirecionados para a página de Login, onde poderão acessar sua nova conta.

## Tecnologias Utilizadas

* **Next.js** : Framework React para aplicações web, com renderização do lado do servidor e geração de sites estáticos.
* **React** : Biblioteca para construção da interface do usuário.
* **Tailwind** : Estilização.
* **Shadcn**: Componentes rapidos com tailwind.
* **TypeScript** : Superset de JavaScript que adiciona tipagem estática, melhorando a robustez do código.
