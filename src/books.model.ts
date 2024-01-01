import { Schema, Types, model } from "mongoose";

interface Copy {
    _id: Types.ObjectId,
    member?: string
}

const copySchema = new Schema<Copy>({
    _id: Schema.Types.ObjectId,
    member: String
});

export interface Book {
    author: string;
    country: string;
    imageLink: string;
    language: string;
    link: string;
    pages: number;
    title: string;
    year: number;
    copies: Copy[];
}

const bookSchema = new Schema<Book>({
    author: String,
    country: String,
    imageLink: String,
    language: String,
    link: String,
    pages: Number,
    title: String,
    year: Number,
    copies: [copySchema]
});

export const Book = model<Book>("Book", bookSchema, "books");