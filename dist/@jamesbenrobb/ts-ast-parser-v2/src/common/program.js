import * as ts from "typescript";
export function createProgram(entryPoint, options) {
    return ts.createProgram([entryPoint], options);
}
//# sourceMappingURL=program.js.map