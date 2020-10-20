module.exports = {
    generator : (config)=>{
        return(
`
provider "aws" {
    region = "${config.region}"
}\n
`
        )
    }
}