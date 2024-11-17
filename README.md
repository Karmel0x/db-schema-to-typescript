# db-schema-to-typescript
Simple tool to convert database schema to typescript types

### [Supported Database SQL Syntax](https://www.npmjs.com/package/node-sql-parser#rocket-usage)
- Athena
- BigQuery
- DB2
- Hive
- MariaDB
- MySQL
- PostgresQL
- Redshift
- Sqlite
- TransactSQL
- FlinkSQL
- Snowflake(alpha)
- Noql

## Usage
[web version tool](https://karmel0x.github.io/db-schema-to-typescript/)

or
```bash
bun src/main.ts sample/sample_table.sql > sample/sample_table.ts
```

or
```typescript
import convertDbSchemaToTypescript from './src/db-schema-to-typescript';

const sql = `
    CREATE TABLE \`sample_table\`  (
        \`id\` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        \`sample_column1\` int(11) NULL DEFAULT NULL,
        \`sample_column2\` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT 'default value 1',
        PRIMARY KEY (\`id\`) USING BTREE
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = Dynamic;
`;

const formatOptions: Partial<DbSchemaToTypescriptFormatOptions> = {
    includeSqlTypes: DbSchemaToTypescriptIncludeSqlTypes.No,
    tableNamingFormat: DbSchemaToTypescriptNamingFormat.PascalCase,
    columnNamingFormat: DbSchemaToTypescriptNamingFormat.None,
    formatTo: DbSchemaToTypescriptFormatTo.ExportType,
    includeDefaultValues: DbSchemaToTypescriptIncludeDefaultValues.No,
};

const result = convertDbSchemaToTypescript(sql, formatOptions);
console.log(result);

/*
export type SampleTable = {
    id: number;
    sample_column1: number | null;
    sample_column2: string | null;
};
*/
```

## Example
```typescript
import mariadb from 'mariadb';

async function main() {
    const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'testing',
        connectionLimit: 5,
    });

    const rows: SampleTable[] = await pool.query('SELECT * FROM sample_table');
    
    const rows2: Pick<SampleTable, 'id' | 'sample_column2'>[] = await pool.query('SELECT id, sample_column2 FROM sample_table');
}

main();
```
