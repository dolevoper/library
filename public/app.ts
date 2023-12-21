import { books } from "./books.js";

const bookList = document.getElementById("book-list");

if (bookList) {
    bookList.innerHTML = books.map((book) => `<li>${book.title} - ${book.author}</li>`).join("\n");
}
