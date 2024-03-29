const fs = require('fs');
const os = require("os");
const userHomeDir = os.homedir()
const projectManager = require('./project_manager.js');
const serial = require('./serial.js')
const hotkeys = require('hotkeys-js');

var close_aside_btn =  document.getElementById('close_aside');
var aside = document.getElementById('aside')
var close_footer_btn = document.getElementById('close_footer');
var footer = document.getElementById('footer');
var fullscreen_btn = document.getElementById('fullscreen_btn');

var editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");

window.onbeforeunload = function(){
    projectManager.saveProject('python', editor.getValue())
    serial.closePort(1);
};

hotkeys('ctrl+s, command+s', function() {
    projectManager.saveProject('python', editor.getValue())
});
hotkeys.filter = function(event){
    return true;
}


if (fs.existsSync(userHomeDir+'/Documents/Simobot IDE/Projects/' + projectManager.parseURLParams(location.href)["name"] + '/project.py')){
    let data = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ projectManager.parseURLParams(location.href)["name"] +"/project.py", {encoding:'utf8', flag:'r'});
    if(data){
        var doc = data;
    }
}else{
    var doc = `import simobot`
}
editor.setValue(doc);


portSelect = document.getElementById("portSelect");
portSelect.addEventListener("change", function(event){
    serial.portSelected(portSelect);
});

close_aside_btn.addEventListener('click', function(){
    if (aside.classList.contains('aside-hide')){
    aside.classList.remove('aside-hide');
    close_aside_btn.classList.remove('closed_aside_btn');
    }else{
    close_aside_btn.style.opacity = "1";
    aside.classList.add('aside-hide');
    close_aside_btn.classList.add('closed_aside_btn');
    }
})


close_footer_btn.addEventListener('click', function() {
    if (footer.classList.contains('h-hide')) {
    footer.classList.remove('h-hide');
    document.getElementById("editor").style.height = "calc(80vh - 45px)";
    close_footer_btn.style.bottom = "20vh";
    fullscreen_btn.style.bottom = "20vh";
    editor.resize()
    } else {
    footer.classList.add('h-hide');
    document.getElementById("editor").style.height = "calc(100vh - 45px)";
    close_footer_btn.style.bottom = "0";
    fullscreen_btn.style.bottom = "0";
    editor.resize()

    }
});

fullscreen_btn.addEventListener('click', function() {
    if (footer.style.position == "absolute") {
        close_footer_btn.style.display = "flex";
        footer.style.position = "static";
        footer.style.height = "20vh";
        fullscreen_btn.style.bottom = close_footer_btn.style.bottom;
        fullscreen_btn.style.borderRadius = "10px 0px 0px 0px";
        fullscreen_btn.style.borderBottom = "0px";
        fullscreen_btn.innerHTML = "<i class='bx bx-fullscreen'></i>";
        document.getElementsByClassName("terminal")[0].style.height = "20vh";
        document.getElementsByClassName("terminal")[0].children[0].style.height = "20vh";
        serial.xterm_fit();
    } else {
        footer.style.zIndex = "20";
        aside.style.zIndex = "25";
        footer.style.position = "absolute";
        close_footer_btn.style.display = "none";
        footer.style.height = "100vh";
        footer.style.opacity = "1";
        fullscreen_btn.style.bottom = "calc(100vh - 25px)";
        fullscreen_btn.style.borderRadius = "0px 0px 0px 10px";
        fullscreen_btn.style.borderBottom = "1px solid #cacaca";
        fullscreen_btn.innerHTML = "<i class='bx bx-exit-fullscreen'></i>";
        document.getElementsByClassName("terminal")[0].style.height = "100vh";
        document.getElementsByClassName("terminal")[0].children[0].style.height = "100vh";
        serial.xterm_fit();
    }
    
});
window.onresize = () => {
    console.log('Window resize');
    editor.resize()
};
projectManager.syncPage();
serial.xterm_fit();
module.exports = editor;