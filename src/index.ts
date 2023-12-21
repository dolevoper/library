import { createServer } from "http";
import express from "express";
import books from "./books.json";

const app = express();

// CRUD - Create Read Update Delete
app.get("/api/books", (_, res) => {
    // List books
    res.send(books);
});

app.get("/api/books/:id", (_, res) => {
    // TODO: return book details
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