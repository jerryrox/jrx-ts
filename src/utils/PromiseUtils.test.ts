import { expect, test } from "vitest";
import PromiseUtils from "./PromiseUtils";

test("Wait", async () => {
    const curTime = Date.now();
    await PromiseUtils.wait(100);
    const diff = Date.now() - curTime;
    expect(diff).toBeGreaterThanOrEqual(100);
});

test("Interval check", async () => {
    let count = 0;
    await PromiseUtils.intervalCheck(() => {
        count++;
        return count >= 3;
    }, 20, 5);
    expect(count).toBe(3);
});

test("Interval check timeout", async () => {
    let count = 0;
    try {
        await PromiseUtils.intervalCheck(() => {
            count++;
            return false;
        }, 20, 5, {
            onTimeout: () => {
                count = -1;
            },
        });
    }
    catch (e) {
        expect(count).toBe(-1);
        return;
    }
    // Shouldn't come here
    expect(false).toBe(true);
});