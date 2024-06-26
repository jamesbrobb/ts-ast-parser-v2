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


const tsNodeFunctions: string[] = [
  /*'getTypeParameterOwner',
  'isParameterPropertyDeclaration',
  'identifierToKeywordKind',
  'getNameOfJSDocTypedef',
  'getNameOfDeclaration',
  'getDecorators',
  'getModifiers',*/
  //'getTypeParameterOwner',
  //'getEffectiveTypeParameterDeclarations',
  //'getEffectiveConstraintOfTypeParameter',
  'isTypeNode',
  //'hasOnlyExpressionInitializer',
  //'isPartOfTypeNode'
]

export function logTsNodeFunctionOutput(node: ts.Node) {

  tsNodeFunctions.forEach((fn) => {
    const result = (ts as any)[fn](node);

    if(result) {
      console.log(`==== ${fn} on ${ts.SyntaxKind[node.kind]} ====`);
      console.log(result);
      console.log(node.getText());
      console.log('=================================')
    }
  });

  if(node.getChildCount() > 0) {
    node.forEachChild((child) => {
      logTsNodeFunctionOutput(child);
    });
  }
}
