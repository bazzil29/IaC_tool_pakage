const aws_security_group =require("../aws/aws_security_group");
const google_compute_firewall = require("../gcp/google_compute_firewall");

const aws = (config)=>{
    const code = aws_security_group.generator({
        name:config.name,
        aws_vpc:config.network,
        ports:reflectConfig(config,"aws")
    })
    return code;
}

const gcp = (config) =>{
    const code =google_compute_firewall.generator({
        name:config.name,
        google_compute_network:config.network,
        allows:config.allows,
        denies:config.denies
    })
    return code;
}

const reflectConfig  = (config,cloud) =>{
    if(cloud == "aws"){
        let ports = [
            {
                protocol: "-1",
                port: 0,
                cidr_blocks:"0.0.0.0/0",
                type:"egress"
            }
        ];
        
        config.allows.forEach(element => {
            element.ports.forEach(e=>{
                ports.push({
                    protocol: element.protocol,
                    port: e,
                    type:"ingress"
                })
            })
        });
        
        // config.denies.forEach(element => {
        //     element.ports.forEach(e=>{
        //         ports.push({
        //             protocol: element.protocol,
        //             port: e,
        //             action:"deny"
        //         })
        //     })
        // });
        return ports;
    }
}




module.exports  = {
    aws,gcp
}