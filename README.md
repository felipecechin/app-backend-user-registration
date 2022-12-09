## Aplicação Cadastro de Usuário (Back-end)

A aplicação back-end foi construída utilizando as seguintes tecnologias:
- Node;
- Express;
- Typescript;
- TypeORM.

Foi utilizado o banco de dados MySQL como forma de armazenamento dos dados. Versão do MySQL utilizada: 5.7.36.

A aplicação front-end está disponível no link: https://github.com/felipecechin/app-frontend-user-registration.

### Para rodar a aplicação:

Depois de clonar o repositório e com o Node v16+, NPM e Yarn corretamente instalados, faça os seguintes passos:

1. Criar `.env` de acordo com o arquivo `.env.example` e definir a `SECRET_KEY` e os parâmetros de conexão com MySQL;
2. Criar banco de dados no MySQL, conforme a variável `MYSQL_DATABASE` definida no `.env`, e deixar o MySQL ativo;
3. Executar comando `yarn` para instalar dependências;
4. Executar comando `yarn typeorm migration:run -d src/config/database.ts` para rodar as `migrations`;
5. Executar comando `yarn start:dev` para rodar a aplicação.
    - Deve aparecer as mensagens `Server is running on port 3333` e `Connected to database` no console.