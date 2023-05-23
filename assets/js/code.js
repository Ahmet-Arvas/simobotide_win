const Blockly = require('blockly')

Blockly.Python['go_forward'] = function(block) {
    let speed = block.getFieldValue('speed');
    Blockly.Python.definitions_['import_lib'] = 'import simobot';
    var code = '\nsimobot.catMove.stopMotor("both")';
    code+='\nsimobot.catMove.startMotor(1, "both",'+ speed +')\n';
    return code;
};
Blockly.Python['go_backward'] = function(block) {
  let speed = block.getFieldValue('speed');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';
  var code = '\nsimobot.catMove.stopMotor("both")';
  code+='\nsimobot.catMove.startMotor(0, "both",'+ speed +')\n';
  return code;
};
Blockly.Python['right'] = function(block) {
  let speed = block.getFieldValue('speed');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';
  var code = '\nsimobot.catMove.stopMotor("both")';
  code+='\nsimobot.catMove.startMotor(1, "A",'+ speed +')\n';
  return code;
};
Blockly.Python['left'] = function(block) {
  let speed = block.getFieldValue('speed');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';
  var code = '\nsimobot.catMove.stopMotor("both")';
  code+='\nsimobot.catMove.startMotor(1, "B",'+ speed +')\n';
  return code;
};
Blockly.Python['go_forward_seconds'] = function(block) {
  let speed = block.getFieldValue('speed');
  let second = block.getFieldValue('second');
  let direction = block.getFieldValue('direction');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';

  var code = '\nsimobot.catMove.stopMotor("both")';
    code+='\nsimobot.catMove.startMotor('+ direction +', "both",'+ speed +','+ second +')\n';
    return code;
};

Blockly.Python['stop_motors'] = function(block) {
  let motor = block.getFieldValue('motor');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';

  var code = '\nsimobot.catMove.stopMotor("'+motor+'")\n';
    return code;
};
Blockly.Python['wait'] = function(block) {
  let second = block.getFieldValue('second');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';
  Blockly.Python.definitions_['import_sleep'] = 'from utime import sleep';


  var code = '\nsleep('+second+')\n';
    return code;
};
Blockly.Python['draw_pixels'] = function(block) {
  let x = block.getFieldValue('x');
  let y = block.getFieldValue('y');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';
  var code = '\nsimobot.catFace.oled.pixel('+x+', '+y+', 1)';
  code+='\nsimobot.catFace.oled.show()\n';
  return code;
};

Blockly.Python['draw_text'] = function(block) {
  let x = block.getFieldValue('y');
  let y = block.getFieldValue('x');
  let text = block.getFieldValue('text');
  Blockly.Python.definitions_['import_lib'] = 'import simobot';
  var code = '\nsimobot.catFace.oled.text("'+text+'",'+x+', '+y+', 1)';
  code+='\nsimobot.catFace.oled.show()\n';
  return code;
};

Blockly.Python['clean_screen'] = function(block) {
  Blockly.Python.definitions_['import_lib'] = 'import simobot';
  var code = '\nsimobot.catFace.oled.fill(0)';
  return code;
};