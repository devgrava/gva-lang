import TokenType from "../token/tokenType.js";

import {
    Program,
    VariableDeclaration,
    NumberLiteral,
    StringLiteral,
    BooleanLiteral,
    PrintStatement,
    BinaryExpression,
    IfStatement,
    AssignmentStatement,
    WhileStatement,
    FunctionDeclaration,
    CallExpression,
    ExpressionStatement
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

            case TokenType.IF:
                return this.parseIfStatement();

            case TokenType.WHILE:
                return this.parseWhileStatement();

            case TokenType.FUNC:
                return this.parseFunctionDeclaration();

            case TokenType.IDENTIFIER:

                if (
                    this.tokens[this.position + 1] &&
                    this.tokens[this.position + 1].type === TokenType.ASSIGN
                ) {
                    return this.parseAssignmentStatement();
                }

                const expr = this.parseExpression();

                this.expect(TokenType.SEMICOLON);

                return ExpressionStatement(expr);

            default:
                throw new Error(
                    `Unknown statement: ${this.current().type}`
                );
        }

    }
    parseFunctionDeclaration() {

        this.expect(TokenType.FUNC);

        const name =
            this.expect(TokenType.IDENTIFIER).value;

        this.expect(TokenType.LPAREN);

        const params = [];

        while (
             this.current().type !== TokenType.RPAREN
        ) {

             params.push(
                  this.expect(TokenType.IDENTIFIER).value
             );

             if (
                  this.current().type === TokenType.COMMA
             ) {
                  this.advance();
             }
         }

         this.expect(TokenType.RPAREN);

         const body = this.parseBlock();

         return FunctionDeclaration(
               name,
               params,
               body
         );
    }

    parseWhileStatement() {

       this.expect(TokenType.WHILE);

       this.expect(TokenType.LPAREN);

       const condition = this.parseExpression();

       this.expect(TokenType.RPAREN);

       const body = this.parseBlock();

       return WhileStatement(
           condition,
           body
       );
    }

    parseAssignmentStatement() {

        const name = this.expect(TokenType.IDENTIFIER).value;

        this.expect(TokenType.ASSIGN);

        const value = this.parseExpression();

        this.expect(TokenType.SEMICOLON);

        return AssignmentStatement(
            name,
            value
        );
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

    parseBlock() {

        this.expect(TokenType.LBRACE);

        const body = [];

        while (
           this.current().type !== TokenType.RBRACE &&
           this.current().type !== TokenType.EOF
        ) {
           body.push(this.parseStatement());
        }

        this.expect(TokenType.RBRACE);

        return body;
    }

    parseIfStatement() {

        this.expect(TokenType.IF);

        this.expect(TokenType.LPAREN);

        const condition = this.parseExpression();

        this.expect(TokenType.RPAREN);

        const thenBranch = this.parseBlock();

        let elseBranch = null;

        if (this.current().type === TokenType.ELSE) {

            this.advance();

            elseBranch = this.parseBlock();
        }

        return IfStatement(
            condition,
            thenBranch,
            elseBranch
        );
    }

    parseExpression() {
        return this.parseComparison();
    }

    parseComparison() {

       let expr = this.parseAddition();

       while (
           this.current().type === TokenType.EQUAL ||
           this.current().type === TokenType.NOT_EQUAL ||
           this.current().type === TokenType.GREATER ||
           this.current().type === TokenType.LESS ||
           this.current().type === TokenType.GREATER_EQUAL ||
           this.current().type === TokenType.LESS_EQUAL
       ) {

           const operator = this.current().value;

           this.advance();

           const right = this.parseAddition();

           expr = BinaryExpression(
                expr,
                operator,
                right
           );
       }

       return expr;
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


            case TokenType.IDENTIFIER: {

                const name = token.value;

                this.advance();

                if (this.current().type === TokenType.LPAREN) {

                     this.advance();

                     const args = [];

                while (
                     this.current().type !== TokenType.RPAREN
                ) {

                     args.push(
                         this.parseExpression()
                     );

                     if (
                         this.current().type === TokenType.COMMA
                     ) {
                         this.advance();
                     }

                 }

                 this.expect(TokenType.RPAREN);

                 return CallExpression(
                      name,
                      args
                 );
               }

               return {
                      type: "Identifier",
                      name
               };
            }

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
