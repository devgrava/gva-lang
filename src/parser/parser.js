import TokenType from "../token/tokenType.js";

import {
    Program,
    VariableDeclaration,
    NumberLiteral,
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

    peek() {
        return this.tokens[this.position + 1];
    }

    advance() {
        this.position++;
    }

    expect(type) {
        const token = this.current();

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
        const token = this.current();

        if (token.type === TokenType.LET) {
            return this.parseVariableDeclaration();
        }
        if (token.type === TokenType.PRINT) {
            return this.parsePrintStatement();
        }

        throw new Error(
            `Unknown statement: ${token.type}`
        );
    }

    parseVariableDeclaration() {

        this.expect(TokenType.LET);

        const name = this.expect(TokenType.IDENTIFIER).value;

        this.expect(TokenType.ASSIGN);

        const value = this.parseExpression();

        this.expect(TokenType.SEMICOLON);

        return VariableDeclaration(
            name,
            value
        );
    }
    parseExpression() {
       return this.parseBinaryExpression();
    }/*
    parseExpression() {

        const token = this.current();

        // Number
        if (token.type === TokenType.NUMBER) {
             this.advance();
             return NumberLiteral(token.value);
        }

        // Identifier
        if (token.type === TokenType.IDENTIFIER) {
             this.advance();

             return {
                 type: "Identifier",
                 name: token.value
             };
        }

        throw new Error(
            `Unknown expression: ${token.type}`
        );

        return this.parseBinaryExpression();
    }*/

    parsePrintStatement() {

       this.expect(TokenType.PRINT);
       this.expect(TokenType.LPAREN);
       const argument = this.parseExpression();
       this.expect(TokenType.RPAREN);
       this.expect(TokenType.SEMICOLON);

       return PrintStatement(argument);
    }/*
    parsePrimary() {

        const token = this.current();

        if (token.type === TokenType.NUMBER) {
            this.advance();
            return NumberLiteral(token.value);
        }

        if (token.type === TokenType.IDENTIFIER) {
            this.advance();
            return {
                type: "Identifier",
                name: token.value
            };
        }

        throw new Error(
            `Unknown expression: ${token.type}`
        );
     }
     
     parseBinaryExpression() {

         let left = this.parsePrimary();

         while (
             this.current().type === TokenType.PLUS ||
             this.current().type === TokenType.MINUS
         ) {
             const operator = this.current().value;
             this.advance();

             const right = this.parsePrimary();

             left = BinaryExpression(left, operator, right);
         }

         return left;
     }*/
     parseBinaryExpression() {

    let left = this.parsePrimary();

    while (
        this.current() &&
        (
            this.current().type === TokenType.PLUS ||
            this.current().type === TokenType.MINUS
        )
    ) {
        const operator = this.current().value;
        this.advance();

        const right = this.parsePrimary();

        left = {
            type: "BinaryExpression",
            left,
            operator,
            right
        };
    }

    return left;
}
    parsePrimary() {

    const token = this.current();

    if (!token) {
        throw new Error("Unexpected end of input");
    }

    if (token.type === TokenType.NUMBER) {
        this.advance();
        return {
            type: "NumberLiteral",
            value: token.value
        };
    }

    if (token.type === TokenType.IDENTIFIER) {
        this.advance();
        return {
            type: "Identifier",
            name: token.value
        };
    }

    throw new Error(
        `Unknown expression: ${token.type}`
    );
    }

}
