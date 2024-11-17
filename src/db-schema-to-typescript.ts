
import { Parser, ValueExpr, type AST } from 'node-sql-parser';


export enum DbSchemaToTypescriptIncludeSqlTypes {
  No,
  Comment,
  PreDefineTypes,
};

export enum DbSchemaToTypescriptNamingFormat {
  None,
  CamelCase,
  PascalCase,
};

export enum DbSchemaToTypescriptFormatTo {
  Type,
  Interface,
  Class,
  ExportType,
  ExportInterface,
  ExportClass,
};

export enum DbSchemaToTypescriptIncludeDefaultValues {
  No,
  Comment,
};

export type DbSchemaToTypescriptFormatOptions = {
  includeSqlTypes: DbSchemaToTypescriptIncludeSqlTypes;
  tableNamingFormat: DbSchemaToTypescriptNamingFormat;
  columnNamingFormat: DbSchemaToTypescriptNamingFormat;
  formatTo: DbSchemaToTypescriptFormatTo;
  includeDefaultValues: DbSchemaToTypescriptIncludeDefaultValues;
};

function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function fillDefaultFormatOptions(formatOptions: Partial<DbSchemaToTypescriptFormatOptions>): DbSchemaToTypescriptFormatOptions {
  return {
    includeSqlTypes: formatOptions.includeSqlTypes ?? DbSchemaToTypescriptIncludeSqlTypes.Comment,
    tableNamingFormat: formatOptions.tableNamingFormat ?? DbSchemaToTypescriptNamingFormat.PascalCase,
    columnNamingFormat: formatOptions.columnNamingFormat ?? DbSchemaToTypescriptNamingFormat.None,
    formatTo: formatOptions.formatTo ?? DbSchemaToTypescriptFormatTo.ExportType,
    includeDefaultValues: formatOptions.includeDefaultValues ?? DbSchemaToTypescriptIncludeDefaultValues.Comment,
  };
}

function trimQuotes(str: string): string {
  if (str.startsWith("'") || str.startsWith('"'))
    str = str.slice(1);
  if (str.endsWith("'") || str.endsWith('"'))
    str = str.slice(0, -1);
  return str;
}

function makeComment(comments: string[], indentation: string = ''): string {
  comments = comments.map(comment => comment.trim());
  comments = comments.filter(comment => comment);
  if (!comments.length) return '';

  if (comments.length === 1) {
    let comment = comments[0];
    return `${indentation}/** ${comment} */`;
  }

  let result = `${indentation}/**\n`;
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    result += `${indentation} * ${comment}\n`;
  }
  result += `${indentation} */`;
  return result;
}

export function convertASTToTypescript(ast: AST | AST[], formatOptions: Partial<DbSchemaToTypescriptFormatOptions>): string {
  if (!Array.isArray(ast))
    ast = [ast];

  const indentation = '    ';

  const typeMap = {
    tinyint: 'number',
    smallint: 'number',
    mediumint: 'number',
    int: 'number',
    bigint: 'bigint',

    decimal: 'string',
    double: 'number',
    float: 'number',

    tinytext: 'string',
    mediumtext: 'string',
    text: 'string',
    longtext: 'string',

    char: 'string',
    varchar: 'string',
    json: 'any',

    date: 'Date',
    datetime: 'Date',
    time: 'string',
    timestamp: 'Date',
    year: 'number',

    bit: 'boolean',
    binary: 'Buffer',
    tinyblob: 'Buffer',
    mediumblob: 'Buffer',
    blob: 'Buffer',
    longblob: 'Buffer',

    point: 'object',
    multipoint: 'object',
    linestring: 'object',
    multilinestring: 'object',
    polygon: 'object',
    multipolygon: 'object',
    geometry: 'object',
    geometrycollection: 'object',
  };

  const {
    includeSqlTypes,
    tableNamingFormat,
    columnNamingFormat,
    formatTo,
    includeDefaultValues,
  } = fillDefaultFormatOptions(formatOptions);

  let formatToStr = '';
  if (formatTo === DbSchemaToTypescriptFormatTo.Type)
    formatToStr = 'type';
  else if (formatTo === DbSchemaToTypescriptFormatTo.Interface)
    formatToStr = 'interface';
  else if (formatTo === DbSchemaToTypescriptFormatTo.Class)
    formatToStr = 'class';
  else if (formatTo === DbSchemaToTypescriptFormatTo.ExportType)
    formatToStr = 'export type';
  else if (formatTo === DbSchemaToTypescriptFormatTo.ExportInterface)
    formatToStr = 'export interface';
  else if (formatTo === DbSchemaToTypescriptFormatTo.ExportClass)
    formatToStr = 'export class';

  let tableNameFormat = (v: string) => v;
  if (tableNamingFormat === DbSchemaToTypescriptNamingFormat.CamelCase)
    tableNameFormat = toCamelCase;
  else if (tableNamingFormat === DbSchemaToTypescriptNamingFormat.PascalCase)
    tableNameFormat = toPascalCase;

  let columnNameFormat = (v: string) => v;
  if (columnNamingFormat === DbSchemaToTypescriptNamingFormat.CamelCase)
    columnNameFormat = toCamelCase;
  else if (columnNamingFormat === DbSchemaToTypescriptNamingFormat.PascalCase)
    columnNameFormat = toPascalCase;

  let preDefineTypes: string[] = [];
  let tableLinesList: string[] = [];

  for (let i = 0; i < ast.length; i++) {
    const table = ast[i]!;

    if (table.type !== 'create' || table.keyword !== 'table')
      continue;

    const tableName = table.table?.[0]?.table;
    if (!tableName)
      continue;

    const createDefinitions = table.create_definitions;
    if (!createDefinitions)
      continue;

    const columnLines: string[] = [];
    for (let j = 0; j < createDefinitions.length; j++) {
      const createDefinition = createDefinitions[j]!;
      if (createDefinition.resource !== 'column')
        continue;
      if (createDefinition.column.type !== 'column_ref')
        continue;

      const columnName = createDefinition.column.column;
      if (typeof columnName !== 'string')
        continue;

      let sqlDefType = createDefinition.definition.dataType;
      const sqlDefSuffix = createDefinition.definition.suffix?.join('_') ?? '';

      // @ts-ignore
      const isJson = createDefinition.check?.definition?.[0]?.name?.name?.[0]?.value === 'json_valid';
      if (isJson) sqlDefType = 'JSON';

      const isNullable = createDefinition.nullable?.type === 'null';
      const isNullableStr = isNullable ? ' | null' : '';

      const sqlType = (sqlDefSuffix ? sqlDefSuffix + '_' : '') + sqlDefType;
      const tsType = typeMap[sqlDefType.toLowerCase() as keyof typeof typeMap] ?? 'unknown';

      let typeDefLength = createDefinition.definition.length;
      // @ts-ignore
      let typeDefScale = createDefinition.definition.scale as number | undefined;
      let typeTemplateList = [typeDefLength, typeDefScale].filter(v => v);

      const columnComments: string[] = [];
      // @ts-ignore
      const columnComment = createDefinition.comment?.value as ValueExpr<string> | undefined;
      if (columnComment?.value) columnComments.push(columnComment.value);

      if (includeSqlTypes === DbSchemaToTypescriptIncludeSqlTypes.Comment) {
        let typeTemplate = '';
        if (typeTemplateList.length > 0)
          typeTemplate = `(${typeTemplateList.join(', ')})`;

        let typeName = `${sqlType.toUpperCase()}${typeTemplate}`;
        columnComments.push(typeName);
      }

      if (includeDefaultValues === DbSchemaToTypescriptIncludeDefaultValues.Comment) {
        const defaultVal = createDefinition.default_val?.value as ValueExpr<string> | undefined;
        if (defaultVal?.value !== undefined) columnComments.push('default: ' + JSON.stringify(defaultVal.value));
        else if (createDefinition.auto_increment) columnComments.push('default: ' + 'auto_increment');
      }

      let comment = makeComment(columnComments, indentation);
      if (comment) columnLines.push(comment);

      if (includeSqlTypes === DbSchemaToTypescriptIncludeSqlTypes.PreDefineTypes) {
        let preDefineTypeName = `SQL_${sqlType.toUpperCase()}`;

        let typeTemplate = '';
        if (typeTemplateList.length > 0)
          typeTemplate = `<${typeTemplateList.join(', ')}>`;

        let preDefineTypeTemplateList = ['Length extends number', 'Scale extends number'];
        let preDefineTypeTemplate = '';
        if (typeTemplateList.length > 0)
          preDefineTypeTemplate = `<${preDefineTypeTemplateList.slice(0, typeTemplateList.length).join(', ')}>`;

        let preDefineType = `type ${preDefineTypeName}${preDefineTypeTemplate} = ${tsType}${isNullableStr};`;

        if (!preDefineTypes.includes(preDefineType))
          preDefineTypes.push(preDefineType);

        columnLines.push(`${indentation}${columnNameFormat(columnName)}: ${preDefineTypeName}${typeTemplate};`);
      } else {
        columnLines.push(`${indentation}${columnNameFormat(columnName)}: ${tsType}${isNullableStr};`);
      }
    }

    if (columnLines.length < 1)
      continue;

    let tableLines: string[] = [];

    const tableComments: string[] = [];
    const tableComment = table.table_options?.find((option) => option.keyword === 'comment');
    if (tableComment?.value) tableComments.push(trimQuotes(tableComment.value));

    let comment = makeComment(tableComments);
    if (comment) tableLines.push(comment);

    tableLines.push(`${formatToStr} ${tableNameFormat(tableName)} = {`);
    tableLines.push(columnLines.join('\n'));
    tableLines.push(`};`);
    tableLines.push('');
    tableLinesList.push(tableLines.join('\n'));
  }

  if (preDefineTypes.length > 0) {
    preDefineTypes.push('');
    preDefineTypes.push('');
  }

  return preDefineTypes.join('\n') + tableLinesList.join('\n');
}

export default function convertDbSchemaToTypescript(dbSchema: string, formatOptions: Partial<DbSchemaToTypescriptFormatOptions> = {}): string {
  if (!dbSchema) return '';

  dbSchema = dbSchema.replace(/\nSET /g, '\n-- SET ');

  const parser = new Parser();
  let ast = parser.astify(dbSchema);

  return convertASTToTypescript(ast, formatOptions);
}
