import { Router } from "express";

import books from "./books.json";

export const router = Router();

router.get("/", (req, res) => {
    res.send(books.map(({ id, author, title }) => ({ id, author, title })));
});

router.get("/:bookId", (req, res) => {
    const book = books.find((b) => b.id === req.params.bookId);

    if (!book) {
        res.status(404);
        res.send(`Book with id ${req.params.bookId} not found.`);
        return;
    }

    res.send(book);
});