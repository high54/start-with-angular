# Débuter avec Angular 7+ et structure évolutive
Dans ce cours nous allons mettre en place notre environnement de travail ainsi qu'une structure d'application évolutif.

## Mise en de l'environnement

### IDE
Je vous conseil fortement l'utilisation de Visual Studio Code pour suivre le cours :
https://code.visualstudio.com/ alias VSCode

### Extensions

Afin d'optimiser et gagner en performance lors du développement, voici la liste des extensions à installer sur VSCode :

Visual Studio IntelliCode
https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode
TSLint
https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin
Material Icon THeme
https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme
IntelliJ IDEA Keybinding
https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings
Angular 7 Snippets
https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode

### Installer l'environnement
 
Le cours va porter sur la version 7.2.11 d'Angular.

Node.js version 10.15.3
https://nodejs.org/en/

- TypeScript version 3.2.4
- rxjs version 6.3.3

Angular CLI version 7.3.7

Dans un premier temps il est nécéssaire d'installer Node.js.

Personnelement je travail dans un répertoire nommé "workspace" situé à la racine du disque C.
Dans le répertoire workspace, j'ai un répertoire "Angular". C'est ici que nous allons mettre en place nos différents projets sous Angular.

Dans le dossier Angular, ouvrir une invite de commandes :
SHIFT + CLIC DROIT dans la fenêtre puis : Ouvrir la fenêtre PowerShell ici.
ou
Taper "cmd" dans la barre d'adresse du dossier.

Ces deux actions vont avoir pour effet d'ouvrir une invte de commande dans le répertoire courant.

Dans la fenêtre de commandes :
```
npm install -g @angular/cli
```

Une fois l'installation terminée :

```
ng new start-with-angular
```
L'invite de commande va vous demander si vous souhaiter ajouter Angular routing : Yes
Pour le style : SASS

Nous avons à disposition l'architecture de base d'une application Angular.

Pour permettre la maintenabilitée, ainsi que pour faciliter l'expension de l'application nous allons l'architecturer de sorte que chaque "composant" soit un module qu'il est possible de brancher, débrancher en quelques secondes.

Pour mettre en place une architecture évolutive, nous allons créer un dossier nommé "modules" à l'intérieur du dossier "app".
Dans le dossier modules, nous allons développer ou simplement déposer les fonctionnalités de notre application.

## Module évolutif

Un module évolutif est un composant complexe, que l'on peu presque identifier comme une application à part entière.
Le module va communiquer principalement avec un module nommé "core" qui fera le pont entre les différents modules qui on besoin d'intéraction entre eux.
Cependant il peut être totalement indépendant du reste de l'application.

Prenons pas exemple une application qui à plusieurs utilités :
- 1 Gérer des actualités / billets de blog
- 2 Vendre des objets

On peu identifier deux features modules :
-  news
-  shop

Il nous faudra certainement un autre module pour effectuer l'authentification d'un utilisateur qui souhaite accéder à son compte pour la partie "shop".

- auth

Pourquoi ne pas intégrer directement l'authentification dans le module shop ? Car il est probable que l'on utilise l'authentification pour plusieurs raisons. Par exemple, gérer les news ou identifier un utilisateur pour les commentaires des news.
Le module "auth" sera quand à lui placé dans le "core" de notre application afin de communiquer entre les différents modules.

Voici l'architecture d'un module :
- news
    - components
    - containers ou pages
    - services
    - pipes
    - directives
    - guards
    - models
    - news-routing.module.ts
    - news.module.ts

Le module news dispose de sont propre gestionnaire de module ainsi que de ces routes.
Il est composé de composant qui sont inclus dans des containers ou "pages", de services pouvant faire appelle à des API, des pipes et des directives pour modifier le contenu des composants, des modèles de données ainsi que des guards pour vérouiller les différentes pages.

Il suffit simplement de connecter une route dans le fichier app-routing.module.ts pointant vers le fichier news.module.ts pour connecter le module au reste de l'application.

Chaque dossier est composé de sous dossier correspondant à une fonctionnalitée.



## News module

Nous allons débuter avec le module des news.
Pour commencer nous allons avoir besoin de quelques pages :
- Toutes les news
- Une news

Dans le dossier containers ou pages :

- pages
    - news
        - news.component.html
        - news.component.scss
        - news.component.spec.ts
        - news.component.ts
    - news-item
        - news-item.component.html
        - news-item.component.scss
        - news-item.component.spec.ts
        - news-item.component.ts

La page "news" sera le point d'entré de notre module. C'est ici que nous afficheront la liste des articles.

Cette page affichera un composant :

- components
    - article-short-display

Eventuellement elle pourra afficher d'autres composants, par exemple un bandeau avec les articles les plus lus.

La page news-item quand à elle affichera les composants suivant :

- components
    - article-display
    - article-author
    - article-comments


Le module disposera de deux services :
- services
    - article
        - article.service.ts
        - article.service.spec.ts
    - comment
        - comment.service.ts
        - comment.service.spec.ts

__Article.service__ va nous permettre d'effectuer une requête pour récupèrer la liste des artiles ainsi qu'une requête pour récupèrer un article par son ID.

__Comment.service__ va quand à lui récupèrer les commentaires via l'ID d'un article. Nous pourrions inclure les commentaires avec l'article, mais par soucis de performance, et en cas d'indisponibilité du service, il est préférable de séparer les commentaires d'un article.


## JSON-SERVER

Afin de simuler la présence d'une API, je vous conseil l'utilisation de json-server :

```
npm i -g json-server
```

À la racine de votre projet il vous faut créer un fichier db.json avec les informations suivante :

```
{
    "articles": [],
    "comments":[]
}
```

Une fois l'installation de json-server et la création du fichier terminé, vous pouvez démarrer le serveur avec la commande suivante :

```
json-server --watch db.json
```

Le serveur va démarrer et s'ouvrir au port 3000 : "localhost:3000", nos articles seront disponible à l'URL suivante :
```
http://localhost:3000/articles
```
Et les commentaires :
```
http://localhost:3000/comments
```

Nous allons pouvoir effectuer toutes les requêtes GET, POST, PUT, DELETE que nous souhaitons et les données seront persistantent.


## Affichage des news

Nous allons nous concentrer sur le point d'entré de notre module, à savoir la page "news" et le composant "article-short-display".

Ne pas confondre le module news et la pages news !

Récap de l'architecture :

- db.json
- src
    - app
        - modules
            - news
                - components
                    - article-short-display
                    - index.ts
                - directives
                - guards
                - models
                - pages
                    - news
                    - index.ts
                - pipes
                - services
                    - articles
                    - index.ts
                - news-routing.module.ts
                - news.module.ts

Vous l'aurez surement remarqué, nous avons des fichiers _index.ts_ dans les dossiers qui ne sont pas vide.

Je les ais ajouté afin de faciliter la lecture du code quand le module va grossir.

Voici le code du fichier article-short-display :

/components/article-short-display/article-short-display.component.ts
```
import { Component } from '@angular/core';

@Component({
    selector: 'news-article-short-dsiplay',
    styleUrls: ['article-short-display.component.scss'],
    templateUrl: 'article-short-display.component.html',
})
export class NewsArticleShortDisplayComponent {
    constructor() {}
}

```

1- Le selector est préfixé par le nom du module "news"
2- Le nom de la classe est préfixée par le nom du module "News"
3- Le nom de la classe est sufixée par le rôle de la classe "Component"

### index.ts explications

Dans le dossier components nous avons un fichier index.ts qui va importer tous les composants et les exporters en une seule variable. Plutôt pratique pour aérer le fichier news.module.ts.

/components/index.ts
```
import { NewsArticleShortDisplayComponent } from './article-short-display/article-short-display.component';

export const components: any[] = [
    NewsArticleShortDisplayComponent
];

export * from './article-short-display/article-short-display.component';

```

Ainsi nous avons à notre dispositions une constante nommée "components" qui est un tableau avec tous les composants.


Voyons maintenant la page news :
/pages/news/news.component.ts
```
import { Component } from '@angular/core';

@Component({
    selector: 'app-news',
    styleUrls: ['news.component.scss'],
    templateUrl: 'news.component.html',
})
export class NewsComponent {
    constructor() {}
}

```
Le fichier index.ts du dossier "pages" :

/pages/index.ts
```
import { NewsComponent } from './news/news.component';

export const pages: any[] = [
    NewsComponent
];

export * from './news/news.component';

```


Le service "article" :

/services/article.service.ts
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Models
import { Article } from '../../models/article.model';
@Injectable()
export class ArticleService {
    private api = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Ajoute un article en base de données
     * @param payload Article object
     */
    createArticle(payload: Article): Observable<Article> {
        return this.http
            .post<Article>(`${this.api}/articles`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Récupère tous les articles
     */
    getArticles(): Observable<Article[]> {
        return this.http
            .get<Article[]>(`${this.api}/articles`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Met à jour un article en base de données
     * @param payload Article object
     */
    updateArticle(payload: Article): Observable<Article> {
        return this.http
            .put<Article>(`${this.api}/articles/${payload.id}`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Supprime un article en base de données
     * @param payload Article object
     */
    removeArticle(payload: Article): Observable<Article> {
        return this.http
            .delete<any>(`${this.api}/articles/${payload.id}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
}

```

le fichier index.ts du dossier "services":
/services/index.ts
```
import { ArticleService } from './article/article.service';

export const services: any[] = [
    ArticleService
];

export * from './article/article.service';
```

Nous allons avoir besoin d'un modèle de données :

/models/article.interface.ts
```
export interface Article {
    id?: number;
    title?: string;
    description?: string;
    content?: string;
}

```

### Routes

Nous allons configurer une première route qui va pointer vers notre page "news":

/news-routing.module.ts
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromPages from './pages';


// routes
export const routes: Routes = [
  {
    path: '',
    component: fromPages.NewsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }

```

## news module

Maintenant que nous avons notre route, nos pages, le service et le composant, nous pouvons mettre en place le fichier news.module.ts :

/modules/news/news.module.ts
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Pages
import * as fromPages from './pages';

// Components
import * as fromComponents from './components';

// Services
import * as fromServices from './services';

// Routes
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NewsRoutingModule
    ],
    declarations: [
        ...fromPages.pages,
        ...fromComponents.components
    ],
    providers: [
        ...fromServices.services
    ]
})
export class NewsModule { }

```
Via l'utilisation du spread operator, nous déclarons les pages, composants et services. Grace à nos fichiers index.ts, la lecture du fichier news.module s'effectue rapidement.

Maintenant pour connecter notre module au reste de l'application, nous avons simplement à ajouter une route dans le fichier app-routing.module.ts :

/src/app/app-routing.module.ts
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'news',
    loadChildren: './modules/news/news.module#NewsModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

À partir de maintenant, le module est accessible via la route "news". L'intégralité du module est chargé en mode "lazy-load" afin de maximiser les performances de l'application. Il sera possible de changer la stratégie de chargement plustard, pour éventuellement pré charger le module.

Si vous souhaitez gagner du temps lors de ce cours, vous pouvez ajouter une route au fichier app-routing.module.ts afin d'afficher directement le module "news" !

/src/app/app-routing.module.ts
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'news' },
  {
    path: 'news',
    loadChildren: './modules/news/news.module#NewsModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

Vous pouvez dès à présent lancer l'application en mode développement via la commande suivante :
```
ng serve --o
```
Le projet devrait s'ouvrir sur votre navigateur à l'adresse suivante :
```
http://localhost:4200
```

Actuellement il n'i a pas de contenu, d'ailleur vous pouvez supprimer le contenu du fichier app.component.html pour ne laisser que la balise router-outlet :

/src/app/app.component.html
```

<router-outlet></router-outlet>

```


À ce stade, l'application n'affiche aucune information, cependant, nous avons mis en place toutes l'architecture et nous pouvons à présent nous concentrer sur les fonctionnalités.

Dans un premier temps nous allons ajouter quelques articles à notre "base de données" db.json :

/db.json
```
{
    "articles": [
        {
            "id": 1,
            "title": "Première news",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "content": "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam"
        },
        {
            "id": 2,
            "title": "Seconde news",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "content": "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam"
        }
    ],
    "comments": []
}
```

Nous avons maintenant deux articles à notre disposition. Pour tester, vous pouvez vous rendre à l'adresse suivante sur votre navigateur :
```
http://localhost:3000/news
```

Si la page ne s'affiche pas, lancer le serveur :
```
json-server --watch db.json
```

Notre service "article.service" est prêt à transmettre les données, nous allons l'utiliser dans notre page "news" :

/modules/news/pages/news/news.components.ts
```
import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';

@Component({
    selector: 'app-news',
    styleUrls: ['news.component.scss'],
    templateUrl: 'news.component.html',
})
export class NewsComponent implements OnInit {

    articles$: Observable<Article[]>;

    constructor(
        private articleService: ArticleService
    ) { }

    ngOnInit() {
        this.articles$ = this.articleService.getArticles();
    }
}

```

Notre composant implémente OnInit et déclare une nouvelle méthode ngOnInit() afin de respécter le cicle de vie d'Angular.

Nous avons une variable __articles$__ qui n'a pas de modifieur donc elle est public.

__articles$__ est suffixé par le symbole "$". Il s'agit d'une convention de nommage pour facilement identifier les observables.

__articles$__ est initialisé dans la méthode ngOnInit() qui utilise la méthode getArticles() de notre service.

Nous l'utiliseront directement dans le template avec le pipe "async" qui est spécialement dédier aux promesses et aux observables.
L'autre solution consiste à souscrire directement à la méthode getArticles() dans la méthode ngOnInit et d'implémenter le cicle de vie OnDestroy afin de déclarer la méthode ngOnDestroy pour nous désinscrire de getArticles() afin d'éviter des fuites de mémoire.
Mais le pipe "async" est spécialement dédié à cela.


Voyons le template de la page news :

/modules/news/pages/news/news.components.html
```
<div class="news">
    <h1>News</h1>
    <news-article-short-dsiplay *ngFor="let article of (articles$ | async)" [article]="article">
    </news-article-short-dsiplay>
</div>

```

Nous utilisons le selecteur du composant article-short-display et nous effectuons une boucle sur la liste de nos articles via "*ngFor", qui va passer un par un les articles à notre composant article-short-display.
Cela va avoir pour conséquence d'afficher autant de fois le composant article-short-display qu'il y a d'articles.

À ce stade, l'application n'affichera pas encore d'information. Pour palier à cela nous devons nous occuper du composant:

/modules/news/components/article-short-display/article-short-display.ts
```
import { Component, Input } from '@angular/core';
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-article-short-dsiplay',
    styleUrls: ['article-short-display.component.scss'],
    templateUrl: 'article-short-display.component.html',
})
export class NewsArticleShortDisplayComponent {
    @Input() article: Article;
    constructor() { }
}
```

Il n'y a qu'une chose à mettre en place dans le fichier TS du composant, à savoir un "Input". Celui ci indique que le composant va recevoir du parent une variable nommé "article".

Dans le fichier HTML de notre page "news", nous avons indiqué [article] c'est le nom de la variable que nous allons récupérer dans le composant article-short-display. Puis nous avons indiqué une valeur à cette variable [article]="article".
Cette valeur, nommé aussi article est l'objet article qui est généré via le ngFor.
Le nom de la valeur à peu d'importance. Nous aurions pu écrire :
```
[article]="toto"
```
Du moment que toto contient un article.

Maintenant, grace à "Input()", nous disposons de toutes les données d'un article dans notre composant, il est donc temps d'afficher les informations :

/modules/news/components/article-short-display/article-short-display.html
```
<div class="article-short-display">
    <h2>{{article.title}}</h2>
    <p>{{article.description}}</p>
</div>

```
Et voila, nos deux articles s'affichent enfin dans notre application.

Le plus dur jusqu'à présent a été de mettre en place une structure facilement maintenable et évolutive.

L'étape suivante consiste à afficher un article complet dans une autre page, avec l'auteur et les commentaires associé.

## news-item

Dans notre dossier pages, nous allons ajouter un composant news-item :

/modules/news/pages/news-item/news-item.component.ts
```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
// Models
import { Article } from '../../models/article.interface';
// Services
import { ArticleService } from '../../services';

@Component({
    selector: 'app-news-item',
    styleUrls: ['news-item.component.scss'],
    templateUrl: 'news-item.component.html',
})
export class NewsItemComponent implements OnInit {
    article$: Observable<Article>;
    constructor(
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.route.snapshot.params.articleId) {
            this.article$ = this.articleService.getArticle(this.route.snapshot.params.articleId);
        } else {
            this.router.navigate(['../']);
        }
    }
}

```

Comme nous venons d'ajouter un composant dans le dossier pages, il est nécéssaire d'ajouter le composant dans le fichier index.ts :

/modules/news/pages/index.ts
```
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news-item/news-item.component';

export const pages: any[] = [
    NewsComponent,
    NewsItemComponent
];

export * from './news/news.component';
export * from './news-item/news-item.component';

```

Profitons en pour ajouter une nouvelle route dans le fichier news-routing.module :

/modules/news/news-routing.module.ts
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromPages from './pages';


// routes
export const routes: Routes = [
  {
    path: '',
    component: fromPages.NewsComponent
  },
  {
    path: ':articleId',
    component: fromPages.NewsItemComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }

```

Cette nouvelle route prends dans le "path" une valeur préfixée par deux points ":". cette valeur correspond à l'ID que nous afficherons sur la page. Le nom de la valeur ici "articleId" est très importante, car c'est via ce nom que nous allons récupèrer l'ID.

Enfin, cette route pointe sur notre nouveau composant NewsItemComponent.

Cette page va afficher plusieurs composants, nous allons les mettrent en place :

/modules/news/components/article-dispay/article-display.component.ts
```
import { Component, Input } from '@angular/core';

// Models
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-article-display',
    styleUrls: ['article-display.component.scss'],
    templateUrl: 'article-display.component.html',
})
export class NewsArticleDisplayComponent {
    @Input() article: Article;

    constructor() { }
}

```

/modules/news/components/article-dispay/article-display.component.html
```
<div class="article-display">
    <h2>{{article.title}}</h2>
    <p>{{article.content}}</p>
</div>

```

/modules/news/components/article-author/article-author.component.ts
```
import { Component, Input } from '@angular/core';

// Models
import { Author } from '../../models/author.interface';

@Component({
    selector: 'news-article-author',
    styleUrls: ['article-author.component.scss'],
    templateUrl: 'article-author.component.html',
})
export class NewsArticleAuthorComponent {
    @Input() author:Author;
    constructor() { }
}

```

/modules/news/components/article-author/article-author.component.html
```
<div class="article-author">
    <h3>{{author.fullName}}</h3>
</div>

```

/modules/news/components/index.ts
```
import { NewsArticleShortDisplayComponent } from './article-short-display/article-short-display.component';
import { NewsArticleDisplayComponent } from './article-display/article-display.component';
import { NewsArticleAuthorComponent } from './article-author/article-author.component';
export const components: any[] = [
    NewsArticleShortDisplayComponent,
    NewsArticleDisplayComponent,
    NewsArticleAuthorComponent
];

export * from './article-short-display/article-short-display.component';
export * from './article-display/article-display.component';
export * from './article-author/article-author.component';


```


Etant donné que nous avons ajouté l'auteur de l'article, nous allons ajouter une interface et modifier l'interface des articles :

/modules/news/models/author.interface.ts
```
export interface Author {
    fullName?: string;
}

```

/modules/news/models/article.interface.ts
```
import { Author } from './author.interface';

export interface Article {
    id?: number;
    title?: string;
    description?: string;
    content?: string;
    author?: Author;
}

```


Profitons en pour ajouter l'interface pour les commentaires :

/modules/news/models/comment.interface.ts
```
import { Author } from './author.interface';

export interface Comment {
    id?: number;
    author?: Author;
    content?: string;
    articleId?: number;
}

```

Enfin pour terminer avec les composants, nous pouvons ajouter article-comments :

/modules/news/components/article-comments/article-comments.components.ts
```
import { Component, Input } from '@angular/core';

@Component({
    selector: 'news-article-comments',
    styleUrls: ['article-comments.component.scss'],
    templateUrl: 'article-comments.component.html',
})
export class NewsArticleCommentsComponent {
    @Input() comment: Comment;
    constructor() { }
}

```

/modules/news/components/article-comments/article-comments.components.html
```
<div class="article-comments">
    <h4>{{comment.author}}</h4>
    <p>{{comment.content}}</p>
</div>
```
Le fichier index.ts mise à jour avec notre nouveau composant :

/modules/news/components/index.ts
```
import { NewsArticleShortDisplayComponent } from './article-short-display/article-short-display.component';
import { NewsArticleDisplayComponent } from './article-display/article-display.component';
import { NewsArticleAuthorComponent } from './article-author/article-author.component';
import { NewsArticleCommentsComponent } from './article-comments/article-comments.component';
export const components: any[] = [
    NewsArticleShortDisplayComponent,
    NewsArticleDisplayComponent,
    NewsArticleAuthorComponent,
    NewsArticleCommentsComponent
];

export * from './article-short-display/article-short-display.component';
export * from './article-display/article-display.component';
export * from './article-author/article-author.component';
export * from './article-comments/article-comments.component';

```

Afin de récupèrer les commentaires, nous allons avoir besoin d'un service :

/modules/news/services/comment/comment.service.ts
```
import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment.interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CommentService {
    private api = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    createComment(payload: Comment): Observable<Comment> {
        return this.http
            .post<Comment>(`${this.api}/comments`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    getComments(articleId: number): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments/${articleId}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    updateComment(payload: Comment): Observable<Comment> {
        return this.http
            .put<Comment>(`${this.api}/comments/${payload.id}`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    removeComment(payload: Comment): Observable<Comment> {
        return this.http
            .delete<any>(`${this.api}/comments/${payload.id}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
}


```

Le fichier index.ts des services :

/modules/news/services/index.ts
```
import { ArticleService } from './article/article.service';
import { CommentService } from './comment/comment.service';
export const services: any[] = [
    ArticleService,
    CommentService
];

export * from './article/article.service';
export * from './comment/comment.service';

```

Nous pouvons dès à présent modifier notre base de données afin d'y inclure des commentaires :

db.json
```
{
    "articles": [
        {
            "id": 1,
            "title": "Première news",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "content": "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam",
            "author":{
                "fullName":"Author 1"
            }
        },
        {
            "id": 2,
            "title": "Seconde news",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "content": "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam",
            "author":{
                "fullName":"Author 2"
            }
        }
    ],
    "comments": [
        {
            "id":1,
            "author":{
                "fullName":"Author 3"
            },
            "content":"Contenu du commentaire 1",
            "articleId":1
        },
        {
            "id":2,
            "author":{
                "fullName":"Author 3"
            },
            "content":"Contenu du commentaire 2",
            "articleId":2
        },
        {
            "id":3,
            "author":{
                "fullName":"Author 4"
            },
            "content":"Contenu du commentaire 3",
            "articleId":1
        },
        {
            "id":4,
            "author":{
                "fullName":"Author 4"
            },
            "content":"Contenu du commentaire 4",
            "articleId":2
        }
    ]
}
```


Maintenant que nous avons mis en place de quoi récupèrer les commentaires, il serait bon d'afficher notre article avec l'auteur et les commentaires.

Nous allons modifier la page news-item pour faire appelle à nos composants :

/modules/news/pages/news-item.component.ts
```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
// Models
import { Article } from '../../models/article.interface';
import { Comment } from '../../models/comment.interface';
// Services
import { ArticleService, CommentService } from '../../services';

@Component({
    selector: 'app-news-item',
    styleUrls: ['news-item.component.scss'],
    templateUrl: 'news-item.component.html',
})
export class NewsItemComponent implements OnInit {
    article$: Observable<Article>;
    comments$: Observable<Comment[]>;
    constructor(
        private articleService: ArticleService,
        private commentService: CommentService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.route.snapshot.params.articleId) {
            this.article$ = this.articleService.getArticle(this.route.snapshot.params.articleId);
            this.comments$ = this.commentService.getComments(this.route.snapshot.params.articleId);
        } else {
            this.router.navigate(['../']);
        }
    }
}

```

Ici nous utilisons le service des commentaires afin de les récupèrer.

/modules/news/pages/news-item.component.html
```
<div class="news-item">
    <div *ngIf="article$ | async as article">
        <news-article-display [article]="article"></news-article-display>
        <news-article-author [author]="article?.author"></news-article-author>
    </div>
    <news-article-comments *ngFor="let comment of (comments$ | async)" [comment]="comment">
    </news-article-comments>
</div>

```


