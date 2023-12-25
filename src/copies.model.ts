import { randomUUID } from "crypto";
import { appendFile, readFile, writeFile } from "fs/promises";
import path from "path";

const copiesPath = path.join(process.cwd(), "src", "copies.csv");

type Copy = {
    id: string,
    bookId: string,
    member?: string
};

export async function read() {
    const copiesRaw = await readFile(copiesPath, "utf8");

    return copiesRaw
        .split("\n")
        .map((line) => line.split(","))
        .map(([id, bookId, member]) => ({ id, bookId, member } as Copy));
}

export async function create(bookId: string) {
    const copyId = randomUUID().split("-").at(-1)!;

    await appendFile(copiesPath, `\n${copyId},${bookId}`);
}

export async function updateMember(copyId: string, member?: string) {
    const copies = await read()
    const copy = copies.find((c) => c.id === copyId);

    if (!copy) {
        throw new NotFoundError();
    }

    copy.member = member;

    await writeFile(
        copiesPath,
        copies
            .map(({ id, bookId, member }) => `${id},${bookId}${member ? `,${member}` : ""}`)
            .join("\n")
    );
}

export class NotFoundError extends Error {
    constructor(message?: string) {
        super(message)
    }
}
