import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class ReservationMigration1618323047503 implements MigrationInterface {
  private readonly tableName = 'reservations'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reservations',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            generationStrategy: 'uuid',
            isPrimary: true
          },
          {
            name: 'student_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'book_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'reservation_date',
            type: 'date',
            isNullable: false
          },
          {
            name: 'return_date',
            type: 'date',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        name: 'fk_request_student_id'
      })
    )

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        name: 'fk_request_book_id'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'fk_request_student_id')
    await queryRunner.dropForeignKey(this.tableName, 'fk_request_book_id')
    await queryRunner.dropTable('reservations', true, true, true)
  }
}
