import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { ConfigState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: ConfigState = {
    availableConfigs: await window.config.getConfigsFiles(),
    selectedConfig: 'Select',
    availableFirebaseModules: [
        { name: 'firestore', routerPath: '/firestore-edit' },
        { name: 'database', routerPath: '/database-edit' },
        { name: 'auth', routerPath: '/auth-edit' }
    ],
    selectedFirebaseModule: { name: 'Select', routerPath: '' }
};

export const configs: Module<ConfigState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
