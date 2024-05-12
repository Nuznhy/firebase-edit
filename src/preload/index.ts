import { contextBridge } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
if (!process.contextIsolated) {
    throw new Error('ContextIsolation must be enabled')
}

try {
    contextBridge.exposeInMainWorld('context', {
        // TODO
    })
} catch (err: any) {
    console.log(err)
}
