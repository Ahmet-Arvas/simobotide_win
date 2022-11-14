const Blockly = require('blockly');

Blockly.common.defineBlocksWithJsonArray([
    {
      "type": "go_forward",
      "message0": "Go forward %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "speed",
          "options": [
            ["Very fast", "200"],
            ["Fast", "100"],
            ["Slow", "50"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  
    },
    {
      "type": "go_forward_seconds",
      "message0": "Go forward for %1 seconds at %2 speed",
      "args0": [
        {
          "type": "field_number",
            "name": "second",
            "value": 10,
            "min": 0,
            "max": 100,
            "precision": 0.5
        },
        {
          "type": "field_dropdown",
          "name": "speed",
          "options": [
            ["Very fast", "100"],
            ["Fast", "50"],
            ["Slow", "25"]
          ]
        },
        
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',
  
    },
    {
      "type": "stop_motors",
      "message0": "Stop Motors",
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',
    },
    {
      "type": "light_led",
      "message0": "Light %1 LED",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "pin",
          "options": [
            ["Red", "15"],
            ["Green", "14"],
            ["Yellow", "13"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#9013FE',
  
    },
    {
      "type": "light_onboard_led",
      "message0": "Light onboard LED",
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#9013FE',
  
    }
  ]);