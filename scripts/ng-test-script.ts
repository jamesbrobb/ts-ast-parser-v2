import * as fs from "node:fs";
import * as path from "node:path";
import {parse, Parser} from "../src";
import {ngDeclarationDefinitionMap} from "../src/ng/declarations";


function run() {

  const sourcePath = process.argv.slice(2)[0];

  let relativePath = sourcePath;

  if (path.isAbsolute(sourcePath)) {
    relativePath = path.relative(process.cwd(), sourcePath);
  }

  const dir = path.dirname(relativePath);

  process.chdir(dir);

  const parser = new Parser(ngDeclarationDefinitionMap, true);

  const source = parse(sourcePath, parser);

  fs.writeFileSync(
    path.join('/Users/James/WebstormProjects/ts-ast-parser-v2/scripts/output', 'ng-test.json'),
    JSON.stringify(source, null, '  ')
  );
}


run();