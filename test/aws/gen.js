#!/usr/bin/env node
const readline = require("readline-sync");
const commander = require("commander");

//const { ec2 } = require("../../config/aws/config");
const aws_gen = require("../../config/aws");

const fs = require("fs");

commander
    .option("-f,--file <path to file>","Use JSON config file to generate terraform code!")
    .option("-o,--output <out put file>","Name file and path to store code")

commander.parse(process.argv);

try {
    if(!!!commander.file){
        console.log("Error: File location is wrong, check your \"-f\" parameter!");
        return;
    }
    const config = JSON.parse(fs.readFileSync(commander.file));

    let terraform_code = aws_gen.provider.generator(config.provider);
    
    config.resources.map((rs)=>{
        terraform_code +=`\n${aws_gen[rs.resource].generator(rs.config)}`; 
    })

    const outputfile = !!commander.output?commander.output:"resources.tf";

    fs.writeFile(outputfile,terraform_code,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log(`Output code is wrote in ${outputfile}!`)
    })
    
} catch (error) {
    console.log(error);
}
