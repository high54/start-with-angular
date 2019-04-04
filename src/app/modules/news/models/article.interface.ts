import { Author } from './author.interface';

export interface Article {
    id?: number;
    title?: string;
    description?: string;
    content?: string;
    author?: Author;
}
