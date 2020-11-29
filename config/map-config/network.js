const aws_vpc = require("../aws/aws_vpc");
const aws_internet_gateway = require("../aws/aws_internet_gateway");
const google_compute_network = require("../gcp/google_compute_network");
const aws = (config)=>{
    let code = aws_internet_gateway.generator({
        name:config.name+"-gateway",
        aws_vpc:config.name
    })

    code += `resource "aws_route_table" "${(!!config.name)?config.name+"route-table":"default-route-table"}" {
        vpc_id = aws_vpc.${config.name}.id
        route {
            cidr_block = "0.0.0.0/0"
            gateway_id = aws_internet_gateway.${config.name+"-gateway"}.id
        }
    }`
    code += aws_vpc.generator({
        name:config.name,
        cidr_block:config.cidr_block
    });
    return code; 
}

const gcp = (config)=>{ 
    const code =  google_compute_network.generator({
        name:config.name
    })
    return code;  
}

module.exports = {
    aws,gcp
}