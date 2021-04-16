import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class BookMigration1618322151670 implements MigrationInterface {
  private readonly tableName = 'books'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            generationStrategy: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true, true, true)
  }
}
