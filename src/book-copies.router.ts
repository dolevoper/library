import { Router } from "express";
import { Types } from "mongoose";

export const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
    try {
        if (!req.book) {
            throw new Error("Book not found");
        }

        req.book.copies.push({ _id: new Types.ObjectId() });
        await req.book.save();

        res.status(201);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});