import { expect, test } from "vitest";
import { EventAction } from "../main";

test("No args event action", async () => {
    const eventAction = new EventAction();
    let callCount = 0;
    const callback = () => {
        callCount++;
    };
    eventAction.add(callback);
    expect(callCount).toBe(0);

    eventAction.invoke();
    expect(callCount).toBe(1);

    eventAction.remove(callback);
    eventAction.invoke();
    expect(callCount).toBe(1);
});

test("1 arg event action", async () => {
    const eventAction = new EventAction<string>();
    let callCount = 0;
    let argValue = "";
    const callback = (arg: string) => {
        callCount++;
        argValue = arg;
    };
    eventAction.add(callback);
    expect(callCount).toBe(0);

    eventAction.invoke("test");
    expect(callCount).toBe(1);
    expect(argValue).toBe("test");

    eventAction.remove(callback);
    eventAction.invoke("test2");
    expect(callCount).toBe(1);
    expect(argValue).toBe("test");
});

test("2 arg event action", async () => {
    const eventAction = new EventAction<string, number>();
    let callCount = 0;
    let arg1Value = "";
    let arg2Value = 0;
    const callback = (arg1: string, arg2: number) => {
        callCount++;
        arg1Value = arg1;
        arg2Value = arg2;
    };
    eventAction.add(callback);
    expect(callCount).toBe(0);

    eventAction.invoke("test", 123);
    expect(callCount).toBe(1);
    expect(arg1Value).toBe("test");
    expect(arg2Value).toBe(123);

    eventAction.remove(callback);
    eventAction.invoke("test2", 456);
    expect(callCount).toBe(1);
    expect(arg1Value).toBe("test");
    expect(arg2Value).toBe(123);
});