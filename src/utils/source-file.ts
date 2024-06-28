import * as ts from 'typescript';


export function getSourceFile(program: ts.Program, sourcePath: string): ts.SourceFile {

  const sourceFile = program.getSourceFile(sourcePath);

  if(!sourceFile) {
    throw new Error(`No source file found for ${sourcePath} - if it\'s part of a library make sure it\'s exported in the public-api.ts file`);
  }

  return sourceFile;
}

export function getExportedDeclarationsFromSource(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  debug: boolean = false
): ts.Declaration[] {

  const symbol = getSourceFileSymbol(program, sourceFile, debug),
    typeChecker = program.getTypeChecker();

  if(!symbol) {
    return [];
  }

  return typeChecker.getExportsOfModule(symbol)
    .map(value => value.declarations?.[0])
    .filter((declaration): declaration is ts.Declaration => !!declaration);
}


export function getSourceFileSymbol(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  debug: boolean = false
): ts.Symbol | undefined {

  const typeChecker = program.getTypeChecker(),
    symbol = typeChecker.getSymbolAtLocation(sourceFile);

  if(!symbol && debug) {
    console.log(`No symbols found in ${sourceFile.fileName}`);
  }

  return symbol;
}