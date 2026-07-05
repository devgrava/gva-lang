import TokenType from "../token/tokenType.js";
import Token from "../token/token.js";

export default class Lexer {
  constructor(source) {
    this.source = source;
    this.position = 0;
    this.line = 1;
    this.column = 1;
  }

  current() {
    if (this.position >= this.source.length) {
      return null;
    }
    return this.source[this.position];
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
  }

  skipWhitespace() {
    while (this.current() && /\s/.test(this.current())) {
      this.advance();
    }
  }

  readIdentifier() {
    const startLine = this.line;
    const startColumn = this.column;

    let value = "";

    while (this.current() && /[a-zA-Z_]/.test(this.current())) {
      value += this.current();
      this.advance();
    }

    const keywords = {
      let: TokenType.LET,
      print: TokenType.PRINT,
      true: TokenType.BOOLEAN,
      false: TokenType.BOOLEAN
    };

    const type = keywords[value] || TokenType.IDENTIFIER;

    return new Token(type, value, startLine, startColumn);
  }

  readNumber() {
    const startLine = this.line;
    const startColumn = this.column;

    let value = "";

    while (this.current() && /[0-9]/.test(this.current())) {
      value += this.current();
      this.advance();
    }

    return new Token(
      TokenType.NUMBER,
      Number(value),
      startLine,
      startColumn
    );
  }

  readString() {
    const startLine = this.line;
    const startColumn = this.column;

    this.advance();

    let value = "";

    while (this.current() && this.current() !== '"') {
      value += this.current();
      this.advance();
    }

    this.advance();

    return new Token(
      TokenType.STRING,
      value,
      startLine,
      startColumn
    );
  }

  tokenize() {
    const tokens = [];

    while (this.current() !== null) {
      this.skipWhitespace();

      if (this.current() === null) {
        break;
      }

      if (/[a-zA-Z_]/.test(this.current())) {
        tokens.push(this.readIdentifier());
        continue;
      }

      if (/[0-9]/.test(this.current())) {
        tokens.push(this.readNumber());
        continue;
      }

      if (this.current() === '"') {
        tokens.push(this.readString());
        continue;
      }

      if (this.current() === "=") {
        tokens.push(
          new Token(
            TokenType.ASSIGN,
            "=",
            this.line,
            this.column
          )
        );

        this.advance();
        continue;
      }

      throw new Error(
        `Karakter tidak dikenal: ${this.current()}`
      );
    }

    tokens.push(
      new Token(
        TokenType.EOF,
        "",
        this.line,
        this.column
      )
    );

    return tokens;
  }
}
