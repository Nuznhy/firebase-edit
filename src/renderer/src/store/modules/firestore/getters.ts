import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { FirestoreState, FirestoreAction, FirestoreActionHistory } from './types';

export const getters: GetterTree<FirestoreState, RootState> = {
    currentAction: (state: FirestoreState) => state.currentAction,
    availableActions: (state: FirestoreState) => state.availableActions,
    currentData: (state: FirestoreState) => state.currentData,
    changesHistory: (state: FirestoreState) => state.changesHistory,
    firestorePath: (state: FirestoreState) => state.firestorePath
};
