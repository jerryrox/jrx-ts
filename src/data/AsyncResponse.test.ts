import { expect, test } from "vitest";
import AsyncResponse from "./AsyncResponse";

test("Successful response", async () => {
    let response = AsyncResponse.success(42);
    expect(response.isSuccess).toBe(true);
    expect(response.value).toBe(42);
    expect(response.message).toBe("");
    expect(response.error).toBeUndefined();

    response = AsyncResponse.success(41, {
        message: "Success",
        code: "201",
    });
    expect(response.isSuccess).toBe(true);
    expect(response.value).toBe(41);
    expect(response.message).toBe("Success");
    expect(response.error).toBeUndefined();
    expect(response.code).toBe("201");
});

test("Failed response", async () => {
    let response = AsyncResponse.failed("Failed");
    expect(response.isSuccess).toBe(false);
    expect(response.value).toBeUndefined();
    expect(response.message).toBe("Failed");
    expect(response.error).toBeUndefined();

    response = AsyncResponse.failed("Failed", {
        code: "400",
        error: "Error",
        errorParams: { param: "value" },
    });
    expect(response.isSuccess).toBe(false);
    expect(response.value).toBeUndefined();
    expect(response.message).toBe("Failed");
    expect(response.error).toBe("Error");
    expect(response.errorParams).toEqual({ param: "value" });
});

test("Failed from another failed response", async () => {
    const response1 = AsyncResponse.failed<string>("failed1");
    const response2 = AsyncResponse.failedFromResponse<number>(response1);

    expect(response2.isSuccess).toBe(false);
    expect(response2.value).toBeUndefined();
    expect(response2.message).toBe("failed1");
    expect(response2.error).toBeUndefined();
    expect(response2.code).toBeUndefined();
    expect(response2.errorParams).toBeUndefined();
});