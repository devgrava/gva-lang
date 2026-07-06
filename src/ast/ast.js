export function Program(body) {
    return {
        type: "Program",
        body
    };
}

export function VariableDeclaration(name, value) {
    return {
        type: "VariableDeclaration",
        name,
        value
    };
}

export function NumberLiteral(value) {
    return {
        type: "NumberLiteral",
        value
    };
}

export function PrintStatement(argument) {
    return {
        type: "PrintStatement",
        argument
    };
}

export function BinaryExpression(left, operator, right) {
    return {
        type: "BinaryExpression",
        left,
        operator,
        right
    };
}

export function StringLiteral(value) {
    return {
        type: "StringLiteral",
        value
    };
}

export function BooleanLiteral(value) {
    return {
        type: "BooleanLiteral",
        value
    };
}

export function IfStatement(condition, thenBranch, elseBranch = null) {
    return {
        type: "IfStatement",
        condition,
        thenBranch,
        elseBranch
    };
}

export function AssignmentStatement(name, value) {
    return {
        type: "AssignmentStatement",
        name,
        value
    };
}

export function WhileStatement(condition, body) {
    return {
        type: "WhileStatement",
        condition,
        body
    };
}

export function FunctionDeclaration(name, params, body) {
    return {
        type: "FunctionDeclaration",
        name,
        params,
        body
    };
}

export function CallExpression(callee, args) {
    return {
        type: "CallExpression",
        callee,
        args
    };
}

export function ExpressionStatement(expression) {
    return {
        type: "ExpressionStatement",
        expression
    };
}
