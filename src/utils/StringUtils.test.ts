import { expect, test } from "vitest";
import StringUtils from "./StringUtils";

test("Combine", async () => {
    expect(StringUtils.combine(["a", "b", "c"])).toBe("abc");
    expect(StringUtils.combine(["a", null, "c"])).toBe("ac");
    expect(StringUtils.combine(["a", "b", "c"], { lead: "(", trail: ")", separator: "," })).toBe("(a,b,c)");
    expect(StringUtils.combine(["a", "b", "c"], { separator: "-" })).toBe("a-b-c");
});

test("Capitalize", async () => {
    expect(StringUtils.capitalize("hello")).toBe("Hello");
    expect(StringUtils.capitalize("Hello")).toBe("Hello");
    expect(StringUtils.capitalize("")).toBe("");
});