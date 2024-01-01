import { Router } from "express";
import { Types } from "mongoose";
import { Book } from "./books.model";

export const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
    try {
        if (!req.book) {
            throw new Error("Book not found");
        }

        await Book.updateOne({ _id: req.book._id }, {
            $push: { copies: { _id: new Types.ObjectId() } }
        });

        res.status(201);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});