import Token from "../../token/token.js";
import TokenType from "../../token/tokenType.js";

export default function readOperator(scanner) {

    const line = scanner.line;
    const column = scanner.column;

    const current = scanner.current();
    const next = scanner.peek();

    // Dua karakter

    if (current === "=" && next === "=") {
        scanner.advance();
        scanner.advance();
        return new Token(TokenType.EQUAL, "==", line, column);
    }

    if (current === "!" && next === "=") {
        scanner.advance();
        scanner.advance();
        return new Token(TokenType.NOT_EQUAL, "!=", line, column);
    }

    if (current === ">" && next === "=") {
        scanner.advance();
        scanner.advance();
        return new Token(TokenType.GREATER_EQUAL, ">=", line, column);
    }

    if (current === "<" && next === "=") {
        scanner.advance();
        scanner.advance();
        return new Token(TokenType.LESS_EQUAL, "<=", line, column);
    }

    if (current === "&" && next === "&") {
        scanner.advance();
        scanner.advance();
        return new Token(TokenType.AND, "&&", line, column);
    }

    if (current === "|" && next === "|") {
        scanner.advance();
        scanner.advance();
        return new Token(TokenType.OR, "||", line, column);
    }

    // Satu karakter

    const single = {

        "=": TokenType.ASSIGN,
        "+": TokenType.PLUS,
        "-": TokenType.MINUS,
        "*": TokenType.MULTIPLY,
        "/": TokenType.DIVIDE,
        "%": TokenType.MODULO,

        ">": TokenType.GREATER,
        "<": TokenType.LESS,
        "!": TokenType.NOT,

        "(": TokenType.LPAREN,
        ")": TokenType.RPAREN,

        "{": TokenType.LBRACE,
        "}": TokenType.RBRACE,

        "[": TokenType.LBRACKET,
        "]": TokenType.RBRACKET,

        ";": TokenType.SEMICOLON,
        ",": TokenType.COMMA,
        ".": TokenType.DOT,
        ":": TokenType.COLON
    };

    const type = single[current];

    if (!type) {
        throw new Error(
            `Operator tidak dikenal '${current}' pada ${line}:${column}`
        );
    }

    scanner.advance();

    return new Token(type, current, line, column);

}
