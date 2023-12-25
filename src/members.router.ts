import { Router } from "express";
import { read } from "./copies.model";

export const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const copies = await read();
        const members = new Set(copies.map((c) => c.member));

        res.send(Array.from(members).filter((member) => !!member));
    } catch (err) {
        next(err);
    }
});