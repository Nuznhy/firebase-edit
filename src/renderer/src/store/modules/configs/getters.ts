import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { ConfigState } from './types';

export const getters: GetterTree<ConfigState, RootState> = {
    availableConfigs: (state: ConfigState) => state.availableConfigs,
    availableFirebaseModules: (state: ConfigState) => state.availableFirebaseModules,
    selectedFirebaseModule: (state: ConfigState) => state.selectedFirebaseModule,
    selectedConfig: (state: ConfigState) => state.selectedConfig
};
