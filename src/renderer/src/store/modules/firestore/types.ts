export interface FirestoreState {
    currentAction: FirestoreAction;
    availableActions: FirestoreAction[];
    currentData: string;
    changesHistory: FirestoreActionHistory[];
    firestorePath: string;
}

export interface FirestoreActionHistory {
    timestamp: string;
    path: string;
    action: string;
    before: string;
    after: string;
    difference: string;
    setOptions: any;
}

export interface FirestoreAction {
    name: string;
    code: string;
}
