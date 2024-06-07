import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { configs } from './modules/configs';
import { firestore } from './modules/firestore';

const store: StoreOptions<RootState> = {
    state: {
        welcomeMessage: 'Test default state'
    },
    mutations: {},
    actions: {},
    modules: {
        configs,
        firestore
    }
};

export default new Vuex.Store<RootState>(store);
