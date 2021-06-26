interface Props {
}
export default class CallbackEventListener {
    listeners: {
        [name: string]: Function[];
    };
    constructor(props?: Props);
    on: (eventListenerName: string, listener: Function) => void;
    call: (eventListenerName: string, params?: any) => void;
}
export {};
