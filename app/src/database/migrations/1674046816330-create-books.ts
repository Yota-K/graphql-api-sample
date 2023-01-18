import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBooks1674046816330 implements MigrationInterface {
  name = 'createBooks1674046816330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`books\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(30) NOT NULL, \`author\` varchar(255) NOT NULL, \`price\` int UNSIGNED NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`books\``);
  }
}
