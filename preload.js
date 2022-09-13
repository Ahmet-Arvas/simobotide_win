const fs = require('fs');
const os = require("os");

const userHomeDir = os.homedir();

if (!fs.existsSync(userHomeDir+'/Documents/Simobot IDE/Projects')){
    fs.mkdirSync(userHomeDir+'/Documents/Simobot IDE/Projects', { recursive: true });
}

if (!fs.existsSync(userHomeDir+'/Documents/Simobot IDE/settings.json')){
let data = `
{  
    "theme":"dark",
    "language":"en",
}
`
    fs.writeFileSync(userHomeDir+'/Documents/Simobot IDE/settings.json', data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}