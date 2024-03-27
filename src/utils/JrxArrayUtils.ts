export default class JrxArrayUtils {
    
    /**
     * Checks if two arrays are equal in reference or content.
     */
    static areEqual(x: any[], y: any[]): boolean {
        if (x.length !== y.length) {
            return false;
        }
        if (x === y) {
            return true;
        }
        for (let i = 0; i < x.length; i++) {
            if (x[i] !== y[i]) {
                return false;
            }
        }
        return true;
    }

    static remove<T>(array: T[], value: T) {
        const index = array.indexOf(value);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

    /**
     * Removes all elements matching the predicate from the array.
     */
    static removeWhere<T>(array: T[], predicate: (value: T) => boolean) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (predicate(array[i])) {
                array.splice(i, 1);
            }
        }
    }
}