const region_map_config = require("./region");
const aws_subnet = require("../aws/aws_subnet");
const google_compute_subnetwork = require("../gcp/google_compute_subnetwork");

const aws = (config)=>{
    const code = aws_subnet.generator({
        name:config.name,
        aws_vpc:config.network,
        cidr_block:config.cidr_block,
        // availability_zone:region_map_config.getZone(config.location,"aws")
    });
    return code;
}


const gcp = (config) =>{
    const code = google_compute_subnetwork.generator({
        name:config.name,
        ip_cidr_range:config.cidr_block,
        google_compute_network:config.network,
        // region:region_map_config.getRegion(config.location,"gcp")
    })
    return code;
}

module.exports = {
    aws, gcp
}