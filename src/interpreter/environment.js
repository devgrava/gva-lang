export default class Environment {

    constructor() {
        this.values = new Map();
    }

    define(name, value) {
        this.values.set(name, value);
    }

    get(name) {

        if (!this.values.has(name)) {
            throw new Error(
                `Variable '${name}' tidak ditemukan`
            );
        }

        return this.values.get(name);
    }

}
