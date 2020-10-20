const subnet = require("./map-config/subnetwork");



const sortResources = (resources,cloudType)=>{
    if(cloudType == "aws"){
        resources.map(resource =>{
            if(resource.resource == "aws_vpc"){
                resource.point = 0;
                return
            }

            if(resource.resource == "aws_ebs_volume"){
                resource.point = 0;
                return
            }

            if(resource.resource == "aws_instance"){
                resource.point = 2;
                return
            }

            if(resource.resource == "aws_subnet"){
                resource.point = 1;
                return
            }
            
            if(resource.resource == "aws_network_acl"){
                resource.point = 1;
                return
            }

            if(resource.resource == "aws_route_table"){
                resource.point = 1;
                return
            }

            if(resource.resource == "aws_internet_gateway"){
                resource.point = 1;
                return
            }

        })
        resources.sort((a,b)=>a.point-b.point)
        return resources;
    }
    
    if(cloudType == "gcp"){
        resources.map(resource =>{
            if(resource.resource == "google_compute_network"){
                resource.point = 0;
                return
            }

            if(resource.resource == "google_compute_disk"){
                resource.point = 0;
                return
            }

            if(resource.resource == "google_compute_instance"){
                resource.point = 2;
                return
            }

            if(resource.resource == "google_compute_subnetwork"){
                resource.point = 1;
                return
            }
            
            if(resource.resource == "google_compute_firewall"){
                resource.point = 1;
                return
            }

        })
        resources.sort((a,b)=>a.point-b.point)
        return resources;
    }

    if(cloudType == "map"){
        resources.map(resource =>{
            if(resource.resource == "network"){
                resource.point = 0;
                return
            }

            if(resource.resource == "storage"){
                resource.point = 0;
                return
            }

            if(resource.resource == "instance"){
                resource.point = 2;
                return
            }

            if(resource.resource == "subnetwork"){
                resource.point = 1;
                return
            }
            
            if(resource.resource == "firewall"){
                resource.point = 1;
                return
            }

        })
        resources.sort((a,b)=>a.point-b.point)
        return resources;
    }
    
}


//sort by point indexing


module.exports = {sortResources};