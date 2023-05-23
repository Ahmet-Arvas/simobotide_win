const Blockly = require('blockly');

Blockly.common.defineBlocksWithJsonArray([
    {
      "type": "go_forward",
      "message0": "İleri Git %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "speed",
          "options": [
            ["Çok Hızlı", "200"],
            ["Hızlı", "100"],
            ["Yavaş", "50"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  
    },
    {
      "type": "go_backward",
      "message0": "Geri Git %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "speed",
          "options": [
            ["Çok Hızlı", "200"],
            ["Hızlı", "100"],
            ["Yavaş", "50"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  
    },
    {
      "type": "right",
      "message0": "Sağ Motoru Çalıştır %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "speed",
          "options": [
            ["Çok Hızlı", "200"],
            ["Hızlı", "100"],
            ["Yavaş", "50"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  
    },
    {
      "type": "left",
      "message0": "Sol Motoru Çalıştır %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "speed",
          "options": [
            ["Çok Hızlı", "200"],
            ["Hızlı", "100"],
            ["Yavaş", "50"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  
    },
    {
      "type": "go_forward_seconds",
      "message0": " %1 Saniye boyunca %2 hızı ile %3 git",
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
            ["Çok Hızlı", "200"],
            ["Hızlı", "100"],
            ["Yavaş", "50"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "direction",
          "options": [
            ["İleri", "1"],
            ["Geri", "0"],
          ]
        },
        
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2',
  
    },
    {
      "type": "stop_motors",
      "message0": "%1 Motorunu Durdur",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "motor",
          "options": [
            ["Tümü", "both"],
            ["Sağ", "A"],
            ["Sol", "B"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#4A90E2'
    },
    {
      "type": "wait",
      "message0": "%1 Saniye Bekle",
      "args0": [
        {
          "type": "field_number",
            "name": "second",
            "value": 4,
            "min": 0,
            "max": 100,
            "precision": 0.5
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '%{BKY_TEXTS_HUE}'
    },
    {
      "type": "draw_pixels",
      "message0": "X %1 Y %2 Koordinatlarına Piksel Çiz",
      "args0": [
        {
          "type": "field_number",
            "name": "x",
            "value": 0,
            "min": 0,
            "max": 100,
            "precision": 0.5
        },
        {
          "type": "field_number",
            "name": "y",
            "value": 0,
            "min": 0,
            "max": 100,
            "precision": 0.5
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '%{BKY_TEXTS_HUE}'
    },
    {
      "type": "clean_screen",
      "message0": "Ekranı Temizle",
      "previousStatement": null,
      "nextStatement": null,
      "colour": '%{BKY_TEXTS_HUE}'
  
    },
    {
      "type": "draw_text",
      "message0": "X %1 Y %2 Koordinatlarına %3 Yazısını Çiz",
      "args0": [
        {
          "type": "field_number",
            "name": "x",
            "value": 0,
            "min": 0,
            "max": 128,
            "precision": 1
        },
        {
          "type": "field_number",
            "name": "y",
            "value": 0,
            "min": 0,
            "max": 64,
            "precision": 1
        },
        {
          "type": "field_input",
            "name": "text",
            "value": "Metin"
        },
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": '%{BKY_TEXTS_HUE}'
    }
  ]);