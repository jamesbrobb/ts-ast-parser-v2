import * as ts from "typescript";
import * as path from "path";

import {ImportsMap, ImportsMapElement} from "./imports-map";
import {DependencyMap} from "../dependencies";
import {AdditionalMapProps} from "../common";
import {DeclarationKindMap, ImportDeclaration, Parser, ParseReturnType} from "../../declarations";
import {SyntaxKindToTSNodeDeclarationMap} from "../../syntax-kind";


type _Options = {
  debug?: boolean
  dependencyMap?: DependencyMap
}


export type ImportsMapFactoryOptions<O extends AdditionalMapProps = {}> =
  keyof O extends never ?
    _Options :
    _Options & { importsMapElementCreatorFn: ImportsMapElementCreatorFn<O> }

export type ImportsMapElementCreatorFnParams<O extends AdditionalMapProps = {}> = {
  sourceFile: ts.SourceFile,
  importDec: ts.ImportDeclaration,
  imprt: ImportDeclaration,
  element: ImportsMapElement,
  options?: ImportsMapFactoryOptions<O>
}

export type ImportsMapElementCreatorFn<O extends AdditionalMapProps = {}> = (
  params: ImportsMapElementCreatorFnParams<O>
) => O;


export function createImportsMap<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>,
  O extends AdditionalMapProps = {}
>(
  sourceFile: ts.SourceFile,
  parser: Parser<T, M>,
  options: ImportsMapFactoryOptions<O>
): ImportsMap<O> {

  const map = createMap(sourceFile, parser, options);

  if(options.debug) {
    console.log(map);
  }

  return map;
}


function createMap<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>,
  O extends AdditionalMapProps
>(
  sourceFile: ts.SourceFile,
  parser: Parser<T, M>,
  options: ImportsMapFactoryOptions<O>
): ImportsMap<O> {

  return getImportDeclarations(sourceFile, parser)
    .flatMap(([importDec, imprt]) =>
      createImportMapElements(importDec, imprt as any, sourceFile, options))
    .map(([importDec, imprt, element]) =>
      addAdditionalPropsToImportMapElement({sourceFile, importDec, imprt, element, options}));
}


function getImportDeclarations<
  T extends SyntaxKindToTSNodeDeclarationMap,
  M extends DeclarationKindMap<T>
>(
  sourceFile: ts.SourceFile,
  parser: Parser<T, M>
): [ts.ImportDeclaration, ParseReturnType<ImportDeclaration>][] {
  return sourceFile.statements.filter(ts.isImportDeclaration)
    .map(importDec => [importDec, parser.parse(importDec, sourceFile)]);
}


function createImportMapElements(
  importDec: ts.ImportDeclaration,
  imprt: ImportDeclaration,
  sourceFile: ts.SourceFile,
  options?: ImportsMapFactoryOptions
): [ts.ImportDeclaration, ImportDeclaration, ImportsMapElement][] {
  return parseImportToImportMapElement(imprt, sourceFile, options)
    .map(element => [importDec, imprt, element])
}


function addAdditionalPropsToImportMapElement<O extends AdditionalMapProps = {}>(
  params: ImportsMapElementCreatorFnParams<O>
): ImportsMapElement<O> {

  let additional: O = {} as O;
  const options = params.options;

  if(options && 'importsMapElementCreatorFn' in options) {
    additional = options.importsMapElementCreatorFn(params);
  }

  return {
    ...params.element,
    ...additional
  };
}


function parseImportToImportMapElement (
  imprt: ImportDeclaration,
  sourceFile: ts.SourceFile,
  options?: ImportsMapFactoryOptions
): ImportsMap {

  return getImportNames(imprt)
    .map<ImportsMapElement>(name => {

      let props: ImportsMapElement = {
        name,
        module: imprt.moduleSpecifier,
        resolvedModulePath: resolveModulePath(
          imprt.moduleSpecifier,
          sourceFile,
          options?.dependencyMap
        )
      }

      if(options?.dependencyMap) {
        const dep = options.dependencyMap.get(props.resolvedModulePath, name);

        if(dep?.convertedPath) {
          props.convertedModulePath = dep.convertedPath;
        }
      }

      return props;
    }
  )
}


function resolveModulePath(modulePath: string, sourceFile: ts.SourceFile, dependencyMap?: DependencyMap): string {

  if(modulePath.startsWith('.')) {
    modulePath = path.resolve(path.dirname(sourceFile.fileName), modulePath);
  }

  if(dependencyMap) {
    modulePath = dependencyMap.resolvePath(modulePath)
  }

  return modulePath;
}


function getImportNames(imprt: ImportDeclaration): string[] {

  if(!imprt.importClause) {
    return [];
  }

  if(!imprt.importClause.namedBindings) {
    return imprt.importClause.name ? [imprt.importClause.name] : [];
  }

  if(!('elements' in imprt.importClause.namedBindings)) {
    return [];
  }

  return imprt.importClause.namedBindings.elements
    .map(importSpecifier => importSpecifier.name)
    .filter((name): name is string => !!name);
}
