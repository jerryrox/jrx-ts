export default class JrxStringUtils {

    static combine(
        segments: (string | null | undefined)[],
        options?: {
            lead?: string,
            trail?: string,
            separator?: string,
        },
    ): string {
        const lead = options?.lead ?? "";
        const trail = options?.trail ?? "";
        const separator = options?.separator ?? "";
        const combined = segments.filter(segment => segment !== null && segment !== undefined).join(separator);
        return lead + combined + trail;
    }
    
    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}