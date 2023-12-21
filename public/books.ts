type Book = {
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
