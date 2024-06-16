import { expect, test } from "vitest";
import { EventAction } from "..";

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

test("Wait invocation", async () => {
    const eventAction = new EventAction<string>();
    let callCount = 0;
    let argValue = "";
    const callback = (arg: string) => {
        callCount++;
        argValue = arg;
    };
    eventAction.add(callback);
    expect(callCount).toBe(0);

    const promise = eventAction.waitInvocation();
    eventAction.invoke("test");
    const result = await promise;
    expect(callCount).toBe(1);
    expect(argValue).toBe("test");
    expect(result).toBe("test");
});