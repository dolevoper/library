import "dotenv/config";

import { createServer } from "http";
import express from "express";
import { json } from "body-parser";
import { router as booksRouter } from "./books.router";
import { router as copiesRouter } from "./copies.router";
import { router as membersRouter } from "./members.router";
import mongoose from "mongoose";

export const app = express();

app.use(json());

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});

app.use("/api/books", booksRouter);
app.use("/api/copies", copiesRouter);
app.use("/api/members", membersRouter);

app.use(express.static("public"));

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    }

    console.error(err);
    res.status(500);
    res.send("Something went wrong");
});

const server = createServer(app);
const port = process.env.PORT ?? 3000;


async function startServer() {
    if (!process.env.CONN_STRING) {
        throw new Error("Must provide connection string")
    }

    await mongoose.connect(process.env.CONN_STRING, {
        dbName: "library"
    });

    server.listen(port, () => console.log(`Listening on port ${port}`));
}

startServer();