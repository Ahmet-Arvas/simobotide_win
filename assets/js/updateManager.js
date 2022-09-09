const axios = require("axios");
axios.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
};
var promptData;
class updateManagement{
    constructor(){
    }
    checkAppUpdate(notifier=0){
        var self = this;
        axios.get('https://simobot.com/api/versioncontrol/check.json')
        .then(function (response) {
            if(parseFloat(response["data"]["version"]) > 0.9 ){
                console.log(response);
                promptData = `
                New Update! Simobot app update <br>
                <a onclick='window.open("${response["data"]["link"]}")' style='cursor:pointer; color:blue;'> Download </a><br>
                <a onclick='window.open("${response["data"]["changeloglink"]}")' style='cursor:pointer; color:blue;'> See Changelogs </a>`;
                if(notifier == 1){
                    document.getElementById("updatenotifier").style.display = "inline";
                    document.getElementById("updatenotifier").addEventListener('click', self.update_prompt);
                }
                
                notyf.success({message: "New Update Found", dismissible: true});
                self.update_prompt();
            }
            else{
                notyf.success({message: "No New Updates", dismissible: true});
            }
        })
        .catch(function (error) {
            notyf.error({message: error, dismissible: true});
            console.log(error);
        })
        .then(function () {
        });
    }
    update_prompt(){
		vex.dialog.open({
            unsafeMessage: promptData,
            showCloseButton: true,
            escapeButtonCloses: true,
            overlayClosesOnClick: true,
            buttons: [
            ],
            appendLocation: 'body',
            className: 'vex-theme-wireframe',
            closeAllOnPopState: false,
        })
	}
    openFirmwareUpdater(){
        vex.dialog.confirm({
            unsafeMessage: "You will redirected to update page, are you confirm. ",
            showCloseButton: true,
            escapeButtonCloses: true,
            overlayClosesOnClick: true,
            appendLocation: 'body',
            className: 'vex-theme-wireframe',
            closeAllOnPopState: false,
            callback: function (value) {
                if(value == true){
                    location.href='firmwareUpdater.html';
                }
            }
        })
    }

    firmwareCheck(){
        serial.sendResponse('print(\'1.3\') \n\r').then(result =>  controlVersion(result));
    }
}

let updateManager = new updateManagement;
module.exports = updateManager;