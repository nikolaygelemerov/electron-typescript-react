/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const { BrowserWindow, app, ipcMain, Notification } = require('electron');

const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
}

if (isDev) {
  // require('electron-reload')(__dirname, {
  //   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  // });
}

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notifiation', body: message }).show();
});

app.whenReady().then(createWindow);
