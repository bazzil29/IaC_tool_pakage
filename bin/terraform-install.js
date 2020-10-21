#!/usr/bin/env node

const shelljs = require("shelljs");

const commander = require("commander");
const { version } = require("commander");

commander
    .option("-o,--os <os type>","Choose OS: macos or linux! example: -o linux")
commander.parse(process.argv);

const os = !!commander.os?commander.os:"";

if(os=="macos"){
    shelljs.exec("curl https://releases.hashicorp.com/terraform/0.13.4/terraform_0.13.4_darwin_amd64.zip\
    --output terraform.zip && unzip terraform.zip -d /usr/local/bin")
}else{
    if(os=="linux"){
        shelljs.exec("curl https://releases.hashicorp.com/terraform/0.13.4/terraform_0.13.4_linux_amd64.zip\
    --output terraform.zip && unzip terraform.zip -d /usr/local/bin")
    }else{
        console.log("Cannot find that os! Please try again!");
    }
}






