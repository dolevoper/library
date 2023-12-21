import { createServer } from "http";
import express from "express";
import books from "./books.json";

const app = express();

app.get("/api/books", (_, res) => {
    res.send(books);
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));