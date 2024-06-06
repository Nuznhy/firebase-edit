import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/Firestore.png?asset';
import { createImportedConfigCopy, getConfigFromFileName, getConfigsFiles } from './lib';
import {
    CreateImportedConfigCopy,
    GetConfigsFiles,
    GetConfigFromFileName,
    InitializeAdminApp,
    ReadDocument,
    ReadCollectionPaginated,
    UpdateDocument,
    SetDocument,
    DeleteDocument
} from '../shared/types';
import { initializeAdminApp } from './lib/firebaseAdmin';
import { deleteDocument, readCollectionPaginated, readDocument, setDocument, updateDocument } from './lib/firestore';

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        title: 'Firestore Edit',
        titleBarStyle: process.platform === 'linux' ? 'default' : 'hiddenInset',
        backgroundMaterial: 'acrylic',
        center: true,
        frame: process.platform === 'linux',
        vibrancy: 'under-window',
        visualEffectState: 'active',
        trafficLightPosition: { x: 15, y: 10 },
        ...(process.platform === 'linux' ? { icon, backgroundColor: '#5C5470' } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            nodeIntegration: true,
            sandbox: true,
            contextIsolation: true
        }
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
};
//createWindow need to wait(more than about 100ms) if you want the window to be transparent
// app.whenReady().then(createWindow); //this won't work

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');
    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    // IPC test
    ipcMain.on('ping', () => console.log('pong'));

    // Config actions
    ipcMain.handle(
        'getConfigsFiles',
        async (_, ...args: Parameters<GetConfigsFiles>) => await getConfigsFiles(...args)
    );

    ipcMain.handle(
        'getConfigFromFileName',
        async (_, ...args: Parameters<GetConfigFromFileName>) => await getConfigFromFileName(...args)
    );

    ipcMain.handle(
        'createImportedConfigCopy',
        async (_, ...args: Parameters<CreateImportedConfigCopy>) => await createImportedConfigCopy(...args)
    );

    ipcMain.handle(
        'initializeAdminApp',
        async (_, ...args: Parameters<InitializeAdminApp>) => await initializeAdminApp(...args)
    );

    // Firestore actions
    ipcMain.handle('readDocument', async (_, ...args: Parameters<ReadDocument>) => await readDocument(...args));
    ipcMain.handle(
        'readCollectionPaginated',
        async (_, ...args: Parameters<ReadCollectionPaginated>) => await readCollectionPaginated(...args)
    );
    ipcMain.handle('updateDocument', async (_, ...args: Parameters<UpdateDocument>) => await updateDocument(...args));
    ipcMain.handle('setDocument', async (_, ...args: Parameters<SetDocument>) => await setDocument(...args));
    ipcMain.handle('deleteDocument', async (_, ...args: Parameters<DeleteDocument>) => await deleteDocument(...args));

    app.commandLine.appendSwitch('enable-transparent-visuals');
    app.commandLine.appendSwitch('disable-gpu');
    setTimeout(() => {
        createWindow();
    }, 200);

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
