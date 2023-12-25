import { createServer } from "http";
import { appendFile, readFile } from "fs/promises";
import express from "express";
import books from "./books.json";
import path from "path";
import { randomUUID } from "crypto";

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

const copiesPath = path.join(process.cwd(), "src", "copies.csv");

app.get("/api/books/:bookId/copies", async (req, res) => {
    try {
        const copiesRaw = await readFile(copiesPath, "utf8");
        const copies = copiesRaw
            .split("\n")
            .map((line) => line.split(","))
            .map(([id, bookId]) => ({ id, bookId }))

        res.send(copies.filter((copy) => copy.bookId === req.params.bookId));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});

app.post("/api/books/:bookId/copies", async (req, res) => {
    try {
        const copyId = randomUUID().split("-").at(-1)!;
        
        await appendFile(copiesPath, `\n${copyId},${req.params.bookId}`);

        res.status(201);
        res.end();
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