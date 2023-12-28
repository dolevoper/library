import { Router } from "express";
import { NotFoundError, borrowCopy } from "./copies.model";

export const router = Router();

router.patch("/:copyId", async (req, res) => {
    try {
        const { member } = req.body;

        if (member && (!(typeof member === "string") || !member.match(/[a-z ]*/i))) {
            res.status(400);
            res.send("Member name must contain letters and spaces only.");
            return;
        }

        await borrowCopy(req.params.copyId, member);

        res.status(201);
        res.end();
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404);
            res.send(`Copy ${req.params.copyId} not found.`);
            return;
        }

        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});
