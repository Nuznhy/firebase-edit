import { homedir } from 'node:os';
import { appDirName, configsDirName, fileEncoding } from '../../shared/constants';
import * as path from 'node:path';
import { copyFileSync, ensureDir, ensureFile, readdir, readJSON } from 'fs-extra';
import { ServiceAccountCredential } from 'firebase-admin/lib/app/credential-internal';
import { CreateImportedConfigCopy, GetConfigFromFileName, GetConfigsFiles } from '../../shared/types';

export const getRootDir = () => {
    return path.join(homedir(), appDirName);
};

export const getConfigsFiles: GetConfigsFiles = async (): Promise<string[]> => {
    const configsDir = path.join(getRootDir(), configsDirName);
    await ensureDir(configsDir);
    const configFileNames = await readdir(configsDir, { withFileTypes: false, encoding: fileEncoding });
    const filtered = configFileNames.filter((fileName) => fileName.endsWith('.json'));
    return filtered.map((config) => config.replace(/\.[^/.]+$/, ''));
};

export const getConfigFromFileName: GetConfigFromFileName = async (
    fileName: string
): Promise<ServiceAccountCredential> => {
    const configsDir = path.join(getRootDir(), configsDirName);
    await ensureDir(configsDir);
    // console.log(config);
    return await readJSON(path.join(configsDir, fileName));
};

export const createImportedConfigCopy: CreateImportedConfigCopy = async (
    filePath: string,
    fileName: string
): Promise<ServiceAccountCredential> => {
    const configsDir = path.join(getRootDir(), configsDirName);
    await ensureDir(configsDir);
    await ensureFile(path.join(configsDir, fileName));
    copyFileSync(filePath, path.join(configsDir, fileName));
    return getConfigFromFileName(path.join(fileName));
};
