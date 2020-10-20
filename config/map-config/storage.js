const google_compute_disk = require("../gcp/google_compute_disk");
const aws_ebs_volume = require("../aws/aws_ebs_volume");
const REGION = require("./region");

const typeFilter = (type,cloud)=>{
    // console.log(type,cloud)
    if(cloud == "aws"){
        if(type == 'ssd'){
            return "gp2"
        }
        if (type == "hdd") {
            return "sc1"
        }

    }else{
        if(cloud == "gcp"){
            if(type == 'ssd'){
                return "pd-balanced"
            }
            if (type == "hdd") {
                return "pd-standard"
            }
        }
    }
}

const getDiskType  = (type,cloud) =>{
    if(cloud == "aws"){
        if(type == 'gp2'){
            return "ssd"
        }
        if (type == "sc1") {
            return "hdd"
        }

    }else{
        if(cloud == "gcp"){
            if(type == 'pd-balanced'){
                return "ssd"
            }
            if (type == "pd-standard") {
                return "hdd"
            }
        }
    }
}

const aws = (config)=>{
    // console.log(REGION.getRegion(config.zone,"aws"));
    const code = aws_ebs_volume.generator({
        name:config.name,
        availability_zone:REGION.getZone(config.zone,"aws"),
        size:config.size,
        type:typeFilter(config.storage_type,'aws')
    });
    return  code;
}

const gcp = (config) =>{
    // console.log(config);
    const code = google_compute_disk.generator({
        name:config.name,
        zone:REGION.getZone(config.zone,"gcp"),
        size:config.size,
        type:typeFilter(config.storage_type,'gcp')
    });
    return code;
}


module.exports = {
    aws, gcp, getDiskType
}