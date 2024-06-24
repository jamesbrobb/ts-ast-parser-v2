import {createProgram, getParsedTSConfig} from "./common";
import {DeclarationKindMap, Parser} from "./declarations";
import {SyntaxKindToTSNodeDeclarationMap} from "./syntax-kind";
import {getExportedDeclarationsFromSource} from "./utils";


export function parse<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>
>(sourcePath: string, parser: Parser<T, M>): any {

  const config = getParsedTSConfig(),
    entryFile = config.fileNames[0],
    program = createProgram(entryFile, config.options);

  const sourceFile = program.getSourceFile(sourcePath);

  if(!sourceFile) {
    return;
  }

  const exports = getExportedDeclarationsFromSource(program, sourceFile)

  return {
    exports: exports.map(value => parser.parse(value, sourceFile))
  }
}