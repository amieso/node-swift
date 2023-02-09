#!/usr/bin/env node

import * as builder from "./builder";

function usage(): never {
    console.log("Usage: node-swift [rebuild [--debug] | build [--debug] | clean]");
    process.exit(1);
}

async function doClean(checkArgs: boolean = false) {
    if (checkArgs && process.argv.length !== 3) usage();
    await builder.clean();
}

async function doBuild() {
    let mode: builder.BuildMode;
    if (process.argv.length === 3) {
        mode = "release";
    } else if (process.argv.length === 4 && process.argv[3] === "--debug") {
        mode = "debug";
    } else {
        usage();
    }
    const config = require("import-cwd")("./package.json").swift || {};
    await builder.build(mode, "arm64", config);
    await builder.build(mode, "x86_64", config);
}

(async () => {
    if (process.argv.length == 2) {
        process.argv.push("rebuild");
    }

    switch (process.argv[2]) {
        case "build":
            await doBuild();
            break;
        case "clean":
            await doClean(true);
            break;
        case "rebuild":
            await doClean();
            await doBuild();
            break;
        default:
            usage();
    }
})();
