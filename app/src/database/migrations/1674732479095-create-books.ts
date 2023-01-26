import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBooks1674732479095 implements MigrationInterface {
  name = 'createBooks1674732479095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`books\` CHANGE \`author\` \`userId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`userId\` int UNSIGNED NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`userId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` CHANGE \`userId\` \`author\` varchar(255) NOT NULL`,
    );
  }
}
