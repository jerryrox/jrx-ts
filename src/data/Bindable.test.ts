import { expect, test } from "vitest";
import Bindable from "./Bindable";
import JrxPromiseUtils from "../utils/JrxPromiseUtils";

test("New bindable", async () => {
    const bindable = new Bindable<number>(42);
    expect(bindable.value).toBe(42);
});

test("Set value", async () => {
    const bindable = new Bindable<number>(42);
    bindable.value = 41;
    expect(bindable.value).toBe(41);
});

test("Set value with binding", async () => {
    let receivedValue = 0;
    const onValueChange = (value: number) => {
        receivedValue = value;
    };

    const bindable = new Bindable<number>(42);
    bindable.bind(onValueChange);
    expect(receivedValue).toBe(42);

    bindable.value = 41;
    expect(receivedValue).toBe(41);
});

test("Set value with binding and no initial trigger", async () => {
    let receivedValue = 0;
    const onValueChange = (value: number) => {
        receivedValue = value;
    };

    const bindable = new Bindable<number>(42);
    bindable.bind(onValueChange, false);
    expect(receivedValue).toBe(0);

    bindable.value = 41;
    expect(receivedValue).toBe(41);
});

test("Unbind", async () => {
    let receivedValue = 0;
    const onValueChange = (value: number) => {
        receivedValue = value;
    };

    const bindable = new Bindable<number>(42);
    bindable.bind(onValueChange);
    expect(receivedValue).toBe(42);

    bindable.unbind(onValueChange);
    bindable.value = 41;
    expect(receivedValue).toBe(42);
});

test("Subscribe", async () => {
    let receivedValue = 0;
    const bindable = new Bindable<number>(42);
    const subscription = bindable.subscribe((value) => {
        receivedValue = value;
    });

    expect(receivedValue).toBe(42);

    bindable.value = 41;
    expect(receivedValue).toBe(41);

    bindable.unsubscribe(subscription);
    bindable.value = 40;
    expect(receivedValue).toBe(41);
});

test("Subscribe with no initial trigger", async () => {
    let receivedValue = 0;
    const bindable = new Bindable<number>(42);
    const subscription = bindable.subscribe((value) => {
        receivedValue = value;
    }, false);

    expect(receivedValue).toBe(0);

    bindable.value = 41;
    expect(receivedValue).toBe(41);

    bindable.unsubscribe(subscription);
    bindable.value = 40;
    expect(receivedValue).toBe(41);
});

test("Manual trigger", async () => {
    let receivedValue = 0;
    const bindable = new Bindable<number>(42);
    bindable.subscribe((value) => {
        receivedValue = value;
    }, false);
    expect(receivedValue).toBe(0);

    bindable.trigger();
    expect(receivedValue).toBe(42);
});

test("Modify", async () => {
    let receivedValue: number[] = [];
    const bindable = new Bindable<number[]>([1, 2, 3]);
    bindable.subscribe((value) => {
        receivedValue.length = 0;
        receivedValue.push(...value);
    });

    bindable.value.push(4);
    expect(receivedValue).toEqual([1, 2, 3]);

    bindable.modify((value) => {
        value.push(5);
    });
    expect(receivedValue).toEqual([1, 2, 3, 4, 5]);
});

test("Wait for predicate", async () => {
    const bindable = new Bindable<number>(42);
    const promise = bindable.waitFor((value) => value === 41);
    bindable.value = 41;
    expect(await promise).toBe(41);
});

test("Wait for predicate with timeout", async () => {
    const bindable = new Bindable<number>(42);

    let errorMessage = "";
    bindable.waitFor((value) => value === 41, {
        timeoutMs: 10,
    }).catch((e) => {
        errorMessage = e.toString();
    });
    await JrxPromiseUtils.wait(20);
    expect(errorMessage).toBe("Timeout");
});

test("Proxy", async () => {
    const bindable = new Bindable<number>(42);

    const proxy = new Bindable(0);
    proxy.startProxy(bindable);

    expect(proxy.value).toBe(42);

    bindable.value = 41;
    expect(proxy.value).toBe(41);

    proxy.stopProxy();
    bindable.value = 40;
    expect(proxy.value).toBe(41);
});

test("Trigger when different object reference", async () => {
    let receivedValue = 0;
    let arr = [1, 2, 3];
    const bindable = new Bindable<number[]>(arr);
    bindable.triggerWhenDifferent = true;
    bindable.subscribe((value) => {
        receivedValue = value.length;
    });

    arr.push(4);
    bindable.value = arr;
    expect(receivedValue).toBe(3);
    expect(bindable.value).toEqual([1, 2, 3, 4]);
});

test("Wait for trigger", async () => {
    const bindable = new Bindable<number>(42);
    const promise = bindable.waitForTrigger();
    bindable.value = 41;
    expect(await promise).toBe(41);
});