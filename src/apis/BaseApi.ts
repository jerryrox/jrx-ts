import AsyncResponse from "../data/AsyncResponse";

export default abstract class BaseApi<T = any> {
    public abstract get genericErrorMessage(): string;

    async request(): Promise<AsyncResponse<T>> {
        try {
            return await this.requestInternal();
        }
        catch (e: any) {
            return AsyncResponse.failed(this.genericErrorMessage, {
                error: e.toString(),
            });
        }
    }

    protected abstract requestInternal(): Promise<AsyncResponse<T>>;
}