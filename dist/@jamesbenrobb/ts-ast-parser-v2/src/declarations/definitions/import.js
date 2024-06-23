export const importDeclarationDefinition = {
    props: ['moduleSpecifier', 'importClause', 'modifiers']
};
export const importClauseDefinition = {
    props: ['name', 'isTypeOnly', 'namedBindings']
};
export const namedImportsDefinition = {
    props: ['elements']
};
export const importSpecifierDefinition = {
    props: ['name', 'propertyName', 'isTypeOnly']
};
export const namespaceImportDefinition = {
    props: ['name']
};
/*export function isImportDeclaration(result: any): result is ImportDeclaration {
  return 'kind' in result && result.kind === DeclarationKind.IMPORT
}*/
//# sourceMappingURL=import.js.map