import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { configs } from './modules/configs';

const store: StoreOptions<RootState> = {
    state: {
        welcomeMessage: 'Test default state'
    },
    mutations: {},
    actions: {},
    modules: {
        configs
    }
};

export default new Vuex.Store<RootState>(store);
