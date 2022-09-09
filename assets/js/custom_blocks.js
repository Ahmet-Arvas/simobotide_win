const Blockly = require('blockly');

Blockly.common.defineBlocksWithJsonArray([
    {
      "type": "go_forward",
      "message0": "Go forward %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            ["Very fast", "200"],
            ["Fast", "100"],
            ["Slow", "50"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#FF8C1A',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  
    },
    {
      "type": "init_motor",
      "message0": "Initialize Motor",
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#FF8C1A',
  
    }
  ]);