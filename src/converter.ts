import convertDbSchemaToTypescript, { DbSchemaToTypescriptFormatTo, DbSchemaToTypescriptIncludeDefaultValues, DbSchemaToTypescriptIncludeSqlTypes, DbSchemaToTypescriptNamingFormat, type DbSchemaToTypescriptFormatOptions } from '../../db-schema-to-typescript/src/db-schema-to-typescript';
import sample_table from './sample_table.sql?raw';

export function setupConverter() {
  const inputElement = document.querySelector<HTMLInputElement | HTMLTextAreaElement>('#input')!;
  const outputElement = document.querySelector<HTMLInputElement | HTMLTextAreaElement>('#output')!;

  const optionIncludeSqlTypes = document.querySelector<HTMLSelectElement>('#option-include-sql-types')!;
  const optionTableNamingFormat = document.querySelector<HTMLSelectElement>('#option-table-naming-format')!;
  const optionColumnNamingFormat = document.querySelector<HTMLSelectElement>('#option-column-naming-format')!;
  const optionFormatTo = document.querySelector<HTMLSelectElement>('#option-format-to')!;
  const optionIncludeDefaultValues = document.querySelector<HTMLSelectElement>('#option-include-default-values')!;

  for (let i in DbSchemaToTypescriptIncludeSqlTypes) {
    if (isNaN(Number(i))) continue;
    const includeSqlType = DbSchemaToTypescriptIncludeSqlTypes[i];
    optionIncludeSqlTypes.options.add(new Option(includeSqlType, i));
  }

  for (let i in DbSchemaToTypescriptNamingFormat) {
    if (isNaN(Number(i))) continue;
    const namingFormat = DbSchemaToTypescriptNamingFormat[i];
    optionTableNamingFormat.options.add(new Option(namingFormat, i));
    optionColumnNamingFormat.options.add(new Option(namingFormat, i));
  }

  for (let i in DbSchemaToTypescriptFormatTo) {
    if (isNaN(Number(i))) continue;
    const formatTo = DbSchemaToTypescriptFormatTo[i];
    optionFormatTo.options.add(new Option(formatTo, i));
  }

  for (let i in DbSchemaToTypescriptIncludeDefaultValues) {
    if (isNaN(Number(i))) continue;
    const includeDefaultValue = DbSchemaToTypescriptIncludeDefaultValues[i];
    optionIncludeDefaultValues.options.add(new Option(includeDefaultValue, i));
  }

  optionIncludeSqlTypes.value = `${DbSchemaToTypescriptIncludeSqlTypes.Comment}`;
  optionTableNamingFormat.value = `${DbSchemaToTypescriptNamingFormat.PascalCase}`;
  optionColumnNamingFormat.value = `${DbSchemaToTypescriptNamingFormat.None}`;
  optionFormatTo.value = `${DbSchemaToTypescriptFormatTo.ExportType}`;
  optionIncludeDefaultValues.value = `${DbSchemaToTypescriptIncludeDefaultValues.Comment}`;

  const formatOptions: DbSchemaToTypescriptFormatOptions = {
    includeSqlTypes: DbSchemaToTypescriptIncludeSqlTypes.PreDefineTypes,
    tableNamingFormat: DbSchemaToTypescriptNamingFormat.CamelCase,
    columnNamingFormat: DbSchemaToTypescriptNamingFormat.None,
    formatTo: DbSchemaToTypescriptFormatTo.ExportType,
    includeDefaultValues: DbSchemaToTypescriptIncludeDefaultValues.Comment,
  };

  const readOptions = () => {
    formatOptions.includeSqlTypes = parseInt(optionIncludeSqlTypes.value);
    formatOptions.tableNamingFormat = parseInt(optionTableNamingFormat.value);
    formatOptions.columnNamingFormat = parseInt(optionColumnNamingFormat.value);
    formatOptions.formatTo = parseInt(optionFormatTo.value);
    formatOptions.includeDefaultValues = parseInt(optionIncludeDefaultValues.value);
  };

  const convert = () => {
    readOptions();

    try {
      outputElement.value = convertDbSchemaToTypescript(inputElement.value, formatOptions);
    }
    catch (e) {
      if (e instanceof Error) {
        outputElement.value = e.message;
      }
    }
  };

  inputElement.addEventListener('input', () => convert());

  const convertPlaceholder = () => {
    readOptions();
    outputElement.placeholder = convertDbSchemaToTypescript(inputElement.placeholder, formatOptions);
  };

  inputElement.placeholder = sample_table;
  convertPlaceholder();

  optionIncludeSqlTypes.addEventListener('input', () => {
    convert();
    convertPlaceholder();
  });
  optionTableNamingFormat.addEventListener('input', () => {
    convert();
    convertPlaceholder();
  });
  optionColumnNamingFormat.addEventListener('input', () => {
    convert();
    convertPlaceholder();
  });
  optionFormatTo.addEventListener('input', () => {
    convert();
    convertPlaceholder();
  });
  optionIncludeDefaultValues.addEventListener('input', () => {
    convert();
    convertPlaceholder();
  });

}
