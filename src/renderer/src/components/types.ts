export interface InputFileEvent extends Event {
    target: HTMLInputElement;
}

export interface FileWithPath extends File {
    path: string;
}
