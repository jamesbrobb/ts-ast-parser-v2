import * as fs from "node:fs";
import * as path from "node:path";
import {
  CommonPathHandler,
  createDependencyMap, createImportsMap,
  createProgram, defaultDeclarationDefinitionMap,
  getParsedTSConfig, getPathHandlers,
  LightweightChartsPathHandler,
  NgPathHandler,
  NodeModulesPathHandler, Parser,
  RxjsPathHandler
} from "../src";


const pathHandlers = [
  new CommonPathHandler(),
  new NodeModulesPathHandler(),
  new RxjsPathHandler(),
  new NgPathHandler(),
  new LightweightChartsPathHandler()
]

function run(): void {

  const sourcePath = process.argv.slice(2)[0],
    stats = fs.statSync(sourcePath);

  let relativePath = sourcePath;

  if (path.isAbsolute(sourcePath)) {
    relativePath = path.relative(process.cwd(), sourcePath);
  }

  const dir: string = stats.isDirectory() ? relativePath : path.dirname(relativePath);

  // can be empty if cwd === relativePath
  if(dir) {
    process.chdir(dir);
  }

  const config = getParsedTSConfig(),
    entryFile = config.fileNames[0],
    program = createProgram(entryFile, config.options);

  const pathMaps = getPathHandlers(pathHandlers)

  const dependencyMap = createDependencyMap(program, {
    debug: false,
    pathHandlers: pathMaps
  });

  const sourceFile = program.getSourceFile(sourcePath);

  if(!sourceFile) {
    return;
  }

  const imports = createImportsMap(
    sourceFile,
    new Parser(defaultDeclarationDefinitionMap), {
      debug: false,
      dependencyMap,
      //pathResolutionMap: pathMaps.pathResolutionMap
    }
  );

  fs.writeFileSync(
    path.join('/Users/James/WebstormProjects/ts-ast-parser-v2/scripts/output', 'imports.json'),
    JSON.stringify(imports, null, '  ')
  );
}

run();