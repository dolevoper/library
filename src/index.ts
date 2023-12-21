import { createServer } from "http";
import express from "express";
import books from "./books.json";

const app = express();

// CRUD - Create Read Update Delete
app.get("/api/books", (req, res) => {
    // List books
    res.send(books.map(({ id, author, title }) => ({ id, author, title })));
});

app.get("/api/books/:bookId", (req, res) => {
    const book = books.find((b) => b.id === req.params.bookId);

    if (!book) {
        res.status(404);
        res.send(`Book with id ${req.params.bookId} not found.`);
        return;
    }

    res.send(book);
});

app.post("/api/books", (req, res) => {
    // Create
});

app.put("/api/books/:bookId", (req, res) => {
    // Replace
});

app.patch("/api/books/:id", (req, res) => {
    // Update
});

app.delete("/api/books/:id", (req, res) => {
    // Delete book
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));