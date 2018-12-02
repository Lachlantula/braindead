// Welcome to the main process. This is the behind-the-scenes stuff.

// Modules
import { app, BrowserWindow } from 'electron'; // eslint-disable-line
// import initTB from './touchBar.js';
import initMenu from './Menu';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path') // eslint-disable-line
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\'); // eslint-disable-line
}

const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;

let mainWindow; // eslint-disable-line

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    title: 'Braindead',
    titleBarStyle: 'hiddenInset',
    show: false,
    resizable: false,
    maximizable: false,
    backgroundColor: '#7a82ab',
  });
  mainWindow.loadURL(winURL);
  initMenu(); // from Menu.js
  // mainWindow.setTouchBar(initTB);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Routing + IPC
function redir(route) {
  if (mainWindow.webContents) {
    // eslint-disable-line
    mainWindow.webContents.send('redir', route);
    /* Darken the nav. Nothing will change if already dark,
    and there's no point in wasting space on a conditional. */
    mainWindow.webContents.send('dimNav');
  }
}

export default redir;

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
*/
