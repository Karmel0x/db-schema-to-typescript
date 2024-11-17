import fs from 'fs';
import convertDbSchemaToTypescript, { type DbSchemaToTypescriptFormatOptions } from './db-schema-to-typescript';


async function main() {
  const schemaFilename = process.argv[2];
  const schemaFile = await fs.promises.readFile(schemaFilename, 'utf8');

  const formatOptions: Partial<DbSchemaToTypescriptFormatOptions> = {
    // ...
  };

  const result = convertDbSchemaToTypescript(schemaFile, formatOptions);
  console.log(result);
}

main();
