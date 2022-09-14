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



const {
    contextBridge,
    ipcRenderer
} = require("electron");
const backend = require("i18next-electron-fs-backend");

const i18next = require('i18next');

i18next
  .use(require("i18next-electron-fs-backend"))
  .init({
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
    lng: "en"
  });
  
contextBridge.exposeInMainWorld(
    "api", {
        i18nextElectronBackend: backend.preloadBindings(ipcRenderer, process)
    }
);