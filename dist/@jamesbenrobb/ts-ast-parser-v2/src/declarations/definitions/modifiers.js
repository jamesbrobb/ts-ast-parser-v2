import * as ts from "typescript";
import { getDecorator } from "./decorator";
const modifiersMap = {
    [ts.SyntaxKind.PrivateKeyword]: 'private',
    [ts.SyntaxKind.ProtectedKeyword]: 'protected',
    [ts.SyntaxKind.PublicKeyword]: 'public',
    [ts.SyntaxKind.StaticKeyword]: 'static',
    [ts.SyntaxKind.ReadonlyKeyword]: 'readonly',
    [ts.SyntaxKind.AbstractKeyword]: 'abstract',
    [ts.SyntaxKind.AsyncKeyword]: 'async',
    [ts.SyntaxKind.ConstKeyword]: 'const',
    [ts.SyntaxKind.DeclareKeyword]: 'declare',
    [ts.SyntaxKind.DefaultKeyword]: 'default',
    [ts.SyntaxKind.ExportKeyword]: 'export'
};
export function getModifiers(node, sourceFile, parser) {
    if (!('modifiers' in node) || !Array.isArray(node.modifiers) || node.modifiers.length === 0) {
        return;
    }
    const modifiers = {};
    node.modifiers.forEach(modifier => {
        if (ts.isDecorator(modifier)) {
            if (!modifiers.decorators) {
                modifiers.decorators = [];
            }
            modifiers.decorators.push(getDecorator(modifier, sourceFile, parser));
            return;
        }
        const keyword = modifiersMap[modifier.kind];
        if (keyword) {
            if (!modifiers.keywords) {
                modifiers.keywords = [];
            }
            modifiers.keywords.push(keyword);
        }
    });
    return modifiers;
}
export function isPublic(name, modifiers) {
    return !(isPrivate(name, modifiers) || isProtected(name, modifiers));
}
export function isPrivate(name, modifiers) {
    if (name.startsWith('#')) {
        return true;
    }
    return hasKeyword('private', modifiers);
}
export function isProtected(name, modifiers) {
    if (isPrivate(name, modifiers)) {
        return false;
    }
    return hasKeyword('protected', modifiers);
}
export function isStatic(modifiers) {
    return hasKeyword('static', modifiers);
}
export function isReadonly(modifiers) {
    return hasKeyword('readonly', modifiers);
}
export function isAbstract(modifiers) {
    return hasKeyword('abstract', modifiers);
}
export function isAsync(modifiers) {
    return hasKeyword('async', modifiers);
}
export function isConst(modifiers) {
    return hasKeyword('const', modifiers);
}
export function isDeclare(modifiers) {
    return hasKeyword('declare', modifiers);
}
export function isDefault(modifiers) {
    return hasKeyword('default', modifiers);
}
export function isExport(modifiers) {
    return hasKeyword('export', modifiers);
}
export function isDecorated(modifiers) {
    return !(!modifiers || !modifiers.decorators || !modifiers.decorators.length);
}
export function isDecoratedWith(type, modifiers) {
    if (!isDecorated(modifiers)) {
        return false;
    }
    return modifiers.decorators.some(decorator => decorator.type === type);
}
export function getDecoratorsAsString(modifiers, separator = '\n') {
    if (!isDecorated(modifiers)) {
        return '';
    }
    return `${modifiers.decorators
        .map(decorator => decorator.signature)
        .join(separator)}${separator}`;
}
export function hasKeywords(modifiers) {
    return !(!modifiers || !modifiers.keywords || !modifiers.keywords.length);
}
export function hasKeyword(keyword, modifiers) {
    if (!hasKeywords(modifiers)) {
        return false;
    }
    return modifiers.keywords.indexOf(keyword) !== -1;
}
export function getKeywordsAsString(modifiers, seperator = ' ', showPublic = false) {
    if (!hasKeywords(modifiers)) {
        return '';
    }
    return `${modifiers.keywords
        .filter(keyword => showPublic || keyword !== 'public')
        .join(seperator)}${seperator}`;
}
//# sourceMappingURL=modifiers.js.map