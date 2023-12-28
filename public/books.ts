type Book = {
  _id: string,
  author: string,
  country: string,
  imageLink: string,
  language: string,
  link: string,
  pages: number,
  title: string,
  year: number
};

export type Copy = {
  id: string,
  bookId: string,
  member?: string
};

export async function getBooks(): Promise<Pick<Book, "_id" | "title" | "author">[]> {
  const res = await fetch("/api/books");

  return res.json();
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const res = await fetch(`/api/books/${bookId}`);

  return res.json();
}

export async function getCopies(bookId: string): Promise<Copy[]> {
  const res = await fetch(`/api/books/${bookId}/copies`);

  return res.json();
}

export async function createCopy(bookId: string) {
  await fetch(`/api/books/${bookId}/copies`, {
    method: "post"
  });
}

export async function borrowCopy(copyId: string, member: string) {
  const body = JSON.stringify({ member });

  await fetch(`/api/copies/${copyId}`, {
    method: "PATCH",
    body,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": body.length.toString()
    }
  });
}