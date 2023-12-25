import { createCopy, getBookDetails, getCopies } from "./books.js";

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

    renderCopies(copies);

    const createCopyButton = document.getElementById("create-copy");

    if (!createCopyButton) {
        throw new Error();
    }

    createCopyButton.addEventListener("click", async () => {
        await createCopy(bookId);

        renderCopies(await getCopies(bookId));
    });

    function renderBookField(field: keyof typeof bookDetails) {
        const authorSpan = document.getElementById(`book-${field}`);

        if (!authorSpan) {
            throw new Error();
        }

        authorSpan.innerText = bookDetails[field].toString();
    }
}

app();

function renderCopies(copies: { id: string; bookId: string; }[]) {
    const copyCount = document.getElementById("copy-count");

    if (!copyCount) {
        throw new Error();
    }

    copyCount.innerText = copies.length ? `Copies: ${copies.length}` : "This book has no copies";

    const copiesTable = document.getElementById("copies");

    if (!copiesTable) {
        throw new Error();
    }

    copiesTable.innerHTML = copies
        .map((copy) => `<tr><td>${copy.id}</td><td>🟢</td></tr>`)
        .join("\n");
}
