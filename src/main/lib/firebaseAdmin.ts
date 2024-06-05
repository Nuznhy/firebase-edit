import { initializeApp, credential, ServiceAccount } from 'firebase-admin';
import { readFileSync } from 'fs-extra';
import * as path from 'node:path';
import { getRootDir } from './index';
import { InitializeAdminApp } from '../../shared/types';
import { deleteApp, getApp } from 'firebase-admin/app';

export const initializeAdminApp: InitializeAdminApp = async (projectId: string): Promise<void> => {
    const credentialFile = readFileSync(path.join(getRootDir(), projectId + '.json'));
    const configParsed: any = JSON.parse(credentialFile.toString());
    let config: ServiceAccount;
    // console.log('json ', config);
    if (configParsed.firebaseAdminConfig) {
        config = configParsed.firebaseAdminConfig as ServiceAccount;
    } else {
        config = configParsed as ServiceAccount;
    }
    try {
        initializeApp({
            credential: credential.cert(config),
            databaseURL: configParsed.databaseURL,
            storageBucket: configParsed.storageBucket
        });
    } catch (err: any) {
        if (err.code === 'app/duplicate-app') {
            await deleteApp(getApp());
            initializeApp({
                credential: credential.cert(config),
                databaseURL: configParsed.databaseURL,
                storageBucket: configParsed.storageBucket
            });
        }
    }
    console.log(getApp().options);
};
