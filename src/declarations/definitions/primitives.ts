import * as ts from "typescript";
import {stripQuotes} from "../../utils";
import {Parser} from "../declaration-parser";



export function parseObjectLiteral(node: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile, parser: Parser<any, any>): Record<PropertyKey, any> {

  const res: Record<string, any> = {};

  node.forEachChild((child: ts.Node) => {

    if (!ts.isPropertyAssignment(child)) {
      throw new Error(`Child is not a property assignment - ${child}`);
    }

    if (!child.name || !ts.isIdentifier(child.name)) {
      throw new Error(`Property name is not an identifier - ${child}`);
    }

    res[child.name.getText(sourceFile)] = parser.parse(child.initializer, sourceFile);
  });

  return res;
}

export function parseArrayLiteral(node: ts.ArrayLiteralExpression, sourceFile: ts.SourceFile, parser: Parser<any, any>): any[] {
    return node.elements.map((element) => parser.parse(element, sourceFile));
}

export function parseBoolean(node: ts.BooleanLiteral, sourceFile: ts.SourceFile): boolean {
  return node.getText(sourceFile) === 'true';
}

export function parseString(node: ts.Node, sourceFile: ts.SourceFile): string {

  /*if(ts.isStringLiteral(node)) {
    console.log('isStringLiteral');
    console.log(ts.SyntaxKind[node.kind]);
    console.log(node.text);

  } else {
    console.log('not');
    console.log(ts.SyntaxKind[node.kind]);
    console.log(node.getText(sourceFile));
  }

  console.log('=============================');*/

  if(ts.isStringLiteral(node)) {
    // TODO - return node.getText(sourceFile), which includes the quotes, and then strip at dec source if required
    /*console.log(node.text);
    console.log(node.getText(sourceFile));
    console.log(ts.SyntaxKind[node.kind]);
    console.log('=============================');*/
  }


  return stripQuotes(ts.isStringLiteral(node) ? node.text : node.getText(sourceFile));
}