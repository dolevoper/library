import { BookListResult, getBooks } from "./books.js";

async function app() {
    const books = await getBooks();

    renderBooks(books);
}

async function renderBooks(books: BookListResult) {
    const bookList = document.getElementById("book-list");

    if (!bookList) {
        throw new Error("Book list element not in page");
    }

    bookList.innerHTML = books.map((book) => `<li><a href="/book-details.html#${book._id}">${book.title} - ${book.author}</a></li>`).join("\n");
}

document.forms.namedItem("searchBook")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const books = await getBooks(formData.get("search")?.toString());

    renderBooks(books);
});

app();
