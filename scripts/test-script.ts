import * as fs from "node:fs";
import * as path from "node:path";
import {
    CommonPathHandler,
    LightweightChartsPathHandler,
    NgPathHandler,
    NodeModulesPathHandler,
    parse,
    Parser,
    RxjsPathHandler,
    defaultDeclarationDefinitionMap
} from "../src";


const pathHandlers = [
    new CommonPathHandler(),
    new NodeModulesPathHandler(),
    new RxjsPathHandler(),
    new NgPathHandler(),
    new LightweightChartsPathHandler()
]


function run() {

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

    const parser = new Parser(defaultDeclarationDefinitionMap);

    const source = parse(
      sourcePath,
      parser,
      pathHandlers, {
          walk: stats.isDirectory(),
          debug: false
      }
    );

    fs.writeFileSync(
      path.join('/Users/James/WebstormProjects/ts-ast-parser-v2/scripts/output', 'output.json'),
      JSON.stringify(source, null, '  ')
    );
}


run();