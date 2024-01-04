import { createHash } from "crypto";
import { Schema, model } from "mongoose";

interface User {
    username: string;
    password: string;
}

const schema = new Schema<User>({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        set(value: string) {
            const hash = createHash("sha256");
            hash.update(value);

            return hash.digest("base64");
        }
    }
});

export const User = model<User>("User", schema, "users");