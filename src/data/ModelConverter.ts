export default abstract class ModelConverter<T = any> {
    public subconverters: ModelConverter[] = [];

    abstract toModel(id: string, data: any): T;

    toModelSafe(id: string, data: any): T | undefined {
        try {
            return this.toModel(id, data);
        }
        catch (e: any) {
            return undefined;
        }
    }

    abstract toPlain(model: T): Record<string, any>;

    encodeDate(value: Date): any {
        return value.toISOString();
    }

    decodeDate(value: any, defaultValue: Date = new Date()): Date {
        const date = new Date(value);
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date;
        }
        return defaultValue;
    }

    encodeString(value: string): any {
        return value.toString();
    }

    decodeString(value: any, defaultValue: string = ""): string {
        if (value === null || value === undefined) {
            return defaultValue;
        }
        return value.toString();
    }

    encodeMap<TKey extends string | number | symbol, TValue = any>(
        value: Record<TKey, TValue>,
        keyEncoder: (key: TKey) => any,
        valueEncoder: (value: TValue) => any,
    ): Record<string, any> {
        const result: Record<string, any> = {};
        for (const key in value) {
            result[keyEncoder(key)] = valueEncoder(value[key]);
        }
        return result;
    }

    decodeMap<TKey extends string | number | symbol, TValue = any>(
        value: Record<string, any>,
        keyDecoder: (key: string) => TKey,
        valueDecoder: (value: any) => TValue,
        defaultValue: Record<TKey, TValue> = {} as Record<TKey, TValue>,
    ): Record<TKey, TValue> {
        const result: Record<TKey, TValue> = {} as Record<TKey, TValue>;
        if (typeof (value) === "object") {
            for (const key in value) {
                result[keyDecoder(key)] = valueDecoder(value[key]);
            }
        }
        return defaultValue;
    }

    encodeNumber(value: number): any {
        return value;
    }

    decodeInt(value: any, defaultValue: number = 0): number {
        if (typeof (value) === "number") {
            return Math.floor(value);
        }
        return defaultValue;
    }

    decodeFloat(value: any, defaultValue: number = 0): number {
        if (typeof (value) === "number") {
            return value;
        }
        return defaultValue;
    }

    encodeArray<TInput = any, TOutput = any>(
        value: TInput[],
        encoder: (item: TInput) => TOutput,
    ): TOutput[] {
        return value.map(encoder);
    }

    decodeArray<TValue = any>(
        value: any,
        decoder: (item: any) => TValue,
        defaultValue: TValue[] = [],
    ): TValue[] {
        if (Array.isArray(value)) {
            return value.map(decoder);
        }
        return defaultValue;
    }

    encodeBool(value: boolean): any {
        return value;
    }

    decodeBool(value: any, defaultValue: boolean = false): boolean {
        if (typeof (value) === "boolean") {
            return value;
        }
        return defaultValue;
    }
}