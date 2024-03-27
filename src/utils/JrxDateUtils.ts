type TimeUnit = "ms" | "sec" | "min" | "hr" | "day";

export default class JrxDateUtils {

    public static readonly timeUnits = ["ms", "sec", "min", "hr", "day"] as const;
    
    private static unitMs: Record<TimeUnit, number> = {
        ms: 1,
        sec: 1000,
        min: 60000,
        hr: 3600000,
        day: 86400000,
    };

    static getUnitMs(unit: TimeUnit): number {
        if (this.unitMs[unit] === undefined) {
            throw new Error(`Invalid unit: ${unit}`);
        }
        return this.unitMs[unit];
    }

    static getDifference(
        x: Date,
        y: Date,
        options?: {
            unit?: TimeUnit,
            floor?: boolean,
        },
    ): number {
        let value = Math.abs(x.getTime() - y.getTime());
        if (options?.unit) {
            value /= this.getUnitMs(options.unit);
        }
        if (options?.floor) {
            value = Math.floor(value);
        }
        return value;
    }

    /**
     * Returns whether the dates are different in the specified unit.
     */
    static areDifferent(
        x: Date,
        y: Date,
        options?: {
            unit?: TimeUnit,
        },
    ): boolean {
        let xValue = x.getTime();
        let yValue = y.getTime();
        if (options?.unit) {
            const unitValue = this.getUnitMs(options.unit);
            xValue = Math.floor(xValue / unitValue);
            yValue = Math.floor(yValue / unitValue);
        }
        return xValue !== yValue;
    }
}