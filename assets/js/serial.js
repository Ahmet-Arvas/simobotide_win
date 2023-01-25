const { SerialPort } = require('serialport')
const { FitAddon } = require('xterm-addon-fit');
const { Terminal } = require('xterm');
const { Notyf } = require('notyf');
const { ReadlineParser } = require('@serialport/parser-readline')
const parser = new ReadlineParser()
const i18n = require('./translate.js');


// Create an instance of Notyf
const notyf = new Notyf();
var self = this;
var parsed = [];
class Communication {
  constructor() {
    self.term = new Terminal({
      cursorBlink: "block",
      fontFamily: 'Consolas,monaco,monospace',
      fontSize: 16,
      theme: {
        foreground: '#fff',
        background: '#000'

      }
    });

    self.fitAddon = new FitAddon();
    self.term.loadAddon(self.fitAddon);
    self.term.open(document.getElementById('terminal-container'));
    self.fitAddon.fit();
    self.term.onData((data) => {
      this.sendData(data);
    });
    window.addEventListener('resize', this.xterm_fit, false);
    self.port = new SerialPort({ path: "COM6", baudRate: 9600, autoOpen: false })
    parser.on('data', function (data) {
      if (data != "\r" || data != "\n\r") {
        parsed.push(data.replace(/[^\d+.\d+]/g, ""));
      }
    })
  }

  /*
  *  Fits terminal to height
  */
  xterm_fit() {
    self.fitAddon.fit()
  }

  /**
  * @param {string} select_element It takes select tag's element for com selection
  * 
  */
  portSelected(select_element) {
    self.select_element = select_element;
    if (self.port.isOpen == true || select_element.value == "closePort") {
      this.closePort();
    }
    if (select_element.value != "closePort") {
      self.port = new SerialPort({ path: `${self.select_element.value}`, baudRate: 9600 }, function (err) {
        if (err) {
          notyf.error({ message: err.toString(), dismissible: true });
        }
        else {
          notyf.success({ message: '<span data-i18n="alerts.connected">Connected to port</span>', dismissible: true });
          i18n.syncPage();
        }
      })
      this.sendData('\x03'); // For exit working procces
      self.term.write('\x1bc'); // Clear terminal
      self.port.on('data', function (data) {
        self.term.write(data.toString())
      });
      self.port.pipe(parser)
      return 1;
    }
  }

  /**
  * @param {string} data Data for send serialport
  * It's core function of port functions
  */
  sendData(data) {
    self.port.write(data, function (err) {
      if (err) {
        console.log('Error on write: ', err.message);
      }
    });
  }

  sendResponse(cmd) {
    return new Promise(function (resolve, reject) {
      if (self.port.isOpen == true) {
        self.port.write(cmd)
        self.port.drain()
        self.port.once('data', (data) => { // WHEN TWO PACKETS OF DATA COMES RETURN LATEST COMMANDS ANSWER
          self.port.once('data', (data) => { resolve(parsed[parsed.length - 1]); });
        });
      } else {
        notyf.error({ message: '<span data-i18n="alerts.pleaseConnect">Please connect a port</span>', dismissible: true });
        i18n.syncPage();
        resolve(undefined);
      }
    })
  }

  /**
  * @param {string} code Code you want to send.
  */
  sendLiveCode(code) {
    if (self.port.isOpen == true) {
      this.sendData('\x03');
      this.sendData("\u0005");
      var lines = code.split('\n');
      for (var i = 0; i < lines.length; i++) {
        if (lines[i] != "") {
          this.sendData(lines[i] + '\n\r');
        }
      }
      this.sendData("\u0004");
    } else {
      notyf.error({ message: '<span data-i18n="alerts.pleaseConnect">Please connect a port</span>', dismissible: true });
      i18n.syncPage();
    }

  }

  /**
  * @param {string} filename Filename.
  * @param {string} code Code.
  *
  */
  codetoFile(filename, code) {
    if (self.port.isOpen == true) {
      var lines = code.split('\n');
      for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i] + "\\r";
      }
      code = lines.join("").toString();
      console.log(code.replace(/"/g, '\\"'));
      var saveCodeScript = `
\x03\x03
import struct
f=open("${filename}", "w")
f.write("""${code.replace(/"/g, '\\"')}""")
f.close()
exec(open("${filename}", "r").read(),globals())
`;
      lines = saveCodeScript.split('\n');
      for (var i = 0; i < lines.length; i++) {
        this.sendData(lines[i] + "\n\r");
      }
    } else {
      notyf.error({ message: '<span data-i18n="alerts.pleaseConnect">Please connect a port</span>', dismissible: true });
      i18n.syncPage();
    }
  }

  /**
  * @param {boolean} silence Notify or no (0, 1).
  *
  */
  closePort(silence = 0) {
    self.port.close(function (err) {
      if (err) {
        if (silence == 0) { notyf.error(err.toString()); }
      } else {
        if (silence == 0) {
          self.term.write('\x1bc'); // Clear terminal
          notyf.success({ message: '<span data-i18n="alerts.disconnected">Disconnected!</span>', dismissible: true });
        }
        i18n.syncPage();
      }
    });
  }
}

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if (err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }
    var portobj = JSON.parse(JSON.stringify(ports));
    selectPortHTML = portSelect.firstElementChild.outerHTML;
    for (var key in portobj) {
      if (portobj[key].vendorId == "2E8A") {
        if (portSelect.value == portobj[key].path) {
          var selected = "selected";
        }
        else {
          var selected = "";
        }
        selectPortHTML += "<option value='" + portobj[key].path + "' " + selected + ">" + portobj[key].path + "</option>";
      }
    }
    portSelect.innerHTML = selectPortHTML;
  })
}
function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}
// Set a timeout that will check for new serialPorts every 2 seconds.
// self timeout reschedules itself.
setTimeout(listPorts, 2000);
listSerialPorts()

const serial = new Communication();
module.exports = serial;