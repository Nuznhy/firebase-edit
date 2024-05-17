export interface ConfigRootState {
    availableConfigsList: Array<Config>;
    availableFirebaseModulesList: Array<FirebaseModule>;
    selectedFirebaseModule: string;
    selectedConfig: string;
}

interface Config {
    name: string;
    path: string;
}

interface FirebaseModule {
    name: string;
    routerPath: string;
}
