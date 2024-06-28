import {createProgram} from "./common";
import {DeclarationKindMap, Parser, SourceFile} from "./declarations";
import {SyntaxKindToTSNodeDeclarationMap} from "./syntax-kind";
import {createDependencyMap} from "./maps";
import {buildPathMaps, PathHandler, PathParserMaps} from "./paths";
import {parseSourceFile, parseSourceFiles} from "./parsing";



export type ParseOptions = {
  debug?: boolean
  walk?: boolean
}


export function parse<T extends SyntaxKindToTSNodeDeclarationMap, M extends DeclarationKindMap<T>>(
  sourcePath: string,
  parser: Parser<T, M>,
  pathHandlers?: PathHandler[],
  options?: ParseOptions
): SourceFile[] | SourceFile  {

  const program = createProgram(options?.debug),
    pathMaps: PathParserMaps = buildPathMaps(...(pathHandlers || [])),
    dependencyMap = createDependencyMap(program, {
      debug: options?.debug,
      pathHandlers: pathMaps
    });

  if(!options?.walk) {
    return parseSourceFile(program, sourcePath, parser, {
      debug: options?.debug,
      ...pathMaps,
      dependencyMap
    });
  }

  return parseSourceFiles(program, sourcePath, parser, {
    debug: options?.debug,
    ...pathMaps,
    dependencyMap
  });
}