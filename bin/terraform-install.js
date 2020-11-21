#!/usr/bin/env node

const shelljs = require("shelljs");

const commander = require("commander");
const { version } = require("commander");

commander
    .option("-o,--os <os type>","Choose OS: macos or ubuntu! example: -o ubuntu")
    .helpOption('-h, --HELP', 'read more information')
commander.parse(process.argv);

const os = !!commander.os?commander.os:"";
//need to edit 0.12 LTS
if(os=="macos"){
    shelljs.exec("curl https://releases.hashicorp.com/terraform/0.13.4/terraform_0.13.4_darwin_amd64.zip\
    --output terraform.zip && unzip terraform.zip -d /usr/local/bin")
}else{
    if(os=="ubuntu"){
        shelljs.exec("curl https://releases.hashicorp.com/terraform/0.13.4/terraform_0.13.4_linux_amd64.zip\
    --output terraform.zip && sudo apt install unzip && sudo unzip terraform.zip -d /usr/local/bin")
    }else{
        console.log("Cannot find that os! Please try again!");
    }
}






