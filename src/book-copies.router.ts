import { Router } from "express";
import { create, read } from "./copies.model";

export const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const copies = await read();

        res.send(copies.filter((copy) => copy.bookId === req.book?.id));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});

router.post("/", async (req, res) => {
    try {
        if (!req.book) {
            throw new Error("Book not found");
        }

        await create(req.book.id);

        res.status(201);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});