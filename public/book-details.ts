import { getBookDetails } from "./books.js";

async function app() {
    const bookId = window.location.hash.slice(1);
    const bookDetails = await getBookDetails(bookId);

    renderBookField("author");
    renderBookField("title");
    renderBookField("language");
    renderBookField("year");

    function renderBookField(field: keyof typeof bookDetails) {
        const authorSpan = document.getElementById(`book-${field}`);

        if (!authorSpan) {
            throw new Error();
        }

        authorSpan.innerText = bookDetails[field].toString();
    }
}

app();