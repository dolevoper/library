import { Copy, borrowCopy, createCopy, getBookDetails, getCopies } from "./books.js";

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

function renderCopies(copies: Copy[]) {
    const copyCount = document.getElementById("copy-count");

    if (!copyCount) {
        throw new Error();
    }

    copyCount.innerText = copies.length ? `Count: ${copies.length}` : "This book has no copies";

    const copiesTable = document.getElementById("copies");

    if (!copiesTable) {
        throw new Error();
    }

    copiesTable.innerHTML = copies
        .map((copy) => `<tr><td>${copy.id}</td><td>${copy.member ? "🔴" : "🟢"}</td><td>${
            copy.member ??
            `<form class="borrow-form">
                <input type="hidden" name="bookId" value="${copy.bookId}" />
                <input type="hidden" name="copyId" value="${copy.id}" />
                <input name="member" />
                <button>Borrow</button>
            </form>`
        }</td></tr>`)
        .join("\n");
    
    document.querySelectorAll(".borrow-form").forEach((form) => form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        await borrowCopy(formData.get("copyId")!.toString(), formData.get("member")!.toString());

        renderCopies(await getCopies(formData.get("bookId")!.toString()));
    }));
}
