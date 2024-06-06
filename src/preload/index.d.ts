// import { ElectronAPI } from '@electron-toolkit/preload';

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

declare global {
    interface Window {
        config: {
            createImportedConfigCopy: CreateImportedConfigCopy;
            getConfigsFiles: GetConfigsFiles;
            getConfigFromFileName: GetConfigFromFileName;
            initializeAdminApp: InitializeAdminApp;
        };
        firestore: {
            readDocument: ReadDocument;
            readCollectionPaginated: ReadCollectionPaginated;
            updateDocument: UpdateDocument;
            setDocument: SetDocument;
            deleteDocument: DeleteDocument;
        };
    }
}
