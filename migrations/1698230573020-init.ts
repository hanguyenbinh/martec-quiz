import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1698230573020 implements MigrationInterface {
    name = 'Init1698230573020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" integer, "updatedBy" integer, "deletedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying, "accessToken" character varying, "facebookUserId" character varying, "signinRequest" character varying, "scopes" character varying, "expiredTime" integer, "graphDomain" character varying, "lastLoginTime" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
