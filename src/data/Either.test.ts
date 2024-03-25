import { expect, test } from "vitest";
import Either from "./Either";

test("Initialization", async () => {
    let either = new Either<number, string>(0, undefined);
    expect(either.hasT1).toBe(true);
    expect(either.hasT2).toBe(false);

    either = new Either<number, string>(undefined, "hello");
    expect(either.hasT1).toBe(false);
    expect(either.hasT2).toBe(true);
});