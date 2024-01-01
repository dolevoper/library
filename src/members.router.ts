import { Router } from "express";
import { Book } from "./books.model";

export const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const books = (await Book.find({}, { copies: true }))
        const copies = books.flatMap((b) => b.copies);
        const members = new Set(copies.map((c) => c.member));

        res.send(Array.from(members).filter((member) => !!member));
    } catch (err) {
        next(err);
    }
});