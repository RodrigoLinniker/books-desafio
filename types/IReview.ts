export interface IReview {
    id: string;
    bookId: string;
    userId: string;
    rating: number;
    comment: string;
    User: { name: string;
        image: string};  
}