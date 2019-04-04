import { Author } from './author.interface';

export interface Comment {
    id?: number;
    author?: Author;
    content?: string;
    articleId?: number;
}
