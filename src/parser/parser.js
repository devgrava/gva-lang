import TokenType from "../token/tokenType.js";

import {
    Program,
    VariableDeclaration,
    NumberLiteral,
    StringLiteral,
    BooleanLiteral,
    PrintStatement,
    BinaryExpression
} from "../ast/ast.js";

export default class Parser {

    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    current() {
        return this.tokens[this.position];
    }

    advance() {
        this.position++;
    }

    expect(type) {

        const token = this.current();

        if (!token) {
            throw new Error(`Expected ${type}, tetapi mencapai EOF.`);
        }

        if (token.type !== type) {
            throw new Error(
                `Expected ${type}, got ${token.type}`
            );
        }

        this.advance();

        return token;
    }

    parse() {

        const body = [];

        while (this.current().type !== TokenType.EOF) {
            body.push(this.parseStatement());
        }

        return Program(body);
    }

    parseStatement() {

        switch (this.current().type) {

            case TokenType.LET:
                return this.parseVariableDeclaration();

            case TokenType.PRINT:
                return this.parsePrintStatement();

            default:
                throw new Error(
                    `Unknown statement: ${this.current().type}`
                );
        }

    }

    parseVariableDeclaration() {

        this.expect(TokenType.LET);

        const name =
            this.expect(TokenType.IDENTIFIER).value;

        this.expect(TokenType.ASSIGN);

        const value =
            this.parseExpression();

        this.expect(TokenType.SEMICOLON);

        return VariableDeclaration(
            name,
            value
        );
    }

    parsePrintStatement() {

        this.expect(TokenType.PRINT);

        this.expect(TokenType.LPAREN);

        const argument =
            this.parseExpression();

        this.expect(TokenType.RPAREN);

        this.expect(TokenType.SEMICOLON);

        return PrintStatement(argument);
    }

    parseExpression() {
        return this.parseAddition();
    }

    parseAddition() {

        let expr = this.parseMultiplication();

        while (
             this.current().type === TokenType.PLUS ||
             this.current().type === TokenType.MINUS
        ) {

             const operator = this.current().value;

             this.advance();

             const right = this.parseMultiplication();

             expr = BinaryExpression(
                  expr,
                  operator,
                  right
             );

        }

        return expr;
    }

    parseMultiplication() {

        let expr = this.parsePrimary();

        while (
            this.current().type === TokenType.MULTIPLY ||
            this.current().type === TokenType.DIVIDE ||
            this.current().type === TokenType.MODULO
        ) {

            const operator = this.current().value;

            this.advance();

            const right = this.parsePrimary();

             expr = BinaryExpression(
                 expr,
                 operator,
                 right
             );

         }

         return expr;
    }

    parsePrimary() {

         const token = this.current();

         switch (token.type) {

            case TokenType.NUMBER:

                this.advance();

                return NumberLiteral(
                    token.value
                );

            case TokenType.STRING:

                this.advance();

                return StringLiteral(
                    token.value
                );
            case TokenType.TRUE:

                this.advance();
                return BooleanLiteral(true);

            case TokenType.FALSE:
                this.advance();
                return BooleanLiteral(false);


            case TokenType.IDENTIFIER:

                this.advance();

                return {
                    type: "Identifier",
                    name: token.value
                };

            case TokenType.LPAREN:

                this.advance();

                const expr = this.parseExpression();

                this.expect(TokenType.RPAREN);

                return expr;

            default:

                throw new Error(
                    `Unexpected token ${token.type}`
                );
         }

    }

}
