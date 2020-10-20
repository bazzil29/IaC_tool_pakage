module.exports = {
    generator: (config)=>{
        return (
`provider "google" {
    project     = "${config.project}"
    region      = "${config.region}"
}\n
`
        )
    }
}