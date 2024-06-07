import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { FirestoreAction, FirestoreActionHistory, FirestoreState } from './types';
import { FirestoreMutations } from './mutations';

export const actions: ActionTree<FirestoreState, RootState> = {
    async updateCurrentAction(context, action: FirestoreAction) {
        context.commit(FirestoreMutations.set_current_action, action);
    },
    async updateCurrentData(context, data: string) {
        context.commit(FirestoreMutations.set_current_data, data);
    },
    async addRecordToHistory(context, record: FirestoreActionHistory) {
        context.commit(FirestoreMutations.add_record_to_history, record);
    },
    async changePath(context, firestorePath: string) {
        context.commit(FirestoreMutations.change_path, firestorePath);
    }
};
