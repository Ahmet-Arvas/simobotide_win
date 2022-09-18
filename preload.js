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

var i18next = require("i18next");
var Backend = require("i18next-fs-backend");

i18next
  .use(Backend)
  .init({
    debug: true,
    initImmediate: false,
    fallbackLng: 'en',
    lng: 'en',
    preload: fs.readdirSync('locales').filter((fileName) => {
      const joinedPath = 'locales/' + fileName
      const isDirectory = fs.lstatSync(joinedPath).isDirectory()
      return isDirectory
    }),
    ns: 'backend-app',
    defaultNS: 'backend-app',
    backend: {
      loadPath: 'locales/{{lng}}.json'
    }
  })