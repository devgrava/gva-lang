export function skipSingleLineComment(scanner) {
    // Posisi awal: //
    scanner.advance();
    scanner.advance();

    while (!scanner.eof() && scanner.current() !== "\n") {
        scanner.advance();
    }
}

export function skipMultiLineComment(scanner) {
    // Posisi awal:
    scanner.advance();
    scanner.advance();

    while (!scanner.eof()) {
        if (scanner.current() === "*" && scanner.peek() === "/") {
            scanner.advance();
            scanner.advance();
            return;
        }

        scanner.advance();
    }

    throw new Error("Komentar multi baris belum ditutup.");
}
