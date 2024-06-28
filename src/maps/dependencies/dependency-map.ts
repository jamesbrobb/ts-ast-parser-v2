import * as ts from "typescript";
import { log } from "../../utils";
import {AdditionalMapProps} from "../common";
import {
  buildPathMaps,
  convertPath,
  DuplicatePathPrecedenceMap,
  PathConversionMap, PathHandler, PathParserMaps,
  PathResolutionMap,
  resolveDuplicatePath,
  resolvePath
} from "../../paths";


export type DependencyMapElement<O extends AdditionalMapProps = {}> = {
  module: string
  name: string
  path: string
  resolvedPath: string
  convertedPath?: string
  kind: ts.SyntaxKind
  kindName: string
} & O

export type DependencyModuleMap<O extends AdditionalMapProps = {}> = Map<string, DependencyMapElement<O>>

export type DependencyMapOptions = {
  moduleKeyRegex?: RegExp
  debug?: boolean
  pathHandlers?: PathHandler[] | Partial<PathParserMaps>
}

export const dependencyMapKeyRegex = /^((@.*?\/)*[^\/]*)/g;


export class DependencyMap<O extends AdditionalMapProps = {}> {

  readonly #keyRegex: RegExp = dependencyMapKeyRegex;
  readonly #pathResolutionMap: PathResolutionMap = [];
  readonly #debug: boolean = false;

  readonly #duplicatePathPrecedenceMap?: DuplicatePathPrecedenceMap;
  readonly #pathConversionMap?: PathConversionMap;

  readonly #map = new Map<string, DependencyModuleMap<O>>();

  constructor(options?: DependencyMapOptions) {

    const pathHandlers = getPathHandlers(options?.pathHandlers);

    this.#keyRegex = options?.moduleKeyRegex || this.#keyRegex;
    this.#pathResolutionMap = pathHandlers.pathResolutionMap || this.#pathResolutionMap;
    this.#debug = options?.debug ?? this.#debug;

    this.#duplicatePathPrecedenceMap = pathHandlers.duplicatePathPrecedenceMap;
    this.#pathConversionMap = pathHandlers.pathConversionMap;
  }

  set(modulePath: string, entityName: string, kind: ts.SyntaxKind, additional?: O): void {

    const resolvedPath = this.resolvePath(modulePath),
      key = resolvedPath.match(this.#keyRegex)?.[0] || '';

    if(!key && this.#debug) {
      log(`${entityName} skipped for ${resolvedPath}`, 'NO KEY FOUND');
      return;
    }

    const moduleMap: DependencyModuleMap<O> = this.#map.get(key) || new Map();

    let props: DependencyMapElement<O> = {
      module: key,
      name: entityName,
      path: modulePath,
      resolvedPath,
      kind,
      kindName: ts.SyntaxKind[kind],
      ...(additional ?? {} as O)
    };

    props = this.#handleDuplicatePath(props, moduleMap);
    props = this.#handlePathConversion(props);

    moduleMap.set(entityName, props);

    this.#map.set(key, moduleMap);
  }

  get(modulePath: string, entityName: string): DependencyMapElement<O> | undefined {

    const key = modulePath.match(this.#keyRegex)?.[0] || '';

    if(!key) {
      if(this.#debug) {
        log(`${entityName} skipped for ${modulePath}`, 'NO KEY FOUND');
      }
      return;
    }

    const moduleMap = this.#map.get(key);

    if(!moduleMap) {
      if(this.#debug) {
        console.log(`No source module map found for ${key}`);
      }
      return;
    }

    return moduleMap.get(entityName);
  }

  resolvePath(modulePath: string): string {
    return resolvePath(modulePath, this.#pathResolutionMap);
  }

  toString(): string {
    console.log('dependency map keys:',this.#map.keys());
    console.log(this.#map);
    return '';
  }

  #handleDuplicatePath(props: DependencyMapElement<O>, moduleMap: DependencyModuleMap<O>): DependencyMapElement<O> {

    if(!this.#duplicatePathPrecedenceMap) {
      return props;
    }

    const entityName = props.name,
      modulePath = props.resolvedPath,
      existingElement = moduleMap.get(entityName);

    if(existingElement) {

      const resolution = resolveDuplicatePath(existingElement.resolvedPath, modulePath, this.#duplicatePathPrecedenceMap);

      if(resolution === 0) {
        if(this.#debug) {
          log(`Name: ${entityName}\nStored path: ${existingElement.path}\nDuplicate path: ${modulePath}`, 'DUPLICATE PATH FOUND');
        }
        return existingElement;
      }
    }

    return props;
  }

  #handlePathConversion(props: DependencyMapElement<O>): DependencyMapElement<O> {

    if(!this.#pathConversionMap) {
      return props;
    }

    const convertedPath = convertPath(props.name, props.resolvedPath, props.kind, this.#pathConversionMap);

    if(convertedPath === props.resolvedPath) {
      return props;
    }

    return {
      ...props,
      convertedPath
    }
  }
}


export function getPathHandlers(value?: DependencyMapOptions['pathHandlers']): Partial<PathParserMaps> {

  let pathHandlers = {} as Partial<PathParserMaps>;

  if(value) {
    if(Array.isArray(value)) {
      pathHandlers = buildPathMaps(...value);
    } else {
      pathHandlers = value;
    }
  }

  return pathHandlers;
}


