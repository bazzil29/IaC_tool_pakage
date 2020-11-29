const generator = (config)=>{
    // console.log(config);
    let code = ``;
    config.ports.map(port=>{
        if(port.type=="ingress"){
            code += `
            ingress {
                protocol = "${port.protocol}"
                ${!!port.cidr_block?`cidr_blocks= ["${port.cidr_block}"]`:`cidr_blocks = ["0.0.0.0/0"]`}
                from_port = ${port.port} 
                to_port =  ${port.port}
            }
                    `  
        }else{
            code +=`
            egress {
                protocol = "${port.protocol}"
                ${!!port.cidr_block?`cidr_blocks = ["${port.cidr_block}"]`:`cidr_blocks= ["0.0.0.0/0"]`}
                from_port = ${port.port} 
                to_port =  ${port.port}
              }
            `
        }  
    })
    return(
`resource "aws_security_group" "${config.name}" {
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