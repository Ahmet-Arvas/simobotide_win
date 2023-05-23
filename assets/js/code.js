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
Blockly.Python['light_led'] = function(block) {
  let pin = block.getFieldValue('pin');
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, PWM';
  var code = 'led'+ pin +'=Pin('+ pin +',Pin.OUT)';
  code+='\nled'+ pin +'.value(1)\n';
  return code;
};

Blockly.Python['light_onboard_led'] = function(block) {
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, PWM';
  var code = 'led25=Pin(25,Pin.OUT)';
  code+='\nled25.value(1)\n';
  return code;
};