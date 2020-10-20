const generator = (config)=>{
    return (
`resource "google_compute_subnetwork" "${!!config.name?config.name:"default_subnet"}" {
    name = "${!!config.name?config.name:"default_subnet"}"
    ip_cidr_range = "${!!config.ip_cidr_range?config.ip_cidr_range:"10.10.1.0/24"}"
    network = google_compute_network.${!!config.google_compute_network?config.google_compute_network:"vpc"}.name
    ${!!config.region?`region = "${config.region}"`:``}
    ${!!config.project?`project = "${config.project}"`:``}
    ${!!config.log_config?`log_config = "${config.log_config}"`:``}
    ${!!config.private_ip_google_access?`private_ip_google_access = "${config.private_ip_google_access}"`:``}
    ${!!config.secondary_ip_range?`secondary_ip_range = "${config.secondary_ip_range}"`:``}
    ${!!config.description?`description = "${config.description}"`:``}
}\n
`
    )
}




module.exports = {
    generator
}