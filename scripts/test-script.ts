import * as fs from "node:fs";
import * as path from "node:path";
import {defaultDeclarationDefinitionMap, parse, Parser} from "../src";


function run() {

    const sourcePath = process.argv.slice(2)[0];

    let relativePath = sourcePath;

    if (path.isAbsolute(sourcePath)) {
        relativePath = path.relative(process.cwd(), sourcePath);
    }

    const dir = path.dirname(relativePath);

    process.chdir(dir);

    const parser = new Parser(defaultDeclarationDefinitionMap);

    const source = parse(sourcePath, parser);

    fs.writeFileSync(
      path.join('/Users/James/WebstormProjects/ts-ast-parser-v2/scripts/output', 'test.json'),
      JSON.stringify(source, null, '  ')
    );
}


run();