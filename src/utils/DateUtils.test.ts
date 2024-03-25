import { expect, test } from "vitest";
import DateUtils from "./DateUtils";

test("Get difference", async () => {
    const a = new Date(2022, 0, 1);
    const b = new Date(2023, 0, 1);

    expect(DateUtils.getDifference(a, b)).toBe(31536000000);
    expect(DateUtils.getDifference(a, b, { unit: "sec" })).toBe(31536000);
    expect(DateUtils.getDifference(a, b, { unit: "min" })).toBe(525600);
    expect(DateUtils.getDifference(a, b, { unit: "hr" })).toBe(8760);
    expect(DateUtils.getDifference(a, b, { unit: "day" })).toBe(365);
});

test("Get difference floored", async () => {
    const a = new Date(2022, 0, 1, 0, 0, 0, 999);
    const b = new Date(2022, 0, 1, 0, 0, 1, 0);

    expect(DateUtils.getDifference(a, b)).toBe(1);
    expect(DateUtils.getDifference(a, b, { unit: "sec" })).toBe(0.001);
    expect(DateUtils.getDifference(a, b, { unit: "sec", floor: true })).toBe(0);
});

test("Are different", async () => {
    const a = new Date(2022, 0, 1, 0, 0, 0, 0);
    const b = new Date(2022, 0, 1, 0, 0, 0, 1);

    expect(DateUtils.areDifferent(a, b)).toBe(true);
    expect(DateUtils.areDifferent(a, b, { unit: "sec" })).toBe(false);
    expect(DateUtils.areDifferent(a, b, { unit: "min" })).toBe(false);
    expect(DateUtils.areDifferent(a, b, { unit: "hr" })).toBe(false);
    expect(DateUtils.areDifferent(a, b, { unit: "day" })).toBe(false);
});

test("Throw on invalid unit", async () => {
    expect(() => DateUtils.getUnitMs("invalid" as any)).toThrow("Invalid unit: invalid");
});