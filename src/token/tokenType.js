const TokenType = Object.freeze({


  // Special
  EOF: "EOF",
  ILLEGAL: "ILLEGAL",

  // Identifier
  IDENTIFIER: "IDENTIFIER",

  // Literal
  NUMBER: "NUMBER",
  STRING: "STRING",
  BOOLEAN: "BOOLEAN",

  TRUE: "TRUE",
  FALSE: "FALSE",
  NULL: "NULL",

  // Keywords
  LET: "LET",
  FUNC: "FUNC",
  RETURN: "RETURN",
  IF: "IF",
  ELSE: "ELSE",
  WHILE: "WHILE",
  FOR: "FOR",
  PRINT: "PRINT",

  // Operators
  ASSIGN: "=",
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "*",
  DIVIDE: "/",

  // Comparison
  EQUAL: "==",
  NOT_EQUAL: "!=",
  GREATER: ">",
  LESS: "<",
  GREATER_EQUAL: ">=",
  LESS_EQUAL: "<=",

  // Delimiter
  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",
  COMMA: ",",
  SEMICOLON: ";",

  //
  AND: "AND",
  OR: "OR",
  NOT: "NOT",
  MODULO: "MODULO",
  LBRACKET: "[",
  RBRACKET: "]",
  DOT: ".",
  COLON: ":"

});

export default TokenType;
