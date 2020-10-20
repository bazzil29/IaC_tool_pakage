module.exports = {
    generator:(config)=>{
        return(
`
resource  "aws_internet_gateway" "${(!!config.name)?config.name:"main"}" {
    vpc_id = aws_vpc.${config.aws_vpc}.id
    ${!!config.tags?`tags = {${config.tags}}`:``}
}\n
`
        )
    }
}