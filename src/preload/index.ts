import { contextBridge, ipcRenderer } from 'electron';

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
// import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
if (!process.contextIsolated) {
    throw new Error('ContextIsolation must be enabled');
}

try {
    contextBridge.exposeInMainWorld('config', {
        createImportedConfigCopy: (...args: Parameters<CreateImportedConfigCopy>) =>
            ipcRenderer.invoke('createImportedConfigCopy', ...args),

        getConfigsFiles: (...args: Parameters<GetConfigsFiles>) => ipcRenderer.invoke('getConfigsFiles', ...args),

        getConfigFromFileName: (...args: Parameters<GetConfigFromFileName>) =>
            ipcRenderer.invoke('getConfigFromFileName', ...args),

        initializeAdminApp: (...args: Parameters<InitializeAdminApp>) =>
            ipcRenderer.invoke('initializeAdminApp', ...args)
    });

    contextBridge.exposeInMainWorld('firestore', {
        readDocument: (...args: Parameters<ReadDocument>) => ipcRenderer.invoke('readDocument', ...args),

        readCollectionPaginated: (...args: Parameters<ReadCollectionPaginated>) =>
            ipcRenderer.invoke('readCollectionPaginated', ...args),

        updateDocument: (...args: Parameters<UpdateDocument>) => ipcRenderer.invoke('updateDocument', ...args),

        setDocument: (...args: Parameters<SetDocument>) => ipcRenderer.invoke('setDocument', ...args),

        deleteDocument: (...args: Parameters<DeleteDocument>) => ipcRenderer.invoke('deleteDocument', ...args)
    });
} catch (err) {
    console.log(err);
}
