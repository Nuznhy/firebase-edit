import { MutationTree } from 'vuex';
import { ConfigState, Config, FirebaseModule } from './types';

export const enum ConfigMutations {
    add_config = 'add_config',
    set_active_config = 'set_active_config',
    set_active_firebase_module = 'set_active_firebase_module'
}

export const mutations: MutationTree<ConfigState> = {
    [ConfigMutations.add_config](state: ConfigState, config: Config) {
        state.availableConfigs.push(config);
    },
    [ConfigMutations.set_active_config](state: ConfigState, config: Config) {
        state.selectedConfig = config;
    },
    [ConfigMutations.set_active_firebase_module](state: ConfigState, module: FirebaseModule) {
        state.selectedFirebaseModule = module;
    }
};
