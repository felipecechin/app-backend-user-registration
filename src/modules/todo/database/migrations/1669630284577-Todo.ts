import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Todo1669630284577 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'todos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'startedAt',
                        type: 'datetime',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'workTime',
                        type: 'int',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'done',
                        type: 'boolean',
                        default: false,
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('todos')
    }
}
