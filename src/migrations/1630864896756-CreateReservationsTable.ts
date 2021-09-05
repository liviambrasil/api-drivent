import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReservationsTable1630864896756 implements MigrationInterface {
    name = "CreateReservationsTable1630864896756"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"reservations\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"roomId\" integer NOT NULL, CONSTRAINT \"REL_aa0e1cc2c4f54da32bf8282154\" UNIQUE (\"userId\"), CONSTRAINT \"PK_da95cef71b617ac35dc5bcda243\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\"");
      await queryRunner.query("DROP TABLE \"reservations\"");
    }
}
