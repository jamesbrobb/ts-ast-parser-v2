import * as ts from "typescript";


export function isNodeArray(value: any): value is ts.NodeArray<any> {
  return Array.isArray(value);
}