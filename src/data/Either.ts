export default class Either<T1 = any, T2 = any> {
    public get hasT1(): boolean { return this.t1 !== undefined; }
    public get hasT2(): boolean { return this.t2 !== undefined; }

    constructor(
        public t1: T1 | undefined,
        public t2: T2 | undefined,
    ) {}
}