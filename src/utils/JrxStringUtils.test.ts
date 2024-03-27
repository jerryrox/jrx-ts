import { expect, test } from "vitest";
import JrxStringUtils from "./JrxStringUtils";

test("Combine", async () => {
    expect(JrxStringUtils.combine(["a", "b", "c"])).toBe("abc");
    expect(JrxStringUtils.combine(["a", null, "c"])).toBe("ac");
    expect(JrxStringUtils.combine(["a", "b", "c"], { lead: "(", trail: ")", separator: "," })).toBe("(a,b,c)");
    expect(JrxStringUtils.combine(["a", "b", "c"], { separator: "-" })).toBe("a-b-c");
});

test("Capitalize", async () => {
    expect(JrxStringUtils.capitalize("hello")).toBe("Hello");
    expect(JrxStringUtils.capitalize("Hello")).toBe("Hello");
    expect(JrxStringUtils.capitalize("")).toBe("");
});