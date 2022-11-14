import { MigrationInterface, QueryRunner } from 'typeorm';
import path = require('path');
import * as fs from 'fs';
const readSqlFile = (filepath: string): string[] => {
  return fs
    .readFileSync(path.join(__dirname, filepath))
    .toString()
    .replace(/\r?\n|\r/g, '')
    .split(';')
    .filter(query => query?.length);
};

export class initDatabase1668438931493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = readSqlFile('/setup.sql');

    for (let i = 0; i < queries.length; i++) {
      await queryRunner.query(queries[i]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
