import { MigrationInterface, QueryRunner } from "typeorm";

export class fixContact1679883283323 implements MigrationInterface {
    name = 'fixContact1679883283323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "UQ_eff09bb429f175523787f46003b"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "UQ_f9f62556c7092913f2a06975052"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "UQ_f9f62556c7092913f2a06975052" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email")`);
    }

}
