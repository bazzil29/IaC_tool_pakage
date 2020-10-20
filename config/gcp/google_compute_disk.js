const generator = (config)=>{
    return(
`
resource "google_compute_disk" "${config.name}" {
    name  = "${config.name}"

    ${!!config.type?`type = "${config.type}"`:``}
    ${!!config.labels?`labels = ${config.labels}`:``}
    ${!!config.physical_block_size_bytes?`physical_block_size_bytes = ${config.physical_block_size_bytes}`:``}
    ${!!config.image?`image = ${config.image}`:``}
    ${!!config.zone?`zone = "${config.zone}"`:``}
    ${!!config.source_image_encryption_key?`source_image_encryption_key = ${config.source_image_encryption_key}`:``}
    ${!!config.disk_encryption_key?`disk_encryption_key = ${config.disk_encryption_key}`:``}
    ${!!config.snapshot?`snapshot = ${config.snapshot}`:``}
    ${!!config.source_snapshot_encryption_key?`source_snapshot_encryption_key = ${config.source_snapshot_encryption_key}`:``}
    ${!!config.project?`project = ${config.project}`:``}
${!!config.description?`description = ${config.description}`:``}
}\n
`
    )
}


module.exports =  {
    generator
}

