import { readFile, writeFile } from "fs/promises";
import { Router } from "express";
import path from "path";

export const router = Router();
const copiesPath = path.join(process.cwd(), "src", "copies.csv");

router.patch("/:copyId", async (req, res) => {
    try {
        const copiesRaw = await readFile(copiesPath, "utf8");
        const copies = copiesRaw
            .split("\n")
            .map((line) => line.split(","))
            .map(([id, bookId, member]) => ({ id, bookId, member }));

        const copy = copies.find((c) => c.id === req.params.copyId);

        if (!copy) {
            res.status(404);
            res.send(`Copy ${req.params.copyId} not found.`);
            return;
        }

        const { member } = req.body;

        if (member && (!(typeof member === "string") || !member.match(/[a-z ]*/i))) {
            res.status(400);
            res.send("Member name must contain letters and spaces only.");
            return;
        }

        copy.member = req.body.member;

        await writeFile(copiesPath, copies.map(({ id, bookId, member }) => `${id},${bookId}${member ? `,${member}` : ""}`).join("\n"));

        res.status(201);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});
