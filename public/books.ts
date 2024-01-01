export type Member = {
  _id: string,
  name: string
};

export type Book = {
  _id: string,
  author: string,
  country: string,
  imageLink: string,
  language: string,
  link: string,
  pages: number,
  title: string,
  year: number,
  copies: Copy[]
};

export type Copy = {
  _id: string,
  member?: Member
};

export type BookListResult = Pick<Book, "_id" | "title" | "author">[];

export async function getBooks(search?: string): Promise<BookListResult> {
  const query = search ? `?search=${search}` : "";
  const res = await fetch(`/api/books${query}`);

  return res.json();
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const res = await fetch(`/api/books/${bookId}`);

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

export function getMembers(): Promise<Member[]> {
  return fetch("/api/members").then((res) => res.json());
}