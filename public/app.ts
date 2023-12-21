import { getBooks } from "./books.js";

const bookList = document.getElementById("book-list");

async function app() {
    if (!bookList) {
        throw new Error("Book list element not in page");
    }

    const books = await getBooks();

    bookList.innerHTML = books.map((book) => `<li>${book.title} - ${book.author}</li>`).join("\n");
}

app();
