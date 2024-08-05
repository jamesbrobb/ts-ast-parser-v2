import * as ts from "typescript";
import {getParsedTSConfig} from "./config";


export function createProgram(debug?: boolean): ts.Program {

  const config = getParsedTSConfig(),
    entryFile = config.fileNames[0],
    program = ts.createProgram([entryFile], config.options);

  if(debug) {
    console.log('================= PROGRAM =================')
    console.log('root file:', program.getRootFileNames()[0]);
    console.log('current directory:', program.getCurrentDirectory());
    console.log('compiler options:', program.getCompilerOptions());
    console.log('===========================================')
  }

  return program;
}
