export const methodDeclarationDefinition = {
    props: ['name', 'parameters', 'type', 'typeParameters', 'modifiers']
};
/*export function getPublicMethodSignatures(methods: MethodDeclaration[]): string[] {
  return methods
    .filter(mthd => isPublic(mthd.name, mthd))
    .map(mthd => mthd.signature);
}*/
/*function getMethodSignature(name: string, parameters: Parameter[], modifiers?: Modifiers, type: string = 'void'): string {

  const params = getParametersAsString(parameters),
    decorators = getDecoratorsAsString(modifiers),
    keywords = getKeywordsAsString(modifiers);

  return `${decorators}${keywords}${name}(${params}): ${type === 'void' && keywords.includes('async') ? 'Promise<void>' : type}`;
}*/
//# sourceMappingURL=method.js.map