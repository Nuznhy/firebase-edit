import {
    WhereQuery,
    WhereSearchQuery,
    OrderBy,
    DeleteDocument,
    ReadCollectionPaginated,
    ReadDocument,
    SetDocument,
    UpdateDocument
} from '../../shared/types';
import { FirebaseError, firestore } from 'firebase-admin';
import SetOptions = firestore.SetOptions;

export const readDocument: ReadDocument = async (collection: string, document: string) => {
    return await firestore()
        .collection(collection)
        .doc(document)
        .get()
        .then(async (documentSnapshot: firestore.DocumentSnapshot<firestore.DocumentData, firestore.DocumentData>) => {
            return {
                data: documentSnapshot.data(),
                id: documentSnapshot.id,
                ref: documentSnapshot.ref
            };
        })
        .catch((err: FirebaseError) => {
            return { code: err.code, message: err.message };
        });
};

export const readCollectionPaginated: ReadCollectionPaginated = async (
    collection: string,
    pageSize: number | undefined,
    lastKey: string | undefined,
    whereEqualQueries: WhereQuery[],
    whereSearchQuery?: WhereSearchQuery | undefined,
    orderBy?: OrderBy[]
) => {
    let ref: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = firestore().collection(collection);
    if (orderBy) {
        orderBy.forEach((order) => {
            ref = ref.orderBy(order.field, order.direction);
        });
    }

    whereEqualQueries.forEach((whereQuery) => {
        ref = ref.where(whereQuery.field, whereQuery.operator, whereQuery.value);
    });

    if (whereSearchQuery) {
        ref = ref
            .orderBy(whereSearchQuery.greater.field)
            .where(
                whereSearchQuery.less.field,
                whereSearchQuery.less.operator,
                whereSearchQuery.less.value.toLowerCase()
            )
            .where(
                whereSearchQuery.greater.field,
                whereSearchQuery.greater.operator,
                whereSearchQuery.greater.value.toLowerCase()
            );
    }

    switch (lastKey) {
        case undefined:
            ref = ref.orderBy(firestore.FieldPath.documentId());
            break;
        default:
            ref = ref.orderBy(firestore.FieldPath.documentId()).startAfter(lastKey);
    }

    if (pageSize !== undefined) {
        ref = ref.limit(pageSize);
    }

    return await ref
        .get()
        .then((snapshot) => {
            return snapshot.docs.forEach((documentSnapshot: firestore.QueryDocumentSnapshot) => {
                return {
                    data: documentSnapshot.data(),
                    id: documentSnapshot.id,
                    ref: documentSnapshot.ref
                };
            });
        })
        .catch((err: any) => {
            return { code: err.code, message: err.message };
        });
};

export const updateDocument: UpdateDocument = async (collection: string, document: string, data: any) => {
    return await firestore()
        .collection(collection)
        .doc(document)
        .update(data)
        .then((writeResult: firestore.WriteResult) => writeResult)
        .catch((err: FirebaseError) => {
            return { code: err.code, message: err.message };
        });
};

export const setDocument: SetDocument = async (
    collection: string,
    document: string,
    data: any,
    options: SetOptions
) => {
    return await firestore()
        .collection(collection)
        .doc(document)
        .set(data, options)
        .then((writeResult: firestore.WriteResult) => writeResult)
        .catch((err: FirebaseError) => {
            return { code: err.code, message: err.message };
        });
};

export const deleteDocument: DeleteDocument = async (collection: string, document: string) => {
    return await firestore()
        .collection(collection)
        .doc(document)
        .delete()
        .then((writeResult: firestore.WriteResult) => writeResult)
        .catch((err: FirebaseError) => {
            return { code: err.code, message: err.message };
        });
};
