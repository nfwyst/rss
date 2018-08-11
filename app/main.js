const path = require('path');
const url = require('url');
const { BrowserWindow, app } = require('electron');
const debuggers = require('electron-debug');
const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, default: install } = require('electron-devtools-installer');

debuggers();

let mainWindow = null;

app.on('ready', async () => {
  try {
    console.log(`devtools installing...`);
    let name =  await install(REACT_DEVELOPER_TOOLS);
    console.log(`devtools ${name} installed`);
    name = await install(REDUX_DEVTOOLS);
    console.log(`devtools ${name} installed`);
  } catch (err) {
    console.error(err.message);
  }

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: true,
    transparent: false,
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.show();
});

app.on('window-all-closed', () => {
  app.quit();
});
