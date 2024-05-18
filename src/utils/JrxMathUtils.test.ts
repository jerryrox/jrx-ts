import { expect, test } from "vitest";
import JrxMathUtils from "./JrxMathUtils";

test("Clamp a number", () => {
    expect(JrxMathUtils.clamp(10, 0, 5)).toBe(5);
    expect(JrxMathUtils.clamp(-5, 0, 5)).toBe(0);
    expect(JrxMathUtils.clamp(3, 0, 5)).toBe(3);
});

test("Hex to int", () => {
    expect(JrxMathUtils.hexToInt("ff")).toBe(255);
    expect(JrxMathUtils.hexToInt("f")).toBe(15);
    expect(JrxMathUtils.hexToInt("z")).toBe(0);
});

test("Lerp between two numbers", () => {
    expect(JrxMathUtils.lerp(0, 10, 0.5)).toBe(5);
    expect(JrxMathUtils.lerp(0, 10, 0.75)).toBe(7.5);
});

test("Inverse lerp between two numbers", () => {
    expect(JrxMathUtils.inverseLerp(0, 10, 5)).toBe(0.5);
    expect(JrxMathUtils.inverseLerp(0, 10, 7.5)).toBe(0.75);
});

test("Random range", () => {
    let value = JrxMathUtils.randomRange(0, 1);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(1);

    value = JrxMathUtils.randomRange(0, 10, true);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(10);
    expect(Number.isInteger(value)).toBe(true);
});

test("Round a number", () => {
    expect(JrxMathUtils.round(1.2345, 2)).toBe(1.23);
    expect(JrxMathUtils.round(1.2355, 0)).toBe(1);
});