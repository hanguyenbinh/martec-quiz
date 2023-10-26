import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMedia1698316565326 implements MigrationInterface {
    name = 'AddMedia1698316565326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "creationId" character varying NOT NULL, "containerId" character varying NOT NULL, "igUserId" character varying NOT NULL, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
