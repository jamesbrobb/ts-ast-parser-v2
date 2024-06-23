import * as ts from "typescript";
export function getDecorator(node, sourceFile, parser) {
    if (!ts.isCallLikeExpression(node)) {
        throw new Error("Decorator Node is not a call like expression");
    }
    let type = "", metadata = {};
    if (ts.isIdentifier(node.expression)) {
        type = parser.parse(node.expression, sourceFile);
    }
    if (ts.isCallExpression(node.expression)) {
        type = parser.parse(node.expression.expression, sourceFile);
        metadata = getDecoratorMetadata(node.expression, sourceFile, parser);
    }
    const decorator = {
        type,
        metadata,
        signature: getDecoratorSignature(type, metadata),
        raw: node.getText(sourceFile)
    };
    return decorator;
}
function getDecoratorMetadata(node, sourceFile, parser) {
    let metadata;
    node.arguments.forEach(arg => {
        metadata = metadata || [];
        if (ts.isIdentifier(arg) || ts.isStringLiteral(arg)) {
            metadata.push(parser.parse(arg, sourceFile));
            return;
        }
        if (ts.isObjectLiteralExpression(arg)) {
            metadata.push(parser.parse(arg, sourceFile));
        }
    });
    if (metadata && Array.isArray(metadata) && metadata.length === 1) {
        metadata = metadata[0];
    }
    return metadata;
}
function getDecoratorSignature(type, metaData) {
    switch (typeof metaData) {
        case 'string':
            return `@${type}('${metaData}')`;
        case 'object':
            if (Array.isArray(metaData)) {
                return `@${type}(${metaData.map(item => {
                    if (typeof item === 'string') {
                        return `'${item}'`;
                    }
                    return convertMetadataToString(item);
                }).join(', ')})`;
            }
            return `@${type}(${convertMetadataToString(metaData)})`;
        default:
            return `@${type}()`;
    }
}
function convertMetadataToString(metaData) {
    return Reflect.ownKeys(metaData)
        .map(key => {
        const value = metaData[key];
        return [key, value];
    })
        .sort((a, b) => a.length - b.length)
        .reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentValue.length === 1) {
            return `${accumulator}'${currentValue[0]}'${currentIndex === array.length - 1 ? '' : ', '}`;
        }
        return `${accumulator}${currentIndex === 0 || array[currentIndex - 1].length === 1 ? '{' : ''}${currentValue[0]}: ${currentValue[1]}${currentIndex === array.length - 1 ? '}' : ', '}`;
    }, '');
}
//# sourceMappingURL=decorator.js.map