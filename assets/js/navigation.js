const fs = require("fs");
const os = require("os");
const i18n = require('./translate.js');

const userHomeDir = os.homedir();
var rp_element;
var projects_element;
class CreateDialog{
    constructor(){
    }
    homeDialog(){
        vex.dialog.open({
            unsafeMessage: `
    <section id="section-tab">
        <ul id="tab-control">
        <li class="tab-control" id="control-selected"><i class='bx bx-home-smile'></i> <span data-i18n="navigation.tabControl.home">Home</span></li>
        <li class="tab-control"><i class='bx bx-rocket' ></i><span data-i18n="navigation.tabControl.tutorial">Tutorial</span></li>
        <li class="tab-control"><i class='bx bx-task' ></i><span data-i18n="navigation.tabControl.units">Units</span></li>
        <li class="tab-control"><i class='bx bx-microchip' ></i><span data-i18n="navigation.tabControl.create">Create</span></li>
        <li class="tab-control"><i class='bx bx-book' ></i><span data-i18n="navigation.tabControl.myProjects">My Projects</span></li>
        <div class="bottom_tabs">
        <li class="tab-control "><i class='bx bxs-help-circle' ></i><span data-i18n="navigation.tabControl.help">Help</span></li>
        <li class="tab-control"><i class='bx bxs-wrench'></i><span data-i18n="navigation.tabControl.settings">Settings</span></li>
        </div>
        </ul>
        <div id="tab-div" class="customScrollbar">
        <div class="tab">
            <div class="intro">
                <div class="intro_cont">
                    <span data-i18n="navigation.home.introTitle" class="intro_title">Get Started Using Simobot</span>
                    <p data-i18n="navigation.home.introP">Learn to use Simobot with simple steps.</p>
                    <a data-i18n="navigation.home.introBtn" class="startbutton" id="startbutton">Start !</a>
                </div>
                <div class="intro_img">
                    <img src="images/intro_img.png">
                </div>
            </div>
            <div style="display: flex; width:100%">
            <span data-i18n="navigation.home.recentProjectsTitle" style="font-size: 20px;">Recent Projects</span>
            <a data-i18n="navigation.home.recentProjectsShowAll" id="showallbtn" style="cursor: pointer; font-size: 20px; margin-left:auto; align-self: flex-end; color: rgb(0, 144, 245);">Show All</a>
            </div>
            <div class="rpWrapper">
                    <div class="rpNewProject">
                        <a onclick="dialogCreator.selectIdeType()">
                            <i class='bx bxs-file-plus'></i>
                            <span data-i18n="navigation.home.recentProjectsNewProject">New Project</span>
                        </a>
                    </div>
                <div id="recentProjects" class="recentProjects customScrollbar">
                    <span">Loading...</span>
                </div>
            </div>
            <div class="bottomlinks">
                <div id="unitsbutton" class="linkcard">
                    <div class="lc_head" data-i18n="navigation.home.exploreUnitsTitle">Explore Units</div>
                    <div class="lc_body"><img src="images/linkcard_units.png"></div>
                    <div class="lc_content" data-i18n="navigation.home.exploreUnitsContent">That's like story mode of Minecraft :)</div>	
                </div>
                <div id="createbutton" class="linkcard">
                    <div class="lc_head" data-i18n="navigation.home.createNewThingsTitle">Create new things!</div>
                    <div class="lc_body"><img src="images/linkcard_create.png"></div>
                    <div class="lc_content" data-i18n="navigation.home.createNewThingsContent">You can create different things with Simobot, click to try</div>
                </div>
            </div>
        </div>
        <div class="tab tab_tutorial">
            <h2 data-i18n="navigation.tabControl.tutorial">Tutorial</h2>
            <div class="card-container customScrollbar">
                <div class="card">
                    <img src="images/puzzle.gif" alt="Puzzle">
                    <h3>Temel Blokları Öğren</h3>
                    <p>Bloklar hakkında temel bir ders al ve Simobot'un kontrolünü ele geçir.</p>
                </div>
                <div class="card">
                    <img src="images/complex.gif" alt="Machine">
                    <h3>Simobot'un nasıl çalıştığını öğren.</h3>
                    <p>Simobot'ta kullanılan sistemler hakkında bilgi sahibi ol ve kendini geliştir.</p>
                </div>
            </div>
        </div>
        <div class="tab">
            <h2 data-i18n="navigation.tabControl.units">Units</h2>
            <div class="settings">
                <div class="row">
                <div class="category_name">Filtrele</div>
                <div class="dropdown">
                    <select id="setUnitsFilter">
                        <option value="nothing"> Türü Seç </option>
                        <option value="blocks"> Blocks </option>
                        <option value="python"> Python </option>
                    </select>
                </div>
                </div>
            </div>
            <div class="unitscontainer">
            <div class="unitscard">
              <div class="image" style="background-image: url('images/motors.jpg');"></div>
              <div class="content">
                <h3>Motorlar ve Hareket</h3>
                <p>Motorlar hakkında temel bir ders al ve Simobot'un kontrolünü ele geçir.</p>
                <a href="#"><i class='bx bxs-right-arrow'></i></a>
              </div>
            </div>
            <div class="unitscard">
              <div class="image" style="background-image: url('images/motors.jpg');"></div>
              <div class="content">
                <h3>Motorlar ve Hareket</h3>
                <p>Motorlar hakkında temel bir ders al ve Simobot'un kontrolünü ele geçir.</p>
                <a href="#"><i class='bx bxs-right-arrow'></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="tab">
            <h2 data-i18n="navigation.tabControl.create">Create</h2>
            <p>Yeni Fikirler sekmesinde henüz yeni projeler bulunmamaktadır. Ancak, gelecekte bu sekmede heyecan verici fikirler ve projeler paylaşmayı planlıyoruz. Takipte kalın!</p>
        </div>
        <div class="tab">
            <h2 data-i18n="navigation.tabControl.myProjects">My Projects</h2>
            <div id="projects" class="projects"></div>
        </div>
        <div class="tab">
            <h2 data-i18n="navigation.tabControl.help">Help</h2>
            <p>Daha fazla bilgi ve yardım için lütfen masaüstü uygulamamızın yardım sekmesini ziyaret edin. Yardım sekmesine ulaşmak için aşağıdaki bağlantıyı kullanabilirsiniz: <a href="simobot.com/app/help">Yardım</a></p>
        </div>
        <div class="tab">
            <h2 data-i18n="navigation.tabControl.settings">Settings</h2>
                <div class="settings">
                    <div class="row">
                    <div data-i18n="navigation.settings.language" class="category_name">Language</div>
                    <div class="dropdown">
                        <select id="setLang">
                            <option value="nothing" data-i18n="navigation.settings.languageSelect"> Select Language </option>
                            <option value="en"> English </option>
                            <option value="tr"> Turkish </option>
                        </select>
                    </div>
                </div>
                <div class="row" style="text-align:center ">
                    <a data-i18n="navigation.settings.checkAppUpdates" onclick="updateManager.checkAppUpdate();">Check App Updates</a>
                </div>
                <div class="row" style="text-align:center ">
                    <a data-i18n="navigation.settings.checkFirmwareUpdates" onclick="updateManager.openFirmwareUpdater()">Check Simobot Firmware Updates</a>
                </div>
            </div>
        </div>
        </div>
    </section>
            `,
            showCloseButton: true,
            escapeButtonCloses: true,
            overlayClosesOnClick: true,
            buttons: [
            ],
            appendLocation: 'body',
            className: 'big_dialog',
            closeAllOnPopState: false,
            callback: function (data) {
                if (!data) {
                    return console.log('Cancelled')
                }
            }
        })
        i18n.syncPage(); // When reopen prompt reload translations
        const controls = document.querySelectorAll(".tab-control");
        const tabs = document.querySelectorAll(".tab");
        const tabdiv = document.getElementById("tab-div");
        tabdiv.scrollTop = 0;

        
        var setLang = document.getElementById("setLang");
        setLang.addEventListener("change", function(event){
            if(setLang.value != "nothing"){
                i18next.changeLanguage(setLang.value);
                let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/settings.json");
                if(rawdata){
                    var projectData = JSON.parse(rawdata);
                }
let jsondata =`
{  
    "theme": "${projectData["theme"]}",
    "language": "${setLang.value}"
}
`
                fs.writeFileSync(userHomeDir + "/Documents/Simobot IDE/settings.json", jsondata, 'utf-8'); 
                i18n.syncPage();
            }
            
        });
        
        // display none for 1-length tabs
        for (let i = 1; i < tabs.length; i++) {
        tabs[i].style.display = "none";
        }

        // set value forl all tabs
        for (let i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute("value", i);
        }

        // add event listener for all controls
        for (let i = 0; i < controls.length; i++) {
        controls[i].setAttribute("value", i);
        controls[i].addEventListener("click", displayTab);
        }


        document.getElementById("showallbtn").addEventListener("click", function () {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].style.display = "none";
                controls[i].removeAttribute("id");
            }
            tabs[4].style.display = "flex";
            controls[4].setAttribute("id", "control-selected");
        });
        document.getElementById("startbutton").addEventListener("click", function () {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].style.display = "none";
                controls[i].removeAttribute("id");
            }
            tabs[1].style.display = "flex";
            controls[1].setAttribute("id", "control-selected");
        });
        document.getElementById("unitsbutton").addEventListener("click", function () {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].style.display = "none";
                controls[i].removeAttribute("id");
            }
            tabs[2].style.display = "flex";
            controls[2].setAttribute("id", "control-selected");
        });
        document.getElementById("createbutton").addEventListener("click", function () {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].style.display = "none";
                controls[i].removeAttribute("id");
            }
            tabs[3].style.display = "flex";
            controls[3].setAttribute("id", "control-selected");
        });
        // display tab function
        function displayTab() {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].style.display = "none";
                controls[i].removeAttribute("id");
            }
            tabs[this.value].style.display = "flex";
            controls[this.value].setAttribute("id", "control-selected");
        }
        this.listProjects(document.getElementById("recentProjects"), document.getElementById("projects"), 5)
        document.getElementById("recentProjects").addEventListener('wheel', function(e) {
            if (e.deltaY > 0) document.getElementById("recentProjects").scrollLeft += 50;
            else document.getElementById("recentProjects").scrollLeft -= 50;
        });
    }
    listProjects(rpelement_important, projectselement_important, count = 0) {
        if(rpelement_important != 0){
            rp_element = rpelement_important;
            projects_element = projectselement_important;
        }
        var dataArray = [];
        var cardsHtmlforrp = "";;
        var cardsHtmlforProjects = "";
        var dataArrayCounter = 0;            
        fs.readdir(userHomeDir+'/Documents/Simobot IDE/Projects/', (err, files) => {
            files.forEach(file => {
            try {
                let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/Projects/"+ file +"/project.json");
                if(rawdata){
                    let data = JSON.parse(rawdata);
                    dataArray[dataArrayCounter] = data;
                    dataArrayCounter += 1;
                }
            } catch (err) {
                console.log("File Not Found");
            }
            });
            var sorted = dataArray.sort(function(a, b) {
                return b.time - a.time;
            });
            if(count > 0){
                var sortedforrp = sorted.slice(0, count);
            }
            sortedforrp.forEach(element => {
                let photocontent;
                if(element["type"] == "blocks"){
                    if(fs.existsSync(userHomeDir+'/Documents/Simobot IDE/Projects/' + element["name"].replace(/\W/g, '') + "/blocks.svg") ){
                        photocontent = "<img src=\"" + userHomeDir+'/Documents/Simobot IDE/Projects/' + element["name"].replace(/\W/g, '') + "/blocks.svg\" style=\"max-width: 100%; max-height: 100%;\">"; 
                    }else{
                        photocontent = "<img src=\"images/puzzle.gif\" style=\"max-width: 100%; max-height: 100%;\">";
                    }
                }else{
                    photocontent = "<img src=\"images/cmd.gif\" style=\"max-width: 100%; max-height: 100%;\">";
                }
                cardsHtmlforrp += "<div class='projectCard' onclick='projectManager.openProject(\"" + element["name"] + "\")'><div class='rp_topofCard'><div style='width: 128px; height: 32px; padding: 2px; text-overflow: hidden; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;'>"+ element["name"] +"</div><a class='rp_trash' onclick='dialogCreator.deleteProject(event, \""+ element["name"] +"\");'><i class='bx bxs-trash' ></i></a></div><div style='display: flex; align-items: center; width: 100%; height: 80%;'><div style=\"max-width: 90%; max-height: 90%; min-width: 90%; min-height:90%; width: 90%; height: 90%; padding: 5%; margin: 5%; display: flex; align-items: center; text-align: center; align-self: center; background-color: white; border-radius: 10px; \">" + photocontent + "</div></div></div>"

            });

            sorted.forEach(element => {
                let photocontent;
                if(element["type"] == "blocks"){
                    if(fs.existsSync(userHomeDir+'/Documents/Simobot IDE/Projects/' + element["name"].replace(/\W/g, '') + "/blocks.svg") ){
                        photocontent = "<img src=\"" + userHomeDir+'/Documents/Simobot IDE/Projects/' + element["name"].replace(/\W/g, '') + "/blocks.svg\" style=\"max-width: 100%; max-height: 100%;\">"; 
                    }else{
                        photocontent = "<img src=\"images/puzzle.gif\" style=\"max-width: 100%; max-height: 100%;\">";
                    }
                }else{
                    photocontent = "<img src=\"images/cmd.gif\" style=\"max-width: 100%; max-height: 100%;\">";
                }
                cardsHtmlforProjects += "<div class='projectCard' onclick='projectManager.openProject(\"" + element["name"] + "\")'><div class='rp_topofCard'><div style='width: 128px; height: 32px; padding: 2px; text-overflow: hidden; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;'>"+ element["name"] +"</div><a class='rp_trash' onclick='dialogCreator.deleteProject(event, \""+ element["name"] +"\");'><i class='bx bxs-trash' ></i></a></div><div style='display: flex; align-items: center; width: 100%; height: 80%;'><div style=\"max-width: 90%; max-height: 90%; min-width: 90%; min-height:90%; width: 90%; height: 90%; padding: 5%; margin: 5%; display: flex; align-items: center; text-align: center; align-self: center; background-color: white; border-radius: 10px; \">" + photocontent + "</div></div></div>"
            });


            if(rp_element != null){
                rp_element.innerHTML = cardsHtmlforrp;
            }

            if(projects_element != null){
                projects_element.innerHTML = cardsHtmlforProjects;
            }
        });
    }

    deleteProject(e, name){
        let self = this;
        e.stopPropagation();
        vex.dialog.confirm({
            message: 'Are you absolutely sure you want to delete this project?',
            callback: function (value) {
                if (value) {
                    projectManager.deleteProject(name);
                    setTimeout(function () {
                        self.listProjects(rp_element, projects_element, 5);
                    }, 700);
                    
                } else {
                    console.log("istemion");
                }
            }
        })
        
    }
    selectIdeType(){
        vex.dialog.open({
            unsafeMessage: `
            <label class="vex-dialog-input">
            <span data-i18n="newProjectPrompt.textLabel" >Name your project</span>
            <input type="text" value="Project" id="form_projectname">
            </label>
            <div class="middle">
            <label>
            <input type="radio" name="radio" value="blocks" checked/>
            <div class="blocks box">
                <div class="title" data-i18n="newProjectPrompt.blocks">Blocks</div>
                <div class="body">
                    <img src="images/puzzle.gif">
                </div>
            </div>
            </label>
            <label>
            <input type="radio" name="radio" value="python"/>
            <div class="python box">
                <div data-i18n="newProjectPrompt.python" class="title">Python</div>
                <div class="body">
                    <img src="images/cmd.gif">
                </div>
            </div>
            </label>
            <button data-i18n="newProjectPrompt.submit" class="startbutton" id="createProject" onclick="dialogCreator.createProject()" style="background-color: #4ACBE3; margin-top:10px">
            Create!
            </button>
            </div>
            `,
            showCloseButton: true,
            escapeButtonCloses: true,
            overlayClosesOnClick: true,
            buttons: [
            ],
            appendLocation: 'body',
            className: 'vex-theme-wireframe',
            closeAllOnPopState: false,
        })
        i18n.syncPage(); // When reopen prompt reload translations
    }
    
    checkName(form_projectname){
        let answer = 0;
        /*let files = fs.readdirSync(userHomeDir+'/Documents/Simobot IDE/');
        files.forEach(file => {
            let rawdata = fs.readFileSync(userHomeDir + "/Documents/Simobot IDE/"+ file +"/project.json");
            if(rawdata){
                let data = JSON.parse(rawdata);
                if(data["name"] == form_projectname){
                    answer = 1;
                }
            }
        });*/
        if (fs.existsSync(userHomeDir+'/Documents/Simobot IDE/Projects/' + form_projectname.replace(/\W/g, '')  + '/')){
            answer = 1     
        }
        return answer;
    }

    createProject(){
        let form_projectname = [document.getElementById('form_projectname').value];
        let form_ideType = document.querySelector('input[name="radio"]:checked').value;
        if(form_projectname.join(' ').toString().length > 30 || form_projectname.join(' ').toString().length < 3){
            notyf.error("Project name must be between 30 and 3 characters.");
        }else{
            let counter = 1;
            while (this.checkName(form_projectname.join(' ').toString()) == 1){
                form_projectname[1] = counter;
                console.log(form_projectname.join(' ').toString());
                counter +=1;
            }
            projectManager.newProject(form_projectname.join(' ').toString().replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0'), form_ideType)
        }
    }
}
const dialogCreator = new CreateDialog();
module.exports = dialogCreator;

