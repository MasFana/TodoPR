import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Recreate __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 11111;

app.use(express.json());
app.use(cors({ origin: "*" }));

// In-memory database for todos (volatile)
let todos = [];

// Middleware to reset array if it reaches limit (prevent uncontrolled memory use)
function checkLimit(req, res, next) {
    if (todos.length >= 5000) {
        console.log("⚠️ Jumlah todo sudah 5000, reset semua data...");
        todos = [];
    }
    console.log(`Jumlah todo saat ini: ${todos.length}`);
    next();
}

// Register once
app.use(checkLimit);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// CREATE todo
app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTodo = {
        id: Date.now(),
        title,
        completed: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// READ all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// READ single todo
app.get("/todos/:id", (req, res) => {
    const todo = todos.find((t) => t.id === Number(req.params.id));
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
    const todo = todos.find((t) => t.id === Number(req.params.id));
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.title = req.body.title ?? todo.title;
    if (req.body.completed !== undefined) {
        todo.completed = req.body.completed;
    }

    res.json(todo);
});

// DELETE single todo
app.delete("/todos/:id", (req, res) => {
    const index = todos.findIndex((t) => t.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Todo not found" });

    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
});

// DELETE all todos
app.delete("/todos", (req, res) => {
    todos = [];
    res.json({ message: "All todos deleted" });
});

app.listen(PORT, () => {
    console.log(`🚀 Todo API running on port ${PORT}`);
});
