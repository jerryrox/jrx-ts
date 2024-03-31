import { ActionTT } from "../type/JrxTypes";

export default class EventAction<T1 = void, T2 = void> {
    private readonly callbacks: (ActionTT<T1, T2> | undefined)[] = [];

    add(callback: ActionTT<T1, T2>): void {
        this.callbacks.push(callback);
    }

    remove(callback: ActionTT<T1, T2>): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i] === callback) {
                this.callbacks[i] = undefined;
                return;
            }
        }
    }

    invoke(t1: T1, t2: T2): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            const callback = this.callbacks[i];
            if (callback === undefined) {
                this.callbacks.splice(i, 1);
                i--;
                continue;
            }
            callback(t1, t2);
        }
    }
}
