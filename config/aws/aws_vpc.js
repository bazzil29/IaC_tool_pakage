const generator = (config)=>{
    return (
`
resource "aws_vpc" "${(!!config.name)?config.name:"main"}" {
cidr_block       = "${(!!config.cidr_block)?config.cidr_block:"10.0.0.0/16"}"
${!!config.instance_tenancy?`instance_tenancy = ${config.instance_tenancy}`:``}
${!!config.enable_dns_support?`enable_dns_support = ${config.enable_dns_support}`:``}
${!!config.enable_dns_hostnames?`enable_dns_hostnames = ${config.enable_dns_hostnames}`:``}
${!!config.enable_classiclink?`enable_classiclink = ${config.enable_classiclink}`:``}
${!!config.enable_classiclink_dns_support?`enable_classiclink_dns_support = ${config.enable_classiclink_dns_support}`:``}
${!!config.assign_generated_ipv6_cidr_block?`assign_generated_ipv6_cidr_block = ${config.assign_generated_ipv6_cidr_block}`:``}
${!!config.tags?`tags = {${config.tags}}`:``}
}\n
`
)
}

module.exports = {generator}