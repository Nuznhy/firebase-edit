export interface ConfigState {
    availableConfigs: Array<Config>;
    availableFirebaseModules: Array<FirebaseModule>;
    selectedFirebaseModule: FirebaseModule;
    selectedConfig: Config;
}

export interface Config {
    name: string;
    path: string;
}

export interface FirebaseModule {
    name: string;
    routerPath: string;
}
