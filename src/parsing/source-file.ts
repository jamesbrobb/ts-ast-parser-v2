import * as ts from "typescript";
import * as path from "node:path";
import * as fs from "node:fs";

import {SyntaxKindToTSNodeDeclarationMap} from "../syntax-kind";
import {DeclarationKindMap, Parser, ParseReturnType, SourceFile} from "../declarations";
import {AdditionalMapProps, createImportsMap, ImportsMapFactoryOptions} from "../maps";
import {getExportedDeclarationsFromSource, getSourceFile} from "../utils";



export type ParseSourceFileOptions<O extends AdditionalMapProps = {}> = {
  debug?: boolean
} & ImportsMapFactoryOptions<O>


export function parseSourceFile<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>,
  O extends AdditionalMapProps = {}
>(
  program: ts.Program,
  source: ts.SourceFile | string,
  parser: Parser<T, M>,
  options: ParseSourceFileOptions<O>

): SourceFile<O> {

  const sourceFile: ts.SourceFile = typeof source === 'string' ? getSourceFile(program, source) : source,
    exports: ParseReturnType<any>[] = getExportedDeclarationsFromSource(program, sourceFile)
      .map(value => parser.parse(value, sourceFile)),
    imports = createImportsMap(sourceFile, parser, options);

  return {
    fileName: path.basename(sourceFile.fileName),
    path: path.dirname(sourceFile.fileName),
    imports,
    exports
  }
}

const ignoreFiles = ['index.ts', 'public-api.ts', '.d.ts', '.spec.ts', '.mock.ts'];

export function parseSourceFiles<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>,
  O extends AdditionalMapProps = {}
>(
  program: ts.Program,
  entryPoint: string,
  parser: Parser<T, M>,
  options: ParseSourceFileOptions<O>
) {

  let basePath = entryPoint;

  if(fs.statSync(entryPoint).isFile()) {
    basePath = path.dirname(entryPoint);
  }

  return program.getSourceFiles()
    .filter(sourceFile => sourceFile.fileName.startsWith(basePath))
    .filter(sourceFile => {
      return !ignoreFiles.some(ignoreFile => sourceFile.fileName.endsWith(ignoreFile));
    })
    .map(sourceFile => parseSourceFile(program, sourceFile, parser, options));
}