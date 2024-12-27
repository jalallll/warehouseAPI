"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Node!");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
