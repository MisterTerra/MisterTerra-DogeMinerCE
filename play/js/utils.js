export class Utils {
    /**
     * Recursively freezes an object
     * @param {object} obj - The object to be frozen
     * @returns {object} Returns a frozen object
     */
    static deepFreeze(obj) {
        Object.freeze(obj);
        for (const value of Object.values(obj)) {
            if (value && typeof value === 'object') {
                Utils.deepFreeze(value);
            }
        }
        return obj;
    }   
}