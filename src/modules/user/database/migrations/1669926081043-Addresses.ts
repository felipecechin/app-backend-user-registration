import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Address1669926081043 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'addresses',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                    },
                    {
                        name: 'zip',
                        type: 'varchar',
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                    },
                    {
                        name: 'number',
                        type: 'int',
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUser',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('addresses')
    }
}
