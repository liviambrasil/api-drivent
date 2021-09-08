import { MigrationInterface, QueryRunner } from "typeorm";

export class addMiddlteTableActivityUsers1631110461620 implements MigrationInterface {
    name = "addMiddlteTableActivityUsers1631110461620"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" DROP CONSTRAINT \"FK_73bbb98e63729202fb95d386399\"");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" DROP CONSTRAINT \"FK_6a961861d183d919ddaf648b6f4\"");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" ADD CONSTRAINT \"FK_6a961861d183d919ddaf648b6f4\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" ADD CONSTRAINT \"FK_73bbb98e63729202fb95d386399\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" DROP CONSTRAINT \"FK_73bbb98e63729202fb95d386399\"");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" DROP CONSTRAINT \"FK_6a961861d183d919ddaf648b6f4\"");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" ADD CONSTRAINT \"FK_6a961861d183d919ddaf648b6f4\" FOREIGN KEY (\"userId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" ADD CONSTRAINT \"FK_73bbb98e63729202fb95d386399\" FOREIGN KEY (\"activityId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
