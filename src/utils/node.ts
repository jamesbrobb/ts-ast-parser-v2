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
