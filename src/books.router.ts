import { Router } from "express";
import { router as bookCopiesRouter } from "./book-copies.router";
import { Book } from "./books.model";

export const router = Router();

router.param("bookId", async (req, res, next, bookId) => {
    try {
        req.book = await Book.findById(bookId);

        if (!req.book) {
            res.status(404);
            res.send(`Book with id ${bookId} not found.`);
            return;
        }

        next();
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const books = await Book.find();

        res.send(books);
    } catch (err) {
        next(err);
    }
});

router.get("/:bookId", (req, res) => {
    res.send(req.book);
});

router.use("/:bookId/copies", bookCopiesRouter);
