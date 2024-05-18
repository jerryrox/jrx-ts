import { expect, test } from "vitest";
import Color from "./Color";

test("New Color instance with rgba", () => {
    const color = Color.rgba(255, 255, 255, 1);
    expect(color.r).toBe(1);
    expect(color.g).toBe(1);
    expect(color.b).toBe(1);
    expect(color.a).toBe(1);
});

test("Clone a Color instance", () => {
    const color = Color.rgba(255, 255, 255, 1);
    const clone = color.clone();
    expect(clone).toEqual(color);
});

test("Darken a Color instance", () => {
    const color = Color.rgba(255, 255, 255, 1);
    const darkened = color.darken(0.5);
    expect(darkened.r).toBeLessThan(color.r);
    expect(darkened.g).toBeLessThan(color.g);
    expect(darkened.b).toBeLessThan(color.b);
});

test("Return overlay font color", () => {
    let color = Color.rgba(255, 255, 255, 1);
    expect(color.overlayFontColor).toBe("#000");

    color = Color.rgba(0, 0, 0, 1);
    expect(color.overlayFontColor).toBe("#fff");
});

test("Interpolate between two colors", () => {
    const color1 = Color.rgba(255, 255, 255, 1);
    const color2 = Color.rgba(0, 0, 0, 1);
    const lerpColor = Color.lerp(color1, color2, 0.5);
    expect(lerpColor.r).toBe(0.5);
    expect(lerpColor.g).toBe(0.5);
    expect(lerpColor.b).toBe(0.5);
});

test("Convert color to hex", () => {
    const color = Color.rgba(255, 255, 255, 1);
    expect(color.hex).toBe("#ffffff");
});

test("Convert color to rgba", () => {
    const color = Color.rgba(255, 255, 255, 1);
    expect(color.rgba).toBe("rgba(255, 255, 255, 1)");
});

test("Color from hex", () => {
    let color = Color.hex("#ffffff");
    expect(color.r).toBe(1);
    expect(color.g).toBe(1);
    expect(color.b).toBe(1);
    expect(color.a).toBe(1);

    color = Color.hex("000f");
    expect(color.r).toBe(0);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
    expect(color.a).toBe(1);

    color = Color.hex("fff");
    expect(color.r).toBe(1);
    expect(color.g).toBe(1);
    expect(color.b).toBe(1);

    expect(() => Color.hex("ff")).toThrow();
    expect(() => Color.hex("f")).toThrow();
    expect(() => Color.hex("fffff")).toThrow();
    expect(() => Color.hex("fffffff")).toThrow();
});

test("Clone with alpha", () => {
    const color = Color.rgba(255, 255, 255, 0.5);
    const clone = color.withAlpha(0.75);
    expect(clone.a).toBe(0.75);
    expect(clone.r).toBe(1);
    expect(clone.g).toBe(1);
    expect(clone.b).toBe(1);
});

test("Brighten", () => {
    const color = Color.rgba(0, 0, 0, 1);
    const brightened = color.brighten(0.5);
    expect(brightened.r).toBeGreaterThan(color.r);
    expect(brightened.g).toBeGreaterThan(color.g);
    expect(brightened.b).toBeGreaterThan(color.b);
});