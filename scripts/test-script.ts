import * as path from "node:path";
import {parse} from "../src";


function run() {

    const sourcePath = process.argv.slice(2)[0];

    let relativePath = sourcePath;

    if (path.isAbsolute(sourcePath)) {
        relativePath = path.relative(process.cwd(), sourcePath);
    }

    const dir = path.dirname(relativePath);

    process.chdir(dir);

    parse(sourcePath);
}


run();