import { Router } from "express";
import { User, hashPassword } from "./users.model";

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

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username,
            password
        });

        if (!user) {
            res.status(401);
            res.send("username and password doesn't match");
            return;
        }

        res.cookie("userId", user.username, {
            signed: true,
            secure: true,
            httpOnly: true
        });
        res.status(200);
        res.send();
    } catch (err) {
        next(err);
    }
});