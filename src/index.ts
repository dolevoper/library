import { createServer } from "http";
import { appendFile, readFile, writeFile } from "fs/promises";
import express from "express";
import path from "path";
import { randomUUID } from "crypto";
import { json } from "body-parser";
import { router } from "./books.router.ts";

const app = express();

app.use(json());

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});

app.use("/api/books", router);

const copiesPath = path.join(process.cwd(), "src", "copies.csv");

app.get("/api/books/:bookId/copies", async (req, res) => {
    try {
        const copiesRaw = await readFile(copiesPath, "utf8");
        const copies = copiesRaw
            .split("\n")
            .map((line) => line.split(","))
            .map(([id, bookId, member]) => ({ id, bookId, member }))

        res.send(copies.filter((copy) => copy.bookId === req.params.bookId));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});

app.post("/api/books/:bookId/copies", async (req, res) => {
    try {
        const copyId = randomUUID().split("-").at(-1)!;

        await appendFile(copiesPath, `\n${copyId},${req.params.bookId}`);

        res.status(201);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send("Something went wrong");
    }
});

app.patch("/api/copies/:copyId", async (req, res) => {
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

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));