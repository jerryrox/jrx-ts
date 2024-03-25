export default class PromiseUtils {

    static wait(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    static async intervalCheck(
        condition: () => boolean,
        intervalMs: number,
        checkCount: number,
        options?: {
            onTimeout?: () => void,
        },
    ): Promise<void> {
        let count = 0;
        while (count < checkCount) {
            if (condition()) {
                return;
            }
            await this.wait(intervalMs);
            count++;
        }
        if (options?.onTimeout) {
            options.onTimeout();
        }
        throw new Error("Interval check timed out.");
    }
}