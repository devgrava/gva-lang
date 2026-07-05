import Lexer from "./src/lexer/lexer.js";

const source = `
let nama = "Didit"
`;

const lexer = new Lexer(source);

const tokens = lexer.tokenize();

for (const token of tokens) {
  console.log(token.toString());
}
