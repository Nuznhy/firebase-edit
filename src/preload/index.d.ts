// import { ElectronAPI } from '@electron-toolkit/preload';

import { CreateImportedConfigCopy, GetConfigsFiles, GetConfigFromFileName, InitializeAdminApp } from '../shared/types';

declare global {
    interface Window {
        context: {
            createImportedConfigCopy: CreateImportedConfigCopy;
            getConfigsFiles: GetConfigsFiles;
            getConfigFromFileName: GetConfigFromFileName;
            initializeAdminApp: InitializeAdminApp;
        };
    }
}
