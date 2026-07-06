import Token from "../../token/token.js";
import TokenType from "../../token/tokenType.js";

export default function readString(scanner) {

    const line = scanner.line;
    const column = scanner.column;

    let value = "";

    // Lewati tanda kutip pembuka
    scanner.advance();

    while (!scanner.eof()) {

        const ch = scanner.current();

        if (ch === '"') {
            scanner.advance();

            return new Token(
                TokenType.STRING,
                value,
                line,
                column
            );
        }

        // Escape Character
        if (ch === "\\") {

            scanner.advance();

            if (scanner.eof()) {
                break;
            }

            switch (scanner.current()) {

                case "n":
                    value += "\n";
                    break;

                case "t":
                    value += "\t";
                    break;

                case '"':
                    value += '"';
                    break;

                case "\\":
                    value += "\\";
                    break;

                default:
                    value += scanner.current();
            }

            scanner.advance();
            continue;
        }

        value += ch;
        scanner.advance();
    }

    throw new Error(
        `String belum ditutup pada baris ${line}, kolom ${column}`
    );
}
