type Book = {
  id: string,
  author: string,
  country: string,
  imageLink: string,
  language: string,
  link: string,
  pages: number,
  title: string,
  year: number
};

type Copy = {
  id: string,
  bookId: string
};

export async function getBooks(): Promise<Pick<Book, "id" | "title" | "author">[]> {
  const res = await fetch("/api/books");

  return res.json();
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const res = await fetch(`/api/books/${bookId}`);

  return res.json();
}

export async function getCopies(bookId: string): Promise<Copy[]> {
  return [{
      id: crypto.randomUUID(),
      bookId
  }];
}