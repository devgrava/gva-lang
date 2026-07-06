import Token from "../../token/token.js";
import TokenType from "../../token/tokenType.js";
import keywords from "../keywords.js";
import { isLetterOrDigit } from "../utils.js";

export default function readIdentifier(scanner) {

    const line = scanner.line;
    const column = scanner.column;

    let value = "";

    while (!scanner.eof() && isLetterOrDigit(scanner.current())) {
        value += scanner.current();
        scanner.advance();
    }

    const type = keywords.get(value) || TokenType.IDENTIFIER;

    return new Token(type, value, line, column);
}
