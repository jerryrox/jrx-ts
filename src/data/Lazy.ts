export default class Lazy<T> {
    private getValue: () => T;
    private instance: T | undefined;

    public get value(): T {
        if (this.instance === undefined) {
            this.instance = this.getValue();
        }
        return this.instance;
    }

    public get isCreated(): boolean {
        return this.instance !== undefined;
    }

    constructor(
        getValue: () => T,
    ) {
        this.getValue = getValue;
    }

    public clear() {
        this.instance = undefined;
    }
}