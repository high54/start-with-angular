import { ArticleListeResolver } from './article/article-list.resolver';
import { ArticleResolver } from './article/article.resolver';
export const resolvers: any[] = [
    ArticleListeResolver,
    ArticleResolver
];


export * from './article/article-list.resolver';
export * from './article/article.resolver';
