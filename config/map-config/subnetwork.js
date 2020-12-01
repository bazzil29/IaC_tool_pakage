const aws_subnet = require("../aws/aws_subnet");
const google_compute_subnetwork = require("../gcp/google_compute_subnetwork");
const REGION = require("./region");

const aws = (config)=>{
    let code = !!config.network?`resource "aws_route_table_association" "${config.name}-${config.network+"route-table"}" {
        subnet_id = aws_subnet.${config.name}.id
        route_table_id = aws_route_table.${config.network+"route-table"}.id
    }\n
    `:"" 
    code += aws_subnet.generator({
        name:config.name,
        aws_vpc:config.network,
        cidr_block:config.cidr_block,
        availability_zone:REGION.getZone(config.zone,"aws")
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