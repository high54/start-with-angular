import { ArticleService } from './article/article.service';
import { CommentService } from './comment/comment.service';
export const services: any[] = [
    ArticleService,
    CommentService
];

export * from './article/article.service';
export * from './comment/comment.service';
