import TokenType from "../token/tokenType.js";

const keywords = new Map([
  ["let", TokenType.LET],
  ["func", TokenType.FUNC],
  ["return", TokenType.RETURN],
  ["if", TokenType.IF],
  ["else", TokenType.ELSE],
  ["while", TokenType.WHILE],
  ["for", TokenType.FOR],
  ["print", TokenType.PRINT],
  ["true", TokenType.TRUE],
  ["false", TokenType.FALSE],
  ["null", TokenType.NULL]
]);

export default keywords;
