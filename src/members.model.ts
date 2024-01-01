import { Schema, model } from "mongoose";

interface Member {
    name: string;
    phone: string;
}

const memberSchema = new Schema<Member>({
    name: String,
    phone: String
});

export const Member = model<Member>("Member", memberSchema, "members");