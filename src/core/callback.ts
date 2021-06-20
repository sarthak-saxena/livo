interface Props {}

export default class CallbackEventListener {
  listeners: { [name: string]: Function[] } = {};

  constructor(props?: Props) {}

  on = (eventListenerName: string, listener: Function) => {
    if (!this.listeners[eventListenerName]) {
      this.listeners[eventListenerName] = [];
    }
    this.listeners[eventListenerName].push(listener);
  };

  call = (eventListenerName: string, params?: any) => {
    this.listeners[eventListenerName] &&
      this.listeners[eventListenerName].forEach((cb) => cb(params));
  };
}
