import { homedir } from 'node:os';
import { appDirName, fileEncoding } from '../../shared/constants';
import * as path from 'node:path';
import { ensureDir, readdir, readJSON, copyFileSync, ensureFile } from 'fs-extra';
import { ServiceAccountCredential } from 'firebase-admin/lib/app/credential-internal';
import { CreateImportedConfigCopy, GetConfigsFiles, GetConfigFromFileName } from '../../shared/types';

export const getRootDir = () => {
    return path.join(homedir(), appDirName);
};

export const getConfigsFiles: GetConfigsFiles = async (): Promise<string[]> => {
    const rootDir = getRootDir();
    await ensureDir(rootDir);
    const configFileNames = await readdir(rootDir, { withFileTypes: false, encoding: fileEncoding });
    return configFileNames.filter((fileName) => fileName.endsWith('.json'));
};

export const getConfigFromFileName: GetConfigFromFileName = async (
    fileName: string
): Promise<ServiceAccountCredential> => {
    const rootDir = getRootDir();
    await ensureDir(rootDir);
    const config = await readJSON(path.join(rootDir, fileName));
    console.log(config);
    return config;
};

export const createImportedConfigCopy: CreateImportedConfigCopy = async (
    filePath: string,
    fileName: string
): Promise<ServiceAccountCredential> => {
    const rootDir = getRootDir();
    await ensureDir(rootDir);
    await ensureFile(path.join(rootDir, fileName));
    copyFileSync(filePath, path.join(rootDir, fileName));
    return getConfigFromFileName(path.join(fileName));
};
