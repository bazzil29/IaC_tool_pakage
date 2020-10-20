const fs = require("fs");

const removeCommentLine = (lines)=>{
    let reflectLines = [];
    lines.forEach(line => {
        trimedLine= line.replace(/\s\s+/g,' '); 
        if((!trimedLine.includes("#")||trimedLine[0]!="#")&&trimedLine!=""){
            reflectLines.push(trimedLine.trim());
        }
    });
    return reflectLines;
}


const read = (file_path)=>{
    try {
        const resources = [];
        let textData = fs.readFileSync(file_path,'utf8').toString().trim();;

        let countBraces = 0;
        let isInsideResource = false;
        let isInsideData = false;
        let isInsideProvider = false;
        let isInsideRoute = false;
        let isInsideEgress = false;
        let isInsideIngress = false;
        let isInsideFilter = false;
        let isInsideTag = false;    
        let isInsideAttachment = false;
    
        const lines = removeCommentLine(textData.split("\n"));
    
        for(let i = 0 ; i < lines.length; i++){
            const characterInLine =  lines[i].split(" ");

            // if(characterInLine.length<2){
            //     throw "Format error!"
            // }
    
            if(!isInsideResource&&characterInLine.includes("resource")){
                const resource = {};
                resource.cloudType = characterInLine[1].toString();
                resource.resourceType = "resource"
                resource.name = characterInLine[2].toString();
                isInsideResource = true;
                resources.push(resource);
            }
    
            if(!isInsideProvider&&!isInsideResource&&characterInLine.includes("provider")){
                const provider = {};
                provider.resourceType = "provider"
                isInsideProvider = true;
                provider.cloudType = "provider";
                provider.cloud = characterInLine[1];
                resources.push(provider);
            }
    
            if(!isInsideData&&!isInsideResource&&!isInsideProvider&&characterInLine.includes("data")){
                const data = {};
                data.resourceType = "data"
                isInsideData = true;
                data.cloudType = characterInLine[1];
                data.name = characterInLine[2];
                resources.push(data);
            }
    
    
    
            if(isInsideProvider&&!characterInLine.includes("provider")){
                const k = resources.length - 1;
                if(!!resources[k]){
                    if(countBraces==1){
                        if(characterInLine.includes("=")&&!characterInLine.includes("{")){
                            resources[k][characterInLine[0]]=characterInLine[2]
                        }
                    }
                    if(countBraces>1){
                        console.log(characterInLine)
                    }
                }            
            }
    
            if(isInsideData&&!characterInLine.includes("data")){
                const k = resources.length - 1;
                if(!!resources[k]){
                    if(countBraces==1){
                        if(characterInLine.includes("=")&&!characterInLine.includes("{")){
                            resources[k][characterInLine[0]]=characterInLine[2]
                        }
                            
                        if(characterInLine.includes("{")&&characterInLine.includes("filter")){
                            resources[k][characterInLine[0]]={};
                            isInsideFilter = true;
                        }
                    }
    
                    if(countBraces==2&&isInsideFilter&&characterInLine.includes("=")){
                        resources[k]["filter"][characterInLine[0]] = characterInLine[2];
                    }
                }            
            }
    
            if(isInsideResource&&!characterInLine.includes("resource")){
                const k = resources.length - 1;
                if(!!resources[k]){
                    if(countBraces==1){
                        if(characterInLine.includes("=")&&!characterInLine.includes("{")&&characterInLine[0]!="name"){
                            resources[k][characterInLine[0]]=characterInLine[2]
                        }else{
                            if(characterInLine.includes("tags")){
                                isInsideTag = true;
                            }

                            if(characterInLine.includes("{")){
                                if(characterInLine[0]=="route"){
                                    isInsideRoute = true;
                                    resources[k][characterInLine[0]] = {}
                                }
                                if(characterInLine[0]=="egress"){
                                    isInsideEgress = true;
                                    if((typeof resources[k].egress)!="object"){
                                        resources[k].egress = [{}];
                                    }else{
                                        resources[k].egress.push({});                               
                                    }
                                }
                                if(characterInLine[0]=="ingress"){
                                    isInsideIngress = true;
                                    
                                    if((typeof resources[k].ingress)!="object"){
                                        resources[k].ingress = [{}];
                                    }else{
                                        resources[k].ingress.push({});                               
                                    }
                                }

                                if(characterInLine[0]== "attachment"){
                                    isInsideAttachment = true;
                                    resources[k].attachment = {}
                                }
                            }
                        }
                    }
    
                    if(countBraces==2&&isInsideEgress&&characterInLine.includes("=")){

                        if(characterInLine.includes("protocol")){
                            resources[k].egress[resources[k].egress.length-1].protocol = characterInLine[2];
                        }
                        if(characterInLine.includes("action")){
                            resources[k].egress[resources[k].egress.length-1].action = characterInLine[2];
                        }
                        if(characterInLine.includes("from_port")){
                            resources[k].egress[resources[k].egress.length-1].from_port = characterInLine[2];
                        }
                        if(characterInLine.includes("to_port")){
                            resources[k].egress[resources[k].egress.length-1].to_port = characterInLine[2];
                        }
                    }

                    if(countBraces==2&&isInsideAttachment&&characterInLine.includes("=")){
                        resources[k]["attachment"][characterInLine[0]] = characterInLine[2];                    }
    
                    if(countBraces==2&&isInsideIngress&&characterInLine.includes("=")){
                        if(characterInLine.includes("protocol")){
                            resources[k].ingress[resources[k].egress.length-1].protocol = characterInLine[2];
                        }
                        if(characterInLine.includes("action")){
                            resources[k].ingress[resources[k].egress.length-1].action = characterInLine[2];
                        }
                        if(characterInLine.includes("from_port")){
                            resources[k].ingress[resources[k].egress.length-1].from_port = characterInLine[2];
                        }
                        if(characterInLine.includes("to_port")){
                            resources[k].ingress[resources[k].egress.length-1].to_port = characterInLine[2];
                        }
                    }
    
                    if(countBraces==2&&isInsideRoute&&characterInLine.includes("=")){
                        resources[k]["route"][characterInLine[0]]=characterInLine[2]
                    }
                }            
            }
    
            
    
            if(characterInLine.includes("{")){
                countBraces++;
            }
    
            if(characterInLine.includes("}")){
                countBraces--;
            }
    
            if(countBraces==1){
                isInsideRoute = false;
                isInsideEgress = false;
                isInsideIngress = false;
                isInsideFilter = false;
                isInsideIngress = false;
                isInsideAttachment = false;
            }
    
            if(countBraces==0){
                isInsideResource = false;
                isInsideProvider = false;
                isInsideData =  false;
            }
        }
        return resources;
    } catch (error) {
        console.log(error);
    }
        
}

module.exports  = {
    read
}


