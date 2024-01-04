declare namespace Express {
    export interface Request {
        book: (import("mongoose").Document<
            unknown,
            {},
            import("./books.model").Book
        > &
            import("./books.model").Book &
        {
            _id: Types.ObjectId;
        })
        | null;
    }
}
