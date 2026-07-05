export default class Token {

  constructor(type, value, line = 1, column = 1) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  toString() {
    return `[${this.line}:${this.column}] ${this.type} -> ${this.value}`;
  }

}
