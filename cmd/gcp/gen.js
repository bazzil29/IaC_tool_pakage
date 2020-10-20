#!/usr/bin/env node
const readline = require("readline-sync");
const commander = require("commander");
const gcp_gen = require("../../config/gcp");

const fs = require("fs");
commander
    .option("-f,--file <path to file>","Use JSON config file to generate terraform code!");
commander.parse(process.argv);
try {
    const config_path = !!commander.file?commander.file:"";
    const config = JSON.parse(fs.readFileSync(config_path));
    var terraform_code = `${gcp_gen.provider.generator(config.provider)}`;
    config.resources.map((e)=>{
        if(e.type = "resource"){
            terraform_code += gcp_gen[e.resource].generator(e.config);
        }
    })

    fs.writeFile("main.tf",terraform_code,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log("Output code is wrote in main.tf!")
    })

} catch (error) {
    console.log(error);
    console.log("Error: File location is wrong, check your \"-f\" parameter!");
}
