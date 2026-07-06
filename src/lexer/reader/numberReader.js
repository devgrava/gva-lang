import Token from "../../token/token.js";
import TokenType from "../../token/tokenType.js";
import { isDigit } from "../utils.js";

export default function readNumber(scanner) {

    const line = scanner.line;
    const column = scanner.column;

    let value = "";
    let hasDot = false;

    while (!scanner.eof()) {

        const ch = scanner.current();

        if (isDigit(ch)) {
            value += ch;
            scanner.advance();
            continue;
        }

        if (ch === "." && !hasDot) {
            hasDot = true;
            value += ch;
            scanner.advance();
            continue;
        }

        break;
    }

    return new Token(
        TokenType.NUMBER,
        Number(value),
        line,
        column
    );

}
