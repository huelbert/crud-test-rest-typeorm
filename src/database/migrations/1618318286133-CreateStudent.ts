import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class StudentMigration1618318286133 implements MigrationInterface {
  private readonly tableName = 'students'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false
          },
          {
            name: 'phone',
            type: 'text',
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students', true, true, true)
  }
}
