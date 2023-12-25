declare namespace Express {
    export interface Request {
        book?: {
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
    }
}
