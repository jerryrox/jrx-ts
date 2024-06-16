import { ActionT } from "../type/JrxTypes";

export default class EventAction<T = void> {
    private readonly callbacks: (ActionT<T> | undefined)[] = [];

    add(callback: ActionT<T>): void {
        this.callbacks.push(callback);
    }

    remove(callback: ActionT<T>): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i] === callback) {
                this.callbacks[i] = undefined;
                return;
            }
        }
    }

    invoke(t: T): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            const callback = this.callbacks[i];
            if (callback === undefined) {
                this.callbacks.splice(i, 1);
                i--;
                continue;
            }
            callback(t);
        }
    }

    /**
     * Returns a promise that resolves only once the event is invoked.
     */
    waitInvocation(): Promise<T> {
        return new Promise((resolve) => {
            const callback = (t: T) => {
                resolve(t);
                this.remove(callback);
            };
            this.add(callback);
        });
    }
}
