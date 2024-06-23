export const tupleTypeNodeDefinition = {
    props: ["elements"]
};
export const namedTupleMemberDefinition = {
    props: ["name", "type", "dotDotDotToken", "questionToken"],
    propHandlers: {
        dotDotDotToken: {
            propName: 'rest',
            parseFn: (node) => !!node
        },
        questionToken: {
            propName: 'optional',
            parseFn: (node) => !!node
        }
    }
};
//# sourceMappingURL=tuple.js.map