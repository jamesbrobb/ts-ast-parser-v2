import * as ts from "typescript";


export function isNode(value: any): value is ts.Node {
  try {
    return !!value && 'kind' in value && typeof value.kind === 'number' && 'parent' in value && 'getSourceFile' in value
  } catch (error) {
    return false;
  }
}

export function isNodeArray(value: any): value is ts.NodeArray<any> {
  return Array.isArray(value) && value.every(isNode);
}

export function findChildNodeOfKind(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  kind: ts.SyntaxKind | ((node: ts.Node) => boolean)
): ts.Node | undefined {
  let result: ts.Node | undefined;

  node.forEachChild((child) => {
    if(result) {
      return;
    }
    if(typeof kind === 'function'&& kind(child)) {
      result = child;
    } else if(child.kind === kind) {
      result = child;
    } else {
      result = findChildNodeOfKind(child, sourceFile, kind);
    }
  });

  return result;
}
