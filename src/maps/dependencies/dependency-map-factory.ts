import * as ts from "typescript";

import {DependencyMap, DependencyMapOptions, getPathHandlers} from "./dependency-map";
import {AdditionalMapProps} from "../common";
import {getSourceFileSymbol, log, stripQuotes} from "../../utils";


type _SymbolWithExports = ts.Symbol & {exports: ts.SymbolTable};
type _SourceAndSymbolTuple = [sourceFile: ts.SourceFile, symbol: _SymbolWithExports];


export type IgnorePathsMap = (string | RegExp)[];
export type SourceModuleCreatorFn<O extends AdditionalMapProps = {}> = (
  node: ts.Node,
  sourceFile: ts.SourceFile,
  debug?: boolean
) => O;

export type DependencyMapFactoryOptions<O extends AdditionalMapProps = {}> =
  keyof O extends never ?
    DependencyMapOptions :
    DependencyMapOptions & { sourceModuleCreatorFn: SourceModuleCreatorFn<O> }


export function createDependencyMap<O extends AdditionalMapProps = {}>(
  program: ts.Program,
  options?: DependencyMapFactoryOptions<O>
): DependencyMap<O> {

  let pathHandlers = getPathHandlers(options?.pathHandlers),
    sourceModuleCreatorFn = options && 'sourceModuleCreatorFn' in  options ? options.sourceModuleCreatorFn : undefined,
    debug = options?.debug || false;

  const dependencyMap = new DependencyMap<O>({...(options || {}), pathHandlers});

  program.getSourceFiles()
    .filter(sourceFile => isSourceFileEligible(program, sourceFile, pathHandlers?.ignorePathsMap, debug))
    .map(sourceFile => [sourceFile, getSymbolFromSource(program, sourceFile)])
    .filter((arg): arg is _SourceAndSymbolTuple => !!arg[1])
    .forEach(([sourceFile, symbol]) => {

      symbol.exports.forEach((value, _key) => {

        if (['__export', '__exportStar'].includes(value.name) || value.name.startsWith('ɵ')) {
          return;
        }

        const declaration = value.declarations?.[0];

        if (!declaration) {
          return;
        }

        let additional: O = {} as O;

        if(sourceModuleCreatorFn) {
          additional = sourceModuleCreatorFn(declaration, sourceFile, debug);
        }

        dependencyMap.set(stripQuotes(symbol.name), value.name, declaration.kind, additional);
      });
    });

  if(debug) {
    log(dependencyMap.toString(), 'SOURCE FILES MAP');
  }

  return dependencyMap;
}

function isSourceFileEligible(
  _program: ts.Program,
  sourceFile: ts.SourceFile,
  ignorePathsMap?: IgnorePathsMap,
  debug: boolean = false
): boolean {

  // TODO - can't remember why this was here
  /*const baseUrl = program.getCompilerOptions().baseUrl || '';

  if(!baseUrl && debug) {
    console.warn('No baseUrl found in tsconfig.json');
  }

  if(!sourceFile.fileName.includes(baseUrl)) {
    return false;
  }*/

  return !ignorePath(sourceFile.fileName, ignorePathsMap || [], debug)
}

function getSymbolFromSource(program: ts.Program, sourceFile: ts.SourceFile): _SymbolWithExports | undefined {

  const symbol = getSourceFileSymbol(program, sourceFile);

  return isSymbolWithExports(symbol) ? symbol : undefined;
}

function isSymbolWithExports(symbol?: ts.Symbol): symbol is _SymbolWithExports {
  return !!symbol?.exports?.size;
}


function ignorePath(path: string, map: IgnorePathsMap, debug: boolean = false): boolean {

  const ignore = map.some(value => {
    return path.search(value) !== -1;
  });

  if(ignore && debug) {
    log(path, 'IGNORING PATH')
  }

  return ignore;
}
