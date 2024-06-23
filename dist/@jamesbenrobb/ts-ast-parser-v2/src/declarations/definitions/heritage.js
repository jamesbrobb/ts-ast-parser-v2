import * as ts from "typescript";
export const heritageClauseDefinition = {
    props: ['token', 'types'],
    propHandlers: {
        token: (token) => token === ts.SyntaxKind.ExtendsKeyword ? 'extends' : 'implements',
    }
};
export function getHeritageClausesByType(type, clauses) {
    return clauses.filter(clause => clause.token === type)
        .map(clause => clause.types);
}
//# sourceMappingURL=heritage.js.map