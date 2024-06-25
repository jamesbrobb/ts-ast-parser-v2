import * as ts from "typescript";
import {isNode} from "../utils";
import {parseString} from "../declarations";
import {SyntaxKinds} from "./syntax-kind.types";


export type UnregisteredSyntaxKindNode = {
  raw: string,
  kind: ts.SyntaxKind,
  type: string
} | string | boolean;


type KindConversionMap = {
  [key in SyntaxKinds]?: string | boolean | ((node: ts.Node | ts.SyntaxKind, sourceFile: ts.SourceFile) => any)
}


const kindConversionMap: KindConversionMap = {
  [ts.SyntaxKind.TrueKeyword]: true,
  [ts.SyntaxKind.FalseKeyword]: false,
  [ts.SyntaxKind.ExtendsKeyword]: 'extends',
  [ts.SyntaxKind.ImplementsKeyword]: 'implements',
}



export function unregisteredSyntaxKindParser(node: ts.Node | ts.SyntaxKind, sourceFile: ts.SourceFile, debug: boolean): UnregisteredSyntaxKindNode {

  if(isNode(node)) {

    if(ts.isToken(node)) {

      const convertor = kindConversionMap[node.kind];

      if(convertor) {
        if (convertor instanceof Function) {
          return convertor(node, sourceFile);
        }

        return convertor;
      }

      return parseString(node, sourceFile);
    }

    if(debug) {
      console.warn(`No parse function registered for ${ts.SyntaxKind[node.kind]} - kind: ${node.kind}`);
    }

    return {
      raw: node ? node.getText?.(sourceFile) : node,
      kind: node.kind,
      type: ts.SyntaxKind[node.kind]
    }
  }

  if(ts.isTokenKind(node)) {

    const convertor = kindConversionMap[node];

    if(convertor) {
      if (convertor instanceof Function) {
        return convertor(node, sourceFile);
      }

      return convertor;
    }

    return ts.SyntaxKind[node];
  }

  return ts.SyntaxKind[node];
}