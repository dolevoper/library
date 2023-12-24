import { getBookDetails, getCopies } from "./books.js";

async function app() {
    const bookId = window.location.hash.slice(1);
    const [bookDetails, copies] = await Promise.all([
        getBookDetails(bookId),
        getCopies(bookId)
    ]);

    const coverImage = document.getElementById("book-cover");
    coverImage?.setAttribute("src", `https://github.com/benoitvallon/100-best-books/blob/master/static/${bookDetails.imageLink}?raw=true`);

    renderBookField("author");
    renderBookField("title");
    renderBookField("language");
    renderBookField("year");
    renderBookField("pages");

    const bookCopies = document.getElementById("book-copies");

    if (!bookCopies) {
        throw new Error();
    }

    bookCopies.innerText = copies.length.toString();

    function renderBookField(field: keyof typeof bookDetails) {
        const authorSpan = document.getElementById(`book-${field}`);

        if (!authorSpan) {
            throw new Error();
        }

        authorSpan.innerText = bookDetails[field].toString();
    }
}

app();