#!/usr/bin/env node
const commander = require("commander");
const mapping_config = require("../../config/map-config/index");
const sortResources =  require("../../config/sort-resources").sortResources;

const fs = require("fs");

// commander
//     .option("-f,--file <path to file>","Use JSON config file to generate terraform code!");

// commander.parse(process.argv);


getCode = (config)=>{
    let gcpCode = `${mapping_config.provider.gcp(config)}`;
    let awsCode = `${mapping_config.provider.aws(config)}`;
    config.resources = sortResources(config.resources,"map");
    config.resources.map(resource=>{
        gcpCode+=mapping_config[resource.resource].gcp(resource);
        awsCode+=mapping_config[resource.resource].aws(resource);
    })

    return {aws: awsCode,gcp: gcpCode};
}

// try {
//     // const config_path = !!commander.file?commander.file:"";
//     const config = JSON.parse(fs.readFileSync(config_path));
//     let gcpCode = `${mapping_config.provider.gcp(config)}`;
//     let awsCode = `${mapping_config.provider.aws(config)}`;
//     config.resources = sortResources(config.resources,"map");
//     config.resources.map(resource=>{
//         gcpCode+=mapping_config[resource.resource].gcp(resource);
//         awsCode+=mapping_config[resource.resource].aws(resource);
//     })

//     fs.writeFile("./gcp/main.tf",gcpCode,(error)=>{
//         if(!!error){
//             console.log(error);
//         }
//     })
//     fs.writeFile("./aws/main.tf",awsCode,(error)=>{
//         if(!!error){
//             console.log(error);
//         }
//     })
// } catch (error) {
//     console.log(error);
//     console.log("Error: File location is wrong, check your \"-f\" parameter!");
// }

module.exports = { getCode };


