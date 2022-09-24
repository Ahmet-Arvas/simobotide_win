const i18n = require('./assets/js/translate.js');
require("./locales/tr.json")
require("./locales/en.json")
const fs = require('fs');
const os = require("os");
const i18next = require("i18next");
i18n.init();
window.addEventListener('DOMContentLoaded', () => {i18n.syncPage();});
const userHomeDir = os.homedir();

if (!fs.existsSync(userHomeDir+'/Documents/Simobot IDE/Projects')){
    fs.mkdirSync(userHomeDir+'/Documents/Simobot IDE/Projects', { recursive: true });
}

if (!fs.existsSync(userHomeDir+'/Documents/Simobot IDE/settings.json')){
let data = `
{  
    "theme":"dark",
    "language":"en"
}
`
    fs.writeFileSync(userHomeDir+'/Documents/Simobot IDE/settings.json', data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}else{
    let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/settings.json");
    if(rawdata){
        let data = JSON.parse(rawdata);
        i18next.changeLanguage(data["language"])
    }
}