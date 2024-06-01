import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { ConfigState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: ConfigState = {
    availableConfigs: [
        { name: 'remomedi-hub-dev', path: '/home/blablaA.json' },
        { name: 'remomedi-hub', path: '/home/blablaB.json' },
        { name: 'apoteket-hamta-dev', path: '/home/blablaC.json' }
    ],
    availableFirebaseModules: [
        { name: 'firestore', routerPath: '/firestore-edit' },
        { name: 'database', routerPath: '/database-edit' },
        { name: 'auth', routerPath: '/auth-edit' }
    ],
    selectedFirebaseModule: { name: 'firestore', routerPath: '/firestore-edit' },
    selectedConfig: { name: '', path: '' }
};

export const configs: Module<ConfigState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
