const generator = (config)=>{
    // console.log(config);
    let code = ``;
    config.ports.map(port=>{
        code += `
egress {
    protocol = "${port.protocol}"
    rule_no = 100
    action = "${port.action}"
    ${!!port.cidr_block?`cidr_block = "${port.cidr_block}"`:``}
    from_port = ${port.port} 
    to_port =  ${port.port}
}

ingress {
    protocol = "${port.protocol}"
    rule_no = 100
    action = "${port.action}"
    ${!!port.cidr_block?`cidr_block = "${port.cidr_block}"`:``}
    from_port = ${port.port} 
    to_port =  ${port.port}
}
        `  
    })
    return(
`resource "aws_network_acl" "${config.name}" {
    vpc_id = aws_vpc.${config.aws_vpc}.id
    ${code}
}\n
`
    )
}

// const mapping  = config=>generator(map_config.aws(config));

module.exports = {
    generator
}