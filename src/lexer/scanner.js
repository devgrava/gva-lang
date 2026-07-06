export default class Scanner {

    constructor(source) {
        this.source = source;
        this.position = 0;
        //this.scanner.current()
        //this.scanner.advance()
        this.line = 1;
        this.column = 1;
    }

    current() {
        if (this.position >= this.source.length) {
            return null;
        }

        return this.source[this.position];
    }

    peek() {
        if (this.position + 1 >= this.source.length) {
            return null;
        }

        return this.source[this.position + 1];
    }

    advance() {

        const ch = this.current();

        this.position++;

        if (ch === "\n") {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }

        return ch;
    }

    eof() {
        return this.position >= this.source.length;
    }
    match(expected) {
        if (this.current() !== expected) {
            return false;
        }

        this.advance();
        return true;
    }
    skipWhitespace() {
        while (!this.eof() && /\s/.test(this.current())) {
            this.advance();
        }
    }

}
