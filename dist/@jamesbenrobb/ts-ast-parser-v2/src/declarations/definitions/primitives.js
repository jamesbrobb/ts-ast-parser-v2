import * as ts from "typescript";
import { stripQuotes } from "../../utils/string";
export function parseObjectLiteral(node, sourceFile, parser) {
    const res = {};
    node.forEachChild((child) => {
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
export function parseArrayLiteral(node, sourceFile, parser) {
    return node.elements.map((element) => parser.parse(element, sourceFile));
}
export function parseBoolean(node, sourceFile) {
    return node.getText(sourceFile) === 'true';
}
export function parseString(node, sourceFile) {
    return stripQuotes(ts.isStringLiteral(node) ? node.text : node.getText(sourceFile));
}
//# sourceMappingURL=primitives.js.map