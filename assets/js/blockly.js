/*---------VERY IMPORTANT--------------
If your script have backslash, you need escape it with another backslash.
Example: print("hi \n guys") <<< Thats false
         print("hi \\n guys")<<< Thats true
*/

const Blockly = require('blockly')

require('./custom_blocks.js')
require('./code.js')
require('./../../node_modules/blockly/python_compressed.js')
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
xml_toolbox = document.getElementById('xml_toolbox');
xml_toolbox.innerHTML = xmltext;
CustomDialog = {};

Blockly.alert = function(message, callback) {
  vex.dialog.alert(message)
};
Blockly.confirm = function(message, callback) {
  vex.dialog.confirm({
    message: message,
    callback: function (value) {
        callback(value);
    }
})
}
Blockly.prompt = function(message, defaultValue, callback) {
  vex.dialog.prompt({
    message: message,
    placeholder: 'Name',
    callback: function (value) {
        callback(value)
    }
})
}

Blockly.Themes.Simobot = Blockly.Theme.defineTheme('Simobot', {
'base': Blockly.Themes.Zelos,
'componentStyles': {

}
});

let workspace = Blockly.inject(blocklyDiv, {
  toolbox: xml_toolbox,
  renderer: 'zelos',
  theme: Blockly.Themes.Simobot,
  scroolbars: true,
  grid:{
    spacing: 20,
  },
  move:{
    scrollbars: {
    horizontal: true,
    vertical: true,
    },
    drag: true,
    wheel: true,
  },
  zoom:{
    controls: true,
    wheel: false,
    startScale: 0.7,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  trashcan: true,
  media: './node_modules/blockly/media/'
});


Blockly.Toolbox.prototype.handleToolboxItemResize=function(){
	var ToolboxDiv = document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable");
	var Trash = document.getElementsByClassName("blocklyTrash");
	if (ToolboxDiv && Trash) {
		var trashLeft = ToolboxDiv[0].clientWidth+30;
		Trash[0].setAttribute("transform", "translate(" + trashLeft + ",476)");
	}
   // etc...
}


// hide vertical bar
workspace.scrollbar.vScroll.svgGroup_.style.display = 'none';
// hide horizontal bar
workspace.scrollbar.hScroll.svgGroup_.style.display = 'none';
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);

  console.log('resize');
  Blockly.Trashcan.prototype.position=function(a,b){
    if(this.initialized_){
      // etc...
      console.log(blocklyDiv.style.width);
      this.top_= 20;
      this.left_= parseInt(blocklyDiv.style.width.replace('px', '')) - 65;
      this.svgGroup_.setAttribute("transform","translate("+this.left_+","+this.top_+")")	
    }
  };
  Blockly.ZoomControls.prototype.position=function(a,b){
    if(this.initialized_){
      // etc...
      this.top_= parseInt(blocklyDiv.style.height.replace('px', '')) - 50;;
      this.left_= 250;
      this.svgGroup_.setAttribute("transform","translate("+this.left_+","+this.top_+") rotate(90)");			
    }
  };
};

function updatecode(event) {
  var code = Blockly.Python.workspaceToCode(workspace);
  //document.getElementById('textarea').innerHTML = code;
}

workspace.addChangeListener(updatecode);
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

module.exports.onresize = onresize;
module.exports.workspace = workspace;