import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeActivityLocationRelation1631107600662 implements MigrationInterface {
    name = "ChangeActivityLocationRelation1631107600662"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_ccbdc1483777a919b1d78d07f60\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"REL_ccbdc1483777a919b1d78d07f6\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_74b92be5924b9fb1d808b4ffcd4\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_74b92be5924b9fb1d808b4ffcd4\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"REL_ccbdc1483777a919b1d78d07f6\" UNIQUE (\"locationId\")");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_ccbdc1483777a919b1d78d07f60\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
