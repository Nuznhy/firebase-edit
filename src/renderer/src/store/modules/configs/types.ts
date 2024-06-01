export interface ConfigState {
    availableConfigs: Array<Config>;
    availableFirebaseModules: Array<FirebaseModule>;
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
