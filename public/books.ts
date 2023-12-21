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

export async function getBooks(): Promise<Book[]> {
  const res = await fetch("/api/books");

  return res.json();
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const res = await fetch(`/api/books/${bookId}`);

  return res.json();
}
