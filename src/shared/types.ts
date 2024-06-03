import { ServiceAccountCredential } from 'firebase-admin/lib/app/credential-internal';

export type GetConfigsFiles = () => Promise<string[]>;
export type GetConfigFromFileName = (fileName: string) => Promise<ServiceAccountCredential>;
export type CreateImportedConfigCopy = (filePath: string, fileName: string) => Promise<ServiceAccountCredential>;
