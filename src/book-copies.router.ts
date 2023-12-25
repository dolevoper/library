import { randomUUID } from "crypto";
import { Router } from "express";
import { appendFile, readFile } from "fs/promises";
import path from "path";

const copiesPath = path.join(process.cwd(), "src", "copies.csv");

export const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const copiesRaw = await readFile(copiesPath, "utf8");
        const copies = copiesRaw
            .split("\n")
            .map((line) => line.split(","))
            .map(([id, bookId, member]) => ({ id, bookId, member }))

        res.send(copies.filter((copy) => copy.bookId === req.book?.id));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});

router.post("/", async (req, res) => {
    try {
        const copyId = randomUUID().split("-").at(-1)!;

        await appendFile(copiesPath, `\n${copyId},${req.book?.id}`);

        res.status(201);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});