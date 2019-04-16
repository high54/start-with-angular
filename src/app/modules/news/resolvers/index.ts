import { ArticleListResolver } from './article/article-list.resolver';
import { ArticleResolver } from './article/article.resolver';
export const resolvers: any[] = [
    ArticleListResolver,
    ArticleResolver
];


export * from './article/article-list.resolver';
export * from './article/article.resolver';
