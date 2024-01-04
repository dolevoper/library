import { Router } from "express";
import { User } from "./users.model";

export const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password || typeof username !== "string" || typeof password !== "string") {
            res.status(400);
            res.send("Must provide username and password");
            return;
        }

        await User.create({ username, password });

        res.status(201);
        res.end();
    } catch (err) {
        if (typeof err === "object" && err && "code" in err && err.code === 11000) {
            res.status(409);
            res.send("username already taken");
            return;
        }

        next(err);
    }
});