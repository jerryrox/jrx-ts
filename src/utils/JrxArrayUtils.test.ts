import { expect, test } from "vitest";
import JrxArrayUtils from "./JrxArrayUtils";

test("Are equal", async () => {
    const a = [1, 2, 3];
    const b = a;
    expect(JrxArrayUtils.areEqual(a, b)).toBe(true);
    expect(JrxArrayUtils.areEqual([], [])).toBe(true);
    expect(JrxArrayUtils.areEqual([1], [1])).toBe(true);
    expect(JrxArrayUtils.areEqual([1, 2], [1, 2])).toBe(true);
    expect(JrxArrayUtils.areEqual([1, 2], [2, 1])).toBe(false);
    expect(JrxArrayUtils.areEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(JrxArrayUtils.areEqual([1, 2, 3], [1, 2])).toBe(false);
});

test("Remove", async () => {
    const a = [1, 2, 3];
    JrxArrayUtils.remove(a, 2);
    expect(a).toEqual([1, 3]);

    JrxArrayUtils.remove(a, 2);
    expect(a).toEqual([1, 3]);
});

test("Remove where", async () => {
    const a = [1, 2, 3, 4, 5];
    JrxArrayUtils.removeWhere(a, (x) => x % 2 === 0);
    expect(a).toEqual([1, 3, 5]);

    JrxArrayUtils.removeWhere(a, (x) => x % 2 === 1);
    expect(a).toEqual([]);
});