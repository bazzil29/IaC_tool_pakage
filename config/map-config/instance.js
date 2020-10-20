const aws_instance = require("../aws/aws_instance");
const google_compute_instance = require("../gcp/google_compute_instance");

const instanceFilter = (type,cloud)=>{
    if(cloud == 'gcp')
        return config="micro"?"e2-micro":(config="small"?"e2-small":"e2-medium") 
    else
        if(cloud == 'aws')
            return config="micro"?"t2.micro":(config="small"?"t2.small":"t2.medium")
}

const osFilter = (type,cloud)=>{
    
}

const aws = (config) => {
    const code  = aws_instance.generator( {
        name:config.name,
        instance_type:instanceFilter(config.instance_type,"aws"),
        aws_ami: config.os,
        aws_ebs_volume: config.disk,
        aws_subnet:config.subnetwork
    })
    return code;
}

const gcp =(config)=>{
    const code = google_compute_instance.generator({
        name:config.name,
        machine_type:instanceFilter(config.instance_type,"gcp"),
        image:config.os,
        google_compute_network: config.network,
        google_compute_subnetwork: config.subnetwork,
        google_compute_disk:config.disk,
        zone:config.zone
    })
    return code;
}

module.exports = {
    aws,gcp
}


