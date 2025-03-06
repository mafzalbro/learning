"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basics_1 = require("./ts_concepts/basics");
console.log("Hello World");
(0, basics_1.default)();
// define sub functions for each operation
function calculateArithematic(a, b, c) {
    switch (c) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return 0;
    }
}
calculateArithematic(10, 20, "+");
