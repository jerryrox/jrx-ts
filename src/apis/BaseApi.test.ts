import { expect, test } from "vitest";
import { AsyncResponse, BaseApi } from "..";

class TestApi extends BaseApi<number> {
    public get genericErrorMessage(): string {
        return "Failed to add numbers";
    }

    constructor(
        public x: number,
        public y: number,
    ) {
        super();
    }

    protected requestInternal(): Promise<AsyncResponse<number>> {
        if (Number.isNaN(this.x) || Number.isNaN(this.y)) {
            throw new Error("Invalid numbers");
        }
        return Promise.resolve(AsyncResponse.success(this.x + this.y));
    }
}

test("BaseApi implementation", async () => {
    const api = new TestApi(1, 2);
    const response = await api.request();
    expect(response.isSuccess).toBe(true);
    expect(response.value).toBe(3);
    expect(response.error).toBeUndefined();
});

test("BaseApi with invalid numbers", async () => {
    const api = new TestApi(NaN, NaN);
    const response = await api.request();
    expect(response.isSuccess).toBe(false);
    expect(response.value).toBeUndefined();
    expect(response.message).toBe("Failed to add numbers");
    expect(response.error).toMatch(/Invalid numbers/);
});