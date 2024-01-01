import { Router } from "express";
import { Error } from "mongoose";
import { Book } from "./books.model";

export const router = Router();

router.patch("/:copyId", async (req, res, next) => {
    try {
        const { member } = req.body;

        if (member && (!(typeof member === "string") || !member.match(/[a-z ]*/i))) {
            res.status(400);
            res.send("Member name must contain letters and spaces only.");
            return;
        }

        await Book.updateOne({
            "copies._id": req.params.copyId
        }, {
            $set: {
                "copies.$.member": member
            }
        }, { upsert: false });

        res.status(201);
        res.end();
    } catch (err) {
        if (err instanceof Error.CastError) {
            res.status(404);
            res.send(`Copy ${req.params.copyId} not found.`);
            return;
        }

        next(err)
    }
});
