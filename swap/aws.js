#!/usr/bin/env node
const commander = require("commander");
const aws_reader =  require("./reader/aws");
const region_map_config =  require("../config/map-config/region");
const sortResources = require("../config/sort-resources");
const mapGen = require("../cmd/map/index");
const storage_map_config = require("../config/map-config/storage");

commander
    .option("-f,--file <path to file>","path to tf file");

commander.parse(process.argv);


const removeDoubleQuote = (rawText)=>{
    const text = rawText.replace(/\"/g,'');
    return text;
}

const getMidValue = (rawText) =>{
    return rawText.trim().split(".")[1];
}

const connectStorages = (instances,storages,storageAtts) =>{
    storageAtts.forEach((e)=>{
        if(storages.find(storage=>storage.name==e.storage)){
            instances.forEach((instance)=>{
                if(e.instance == instance.name){
                    instance.disk = e.storage
                }
            })
        }else{
            console.log(`Your ${storageAtts.storage} storage is not refferered to any resource!`)
        }
    })
} 


const connectNetworks = (instances,networks,subnetworks,networkAtts)=>{
    networkAtts.forEach(e=>{
        
        if(networks.find(network=>network.name == networkAtts.network)){
            instances.forEach(instance=>{
                if(e.instance == instance.name){
                    instance.network = e.network;
                }
            })
        }else{
            console.log(`Your ${e.network} network is not refferered to any resource!`)
        }

        if(subnetworks.find(subnetwork=>subnetwork.name == e.subnet)){
            instances.forEach(instance=>{
                if(e.instance == instance.name){
                    instance.subnetwork = e.subnet;
                }
            })
        }else{
            console.log(`Your ${e.network} subnetwork is not refferered to any resource!`)
        }
    })
}

const checkFirewalls = (firewalls)=>{
    
    firewalls.forEach(e=>{
        const allows = {protocols:{}};
        const denies = {protocols:{}};
        if(!!e.ingress){
            e.ingress.forEach(protocol =>{
                const  protocol_name = removeDoubleQuote(protocol.protocol); 
                if(!!allows.protocols[protocol_name]&&removeDoubleQuote(protocol.action)=="allow"){
                    allows.protocols[protocol_name].ports.push(protocol.from_port);
                }
                if(!!!allows.protocols[protocol_name]&&removeDoubleQuote(protocol.action)=="allow"){
                    allows.protocols[protocol_name] = {protocol:protocol_name,ports:[protocol.from_port]}
                }
                if(!!denies.protocols[protocol_name]&&removeDoubleQuote(protocol.action)=="deny"){
                    denies.protocols[protocol_name].ports.push(protocol.from_port);
                }
                if(!!!denies.protocols[protocol_name]&&removeDoubleQuote(protocol.action)=="deny"){
                    denies.protocols[protocol_name] = {protocol:protocol_name,ports:[protocol.from_port]}
                }
            })
        }
        // console.log(Object.keys(allows.protocols).map(e=>allows.protocols[e]));
        e.allows = Object.keys(allows.protocols).map(e=>allows.protocols[e])
        e.denies = Object.keys(denies.protocols).map(e=>denies.protocols[e])
        // console.log(e);
    })


}


const getMapConfig = (provider,instances,networks,subnetworks,storages,firewalls)=>{
    const config = {location:provider.location};
    const resources = [];

    instances.map(e=>resources.push(e));
    networks.map(e=>resources.push(e));
    subnetworks.map(e=>resources.push(e));
    storages.map(e=>resources.push(e));
    firewalls.map(e=>resources.push(e));
    config.resources = sortResources.sortResources(resources,"map");
    
    return config;
}





try{
    const file_path = !!commander.file?commander.file:"";
    const rawResources = aws_reader.read(file_path);
    // console.log(rawResources);
    const provider = {}
    const networks = [];
    const instances = [];
    const storages = [];
    const storageAtts = [];
    const networkAtts= [];
    const firewalls = [];
    const os = [];
    const subnetworks = []; 
    rawResources.forEach((e)=>{
        // console.log(region_map_config.getLocation("afsf","aws"));
        if(e.resourceType == "provider"){
            provider.location = region_map_config.getLocation(e.region,"aws");
            // console.log(region_map_config.getLocation(e.region,"aws"));
        }
        
        if(e.resourceType =="data"){
            if(removeDoubleQuote(e.cloudType) =="aws_ami"){
                const osTmp = {};
                osTmp.name = removeDoubleQuote(e.name);
                osTmp.type = e.filter.values.includes("ubuntu")?"ubuntu":"centos";
                os.push(osTmp);
            }   
        }

        if(e.resourceType == "resource"){
            if(removeDoubleQuote(e.cloudType) == "aws_instance"){
                const instance = {};
                instance.resource = "instance";
                instance.name = removeDoubleQuote(e.name);
                instance.data_ami = e.ami;
                instance.instance_type = removeDoubleQuote(e.instance_type);
                instances.push(instance);
            }

            if(removeDoubleQuote(e.cloudType) == "aws_vpc"){
                const network  = {} 
                network.resource = "network";
                network.name = removeDoubleQuote(e.name);
                networks.push(network);
            }

            if(removeDoubleQuote(e.cloudType) == "aws_volume_attachment"){
                const storageAtt = {};
                storageAtt.name = removeDoubleQuote(e.name);
                storageAtt.instance = getMidValue(e.instance_id);
                storageAtt.storage = getMidValue(e.volume_id);
                storageAtts.push(storageAtt);
            }
            if(removeDoubleQuote(e.cloudType) == "aws_ebs_volume"){
                const storage = {};
                storage.resource = "storage";
                storage.name = removeDoubleQuote(e.name);
                storage.size = e.size;
                storage.zone = removeDoubleQuote(e.availability_zone);
                storage.storage_type = storage_map_config.getDiskType(removeDoubleQuote(e.type),"aws");
                storages.push(storage);
            }
            if(removeDoubleQuote(e.cloudType) == "aws_subnet"){
                const subnet = {};
                subnet.network = getMidValue(e.vpc_id);
                subnet.name = removeDoubleQuote(e.name);
                subnet.cidr_block = removeDoubleQuote(e.cidr_block);
                subnet.resource = "subnetwork"
                subnetworks.push(subnet);
            }
            if(removeDoubleQuote(e.cloudType) == "aws_network_interface"){
                const networkAtt = {};
                networkAtt.instance =  getMidValue(e.attachment.instance);
                networkAtt.subnet = getMidValue(e.subnet_id);
                networkAtts.push(networkAtt);
            }
            if(removeDoubleQuote(e.cloudType) == "aws_network_acl"){
                    const firewall = {};
                    firewall.name = removeDoubleQuote(e.name);
                    firewall.resource = "firewall";
                    firewall.network = getMidValue(e.vpc_id);
                    firewall.ingress = e.ingress;
                    firewall.egress = e.egress;
                    firewalls.push(firewall);
            }
        }    
    })

    connectStorages(instances,storages,storageAtts);
    connectNetworks(instances,networks,subnetworks,networkAtts);
    checkFirewalls(firewalls);
    const config = getMapConfig(provider,instances,networks,subnetworks,storages,firewalls);
    const code = mapGen.getCode(config);
    console.log(config)
    console.log(code.aws.toString());
}catch(error){
    console.log(error);
}






