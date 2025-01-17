const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Tu môžete pridať ďalšie funkcie, ak je potrebné komunikovať s backendom Electron.
});