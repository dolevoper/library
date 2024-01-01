import { Router } from "express";
import { Member } from "./members.model";

export const router = Router();

router.get("/", async (req, res, next) => {
    try {
        res.send(await Member.find());
    } catch (err) {
        next(err);
    }
});