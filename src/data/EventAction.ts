type Action = () => any;
type ActionT<T1 = any> = (t1: T1) => any;
type ActionTT<T1 = any, T2 = any> = (t1: T1, t2: T2) => any;

export class EventAction {
    private readonly callbacks: (Action | undefined)[] = [];

    add(callback: Action): void {
        this.callbacks.push(callback);
    }

    remove(callback: Action): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i] === callback) {
                this.callbacks[i] = undefined;
                return;
            }
        }
    }

    invoke(): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            const callback = this.callbacks[i];
            if (callback === undefined) {
                this.callbacks.splice(i, 1);
                i--;
                continue;
            }
            callback();
        }
    }
}

export class EventActionT<T1 = any> {
    private readonly callbacks: (ActionT<T1> | undefined)[] = [];

    add(callback: ActionT<T1>): void {
        this.callbacks.push(callback);
    }

    remove(callback: ActionT<T1>): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i] === callback) {
                this.callbacks[i] = undefined;
                return;
            }
        }
    }

    invoke(t1: T1): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            const callback = this.callbacks[i];
            if (callback === undefined) {
                this.callbacks.splice(i, 1);
                i--;
                continue;
            }
            callback(t1);
        }
    }
}

export class EventActionTT<T1 = any, T2 = any> {
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