import fs from 'fs';
import { Parser } from 'node-sql-parser';

// bun test/ast-json.ts sample/sample_table.sql > sample/sample_table.json

async function main() {
    const schemaFilename = process.argv[2];
    let schemaFile = await fs.promises.readFile(schemaFilename, 'utf8');
    schemaFile = schemaFile.replaceAll('\nSET ', '\n-- SET ');

    const parser = new Parser();
    const ast = parser.astify(schemaFile);

    console.log(JSON.stringify(ast, null, 2));
}

main();
