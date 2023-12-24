import { createServer } from "http";
import express from "express";
import books from "./books.json";

const app = express();

app.get("/api/books", (req, res) => {
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

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));