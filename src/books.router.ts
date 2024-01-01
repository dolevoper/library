import { Router } from "express";
import { router as bookCopiesRouter } from "./book-copies.router";
import { Book } from "./books.model";

export const router = Router();

router.param("bookId", async (req, res, next, bookId) => {
    try {
        req.book = await Book.findById(bookId).populate("copies.member");

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
        const search = req.query.search?.toString() ?? ".*";
        const searchPattern = new RegExp(search, "i");
        const books = await Book.find(
            { $or: [{ title: searchPattern }, { author: searchPattern }] },
            { title: true, author: true }
        );

        res.send(books);
    } catch (err) {
        next(err);
    }
});

router.get("/:bookId", (req, res) => {
    res.send(req.book);
});

router.use("/:bookId/copies", bookCopiesRouter);
