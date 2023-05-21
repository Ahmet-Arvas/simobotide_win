const blocklyScript = require('./blockly.js');
const serial = require('./serial.js')
portSelect = document.getElementById("portSelect");
const projectManager = require('./project_manager.js');
const fs = require('fs');
const os = require("os");
const userHomeDir = os.homedir();
const Blockly = require('blockly');
const hotkeys = require('hotkeys-js');

hotkeys('ctrl+s, command+s', function() {
    projectManager.saveProject('blocks', Blockly.serialization.workspaces.save(blocklyScript.workspace))
});

portSelect.addEventListener("change", function(event){
    serial.portSelected(portSelect);
});

window.onbeforeunload = function(){
    serial.closePort(1);
    projectManager.saveProject('blocks', Blockly.serialization.workspaces.save(blocklyScript.workspace))
};

if (fs.existsSync(userHomeDir+'/Documents/Simobot IDE/Projects/' + projectManager.parseURLParams(location.href)["name"] + '/project.blocks')){
    let data = JSON.parse(fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ projectManager.parseURLParams(location.href)["name"] +"/project.blocks", {encoding:'utf8', flag:'r'}));
    if(data){
        Blockly.serialization.workspaces.load(data, blocklyScript.workspace);
    }
}


var close_footer_btn = document.getElementById('close_footer');
var footer = document.getElementById('footer');

close_footer_btn.addEventListener('click', function() {
    if (footer.classList.contains('h-hide')) {
        footer.classList.remove('h-hide');
    } else {
        footer.classList.add('h-hide');
    }
    blocklyScript.onresize();
});

var close_aside_btn =  document.getElementById('close_aside');
var aside = document.getElementById('aside')
if(projectManager.parseURLParams(location.href)["edu"] == undefined){
    console.log("Edu yok")
}
else{
    close_aside_btn.style.display = "flex";
    aside.style.display = "flex";
    console.log(projectManager.parseURLParams(location.href)["edu"])
    const fs = require('fs');

    fs.readFile("edu/"+projectManager.parseURLParams(location.href)["edu"] + ".json", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const pages = JSON.parse(data);
    let currentPage = 0;
    const totalPages = pages.length;

    showPage(currentPage);
    updatePagination();

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
    }
    });

    function showPage(index) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = pages[index].content;
    }

    function updatePagination() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (currentPage === 0) {
        prevBtn.disabled = true;
        } else {
        prevBtn.disabled = false;
        }

        if (currentPage === totalPages - 1) {
        nextBtn.disabled = true;
        } else {
        nextBtn.disabled = false;
        }
    }
    });

}
close_aside_btn.addEventListener('click', function(){
    if (aside.classList.contains('aside-hide')){
    aside.classList.remove('aside-hide');
    close_aside_btn.classList.remove('closed_aside_btn');
    }else{
    aside.classList.add('aside-hide');
    close_aside_btn.classList.add('closed_aside_btn');
    }
})
projectManager.syncPage();
serial.xterm_fit();