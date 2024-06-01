import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ConfigState, FirebaseModule } from './types';
import { ConfigMutations } from './mutations';

export const actions: ActionTree<ConfigState, RootState> = {
    async updateCurrentFirebaseModule(context, module: FirebaseModule) {
        context.commit(ConfigMutations.set_active_firebase_module, module);
    }
};
