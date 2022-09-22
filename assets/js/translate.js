var i18next = require("i18next");
var Backend = require("i18next-fs-backend");
const fs = require('fs');

class i18n{
    init(){
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
    }
    syncPage(){
        const matches = document.querySelectorAll("[data-i18n]");
        matches.forEach(matches => {
            matches.innerHTML = i18next.t(matches.dataset.i18n)
            console.log(i18next.t(matches.dataset.i18n));
        });
    }
}

var i18n_obj = new i18n;
module.exports = i18n_obj;
