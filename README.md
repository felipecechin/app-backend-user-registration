## Repositório modelo
Este repositório serve como template para criação de aplicações back-end utilizando as seguintes tecnologias:
- Node + Express;
- Typescript;
- TypeORM com MySQL.

O repositório já inclui:
- ESLint e regras;
- Prettier;
- Ambiente dev e ambiente de produção;
- Dois módulos de exemplo:
    - Todo (pasta `src/modules/todo`): CRUD de tarefas;
    - User (pasta `src/modules/user`): Autenticação, registro e busca de usuários.
        - Inclui autenticação JWT e middleware para proteção de rotas (pasta `src/shared/middlewares/ensureAuthenticated.ts`);
        - Inclui rota para realizar RefreshToken.

### Pontos a serem melhorados:
- [ ] Adicionar testes unitários;
- [ ] Adicionar testes de integração;
- [ ] Adicionar Swagger;