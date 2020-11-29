#!/usr/bin/env node
const commander = require("commander");

const aws_gen = require("../config/aws");
const gcp_gen = require("../config/gcp");

const mapping_config = require("../config/map-config/index");
const sortResources = require("../config/sort-resources").sortResources;

const getMappingConfig = require("../swap/get-config/aws")

const fs = require("fs-extra");

commander
    .requiredOption("-t,--type <cloud flatform or type to gen>","aws,gcp,multi,swap")
    .option("-c,--cloud <cloud flatform>","aws or gcp flatform's code base to convert if use swap type","aws")
    .requiredOption("-f,--file <path to file>","path file to read")
    .option("-o,--output <out put file>","Name file and path to store code, default is \"resources.tf\"","resources.tf")

commander.parse(process.argv);

if(commander.type == "aws"){

    if(!!!commander.file){
        console.log("Error: File location is wrong, check your \"-f\" parameter!");
        return;
    }
    
    const CONFIG = JSON.parse(fs.readFileSync(commander.file));
    let terraform_code = "";

    terraform_code += aws_gen.provider.generator(CONFIG.provider);
    
    CONFIG.resources.map((rs)=>{
        terraform_code +=`\n${aws_gen[rs.resource].generator(rs.config)}`; 
    })
    fs.outputFile(commander.output,terraform_code,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log(`Output code is wrote in ${commander.output}!`);
    })
}



if(commander.type == "gcp") {

    const CONFIG = JSON.parse(fs.readFileSync(commander.file));
    let terraform_code = "";

    terraform_code = `${gcp_gen.provider.generator(CONFIG.provider)}`;
    CONFIG.resources.map((e)=>{
        if(e.type = "resource"){
            terraform_code += gcp_gen[e.resource].generator(e.config);
        }
    })


    fs.outputFile(commander.output,terraform_code,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log(`Output code is wrote in ${commander.output}!`);
    })
}

if(commander.type == "multi") {
    const CONFIG = JSON.parse(fs.readFileSync(commander.file));

    let gcpCode = `${mapping_config.provider.gcp(CONFIG)}`;
    let awsCode = `${mapping_config.provider.aws(CONFIG)}`;
    
    CONFIG.resources = sortResources(CONFIG.resources,"map");

    CONFIG.resources.map(resource=>{
        gcpCode+=mapping_config[resource.resource].gcp(resource);
        awsCode+=mapping_config[resource.resource].aws(resource);
    })

    fs.outputFile("./gennerated/gcp/gcp-resources.tf",gcpCode,(error)=>{
        if(!!error){
            console.log(error);
            return
        }
    })
    fs.outputFile("./gennerated/aws/aws-resources.tf",awsCode,(error)=>{
        if(!!error){
            console.log(error);
            return
        }
    })

    console.log("Gennerated!")

}

if(commander.type == "swap"){
    if(commander.cloud == "aws"){
        const CONFIG = getMappingConfig.getConfig(commander.file);
        let gcpCode = `${mapping_config.provider.gcp(CONFIG)}`;
        CONFIG.resources.map(resource=>{
            gcpCode+=mapping_config[resource.resource].gcp(resource);
        })

        fs.outputFile(commander.output,gcpCode,(error)=>{
            if(!!error){
                console.log(error);
                return
            }
        })
        console.log(`Output code is wrote in ${commander.output}!`);
        
    }else{
        console.log("Feature is developing!")
    }
}
