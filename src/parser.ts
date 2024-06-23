import * as ts from "typescript";
import * as fs from "node:fs";
import * as path from "node:path";
import {createProgram, getParsedTSConfig} from "./common";


type SyntaxKindKeys = keyof typeof ts.SyntaxKind;

type Declaration = {
  kind: SyntaxKindKeys,
  children: Declaration[]
}

export function parse(sourcePath: string): void {
  const config = getParsedTSConfig(),
    entryFile = config.fileNames[0],
    program = createProgram(entryFile, config.options);

  const sourceFile = program.getSourceFile(sourcePath);

  if(!sourceFile) {
    return;
  }

  const source: Declaration = {
    kind: ts.SyntaxKind[sourceFile.kind] as SyntaxKindKeys,
    children: loop(sourceFile)
  }

  /*sourceFile.forEachChild(node => {
    console.log("=====================")
    console.log(ts.SyntaxKind[node.kind]);
    console.log(node.getText(sourceFile));
  });*/

  fs.writeFileSync(
    path.join('/Users/James/WebstormProjects/ts-ast-parser-v2/scripts/output', 'test.json'),
    JSON.stringify(source, null, '  ')
  );
}


function loop(node: ts.Node): Declaration[] {

  const children: Declaration[] = [];

  node.forEachChild(child => {
    children.push({
      kind: ts.SyntaxKind[child.kind] as SyntaxKindKeys,
      children: loop(child)
    });
  });

  return children;
}