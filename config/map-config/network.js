const aws_vpc = require("../aws/aws_vpc");
const google_compute_network = require("../gcp/google_compute_network");
const aws = (config)=>{
    const code = aws_vpc.generator({
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