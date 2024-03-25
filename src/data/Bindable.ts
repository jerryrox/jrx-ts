type Action<T> = (t: T) => any;
type Predicate<T> = (t: T) => boolean;

class ListenerInfo<T> {

    id: number;
    callback: Action<T>;

    constructor() {
        this.id = 0;
        this.callback = () => {};
    }
}

export default class Bindable<T> {
    private _idIncrement: number;
    private _value: T;
    private _listeners: (ListenerInfo<T> | null)[];
    private _triggerWhenDifferent: boolean = true;

    private _proxySource: Bindable<T> | null = null;
    private _proxySubscription: number = 0;

    get proxySource(): Bindable<T> | null { return this._proxySource; }

    get triggerWhenDifferent(): boolean { return this._triggerWhenDifferent; }
    set triggerWhenDifferent(value: boolean) { this._triggerWhenDifferent = value; }

    get value(): T { return this._value; }
    set value(val: T) { this.setValue(val); }

    constructor(value: T, triggerWhenDifferent: boolean = true) {
        this._idIncrement = 0;
        this._value = value;
        this._listeners = [];
        this._triggerWhenDifferent = triggerWhenDifferent;
    }

    startProxy(source: Bindable<T>) {
        this.stopProxy();

        this._proxySource = source;
        this._proxySubscription = source.subscribe(this.onProxySourceTrigger.bind(this));
    }

    stopProxy() {
        if (this._proxySource !== null) {
            this._proxySource.unsubscribe(this._proxySubscription);
            this._proxySource = null;
            this._proxySubscription = 0;
        }
    }

    getValue() { return this._value; }

    setValue(value: T, trigger: boolean = true) {
        if (this._triggerWhenDifferent && this._value === value) {
            return;
        }
        this._value = value;

        if (trigger === true) {
            this.trigger();
        }
    }

    modify(modifier: Action<T>) {
        modifier(this._value);
        this.trigger();
    }

    subscribe(callback: Action<T>, trigger: boolean = true): number {
        const info = new ListenerInfo<T>();
        info.id = this._idIncrement++;
        info.callback = callback;
        this._listeners.push(info);

        if (trigger) {
            callback(this._value);
        }
        return info.id;
    }

    unsubscribe(callbackId: number) {
        for (let i = 0; i < this._listeners.length; i++) {
            const listener = this._listeners[i];
            if (listener !== null && listener.id === callbackId) {
                this._listeners[i] = null;
                return;
            }
        }
    }

    bind(callback: Action<T>, trigger: boolean = true): Action<T> {
        this.subscribe(callback, trigger);
        return callback;
    }

    unbind(callback: Action<T>): void {
        for (let i = 0; i < this._listeners.length; i++) {
            const listener = this._listeners[i];
            if (listener !== null && listener.callback === callback) {
                this._listeners[i] = null;
                return;
            }
        }
    }

    waitFor(
        predicate: Predicate<T>,
        options?: {
            timeoutMs?: number;
            triggerOnStart?: boolean;
        }
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            let isResolved = false;
            let timeoutId = -1;
            const callback = this.bind((value: T) => {
                if (!isResolved && predicate(value)) {
                    isResolved = true;
                    this.unbind(callback);
                    clearTimeout(timeoutId);

                    resolve(value);
                }
            }, options?.triggerOnStart ?? true);

            const timeoutMs = options?.timeoutMs;
            if (timeoutMs !== undefined && timeoutMs > 0) {
                timeoutId = setTimeout(() => {
                    if (!isResolved) {
                        this.unbind(callback);
                        reject("Timeout");
                    }
                }, timeoutMs);
            }
        });
    }

    waitForTrigger(timeoutMs?: number): Promise<T> {
        return this.waitFor(() => true, {
            timeoutMs,
            triggerOnStart: false,
        });
    }

    trigger() {
        for (let i = this._listeners.length - 1; i >= 0; i--) {
            const listener = this._listeners[i];
            if (listener !== null && listener !== undefined &&
                listener.callback !== null && listener.callback !== undefined) {
                listener.callback(this._value);
            }
            else {
                this._listeners.splice(i, 1);
            }
        }
    }

    private onProxySourceTrigger(value: T) {
        this.setValue(value);
    }
}