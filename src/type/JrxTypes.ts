export type Constructor<T = any> = new (...args: any[]) => T;

export type Action = () => any;
export type ActionT<T> = (value: T) => any;
export type ActionTT<T1, T2> = (value1: T1, value2: T2) => any;

export type Predicate<T> = (value: T) => boolean;