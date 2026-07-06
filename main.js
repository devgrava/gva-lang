import fs from "fs";

import Lexer from "./src/lexer/lexer.js";
import Parser from "./src/parser/parser.js";
import Interpreter from "./src/interpreter/interpreter.js";

const source = fs.readFileSync("./examples/main.gva", "utf8");

// Lexer
const lexer = new Lexer(source);
const tokens = lexer.tokenize();


// Parser
const parser = new Parser(tokens);
const ast = parser.parse();

// Interpreter
const interpreter = new Interpreter();
interpreter.execute(ast);

//for (const token of tokens) {
//    console.log(token.type, token.value);
//}
