import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDateType1631134172075 implements MigrationInterface {
    name = "ChangeDateType1631134172075"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"eventDays\" DROP COLUMN \"date\"");
      await queryRunner.query("ALTER TABLE \"eventDays\" ADD \"date\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"eventDays\" DROP COLUMN \"date\"");
      await queryRunner.query("ALTER TABLE \"eventDays\" ADD \"date\" TIMESTAMP NOT NULL");
    }
}
