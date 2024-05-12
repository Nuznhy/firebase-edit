import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';

const store: StoreOptions<RootState> = {
    state: {
        welcomeMessage: 'Test default state'
    },
    mutations: {},
    actions: {},
    modules: {}
};

export default new Vuex.Store<RootState>(store);
