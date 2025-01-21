const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false, // Prevents the window from flashing before maximization
  });

  // Load the HTML file or URL
  mainWindow.loadURL('http://localhost:3000');

  // Optionally open DevTools
  // mainWindow.webContents.openDevTools();

  // Maximize the window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show(); // Show the window after maximizing
  });

  // Remove the default menu bar
  mainWindow.setMenu(null);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
