// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require("fs");
const contextMenu = require('electron-context-menu');


contextMenu({
  showLookUpSelection : false,
  showLearnSpelling : false,
  showSearchWithGoogle : false,
  showSelectAll : false,
  showCopyImage : false,
  showInspectElement : false,
});


/// create a global var, wich will keep a reference to out loadingScreen window
let loadingScreen;
const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
    Object.assign({
      /// define width and height for the window
      width: 640,
      height: 426,
      /// remove the window frame, so it will become a frameless window
      frame: false,
      /// and set the transparency, to remove any window background color
      transparent: true
    })
  );
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(
    'file://' + __dirname + '/loading.html',
  );
  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
};
function createWindow (location) {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,},
    /// show to false mean than the window will proceed with its lifecycle, but will not render until we will show it up
    show: false})

  app.allowRendererProcessReuse = false;
  // and load the index.html of the app.
  mainWindow.loadFile(location)
  mainWindow.setMenu(null)
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  /// keep listening on the did-finish-load event, when the mainWindow content has loaded
  mainWindow.webContents.on('did-finish-load', () => {
  /// then close the loading screen window and show the main window
  if (loadingScreen) {
    loadingScreen.close();
  }
  mainWindow.maximize();
  mainWindow.show();
});


return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createLoadingScreen();
  /// add a little bit of delay for tutorial purposes, remove when not needed
  setTimeout(() => {
    currentWin = createWindow("index.html");
  }, 2000);
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on("browser-window-created", (e, win) => {
  win.removeMenu();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
