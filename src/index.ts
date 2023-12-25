import { createServer } from "http";
import { readFile } from "fs/promises";
import express from "express";
import books from "./books.json";
import path from "path";

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

app.get("/api/books/:bookId/copies", async (req, res) => {
    try {
        const copiesRaw = await readFile(path.join(process.cwd(), "src", "copies.json"), "utf8");
        const copies = JSON.parse(copiesRaw) as { id: string, bookId: string }[];

        res.send(copies.filter((copy) => copy.bookId === req.params.bookId));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));