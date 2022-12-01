# Comandos

O comando ``yarn typeorm migration:create .\src\modules\todo\database\migrations\Todo``:
  - Cria uma migration na pasta ``src/modules/todo/database/migrations`` com o nome ``Todo``.

O comando ``yarn typeorm migration:run -d .\src\config\database.ts``:
  - Executa as migrations criadas.