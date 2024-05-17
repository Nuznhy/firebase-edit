import { Module } from 'vuex';
import { ConfigRootState } from './types';
import { RootState } from '@/store/types';

const state: ConfigRootState = {
    availableConfigsList: [
        { name: 'remomedi-hub-dev', path: '/home/blablaA.json' },
        { name: 'remomedi-hub', path: '/home/blablaB.json' },
        { name: 'apoteket-hamta-dev', path: '/home/blablaC.json' }
    ],
    availableFirebaseModulesList: [
        { name: 'firestore', routerPath: '/firestore-edit' },
        { name: 'database', routerPath: '/database-edit' },
        { name: 'auth', routerPath: '/auth-edit' }
    ],
    selectedFirebaseModule: 'Select firebase',
    selectedConfig: 'Select config'
};

export const configs: Module<ConfigRootState, RootState> = {
    namespaced: true,
    state
    // mutations: {},
    // actions: {},
    // modules: {}
};
