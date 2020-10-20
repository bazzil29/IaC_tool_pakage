const gcp = [
    {
        location:"usa",
        code:"us-east4-a"
    },
    {
        location:"filand",
        code:"europe-north1-a"
    }
    ,
    {
        location:"belgium",
        code:"europe-west1-b"
    }
    ,
    {
        location:"england",
        code:"europe-west2-c"
    },

    {
        location:"germany",
        code:"europe-west3-a"
    },
    {
        location:"netherlands",
        code:"europe-west4-c"
    },
    {
        location:"switzerland",
        code:"europe-west6-a"
    },
    {
        location:"brazil",
        code:"southamerica-east1-c"
    },
    {
        location:"taiwan",
        code:"asia-east1-a"
    },
    {
        location:"hongkong",
        code:"asia-east2-a"
    },
    {
        location:"japan",
        code:"asia-northeast1-c"
    },
    {
        location:"japan",
        code:"asia-northeast1-c"
    },
    {
        location:"india",
        code:"asia-south1-a"
    },
    {
        location:"singapore",
        code:"asia-southeast1-c"
    },
    {
        location:"australia",
        code:"australia-southeast1-b"
    }
]

const aws = [
    {
        location:"usa",
        code:"us-east-1"
    },
    {
        location:"hongkong",
        code:"ap-east-1"
    },
    {
        location:"india",
        code:"ap-south-1"
    },
    {
        location:"japan",
        code:"ap-northeast-1"
    },
    {
        location:"australia",
        code:"ap-southeast-2"
    },
    {
        location:"singapore",
        code:"ap-southeast-1"
    },
    {
        location:"germany",
        code:"eu-central-1"
    },
    {
        location:"england",
        code:"eu-west-2"
    },
    {
        location:"brazil",
        code:"sa-east-1"
    }
]






// const gcp = [
//     {
//         location:"north-america",
//         regions:[
//             {
//                 location:"usa",
//                 code:"us-east4-a"
//             },
//         ]
//     },
//     {
//         location:"south-america",
//         region:[
//             {
//                 location:"brazil",
//                 code:"southamerica-east1-c"
//             }        
//         ]
//     },
//     {
//         location:"europe",
//         regions:[
//             {
//                 location:"filand",
//                 code:"europe-north1-a"
//             }
//             ,
//             {
//                 location:"belgium",
//                 code:"europe-west1-b"
//             }
//             ,
//             {
//                 location:"england",
//                 code:"europe-west2-c"
//             },
//             {
//                 location:"germany",
//                 code:"europe-west3-a"
//             },
//             {
//                 location:"netherlands",
//                 code:"europe-west4-c"
//             },
//             {
//                 location:"switzerland",
//                 code:"europe-west6-a"
//             },
            
            
//         ]
//     },
//     {
//         location:"asia",
//         regions:[
//             {
//                 location:"taiwan",
//                 code:"asia-east1-a"
//             },
//             {
//                 location:"hongkong",
//                 code:"asia-east2-a"
//             },
//             {
//                 location:"japan",
//                 code:"asia-northeast1-c"
//             },
//             {
//                 location:"japan",
//                 code:"asia-northeast1-c"
//             },
//             {
//                 location:"india",
//                 code:"asia-south1-a"
//             },
//             {
//                 location:"singapore",
//                 code:"asia-southeast1-c"
//             },
//             {
//                 location:"australia",
//                 code:"australia-southeast1-b"
//             },                
//         ]
//     },
// ]

const getLocation = (text,cloud)=>{
    if(cloud == "aws"){
        const location = aws.find(e=>{ return text.includes(e.code)}).location;
        return location;
    }
}

const getZone  = (location,cloud)=>{
    console.log(location);

    if(cloud == "gcp"){
        return gcp.find(element => element.location == location).code;
    }
    else{
        if(cloud == "aws"){
            return aws.find(element => element.location == location).code+"a";
        }
    }
}

const getRegion = (location,cloud)=>{
    if(cloud == "gcp"){
        return gcp.find(element => element.location == location).code.slice(0,-2);
    }
    else{
        if(cloud == "aws"){
            return aws.find(element => element.location == location).code;
        }
    }
}

module.exports = {getRegion,getZone,getLocation};