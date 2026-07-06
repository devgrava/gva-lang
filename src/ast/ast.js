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
