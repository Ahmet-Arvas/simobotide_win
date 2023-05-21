const os = require("os");
const axios = require('axios');
const fs = require('fs');
const { Notyf } = require('notyf');

const notyf = new Notyf();

const userHomeDir = os.homedir();
const date = new Date();

class projectManagement{
    constructor(){
        
    }
    /**
    * @param {string} projectname Project's name for creating a project.
    * @param {string} ideType Project's type for creating a project (python, blocks).
    * @param {string} edu Default: false > It takes a json text about education tab.
    */
    newProject(projectname, ideType, edu = "false"){
        let name = projectname;
        let type = ideType;

        let savedir = userHomeDir+'/Documents/Simobot IDE/Projects/' + name.replace(/\W/g, '')  + '/';
        savedir = savedir.replace(/\\/g, "/");

        let savefile = savedir + 'project.json';
let jsondata =`
{  
    "type":"`+ type +`",
    "name":"`+ name +`",
    "time":"`+ date.getTime() +`",
    "edu" :"`+ edu +`"
}
`
        console.log(savedir); 
        fs.mkdirSync(savedir , { recursive: true })
        fs.writeFileSync(savefile, jsondata, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        this.openProject(name)
    }

    /**
    * @param {string} name Project's name for opening a project.
    */
    openProject(name){
        fs.readdir(userHomeDir+'/Documents/Simobot IDE/Projects/', (err, files) => {
            files.forEach(file => {
                try{
                    let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ file +"/project.json");
                    if(rawdata){
                        let data = JSON.parse(rawdata);
                        if(data["name"] == name){
                            if(data["type"] == "blocks"){
                                window.location.href = 'blocks.html?name='+file+"&edu=1000";
                            }else{
                                window.location.href = 'python.html?name='+file;
                            }
                        }
                    }
                }catch{
                    console.log("File not found");
                }
            });
        });
        
    }

    /**
    * @param {string} type Project's type for saving a project (python, blocks)..
    * @param {string} data Data for writing file.
    */
    saveProject(type, data){
        if(type == "blocks"){
            try {
                var projectData;
                var csscontent;
                var canvas = blocklyScript.workspace.svgBlockCanvas_.cloneNode(true);
                if (canvas.children[0] === undefined) throw "Couldn't find Blockly canvas."
                if (Blockly.Css.CONTENT == undefined) {csscontent = ""} else { csscontent = "Blockly.Css.CONTENT.join('')" }
                canvas.removeAttribute("transform");
                var css = '<defs><style type="text/css" xmlns="http://www.w3.org/1999/xhtml"><![CDATA[' + csscontent + ']]></style></defs>';
                var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
                var content = new XMLSerializer().serializeToString(canvas);
            
                var xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'
                    + bbox.width + '" height="' + bbox.height + '" viewBox=" ' + bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height + '">' +
                    css + '">' + content + '</svg>'; 
                
                let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"] +"/project.json");
                if(rawdata){
                    projectData = JSON.parse(rawdata);
                }
let jsondata =`
{  
    "type":"`+ projectData["type"] +`",
    "name":"`+ projectData["name"] +`",
    "time":"`+ date.getTime() +`",
    "edu" :"`+ projectData["edu"] +`"
}
`
                fs.writeFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"]+"/project.json", jsondata, 'utf-8'); 
                fs.writeFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"]+"/blocks.svg", xml);
                fs.writeFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"]+"/project.blocks", JSON.stringify(data), 'utf-8'); 
                notyf.success({message: 'Project was saved!', dismissible: true});
            } catch(e) {
                notyf.error({message: "Error: " + e, dismissible: true});
            }
        }
        else{
            try {
                let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"] +"/project.json");
                if(rawdata){
                    projectData = JSON.parse(rawdata);
                }
let jsondata =`
{  
    "type":"`+ projectData["type"] +`",
    "name":"`+ projectData["name"] +`",
    "time":"`+ date.getTime() +`",
    "edu" :"`+ projectData["edu"] +`"
}
`
                fs.writeFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"]+"/project.json", jsondata, 'utf-8'); 
                fs.writeFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"]+"/project.py", data, 'utf-8'); 
                notyf.success({message: 'Project was saved!', dismissible: true});
            } catch(e) {
                notyf.error({message: "Error: " + e, dismissible: true});
            }
        }

    }

    /**
    * @param {string} name Takes a name for delete project.
    */
    deleteProject(name){
        let files = fs.readdirSync(userHomeDir+'/Documents/Simobot IDE/Projects/');
        files.forEach(file => {
            let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ file +"/project.json");
            if(rawdata){
                let data = JSON.parse(rawdata);
                if(data["name"] == name){
                    fs.rm(userHomeDir + "/Documents/Simobot IDE/Projects/"+ file, { recursive: true }, (err) => {
                        if (err) {
                            return notyf.error({message: err, dismissible: true});
                        }
                        if(projectManager.parseURLParams(location.href) != undefined){
                            if(projectManager.parseURLParams(location.href)['name'] == data["name"].replace(/\W/g, '')){
                                location.href = "index.html";
                            }
                        }
                        return notyf.success({message: 'Project successfully deleted.', dismissible: true});
                    });
                }
            }
        });
    }

    /**
    * For syncing page (Page name etc)
    */
    syncPage(){
        let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ this.parseURLParams(location.href)["name"] +"/project.json");
        if(rawdata){
            let data = JSON.parse(rawdata);
            globalThis.projectInfo = data;
        }else{
            console.log("There is a Problem with your project");
        }
        console.log(projectInfo);
        document.getElementById('projectname').innerHTML = projectInfo["name"];
    }


    /**
    * @param {string} url Get like parser.
    */
    parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;
    
        if (query === url || query === "") return undefined;
    
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
    
            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }
}
const projectManager = new projectManagement();
module.exports = projectManager;


