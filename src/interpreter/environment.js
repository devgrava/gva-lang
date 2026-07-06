export default class Environment {

    constructor(parent = null) {
        this.values = new Map();
        this.parent = parent;
    }

    define(name, value) {
        this.values.set(name, value);
    }

    assign(name, value) {

        if (this.values.has(name)) {
            this.values.set(name, value);
            return;
        }

        if (this.parent) {
            this.parent.assign(name, value);
            return;
        }

        throw new Error(
            `Variable '${name}' belum dideklarasikan`
        );
    }

    get(name) {

        if (this.values.has(name)) {
            return this.values.get(name);
        }

        if (this.parent) {
            return this.parent.get(name);
        }

        throw new Error(
            `Variable '${name}' tidak ditemukan`
        );
    }

}
