import { expect, test } from "vitest";
import ArrayUtils from "./ArrayUtils";

test("Are equal", async () => {
    const a = [1, 2, 3];
    const b = a;
    expect(ArrayUtils.areEqual(a, b)).toBe(true);
    expect(ArrayUtils.areEqual([], [])).toBe(true);
    expect(ArrayUtils.areEqual([1], [1])).toBe(true);
    expect(ArrayUtils.areEqual([1, 2], [1, 2])).toBe(true);
    expect(ArrayUtils.areEqual([1, 2], [2, 1])).toBe(false);
    expect(ArrayUtils.areEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(ArrayUtils.areEqual([1, 2, 3], [1, 2])).toBe(false);
});

test("Remove", async () => {
    const a = [1, 2, 3];
    ArrayUtils.remove(a, 2);
    expect(a).toEqual([1, 3]);

    ArrayUtils.remove(a, 2);
    expect(a).toEqual([1, 3]);
});

test("Remove where", async () => {
    const a = [1, 2, 3, 4, 5];
    ArrayUtils.removeWhere(a, (x) => x % 2 === 0);
    expect(a).toEqual([1, 3, 5]);

    ArrayUtils.removeWhere(a, (x) => x % 2 === 1);
    expect(a).toEqual([]);
});