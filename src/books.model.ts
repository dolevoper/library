import { Schema, model } from "mongoose";

interface Book {
    author: string;
    country: string;
    imageLink: string;
    language: string;
    link: string;
    pages: number;
    title: string;
    year: number;
}

const schema = new Schema<Book>({
    author: String,
    country: String,
    imageLink: String,
    language: String,
    link: String,
    pages: Number,
    title: String,
    year: Number
});

export const Book = model<Book>("Book", schema, "books");