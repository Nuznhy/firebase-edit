import { MutationTree } from 'vuex';
import { FirestoreAction, FirestoreActionHistory, FirestoreState } from './types';

export const enum FirestoreMutations {
    set_current_action = 'set_current_action',
    set_current_data = 'set_current_data',
    add_record_to_history = 'add_record_to_history',
    change_path = ''
}

export const mutations: MutationTree<FirestoreState> = {
    [FirestoreMutations.set_current_action](state: FirestoreState, action: FirestoreAction) {
        state.currentAction = action;
    },
    [FirestoreMutations.set_current_data](state: FirestoreState, data: string) {
        state.currentData = data;
    },
    [FirestoreMutations.add_record_to_history](state: FirestoreState, record: FirestoreActionHistory) {
        state.changesHistory.push(record);
    },
    [FirestoreMutations.change_path](state: FirestoreState, path: string) {
        state.firestorePath = path;
    }
};
