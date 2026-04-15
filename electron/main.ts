import type { AddressInfo } from 'node:net';
import { app, BrowserWindow, shell } from 'electron';
import { startBridgeServer } from '../server/app.js';
import { serverConfig } from '../server/config.js';

const DEV_RENDERER_URL = process.env.ELECTRON_RENDERER_URL ?? 'http://127.0.0.1:3000';

let bridgePort = serverConfig.port;

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1100,
    minHeight: 760,
    title: 'OpenStroid',
    autoHideMenuBar: true,
    backgroundColor: '#11131a',
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: 'deny' };
  });

  if (serverConfig.isProduction) {
    void window.loadURL(`http://127.0.0.1:${bridgePort}`);
  } else {
    void window.loadURL(DEV_RENDERER_URL);
  }
}

async function bootstrapDesktopApp() {
  const server = startBridgeServer(serverConfig.port);
  const address = server.address();
  if (address && typeof address !== 'string') {
    bridgePort = (address as AddressInfo).port;
  }

  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('before-quit', () => {
    server.close();
  });
}

app.whenReady().then(() => {
  app.setName('OpenStroid');
  if (process.platform === 'win32') {
    app.setAppUserModelId('ai.capy.openstroid');
  }
  void bootstrapDesktopApp();
});
