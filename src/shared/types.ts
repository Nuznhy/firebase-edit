import { firestore } from 'firebase-admin';
import { ServiceAccountCredential } from 'firebase-admin/lib/app/credential-internal';
import WhereFilterOp = firestore.WhereFilterOp;
import SetOptions = firestore.SetOptions;

// Functions types
// Config functions
export type GetConfigsFiles = () => Promise<string[]>;
export type GetConfigFromFileName = (fileName: string) => Promise<ServiceAccountCredential>;
export type CreateImportedConfigCopy = (filePath: string, fileName: string) => Promise<ServiceAccountCredential>;

// Firestore functions
export type ReadDocument = (collection: string, document: string) => Promise<any>;
export type ReadCollectionPaginated = (
    collection: string,
    pageSize: number | undefined,
    lastKey: string | undefined,
    whereEqualQueries: WhereQuery[],
    whereSearchQuery?: WhereSearchQuery | undefined,
    orderBy?: OrderBy[]
) => Promise<any[]> | Promise<any>;
export type UpdateDocument = (collection: string, document: string, data: any) => Promise<any>;
export type SetDocument = (collection: string, document: string, data: any, options: SetOptions) => Promise<any>;
export type DeleteDocument = (collection: string, document: string) => Promise<any>;

// Additional parameters types
export type InitializeAdminApp = (projectId: string) => Promise<void>;

export interface WhereQuery {
    field: string;
    operator: WhereFilterOp;
    value: any;
}

export interface WhereSearchQuery {
    less: WhereQuery;
    greater: WhereQuery;
}

export const whereSearchQueryConstructor = (field: string, value: any): WhereSearchQuery => {
    return {
        less: {
            field,
            operator: '<=',
            value: `${value}~`
        },
        greater: {
            field,
            operator: '>=',
            value: `${value}`
        }
    };
};

export interface OrderBy {
    field: string;
    direction: firestore.OrderByDirection;
}
