import { contextBridge, ipcRenderer } from 'electron';

import { CreateImportedConfigCopy, GetConfigsFiles, GetConfigFromFileName } from '../shared/types';
// import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
if (!process.contextIsolated) {
    throw new Error('ContextIsolation must be enabled');
}

try {
    contextBridge.exposeInMainWorld('context', {
        createImportedConfigCopy: (...args: Parameters<CreateImportedConfigCopy>) =>
            ipcRenderer.invoke('createImportedConfigCopy', ...args),
        getConfigsFiles: (...args: Parameters<GetConfigsFiles>) => ipcRenderer.invoke('getConfigsFiles', ...args),
        getConfigFromFileName: (...args: Parameters<GetConfigFromFileName>) =>
            ipcRenderer.invoke('getConfigFromFileName', ...args)
    });
} catch (err) {
    console.log(err);
}
