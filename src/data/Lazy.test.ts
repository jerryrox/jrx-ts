import { expect, test } from "vitest";
import Lazy from "./Lazy";

class A {}

test("Initialization", async () => {
    const lazy = new Lazy(() => new A());
    expect(lazy.isCreated).toBe(false);

    const a = lazy.value;
    expect(a).toBeInstanceOf(A);
    expect(lazy.isCreated).toBe(true);
    expect(lazy.value).toBe(a);
});

test("Clear", async () => {
    const lazy = new Lazy(() => new A());
    const a = lazy.value;
    expect(lazy.isCreated).toBe(true);

    lazy.clear();
    expect(lazy.isCreated).toBe(false);

    expect(lazy.value).not.toBe(a);
    expect(lazy.isCreated).toBe(true);
});