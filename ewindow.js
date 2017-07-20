
const electron      = require('electron');
const eapp          = electron.app;
const BrowserWindow = electron.BrowserWindow;

module.exports.init = function(port){

    var mainWindow;

    function createWindow () {
        const startURL = 'http://localhost:'+port;
        mainWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            autoHideMenuBar: true
        });
        mainWindow.on('closed', function () {
            mainWindow = null
        });

        //mainWindow.webContents.openDevTools()
        mainWindow.loadURL(startURL);
    }

    eapp.on('ready', createWindow)

    eapp.on('window-all-closed', function () {
        if (process.platform !== 'darwin') eapp.quit();
    });

    eapp.on('activate', function () {
        if (mainWindow === null)  createWindow();
    });

}
