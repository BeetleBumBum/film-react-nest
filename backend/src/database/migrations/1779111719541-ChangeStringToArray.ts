import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeStringToArray1779111719541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "films" 
            ALTER COLUMN "tags" TYPE text[] 
            USING CASE WHEN "tags" = '' THEN ARRAY[]::text[] ELSE string_to_array("tags", ',') END
        `);
    await queryRunner.query(`
            ALTER TABLE "schedules" 
            ALTER COLUMN "taken" TYPE text[] 
            USING CASE WHEN "taken" = '' THEN ARRAY[]::text[] ELSE string_to_array("taken", ',') END
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "films" 
            ALTER COLUMN "tags" TYPE text 
            USING array_to_string("tags", ',')
        `);
    await queryRunner.query(`
            ALTER TABLE "schedules" 
            ALTER COLUMN "taken" TYPE text 
            USING array_to_string("taken", ',')
        `);
  }
}
