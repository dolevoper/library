import { createServer } from "http";
import express from "express";
import { json } from "body-parser";
import { router as booksRouter } from "./books.router.ts";
import { router as copiesRouter } from "./copies.router.ts";

export const app = express();

app.use(json());

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});

app.use("/api/books", booksRouter);
app.use("/api/copies", copiesRouter);

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));