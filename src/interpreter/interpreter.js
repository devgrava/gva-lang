
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

            case "AssignmentStatement":

                this.env.assign(
                    stmt.name,
                    this.evaluate(stmt.value)
                );

                break;

            case "FunctionDeclaration":

                this.env.define(
                    stmt.name,
                    stmt
                );

                break;

            case "PrintStatement":

                console.log(
                    this.evaluate(stmt.argument)
                );

                break;

            case "IfStatement":

                if (this.evaluate(stmt.condition)) {

                    for (const statement of stmt.thenBranch) {
                        this.executeStatement(statement);
                    }

                } else if (stmt.elseBranch) {

                    for (const statement of stmt.elseBranch) {
                        this.executeStatement(statement);
                    }

                }

                break;

            case "WhileStatement":

                 while (this.evaluate(stmt.condition)) {

                     for (const statement of stmt.body) {
                     this.executeStatement(statement);
                     }

                 }

                 break;

            case "CallExpression": {

                 const func = this.env.get(expr.callee);

                 const localEnv = new Environment(this.env);

                 for (let i = 0; i < func.params.length; i++) {

                     const value = this.evaluate(
                          expr.args[i]
                     );

                     localEnv.define(
                        func.params[i],
                        value
                     );
                 }

                 const previous = this.env;

                 this.env = localEnv;

                 for (const statement of func.body) {
                     this.executeStatement(statement);
                 }

                 this.env = previous;

                 return null;
            }

            case "ExpressionStatement":
                 this.evaluate(stmt.expression);
                 break;

            default:

                throw new Error(
                    `Unknown statement ${stmt.type}`
                );

        }

    }

    evaluate(expr) {

        switch (expr.type) {

            case "NumberLiteral":
                return expr.value;

            case "StringLiteral":
                return expr.value;

            case "BooleanLiteral":
                return expr.value;

            case "Identifier":
                return this.env.get(expr.name);

            case "BinaryExpression":

                const left = this.evaluate(expr.left);
                const right = this.evaluate(expr.right);

                switch (expr.operator) {

                      // Aritmatika
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

                     // Perbandingan
                     case "==":
                        return left === right;

                     case "!=":
                        return left !== right;

                     case ">":
                       return left > right;

                     case "<":
                       return left < right;

                     case ">=":
                       return left >= right;

                     case "<=":
                       return left <= right;

                     default:
                        throw new Error(
                        `Operator '${expr.operator}' belum didukung`
                     );
                }
            case "CallExpression": {

                const func = this.env.get(expr.callee);

                const previousEnv = this.env;

                const localEnv = new Environment(previousEnv);

                // Kirim parameter
                for (let i = 0; i < func.params.length; i++) {

                const argValue =
                     this.evaluate(expr.args[i]);

                     localEnv.define(
                          func.params[i],
                          argValue
                     );
                 }

                 // Masuk scope lokal
                 this.env = localEnv;

                 // Jalankan isi fungsi
                 for (const stmt of func.body) {
                     this.executeStatement(stmt);
                 }

                 // Kembali ke scope sebelumnya
                 this.env = previousEnv;

                 return null;
            }

            default:
                throw new Error(
                    `Unknown expression ${expr.type}`
                );

        }

    }

}
