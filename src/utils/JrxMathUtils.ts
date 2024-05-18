export default class JrxMathUtils {
    
    static clamp(value: number, min: number, max: number): number {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }

    static hexToInt(hex: string, defaultValue: number = 0): number {
        const parsed = parseInt(hex, 16);
        if (Number.isNaN(parsed)) {
            return defaultValue;
        }
        return parsed;
    }

    static lerp(from: number, to: number, interpolant: number): number {
        return (to - from) * interpolant + from;
    }

    static inverseLerp(from: number, to: number, value: number): number {
        return (value - from) / (to - from);
    }

    static randomRange(min: number, max: number, floor: boolean = false): number {
        const value = Math.random() * (max - min) + min;
        return floor ? Math.floor(value) : value;
    }

    static round(value: number, precision: number): number {
        const factor = Math.pow(10, precision);
        return Math.round(value * factor) / factor;
    }
}