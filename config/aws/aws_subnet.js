// const map_config = require("../map-config/subnet");
const generator = (config)=>{
return(
`resource "aws_subnet" "${(!!config.name)?config.name:"main"}" {
    vpc_id = aws_vpc.${config.aws_vpc}.id
    cidr_block = "${(!!config.cidr_block)?config.cidr_block:"10.1.1.0/24"}"
    ${!!config.availability_zone?`availability_zone = ${config.availability_zone}`:``}
    ${!!config.ipv6_cidr_block?`ipv6_cidr_block = ${config.ipv6_cidr_block}`:``}
    ${!!config.map_public_ip_on_launch?`map_public_ip_on_launch = ${config.map_public_ip_on_launch}`:``}
    ${!!config.outpost_arn?`outpost_arn = ${config.outpost_arn}`:``}
    ${!!config.assign_ipv6_address_on_creation?`assign_ipv6_address_on_creation = ${config.assign_ipv6_address_on_creation}`:``}
    ${!!config.tags?`tags = ${config.tags}`:``}
}\n`
    )
}

const mapping = config=>generator(map_config.aws(config));

module.exports = {
    generator,mapping
}