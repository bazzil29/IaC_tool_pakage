#!/usr/bin/env node
const readline = require("readline-sync");
const commander = require("commander");

//const { ec2 } = require("../../config/aws/config");
const aws_gen = require("../../config/aws");

const fs = require("fs");

commander
    .option("-f,--file <path to file>","Use JSON config file to generate terraform code!");

commander.parse(process.argv);

try {
    const config_path = !!commander.file?commander.file:"";
    const config = JSON.parse(fs.readFileSync(config_path));
    let terraform_code = aws_gen.provider.generator(config.provider);
    
    config.resources.map((rs)=>{
        // console.log(rs.resource);
        terraform_code +=`\n${aws_gen[rs.resource].generator(rs.config)}`; 
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
