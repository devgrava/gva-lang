import Environment from "./environment.js";

export default class Interpreter {

    constructor() {
        this.env = new Environment();
    }

    execute(program) {

        for (const stmt of program.body) {
            this.executeStatement(stmt);
        }

    }

    executeStatement(stmt) {

        switch (stmt.type) {

            case "VariableDeclaration":

                this.env.define(
                    stmt.name,
                    this.evaluate(stmt.value)
                );

                break;

            case "PrintStatement":

                console.log(
                    this.evaluate(stmt.argument)
                );

                break;

            default:

                throw new Error(
                    `Unknown statement ${stmt.type}`
                );

        }

    }
    //
    evaluate(expr) {

        switch (expr.type) {

            case "NumberLiteral":
                return expr.value;

            case "StringLiteral":
                return expr.value;

            case "Identifier":
                return this.env.get(expr.name);

            case "BinaryExpression":

                const left = this.evaluate(expr.left);
                const right = this.evaluate(expr.right);

                switch (expr.operator) {

                    case "+":
                       return left + right;

                    case "-":
                       return left - right;

                    case "*":
                       return left * right;

                    case "/":
                       return left / right;

                    case "%":
                       return left % right;

                    default:
                       throw new Error(
                           `Operator '${expr.operator}' belum didukung`
                       );
                }

            default:
                throw new Error(
                    `Unknown expression ${expr.type}`
                );

        }

    }

}
