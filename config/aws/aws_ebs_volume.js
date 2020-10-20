// const map_config =  require("../map-config/storage");
const generator = (config)=>{
    return (
`resource "aws_ebs_volume" "${(!!config.name)?config.name:"main_ebs"}" {
    availability_zone = "${(!!config.availability_zone)?config.availability_zone:"ap-southeast-2"}"
    ${!!config.size?`size = ${config.size}`:``}
    ${!!config.type?`type = "${config.type}"`:``}
    ${!!config.tags?`tags = {${config.tags}}`:``}
    ${!!config.encrypted?`encrypted = {${config.encrypted}}`:``}
    ${!!config.iops?`iops = {${config.iops}}`:``}
    ${!!config.multi_attach_enabled?`multi_attach_enabled = {${config.multi_attach_enabled}}`:``}
    ${!!config.snapshot_id?`snapshot_id = {${config.snapshot_id}}`:``}
    ${!!config.outpost_arn?`outpost_arn = {${config.outpost_arn}}`:``}
    ${!!config.volume_type?`outpost_arn = {${config.volume_type}}`:``}
    ${!!config.kms_key_id?`kms_key_id = {${config.kms_key_id}}`:``}
}\n               
`)
}

// const mapping = config=>generator(map_config.aws(config));

module.exports = {
    generator
}