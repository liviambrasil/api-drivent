import { MigrationInterface, QueryRunner } from "typeorm";

export class userRelation1630690317552 implements MigrationInterface {
    name = "userRelation1630690317552"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"ticket\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"isPresential\" boolean NOT NULL, \"isHotel\" boolean NOT NULL, \"isPaid\" boolean NOT NULL, CONSTRAINT \"REL_0e01a7c92f008418bad6bad591\" UNIQUE (\"userId\"), CONSTRAINT \"PK_d9a0835407701eb86f874474b7c\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"ticket\" ADD CONSTRAINT \"FK_0e01a7c92f008418bad6bad5919\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"ticket\" DROP CONSTRAINT \"FK_0e01a7c92f008418bad6bad5919\"");
      await queryRunner.query("DROP TABLE \"ticket\"");
    }
}
