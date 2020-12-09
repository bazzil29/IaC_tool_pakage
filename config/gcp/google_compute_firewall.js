const configCode = (protocols,isALlow)=>{
  let code = ``;
  protocols.forEach((e)=>{
    code += `${isALlow?"allow":"deny"} {
      protocol="${e.protocol}"
      ports=[${e.ports.map(port=>`"${port.toString()}"`)}]
    }\n`
  })
  return code;
}

const generator = (config)=>{
  return (
`
${config.allows.length>0?`

resource "google_compute_firewall" "allow-${!!config.name?config.name:"default_firewall"}" {
  name = "allow-${!!config.name?config.name:"default_firewall"}"
  network = "${!!config.google_compute_network?config.google_compute_network:"default_vpc"}"
  ${!!config.description?`description = "${config.description}"`:``}
  ${!!config.destination_ranges?`destination_ranges = "${config.destination_ranges}"`:``}
  ${!!config.direction?`direction = "${config.direction}"`:``}
  ${!!config.disabled?`disabled = "${config.disabled}"`:``}
  ${!!config.log_config?`log_config = "${config.log_config}"`:``}
  ${!!config.priority?`priority = "${config.priority}"`:``}
  ${!!config.source_ranges?`source_ranges = "${config.source_ranges}"`:``}
  ${!!config.source_service_accounts?`source_service_accounts = "${config.source_service_accounts}"`:``}
  ${!!config.source_tags?`source_tags = "${config.source_tags}"`:``}
  ${!!config.target_service_accounts?`target_service_accounts = "${config.target_service_accounts}"`:``}
  target_tags = ["allow-${!!config.name?config.name:"default_firewall"}"]
  ${!!config.project?`project = "${config.project}"`:``}
  ${!!config.enable_logging?`enable_logging = "${config.enable_logging}"`:``}
  ${!!config.allows?configCode(config.allows,true):''}
}\n
`:``}

${config.denies.length>0?`
resource "google_compute_firewall" "deny-${!!config.name?config.name:"default_firewall"}" {
  name = "deny-${!!config.name?config.name:"default_firewall"}"
  network = "${!!config.google_compute_network?config.google_compute_network:"default_vpc"}"
  ${!!config.description?`description = "${config.description}"`:``}
  ${!!config.destination_ranges?`destination_ranges = "${config.destination_ranges}"`:``}
  ${!!config.direction?`direction = "${config.direction}"`:``}
  ${!!config.disabled?`disabled = "${config.disabled}"`:``}
  ${!!config.log_config?`log_config = "${config.log_config}"`:``}
  ${!!config.priority?`priority = "${config.priority}"`:``}
  ${!!config.source_ranges?`source_ranges = "${config.source_ranges}"`:``}
  ${!!config.source_service_accounts?`source_service_accounts = "${config.source_service_accounts}"`:``}
  ${!!config.source_tags?`source_tags = "${config.source_tags}"`:``}
  ${!!config.target_service_accounts?`target_service_accounts = "${config.target_service_accounts}"`:``}
  target_tags = ["deny-${!!config.name?config.name:"default_firewall"}"]
  ${!!config.project?`project = "${config.project}"`:``}
  ${!!config.enable_logging?`enable_logging = "${config.enable_logging}"`:``}
  ${!!config.denies?configCode(config.denies,false):""}
}\n
`:``}
`
  )
}

module.exports ={
  generator
}