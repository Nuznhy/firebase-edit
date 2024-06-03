export interface ConfigState {
    availableConfigs: Array<string>;
    availableFirebaseModules: Array<FirebaseModule>;
    selectedFirebaseModule: FirebaseModule;
    selectedConfig: string;
}

// export interface Config {
//     name: string;
//     path: string;
// }

export interface FirebaseModule {
    name: string;
    routerPath: string;
}
