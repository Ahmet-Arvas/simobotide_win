const Blockly = require('blockly')

Blockly.Python['go_forward'] = function(block) {
    let speed = block.getFieldValue('speed');
    Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, PWM';
    Blockly.Python.definitions_['define_motor_pin'] = "\nina1 = Pin(18,Pin.OUT)\nina2 = Pin(17, Pin.OUT)\npwma = PWM(Pin(16))\npwma.freq(1000)\ninb1 = Pin(19,Pin.OUT)\ninb2 = Pin(20, Pin.OUT)\npwmb = PWM(Pin(21))\npwmb.freq(1000)\n"
    var code = 'ina1.value(1)';
    code+='\nina2.value(0)';
    code+='\nduty_16 = int(('+ speed +'*65536)/100)';
    code+='\npwma.duty_u16(duty_16)';
    code+='\ninb1.value(1)';
    code+='\ninb2.value(0)';
    code+='\npwmb.duty_u16(duty_16)\n';
    return code;
};

Blockly.Python['go_forward_seconds'] = function(block) {
  let speed = block.getFieldValue('speed');
  let second = block.getFieldValue('second');
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, PWM';
  Blockly.Python.definitions_['import_utime_sleep'] = 'from utime import sleep';
  Blockly.Python.definitions_['define_motor_pin'] = "\nina1 = Pin(18,Pin.OUT)\nina2 = Pin(17, Pin.OUT)\npwma = PWM(Pin(16))\npwma.freq(1000)\ninb1 = Pin(19,Pin.OUT)\ninb2 = Pin(20, Pin.OUT)\npwmb = PWM(Pin(21))\npwmb.freq(1000)\n"

  var code='ina1.value(1)';
  code+='\nina2.value(0)';
  code+='\nduty_16 = int(('+ speed +'*65536)/100)';
  code+='\npwma.duty_u16(duty_16)';
  code+='\ninb1.value(1)';
  code+='\ninb2.value(0)';
  code+='\npwmb.duty_u16(duty_16)';
  code+='\nsleep(' + second + ')';
  code+='\nina1.value(0)';
  code+='\nina2.value(0)';
  code+='\ninb1.value(0)';
  code+='\ninb2.value(0)';
  code+='\npwma.duty_u16(0)\n';
  return code;
};

Blockly.Python['stop_motors'] = function(block) {
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, PWM';
  Blockly.Python.definitions_['define_motor_pin'] = "\nina1 = Pin(18,Pin.OUT)\nina2 = Pin(17, Pin.OUT)\npwma = PWM(Pin(16))\npwma.freq(1000)\ninb1 = Pin(19,Pin.OUT)\ninb2 = Pin(20, Pin.OUT)\npwmb = PWM(Pin(21))\npwmb.freq(1000)\n"
  var code = 'ina1.value(0)';
  code+='\nina2.value(0)';
  code+='\npwma.duty_u16(0)';
  code+='\ninb1.value(0)';
  code+='\ninb2.value(0)';
  code+='\npwmb.duty_u16(0)\n';
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