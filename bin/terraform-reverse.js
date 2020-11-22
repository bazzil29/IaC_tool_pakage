#!/usr/bin/env node
const commander = require("commander");
const shelljs = require("shelljs");


commander
    .option("-build,--build","Build Terraformer Bin")

commander.parse(process.argv);


if(!!commander.build){
    shelljs.exec("cd terraformer/ && go mod download && go build -v && cp terraformer /usr/local/bin && cd ..");
}else{
    shelljs.exec("terraformer");
}









