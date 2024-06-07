import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { FirestoreState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: FirestoreState = {
    currentAction: { name: 'Read document', code: 'readDoc' },
    availableActions: [
        { name: 'Read document', code: 'readDoc' },
        { name: 'Read collection', code: 'readCol' },
        { name: 'Update', code: 'updateDoc' },
        { name: 'Set', code: 'setDoc' },
        { name: 'Delete ', code: 'deleteDoc' }
    ],
    currentData: '{}',
    changesHistory: [],
    firestorePath: 'legacy_and_parameters/entityNames'
};

export const firestore: Module<FirestoreState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
