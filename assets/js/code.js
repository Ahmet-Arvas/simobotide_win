const Blockly = require('blockly')

Blockly.Python['go_forward'] = function(block) {
    let value = block.getFieldValue('VALUE');
    var code = 'ina1.value(1)';
    code+='\nina2.value(0)';
    code+='\nduty_16 = int(('+ value +'*65536)/100)';
    code+='\npwma.duty_u16(duty_16)\n';
    return code;
  };
  Blockly.Python['init_motor'] = function(block) {
    Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_utime_sleep'] = 'from utime import sleep';
    var code='\nled = Pin(25,Pin.OUT)';
    code+='\nina1 = Pin(18,Pin.OUT)';
    code+='\nina2 = Pin(17, Pin.OUT)';
    code+='\npwma = PWM(Pin(16))';
    code+='\npwma.freq(1000)\n';
    return code;
  };