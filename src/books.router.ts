import { Router } from "express";
import { router as bookCopiesRouter } from "./book-copies.router.ts";

import books from "./books.json";

export const router = Router();

router.param("bookId", (req, res, next, bookId) => {
    req.book = books.find((b) => b.id === bookId);

    if (!req.book) {
        res.status(404);
        res.send(`Book with id ${bookId} not found.`);
        return;
    }

    next();
});

router.get("/", (req, res) => {
    res.send(books.map(({ id, author, title }) => ({ id, author, title })));
});

router.get("/:bookId", (req, res) => {
    res.send(req.book);
});

router.use("/:bookId/copies", bookCopiesRouter);
