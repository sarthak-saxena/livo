import { dataStore } from "../App";
import { VoxeetCommandType } from "../types/Voxeet";

export default class CallbackEventListener {
  listeners: { [name: string]: Function[] } = {};
  private readonly updateDataStore: boolean = false;

  constructor(updateDataStore?: boolean) {
    this.updateDataStore = updateDataStore;
  }

  on = (eventListenerName: string, listener: Function) => {
    if (!this.listeners[eventListenerName]) {
      this.listeners[eventListenerName] = [];
    }
    this.listeners[eventListenerName].push(listener);
  };

  call = (eventListenerName: VoxeetCommandType, params?: any) => {
    if (this.listeners[eventListenerName]) {
      this.listeners[eventListenerName].forEach((cb) => cb(params));
      if (this.updateDataStore) {
        dataStore.update(eventListenerName, params);
      }
    }
  };
}
