import Scanner from "./scanner.js";

import Token from "../token/token.js";
import TokenType from "../token/tokenType.js";

import readIdentifier from "./reader/identifierReader.js";
import readNumber from "./reader/numberReader.js";
import readString from "./reader/stringReader.js";
import readOperator from "./reader/operatorReader.js";

import {
    skipSingleLineComment,
    skipMultiLineComment
} from "./reader/commentReader.js";

import {
    isLetter,
    isDigit
} from "./utils.js";

export default class Lexer {

    constructor(source) {
        this.scanner = new Scanner(source);
    }

    tokenize() {

        const tokens = [];

        while (!this.scanner.eof()) {

            this.scanner.skipWhitespace();

            if (this.scanner.eof()) {
                break;
            }

            const ch = this.scanner.current();
            const next = this.scanner.peek();

            // Identifier / Keyword

            if (isLetter(ch)) {
                tokens.push(
                    readIdentifier(this.scanner)
                );
                continue;
            }

            // Number

            if (isDigit(ch)) {
                tokens.push(
                    readNumber(this.scanner)
                );
                continue;
            }

            // String

            if (ch === '"') {
                tokens.push(
                    readString(this.scanner)
                );
                continue;
            }

            // Single line comment

            if (ch === "/" && next === "/") {
                skipSingleLineComment(this.scanner);
                continue;
            }

            // Multi line comment

            if (ch === "/" && next === "*") {
                skipMultiLineComment(this.scanner);
                continue;
            }

            // Operator

            tokens.push(
                readOperator(this.scanner)
            );
        }

        tokens.push(
            new Token(
                TokenType.EOF,
                "",
                this.scanner.line,
                this.scanner.column
            )
        );

        return tokens;
    }

}
