
# Débuter avec Angular 7+ et structure évolutive
Dans ce cours nous allons mettre en place notre environnement de travail ainsi qu'une structure d'application évolutive.

Installation locale :

```
git clone https://github.com/high54/start-with-angular.git
cd start-with-angular
npm i

ng serve --o

// Dans une seconde invite de commande 
json-server --watch db.json
```
### Pour vous connecter :

Identifiant : admin

Mot de passe : admin


Page du tutoriel :
[GitHub](https://high54.github.io/start-with-angular/)

- [Débuter avec Angular 7+ et structure évolutive](#d%C3%A9buter-avec-angular-7-et-structure-%C3%A9volutive)
  - [Mise en place de l'environnement](#mise-en-place-de-lenvironnement)
    - [IDE](#ide)
    - [Extensions](#extensions)
    - [Installer l'environnement](#installer-lenvironnement)
    - [JSON-SERVER](#json-server)
  - [Module évolutif](#module-%C3%A9volutif)
    - [News module](#news-module)
  - [Affichage des news](#affichage-des-news)
    - [index.ts explications](#indexts-explications)
    - [changeDetection: OnPush](#changedetection-onpush)
    - [Routes](#routes)
  - [news module](#news-module)
  - [News-item](#news-item)
    - [article-display composant](#article-display-composant)
    - [article-author composant](#article-author-composant)
    - [author interface](#author-interface)
    - [comment interface](#comment-interface)
    - [article-comments composant](#article-comments-composant)
    - [comment service](#comment-service)
    - [DB.JSON](#dbjson)
    - [Comment-form](#comment-form)
  - [ng-content](#ng-content)
    - [ng-content et son sélecteur](#ng-content-et-son-s%C3%A9lecteur)
  - [Pipes](#pipes)
  - [Directives](#directives)
  - [Resolver](#resolver)
    - [Qu'est ce qu'un Resolver ?](#quest-ce-quun-resolver)
    - [ArtileListResolver](#artilelistresolver)
  - [Faisons le point sur notre application.](#faisons-le-point-sur-notre-application)
  - [News Administration](#news-administration)
  - [Gestion des articles](#gestion-des-articles)
    - [manage-articles component](#manage-articles-component)
    - [article-form](#article-form)
  - [Gestion des commentaires](#gestion-des-commentaires)
    - [moderate-comments](#moderate-comments)
  - [Core](#core)
    - [Gestion des erreurs](#gestion-des-erreurs)
    - [Header](#header)
    - [Navigation](#navigation)
    - [Authentification](#authentification)
      - [Interceptor](#interceptor)
      - [Guards](#guards)




## Mise en place de l'environnement

### IDE
Je vous conseille fortement l'utilisation de Visual Studio Code pour suivre le cours :
https://code.visualstudio.com/ alias VSCode

### Extensions

Afin d'optimiser et gagner en performance lors du développement, voici la liste des extensions à installer sur VSCode :

Visual Studio IntelliCode

https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode

TSLint

https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin

Material Icon Theme

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

Dans un premier temps il est nécessaire d'installer Node.js.

Personnellement je travaille dans un répertoire nommé "workspace" situé à la racine du disque C.
Dans le répertoire workspace, j'ai un répertoire "Angular". C'est ici que nous allons mettre en place nos différents projets sous Angular.

Dans le dossier Angular, ouvrir une invite de commandes :
SHIFT + CLIC DROIT dans la fenêtre puis : Ouvrir la fenêtre PowerShell ici.
Ou
Taper "cmd" dans la barre d'adresse du dossier.

Ces deux actions vont avoir pour effet d'ouvrir une invite de commande dans le répertoire courant.

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

Pour permettre la maintenabilité, ainsi que pour faciliter l'expansion de l'application nous allons l'architecturer de sorte que chaque "composant" soit un module qu'il est possible de brancher, débrancher en quelques secondes.

Pour mettre en place une architecture évolutive, nous allons créer un dossier nommé "modules" à l'intérieur du dossier "app".
Dans le dossier modules, nous allons développer ou simplement déposer les fonctionnalités de notre application.

### JSON-SERVER

Afin de simuler la présence d'une API, je vous conseille l'utilisation de json-server :

```
npm i -g json-server
```

À la racine de votre projet il vous faut créer un fichier db.json avec les informations suivante :

``` json
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

Nous allons pouvoir effectuer toutes les requêtes GET, POST, PUT, DELETE que nous souhaitons et les données seront persistantes.

## Module évolutif

Un module évolutif est un composant complexe, que l'on peut presque identifier comme une application à part entière.
Le module va communiquer principalement avec un module nommé "core" qui fera le pont entre les différents modules qui ont besoin d'interaction entre eux.
Cependant il peut être totalement indépendant du reste de l'application.

Prenons par exemple une application qui à plusieurs utilités :
- 1 Gérer des actualités / billets de blog
- 2 Vendre des objets

On peut identifier deux features modules :
-  news
-  shop

Il nous faudra certainement un autre module pour effectuer l'authentification d'un utilisateur qui souhaite accéder à son compte pour la partie "shop".

- auth

Pourquoi ne pas intégrer directement l'authentification dans le module shop ? Car il est probable que l'on utilise l'authentification pour plusieurs raisons. Par exemple, gérer les news ou identifier un utilisateur pour les commentaires des news.
Le module "auth" sera quant à lui placé dans le "core" de notre application afin de communiquer entre les différents modules.

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

Le module news dispose de son propre gestionnaire de module ainsi que de ces routes.
Il est composé de composant qui sont inclus dans des containers ou "pages", de services pouvant faire appel à des API, des pipes et des directives pour modifier le contenu des composants, des modèles de données ainsi que des guards pour verrouiller les différentes pages.

Il suffit simplement de connecter une route dans le fichier app-routing.module.ts pointant vers le fichier news.module.ts pour connecter le module au reste de l'application.

Chaque dossier est composé de sous dossier correspondant à une fonctionnalité.



### News module

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

La page "news" sera le point d'entrée de notre module. C'est ici que nous afficheront la liste des articles.

Cette page affichera un composant :

- components
    - article-short-display

Eventuellement elle pourra afficher d'autres composants, par exemple un bandeau avec les articles les plus lus.

La page news-item quant à elle affichera les composants suivants :

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

__Article.service__ va nous permettre d'effectuer une requête pour récupérer la liste des articles ainsi qu'une requête pour récupérer un article par son ID.

__Comment.service__ va quant à lui récupérer les commentaires via l'ID d'un article. Nous pourrions inclure les commentaires avec l'article, mais par soucis de performance, et en cas d'indisponibilité du service, il est préférable de séparer les commentaires d'un article.


## Affichage des news

Nous allons nous concentrer sur le point d'entrée de notre module, à savoir la page "news" et le composant "article-short-display".

Ne pas confondre le module news et la pages news !

![diagramme](https://github.com/high54/start-with-angular/blob/master/docs/page-news.png?raw=true)

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

Je les ai ajouté afin de faciliter la lecture du code quand le module va grossir.

Voici le code TypeScript du composant article-short-display :

/modules/news/components/article-short-display/article-short-display.component.ts
``` typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'news-article-short-display',
    styleUrls: ['article-short-display.component.scss'],
    templateUrl: 'article-short-display.component.html',
    changeDetection:  ChangeDetectionStrategy.OnPush
})
export class NewsArticleShortDisplayComponent {
    constructor() {}
}

```

- Le selector est préfixé par le nom du module "news"
- Le nom de la classe est préfixée par le nom du module "News"
- Le nom de la classe est suffixée par le rôle de la classe "Component"

### index.ts explications

Dans le dossier components nous avons un fichier index.ts qui va importer tous les composants et les exporter en une seule variable. Plutôt pratique pour aérer le fichier news.module.ts.

/modules/news/components/index.ts
``` typescript
import { NewsArticleShortDisplayComponent } from './article-short-display/article-short-display.component';

export const components: any[] = [
    NewsArticleShortDisplayComponent
];

export * from './article-short-display/article-short-display.component';

```

Ainsi nous avons à notre dispositions une constante nommée "components" qui est un tableau avec tous les composants.

### changeDetection:  OnPush
De base Angular met en place une détection des changements qui s'exécute après chaque action utilisateur (par exemple, cliquer sur un bouton). Cela peut vite devenir assez gourmand en ressource sur une grosse application, car toute l'application est scannée afin d'être mise à jour.

Via ```OnPush``` nous indiquons qu'il n'est pas utile d'effectuer une détection des changements après chaque action. Cela indique également que le composant dépend uniquement des données en entrée, et ne doit être vérifié que dans les cas suivants :

1. La référence d'entrée change
	Nous sommes obligé de travailler avec des objets immuables (ou des observables).

2. Un événement provient du composant ou de l'un de ses enfants
	Un composant peut avoir un état interne qui est mis à jour lorsqu'un événement est déclenché par le composant ou l'un de ses enfants.
	
Voyons maintenant la page news :
/modules/news/pages/news/news.component.ts
``` typescript
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

/modules/news/pages/index.ts
``` typescript
import { NewsComponent } from './news/news.component';

export const pages: any[] = [
    NewsComponent
];

export * from './news/news.component';

```


Le service "article" :

/modules/news/services/article.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Models
import { Article } from '../../models/article.interface';
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
     * Récupére tous les articles
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

/modules/news/services/index.ts
``` typescript
import { ArticleService } from './article/article.service';

export const services: any[] = [
    ArticleService
];

export * from './article/article.service';
```

Nous allons avoir besoin d'un modèle de données :

/models/article.interface.ts
``` typescript
export interface Article {
    id?: number;
    title?: string;
    description?: string;
    content?: string;
}

```

### Routes

Nous allons configurer une première route qui va pointer vers notre page "news":

/modules/news/news-routing.module.ts
``` typescript
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
``` typescript
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
``` typescript
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

À partir de maintenant, le module est accessible via la route "news". L'intégralité du module est chargée en mode "lazy-load" afin de maximiser les performances de l'application. Il sera possible de changer la stratégie de chargement plus tard, pour éventuellement pré charger le module.

Si vous souhaitez gagner du temps lors de ce cours, vous pouvez ajouter une route au fichier app-routing.module.ts afin d'afficher directement le module "news" !

/src/app/app-routing.module.ts
``` typescript
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

Actuellement il n'i a pas de contenu, d'ailleurs vous pouvez supprimer le contenu du fichier app.component.html pour ne laisser que la balise router-outlet :

/src/app/app.component.html
``` html

<router-outlet></router-outlet>

```


À ce stade, l'application n'affiche aucune information, cependant, nous avons mis en place toutes l'architecture et nous pouvons à présent nous concentrer sur les fonctionnalités.

Dans un premier temps nous allons ajouter quelques articles à notre "base de données" db.json :

/db.json
``` json
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
http://localhost:3000/articles
```

Si la page ne s'affiche pas, lancer le serveur :
```
json-server --watch db.json
```

Notre service "article.service" est prêt à transmettre les données, nous allons l'utiliser dans notre page "news" :

/modules/news/pages/news/news.components.ts
``` typescript
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

Notre composant implémente OnInit et déclare une nouvelle méthode ngOnInit() afin de respecter le cycle de vie d'Angular.

Nous avons une variable __articles$__ qui n'a pas de modificateur donc elle est public.

__articles$__ est suffixé par le symbole "$". Il s'agit d'une convention de nommage pour facilement identifier les observables.

__articles$__ est initialisé dans la méthode ngOnInit() qui utilise la méthode getArticles() de notre service.

Nous l’utiliserons directement dans le template avec le pipe "async" qui est spécialement dédier aux promesses et aux observables.
L'autre solution consiste à souscrire directement à la méthode getArticles() dans la méthode ngOnInit et d'implémenter le cycle de vie OnDestroy afin de déclarer la méthode ngOnDestroy pour nous désinscrire de getArticles() afin d'éviter des fuites de mémoire.
Mais le pipe "async" est spécialement dédié à cela.


Voyons le template de la page news :

/modules/news/pages/news/news.components.html
``` html
<div class="news">
    <h2>News</h2>
    <news-article-short-display *ngFor="let article of (articles$ | async)" [article]="article">
    </news-article-short-display>
</div>

```

Nous utilisons le selecteur du composant article-short-display et nous effectuons une boucle sur la liste de nos articles via "*ngFor", qui va passer un par un les articles à notre composant article-short-display.
Cela va avoir pour conséquence d'afficher autant de fois le composant article-short-display qu'il y a d'articles.

À ce stade, l'application n'affichera pas encore d'information. Pour pallier à cela nous devons nous occuper du composant :

/modules/news/components/article-short-display/article-short-display.ts
``` typescript
import { Component, Input } from '@angular/core';
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-article-short-display',
    styleUrls: ['article-short-display.component.scss'],
    templateUrl: 'article-short-display.component.html',
})
export class NewsArticleShortDisplayComponent {
    @Input() article: Article;
    constructor() { }
}
```

Il n'y a qu'une chose à mettre en place dans le fichier TS du composant, à savoir un "Input". Celui-ci indique que le composant va recevoir du parent une variable nommé "article" avec un typage via la class "Article".

Dans le fichier HTML de notre page "news", nous avons indiqué [article] c'est le nom de la variable que nous allons récupérer dans le composant article-short-display. Puis nous avons indiqué une valeur à cette variable [article]="article".
Cette valeur, nommé aussi article est l'objet article qui est généré via le ngFor.
Le nom de la valeur à peu d'importance. Nous aurions pu écrire :
```
[article]="toto"
```
Du moment que toto contient un article.

Maintenant, via "Input()", nous disposons de toutes les données d'un article dans notre composant, il est donc temps d'afficher les informations :

/modules/news/components/article-short-display/article-short-display.html
``` html
<div class="article-short-display">
    <h3>{{article.title}}</h3>
    <p>{{article.description}}</p>
</div>

```
Et voilà, nos deux articles s'affichent enfin dans notre application.

Le plus dur jusqu'à présent a été de mettre en place une structure facilement maintenable et évolutive.

L'étape suivante consiste à afficher un article complet dans une autre page, avec l'auteur et les commentaires associé.

## News-item

Dans notre dossier pages, nous allons ajouter un composant news-item :

![diagramme](https://github.com/high54/start-with-angular/blob/master/docs/page%20news-item.png?raw=true)

/modules/news/pages/news-item/news-item.component.ts
``` typescript
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
Dans cette page, nous injection ActivatedRoute que nous utilisons en tant que "route" pour récupérer le paramètre passé à l'URL (l'ID de notre article). Notez bien le paramètre que nous récupérons : "articleId". C'est exactement comme cela qu'il sera nommé dans le fichier news-routing.module.ts que nous modifierons après.
Ainsi, si l'ID est présent alors via le service article nous allons récupérer un article par son ID.
Sinon, on redirige l'utilisateur vers la page de toutes les news.

Comme nous venons d'ajouter un composant dans le dossier pages, il est nécéssaire d'ajouter le composant dans le fichier index.ts :

/modules/news/pages/index.ts
``` typescript
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news-item/news-item.component';

export const pages: any[] = [
    NewsComponent,
    NewsItemComponent
];

export * from './news/news.component';
export * from './news-item/news-item.component';

```

Profitons-en pour ajouter une nouvelle route dans le fichier news-routing.module :

/modules/news/news-routing.module.ts
``` typescript
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

Cette nouvelle route prends dans le "path" une valeur préfixée par deux points ":". Cette valeur correspond à l'ID que nous afficherons sur la page. Le nom de la valeur ici "articleId" est très importante, car c'est via ce nom que nous allons récupérer l'ID.

Enfin, cette route pointe sur notre nouveau composant NewsItemComponent.

Cette page va afficher plusieurs composants, nous allons les mettre en place :
### article-display composant
/modules/news/components/article-dispay/article-display.component.ts
``` typescript
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
Le composant prends en entré (@Input()) un article. Cela va nous permettre d'afficher les informations de l'article dans le template :

/modules/news/components/article-dispay/article-display.component.html
``` html
<div class="article-display">
    <h3>{{article.title}}</h3>
    <p>{{article.content}}</p>
</div>

```
### article-author composant
/modules/news/components/article-author/article-author.component.ts
``` typescript
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
Ici c'est l'auteur qui est passé au composant (@Input() author) afin d'afficher la propriétée "fullName" de l'objet Author :

/modules/news/components/article-author/article-author.component.html
``` html
<div class="article-author">
    <h3>{{author.fullName}}</h3>
</div>

```

/modules/news/components/index.ts
``` typescript
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

Evidemment le fichier index.ts des composants est mis à jour.


Etant donné que nous avons ajouté l'auteur de l'article, nous allons ajouter une interface et modifier l'interface des articles :
### author interface
/modules/news/models/author.interface.ts
``` typescript
export interface Author {
    fullName?: string;
}

```

/modules/news/models/article.interface.ts
``` typescript
import { Author } from './author.interface';

export interface Article {
    id?: number;
    title?: string;
    description?: string;
    content?: string;
    author?: Author;
}

```


### comment interface
Profitons-en pour ajouter l'interface pour les commentaires :

/modules/news/models/comment.interface.ts
``` typescript
import { Author } from './author.interface';

export interface Comment {
    id?: number;
    author?: Author;
    content?: string;
    articleId?: number;
}

```

### article-comments composant
Enfin pour terminer avec les composants, nous pouvons ajouter article-comments :

/modules/news/components/article-comments/article-comments.components.ts
``` typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'news-article-comments',
    styleUrls: ['article-comments.component.scss'],
    templateUrl: 'article-comments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleCommentsComponent {
    @Input() comment: Comment;
    constructor() { }
}


```
article-comments prends en entré un commentaire : ```@Input() comment: Comment``` afin d'afficher les informations dans le template :

/modules/news/components/article-comments/article-comments.components.html
``` html
<div class="article-comments">
    <h4>{{comment.author}}</h4>
    <p>{{comment.content}}</p>
</div>
```
Le fichier index.ts mise à jour avec notre nouveau composant :

/modules/news/components/index.ts
``` typescript
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
### comment service
Afin de récupérer les commentaires, nous allons avoir besoin d'un service :

/modules/news/services/comment/comment.service.ts
``` typescript
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

    getCommentsByArticle(articleId: number): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments?articleId=${articleId}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    getComments(): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments?isModerate=false`)
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
C'est un service assez standard, il permet d'effectuer un CRUD complet sur les commentaires via des requêtes HTTP.

Le fichier index.ts des services :

/modules/news/services/index.ts
``` typescript
import { ArticleService } from './article/article.service';
import { CommentService } from './comment/comment.service';
export const services: any[] = [
    ArticleService,
    CommentService
];

export * from './article/article.service';
export * from './comment/comment.service';

```

### DB.JSON

Nous pouvons dès à présent modifier notre base de données afin d'y inclure des commentaires :

db.json
``` json
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


Maintenant que nous avons mis en place de quoi récupérer les commentaires, il serait bon d'afficher notre article avec l'auteur et les commentaires.

Nous allons modifier la page news-item pour faire appel à nos composants :

/modules/news/pages/news-item.component.ts
``` typescript
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
            this.comments$ = this.commentService.getCommentsByArticle(this.route.snapshot.params.articleId);
        } else {
            this.router.navigate(['../']);
        }
    }
}


```

Ici nous utilisons le service des commentaires afin de les récupérer.

/modules/news/pages/news-item.component.html
``` html
<div class="news-item">
    <div *ngIf="article$ | async as article">
        <news-article-display [article]="article"></news-article-display>
        <news-article-author [author]="article?.author"></news-article-author>
    </div>
    <news-article-comments *ngFor="let comment of (comments$ | async)" [comment]="comment">
    </news-article-comments>
</div>

```

Dans le template nous ajoutons une div avec un "*ngIf" afin de vérifier la présence des données asynchrone avant de les transmettre aux différents composants.

### Comment-form

Nous allons ajouter un formulaire pour permettre aux utilisateurs de laisser des commentaires sur un article.

/modules/news/components/comment-form/comment-form.component.ts
``` typescript

import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
// Rxjs
import { Subscription } from 'rxjs';
// Services
import { CommentService } from '../../services';
// Models
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'news-comment-form',
    styleUrls: ['comment-form.component.scss'],
    templateUrl: 'comment-form.component.html',
})
export class NewsCommentFormComponent implements OnDestroy {
    @Input() articleId: number;
    postCommentSubscription: Subscription;
    // Affiche le formulaire ou un message
    isCommented = false;
    commentForm = this.fb.group({
        username: ['', Validators],
        comment: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private commentService: CommentService
    ) { }

    /**
     * Demande au service "CommentService" d'ajouter un commentaire
     * @param form Formulaire du template HTML
     */
    postComment(form: FormGroup): void {
        const { valid, value } = form;
        if (valid) {
            // Objet Comment construit à partir des données du formulaire et de l'ID de l'article.
            const comment: Comment = {
                author: {
                    fullName: value.username
                },
                content: value.comment,
                articleId: this.articleId,
                isModerate: false
            };
            this.postCommentSubscription = this.commentService.createComment(comment).subscribe((reateCommentResp) => {
                this.commentForm.reset();
                this.isCommented = true;
            }, (err) => {
                window.confirm(err);
            });
        } else {
            window.confirm('Les champs sont obligatoires.');
        }
    }

    /**
     * On Destroy, désinscription pour éviter toutes fuites de mémoires.
     */
    ngOnDestroy(): void {
        if (this.postCommentSubscription) {
            this.postCommentSubscription.unsubscribe();
        }
    }

    /**
     * Getter pour la validation visuel du formulaire.
     * Permet d'accéder aux propriétés des champs.
     */
    get username(): AbstractControl {
        return this.commentForm.get('username');
    }
    get comment(): AbstractControl {
        return this.commentForm.get('comment');
    }
}

```

Comment-form prend en entré l'ID de l'article afin de relier le commentaire à l'article une fois posté.
Le formulaire prend en paramètre le pseudo de l'utilisateur ainsi que le message.
Plus tard nous mettrons en place l'authentification afin d'autocompléter directement le champ pseudo.


/modules/news/components/comment-form/comment-form.component.html
``` html
<div class="comment-form">
    <h3>Ajouter un commentaire</h3>

    <div role="alert" *ngIf="isCommented">
           Commentaire ajouté ! 
           Il sera soumis à modération avant d'être affiché.
    </div>

    <form [formGroup]="commentForm" *ngIf="!isCommented">

            <label for="usernameId">
                Username*
            </label>
            <input type="text" id="usernameId" formControlName="username" required>
            <div role="alert"
                *ngIf="(username.dirty || username.touched) && username.invalid && username.errors.required ">
                Votre pseudo est requis.
            </div>


            <label for="commentId">
                Commentaire*
            </label>
            <textarea type="text" id="commentId" formControlName="comment" required> </textarea>
            <div role="alert"
                *ngIf="(comment.dirty || comment.touched) && comment.invalid && comment.errors.required ">
                Le commentaire ne peut être vide.
            </div>
        <button type="button" (click)="postComment(commentForm)">Envoyer</button>

    </form>
</div>

```



Il ne manque plus qu'une chose pour pouvoir accéder à un article via son ID. Cependant vous pouvez y accéder directement via la barre d'adresse du navigateur en ajoutant "/1" à l'URL.

Dans le point d'entrée du module, à savoir la page "news", il nous faut ajouter un lien vers l'article complet. Le composant article-short-display étant dédié à l'affichage des articles dans la page "news", c'est dans son template que nous ajoutons le lien :

/modules/news/components/article-short-display/article-short-display.component.html
``` html
<div class="article-short-display">
    <h3>{{article.title}}</h3>
    <p>{{article.description}}</p>
    <a routerLink="{{article.id}}">Lire plus...</a>
</div>

```

Maintenant vous devriez pouvoir y accéder facilement. Mais il serait bon d'ajouter un lien pour revenir à l'accueil du module. Cette fois ci nous allons placer le lien directement dans la page "news-item".

/modules/news/pages/news-item/news-item.component.html
``` html
<div class="news-item">
    <a routerLink="../">Retour</a>
    <div *ngIf="article$ | async as article">
        <news-article-display [article]="article"></news-article-display>
        <news-comment-form [articleId]="article?.id"></news-comment-form>
        <news-article-author [author]="article?.author"></news-article-author>
    </div>
    <news-article-comments *ngFor="let comment of (comments$ | async)" [comment]="comment">
    </news-article-comments>
</div>

```

De cette manière vous devriez pouvoir naviguer sans problème.

## ng-content

Actuellement vous avez découvert les bases d'Angular de manière avancée, mais le module reste simple.
Dans ce chapitre nous allons mettre en place un ng-content afin de placer le bouton retour de façon personnalisé.

/modules/news/pages/news-item/news-item.component.html
``` html
<div class="news-item">
    <div *ngIf="article$ | async as article">
        <news-article-display [article]="article">
            <a routerLink="../">Retour</a>
        </news-article-display>
        <news-article-author [author]="article?.author"></news-article-author>
    </div>
    <news-article-comments *ngFor="let comment of (comments$ | async)" [comment]="comment">
    </news-article-comments>
</div>

```

J'ai mis la balise ```<a></a>``` entre le sélecteur du composant ```<news-article-display> </news-article-display>```.
Si vous vous rendez sur la page : ```http://localhost:4200/news/1``` le lien de retour n'apparait plus.

Pour remédier à cela, il suffit de placer dans le composant article-display une balise ng-content :

/modules/news/components/article-display/article-display.component.html
``` html
<div class="article-display">
    <ng-content></ng-content>
    <h2>{{article.title}}</h2>
    <p>{{article.content}}</p>
</div>
```
Voilà, notre lien refait surface ! Et il est possible de le placer un peu ou bon nous semble via la balise ng-content.
Cependant imaginons que je souhaite passer plusieurs balises dans le composant, ils seront tous placer à l'endroit de la balise ng-content.

### ng-content et son sélecteur

La balise ng-content dispose elle aussi d'un sélecteur :

``` html
<ng-content select="a"></ng-content>
```
Ainsi dans cet exemple, je vais pouvoir sélectionner une balise "a" pour l'afficher.

Le sélecteur de ng-content permet de sélectionner toutes les balises HTML, les class CSS, les ID ainsi que d'autre composant.

Autant en profiter et placer le ng-content sous le titre de l'article :

/modules/news/components/article-display/article-display.component.html
``` html
<div class="article-display">
    <h2>{{article.title}}</h2>
    <ng-content select="a"></ng-content>
    <p>{{article.content}}</p>
</div>
```

## Pipes

Un pipe permet de transformer des données, il ne s'occupe pas du DOM. Jusqu'à présent nous avons utilisé le pipe "async", mais pourquoi ne pas mettre en place un pipe pour filtrer les commentaires.

Dans le dossier pipes du module news :

/modules/news/pipes/comment-filter/comment-filter.pipe.ts
``` typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'commentFilter'
})
export class CommentFilterPipe implements PipeTransform {
    transform(value: any) {
        return value.replace(new RegExp('Andouille'), '*$ù^"@&-"');
    }
}

```

Le pipe est plutôt simple,  il va remplacer dans une valeur donnée, ici le mot "Andouille" par une chaine de caractères.


/modules/news/pipes/index.ts
``` typescript
import { CommentFilterPipe } from './comment-filter/comment-filter.pipe';

export const pipes: any[] = [
    CommentFilterPipe
];

export * from './comment-filter/comment-filter.pipe';

```

/modules/news/news.modules.ts
``` typescript
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

// Pipes
import * as fromPipes from './pipes';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NewsRoutingModule
    ],
    declarations: [
        ...fromPages.pages,
        ...fromComponents.components,
        ...fromPipes.pipes
    ],
    providers: [
        ...fromServices.services
    ]
})
export class NewsModule { }

```

Maintenant que le pipe est configuré ainsi que déclaré nous pouvons l'utiliser :

/modules/news/components/article-comments/article-comments.component.html
``` html
<div class="article-comments">
    <h4>{{comment.author.fullName}}</h4>
    <p>{{comment.content | commentFilter}}</p>
</div>
```

Pour tester le pipe, il suffit d'ajouter le mot "Andouille" dans le contenu d'un commentaire du fichier db.json

``` json
        {
            "id":1,
            "author":{
                "fullName":"Author 3"
            },
            "content":"Contenu du commentaire 1, Andouille !",
            "articleId":1
        }
```

## Directives

Une directive contrairement à un pipe permet de modifier le DOM. Nous allons utiliser l'exemple présent sur la documentation officiel d'Angular afin d'ajouter une directive qui va permettre de mettre en surbrillance l'auteur d'un article.

Dans le dossiers directives du modules news :

/modules/news/directives/highlight/highlight.directive.ts
``` typescript
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[newsHighlight]'
})
export class HighlightDirective {
    constructor(
        private el: ElementRef
    ) { }
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

```

Ainsi nous avons déclaré une directive qui une fois placée sur une balise va définir le background-color de cette dernière suite à un survole.

ElementRef va récupérer l'élément sur lequel effectuer la transformation, nous pouvons donc interagir avec le DOM.
@HostListener ce décorateur vous permet de vous abonner aux événements de l'élément DOM qui héberge la directive. Dans notre cas nous nous abonnons aux événement mouse enter et mouse leave.

Ainsi quand l'utilisateur va passer la souris sur l'auteur de l'article, l'événement vat être déclenché. De même quand la souris quittera la zone du nom de l'auteur.


Pour que cette directive soit opérationnelle il nous reste deux étapes :
- Déclarer la directive dans le module
- Utiliser la directive dans le composant

Pour déclarer la directive, nous utilisons encore un fichier index.ts. Cela n'est pas forcément utile quand il y a peu d'élément mais c'est une bonne pratique à prendre. Vous l'avez certainement déjà remarqué, mais le fichier news.module.ts est facilement lisible.


/modules/news/directives/index.ts
``` typescript

import { HighlightDirective } from './highlight/highlight.directive';

export const directives: any[] = [
    HighlightDirective
];

export * from './highlight/highlight.directive';

```

/modules/news/news.module.ts
``` typescript
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

// Pipes
import * as fromPipes from './pipes';

// Directives
import * as fromDirectives from './directives';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NewsRoutingModule
    ],
    declarations: [
        ...fromPages.pages,
        ...fromComponents.components,
        ...fromPipes.pipes,
        ...fromDirectives.directives
    ],
    providers: [
        ...fromServices.services
    ]
})
export class NewsModule { }

``` 


Deuxième étape, utiliser la directive :

/modules/news/components/article-author/article-author.component.html
``` html
<div class="article-author">
    <h3>Write by <span newsHighlight>{{author.fullName}}</span></h3>
</div>

```

Nous pourrions imaginer une utilisation plus poussée comme par exemple, coupler la directive avec un service qui permettrais d'ajouter des liens dans un texte en fonction de certains mots qui pointerais sur d'autres articles en liens avec ces mots clés.


## Resolver

Vous avez peut-être remarqué un effet de scintillement lors du chargement d'une page. Les données, et la page s'effectue après quelques secondes, très courte, mais tout de même visible.

Cette effet de scintillement est dû à la récupération des données directement dans le composant. Etant données que nous appelons notre service à l'initialisation du composant et que les données proviennent d'une API, l'affichage s'effectue après un petit temps de latence. Dans un cas réel, les données affichées peuvent mettre encore plus de temps selon le temps de réponse de notre API.

Pour pallier ce problème nous allons mettre en place des resolvers.

### Qu'est ce qu'un Resolver ?
Un resolver est un provider qui va être rattaché à une route afin de charger les données avant l'appelle du composant.

![diagramme](https://github.com/high54/start-with-angular/blob/master/docs/without-resolve.png?raw=true)

Actuellement quand on clique sur une route, Angular va regarder le composant correspondant à la route et l'instancier, puis via ngOninit, nous faisons appelle à notre service. De ce fait, le premier rendu du template s'effectue avec une liste ou une valeur vide. 
Avec le resolver attaché à la route, nous indiquons de faire patienter l'utilisateur pendant le chargement des données.

Le Resolver permet d'attendre le retour d'un observable avant l'initialisation ou la mise à jour d'un composant.

![diagramme](https://github.com/high54/start-with-angular/blob/master/docs/with-resolve.png?raw=true)

### ArtileListResolver

Le premier Resolver que nous allons mettre en place pour notre application est celui qui va s'occuper de la liste des articles.

/modules/news/resolvers/article/article-list.resolver.ts
``` typescript
import { Injectable } from '@angular/core';
import { Article } from '../../models/article.interface';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services';

@Injectable()
export class ArticleListResolver implements Resolve<Article[]> {
    constructor(
        private articleService: ArticleService
    ) { }

    resolve(): Observable<Article[]> {
        return this.articleService.getArticles();
    }
}


```

/modules/news/resolvers/index.ts
``` typescript
import { ArticleListResolver } from './article/article-list.resolver';

export const resolvers: any[] = [
    ArticleListResolver
];


export * from './article/article-list.resolver';


```


Simple et efficace, il utilise simplement notre service ```ArticleService``` pour retourner un ```Observable``` avec la liste des articles.

Afin de pouvoir l'utiliser il nous faut d'abord modifier la route, puis le composant qui affiche les articles sans oublier de le déclarer dans notre NgModule :

/modules/news/news-routing.module.ts
``` typescript
// routes
export const routes: Routes = [
{
    ...
    
  {
    path: '',
    component: fromPages.NewsComponent,
    resolve: {
      articles: fromResolvers.ArticleListResolver
    }
  }
}

  ```

  Comme vous pouvez le constater notre route prendre un paramètre ```resolve``` qui prends un objet composé d'une clé qui nous servira pour récupérer nos données et du resolver en valeur.

/modules/news/news.module.ts
``` typescript
...

// Resolvers
import * as fromResolvers from './resolvers';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NewsRoutingModule
    ],
    declarations: [
        ...fromPages.pages,
        ...fromComponents.components,
        ...fromPipes.pipes,
        ...fromDirectives.directives
    ],
    providers: [
        ...fromServices.services,
        ...fromResolvers.resolvers
    ]
})
export class NewsModule { }
```

/modules/news/pages/news/news.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.articles$ = this.route.data.pipe(map((data: { articles: Article[] }) => data.articles));
    }
}

```

Ainsi nous avons retiré le service du composant pour déplacer la récupération de données dans le Resolver d'Angular. Il n'i a pas de changement brutal, nous passons d'un observable à un autre. Mais cette fois-ci nous passons par la route pour les données.


### ArticleResolver

Nous allons renouveller l'opération pour l'affichage d'un article.

/modules/news/resolvers/article.resolver.ts
``` typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Article } from '../../models/article.interface';
import { ArticleService, CommentService } from '../../services';
import { Comment } from '../../models/comment.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleResolver implements Resolve<{ article: Article, comments: Comment[] }> {
    constructor(
        private articleService: ArticleService,
        private commentService: CommentService
    ) { }

    /**
     * Retourne un observable contenant un article et les commentaires lié à l'article
     * @param route ActivatedRouteSnapshot
     */
    resolve(route: ActivatedRouteSnapshot): Observable<{ article: Article, comments: Comment[] }> {
        const articleId = parseInt(route.paramMap.get('articleId'), 10);
        // forkJoin permet d'attendre la résolution des deux traitement asynchrone, puis les retournes en un seul objet
        return forkJoin(this.articleService.getArticle(articleId), this.commentService.getCommentsByArticle(articleId))
            .pipe(map(([article, comments]) => {
                return { article, comments };
            }));
    }
}


```

Cette fois-ci nous utilisons le resolver pour retourner l'article par son ID mais également les commentaires associés à l'article.
```forkJoin``` nous permet de d'attendre que tous les observables sont terminé et de retourner les dernières valeurs émissent.

Il est possible d'utiliser plusieurs resolver mais c'est plus efficace dans notre cas de récupérer tout en même temps.
Par soucis de confort utilisateur vous pourriez les séparer afin de charger en priorité l'article puis les commentaires séparément.

/modules/news/resolvers/index.ts
``` typescript
import { ArticleListResolver } from './article/article-list.resolver';
import { ArticleResolver } from './article/article.resolver';
export const resolvers: any[] = [
    ArticleListResolver,
    ArticleResolver
];


export * from './article/article-list.resolver';
export * from './article/article.resolver';

```


/modules/news/news-routing.module.ts
``` typescript
 {
    path: ':articleId',
    component: fromPages.NewsItemComponent,
    resolve: {
      article_comments: fromResolvers.ArticleResolver
    }
```

/modules/news/pages/news-item/news-item.component.ts
``` typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import {Subscription } from 'rxjs';
// Models
import { Article } from '../../models/article.interface';
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'app-news-item',
    styleUrls: ['news-item.component.scss'],
    templateUrl: 'news-item.component.html',
})
export class NewsItemComponent implements OnInit, OnDestroy {
    article$: Subscription;
    article: Article;
    comments: Comment[];
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    /**
     * Récupére l'article et les commentaires lié à l'article depuis la route
     * Sinon redirige vers la page d'accueil
     */
    ngOnInit(): void {
        if (this.route.snapshot.params.articleId) {
            this.article$ = this.route.data.subscribe((data: { article_comments: { article: Article, comments: Comment[] } }) => {
                const { article, comments } = data.article_comments;
                this.article = article;
                this.comments = comments;
            });
        } else {
            this.router.navigate(['../']);
        }
    }

    /**
     * On Destroy, désinscription de l'observable pour éviter les fuites mémoires.
     */
    ngOnDestroy(): void {
        this.article$.unsubscribe();
    }
}

```

Fini les services dans la page news-item. Le ```if``` présent dans la méthode ```ngOnInit()``` est présent pour la décoration, normalement l'utilisateur ne devrait jamais passer par le ```else```. Cependant sécurité maximum !




## Faisons le point sur notre application.
Actuellement, il est possible de visualiser l'ensemble des articles, d'afficher un article par son ID avec les commentaires et l'auteur. Si nous survolons le nom de l'auteur, il passe en surbrillance. Concernant les commentaires, un filtre est en place pour censurer.

Nous avons mis en place des pages, qui utilise des composants, des pipes, une directive, des routes, ainsi que des services.

Pour aller plus loin et enfin pouvoir mettre en place des guards, nous allons ajouter une partie administration.
Mais également la possibilité d'ajouter des commentaires à une news via un formulaire. Ce qui va nous permettre d'ajouter une section dans l'administration pour modérer les commentaires.



## News Administration

Cette administration va nous permettre d'ajouter, afficher, modifier ou supprimer un article (un CRUD).

![diagramme](https://github.com/high54/start-with-angular/blob/master/docs/page-news-admin.png?raw=true)

Le point d'entrée de l'administration sera situé dans le dossier pages/news-admin. Cette page est préfixée par "news" pour bien différencié des autres pages d'administration que l'application pourrait contenir.

- modules
    - news
        - pages
            - news-admin

news-admin affichera en premier la liste des articles dans un tableau avec des boutons pour effectuer les actions de suppression et d'édition. Un menu sera présent pour accéder aux fonctionnalités :
- Modérer les commentaires
- Gérer les articles


Nous allons utiliser un router-outlet auxiliaire afin de ne jamais avoir besoin de quitter la page news-admin pour effectuer toutes les opérations.

/modules/news/pages/news-admin/news-admin.component.html
``` html
<div class="news-admin">
    <div class="nav">
        <a [routerLink]="[{ outlets: { newsAdmin: ['moderate-comments'] } }]">Modérer les commentaires</a>
        <a [routerLink]="[{ outlets: { newsAdmin: ['manage-articles'] } }]">Gérer les articles</a>
    </div>
    <router-outler name="newsAdmin"></router-outler>
</div>

```

## Gestion des articles

Dans un premier temps nous allons mettre en place un composant pour afficher dans un tableau les articles et ainsi avoir une vue d'ensemble. Il nous sera possible d'accéder au formulaire d'ajout ou d'édition ainsi que de supprimer un article via des boutons.

### manage-articles component
/modules/news/components/manage-articles/manage-articles.component.ts
``` typescript
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

// Rxjs
import { Observable } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-manage-article',
    styleUrls: ['manage-article.component.scss'],
    templateUrl: 'manage-article.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsManageArticlesComponent implements OnInit {
    articles$: Observable<Article[]>;
    constructor(
        private articleService: ArticleService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }
    /**
     * Fait référence à la méthode qui utilise ArticleService
     */
    ngOnInit(): void {
        this.fetchData();
    }
    /**
     * Redirige l'utilisateur sur le composant "article-form"
     */
    addArticle(): void {
        this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['article-form'] } }]);
    }
    /**
     * Redirige l'utilisateur sur le composant "article-form" avec l'ID de l'article à modifier
     * @param article Article Object
     */
    editArticle(article: Article): void {
        this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['article-form', article.id] } }]);

    }

    /**
     * Effectue une demande de confirmation avant de supprimer un article.
     * Utilise le service ArticleService pour effectuer une requête HTTP à l'API
     * @param article Article object
     */
    removeArticle(article: Article): void {
        const remove = window.confirm(`Êtes-vous sur de vouloir supprimer l'article ?`);
        if (remove) {
            this.articleService.removeArticle(article).toPromise().then((removeArticleResponse) => {
                this.fetchData();
            }, (removeArticleRej) => {
                window.confirm(removeArticleRej);
            });
        }
    }
    /**
     * Utilise ArticleService pour récupérer les articles
     */
    private fetchData(): void {
        this.articles$ = this.articleService.getArticles();
        this.cdr.detectChanges();
    }

}


```

Ici nous avons les opérations Ajouter, Modifier et Supprimer. L'affichage s'effectue directement dans le template, sans traitement préalable.

L'utilisation du service ArticleService ne s'effectue pas directement dans ngOnInit, le service est utilisé dans une méthode fetchData qui doit être réutilisé plus tard lors de la suppression d'un article afin de mettre à jour la liste.

```addArticle(): void ``` Utilise la navigation afin d'afficher le composant article-form dans le router-outlet auxiliaire.
Ainsi l'utilisateur ne quitte jamais la page d'administration pour effectuer toutes les opérations.


```editArticle(article: Article): void ``` Comme la méthode précédente, nous utilisons la navigation pour afficher le composant article-form sur le router-outler auxiliaire. La particularité ici, est la présence d'un paramètre, l'ID de l'article qui sera modifié.


```removeArticle(article: Article): void``` Effectue dans un premier temps une demande de confirmation, puis dans un second temps, si la demande de confirmation a été validé, supprime l'article passé en paramètre. Tout comme ```ngOnInit()``` nous utilisons la méthode ```fetchData(): void``` afin de récupérer la liste des articles une fois mise à jour.
Nous pourrions effectuer un traitement sur la liste des articles déjà présent pour retirer l'article supprimer, mais nous travaillons à flux tendu en asynchrone avec les données.

```private fetchData(): void``` C'est ici que nous utilisons ArticleService pour récupérer la liste de nos articles.
Etant donné que nous avons défini ```changeDetection``` à ```onPush``` il est important d'indiquer à Angular d'effectuer une détection des changements lorsque nous mettons à jours les données. C'est via la méthode ```detectChanges()``` de ```ChangeDetectoRef``` que nous effectuons la mise à jour du composant.


/modules/news/components/manage-articles/manage-articles.component.html
``` html
<div class="manage-article">
    <h3>Gestion des articles</h3>
    <button type="button" (click)="addArticle()">Ajouter un article</button>
    <table>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Edition</th>
                <th>Suppression</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let article of (articles$ | async)">
                <td>
                    {{article.title}}
                </td>
                <td>
                    {{article.author.fullName}}
                </td>
                <td>
                    <button type="button" (click)="editArticle(article)">
                        Editer
                    </button>
                </td>
                <td>
                    <button type="button" (click)="removeArticle(article)">
                        Supprimer
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### article-form

Afin de gérer l'ajout et l'édition d'un article nous devons mettre en place un formulaire :

/modules/news/components/article-form/article-form.component.ts
``` typescript
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import { Observable, Subscriber, Subscription } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';
@Component({
    selector: 'news-article-form',
    styleUrls: ['article-form.component.scss'],
    templateUrl: 'article-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleFormComponent implements OnInit, OnDestroy {
    // Champs du formulaire disponible dans le template
    articleForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        content: ['', Validators.required]
    });
    title = `Ajouter un article`;
    article$: Subscription;

    private isEdit = false;
    private article: Article;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private articleService: ArticleService
    ) { }
    
    /**
     * Si un ID est passé en paramètre, alors il s'agit de l'édition d'un article
     * Dans ce cas, nous modifions le titre du composant et via le service des articles nous allons récupérer les données.
     * Puis nous ajoutons les données de l'article au formulaire via patchValue.
     */
    ngOnInit(): void {
        if (this.route.snapshot.params.articleId) {
            this.isEdit = true;
            this.title = `Modifier un article`;
            this.article$ = this.articleService.getArticle(this.route.snapshot.params.articleId).subscribe(articleRes => {
                this.article = articleRes;
                this.articleForm.patchValue(articleRes);
            });
        }
    }
    /**
     * Pour éviter les fuites de mémoires, s'il s'agit de l'édition d'un article
     * nous effectuons une désinscription
     */
    ngOnDestroy(): void {
        if (this.isEdit) {
            this.article$.unsubscribe();
        }
    }

    /**
     * S'il s'agit de l'édition' d'un article, nous demandons au service de mettre à jour l'article.
     * En cas de réussite, l'utilisateur est redirigé vers la liste des articles à l'accueil de l'administration des news
     * 
     * S'il s'agit de l'ajout d'un article, nous demandons au service de l'ajouter.
     * En cas de réussite, l'utilisateur est également redirigé vers la liste des articles
     * 
     * En cas d'échec dans les deux cas, une fenêtre s'affiche pour indiquer l'erreur.
     * 
     * @param form Données du formulaire présent dans le template
     */
    addOrEditArticle(form: FormControl): void {
        const { valid, value } = form;
        if (valid) {
            if (this.isEdit) {
                this.articleService.updateArticle({ ...this.article, ...value }).toPromise().then((updateArticleRes) => {
                    this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['manage-articles'] } }]);
                }, (updateArticleRej) => {
                    window.confirm(updateArticleRej);
                });
            } else {
                value.author = {
                    fullName: 'Author N'
                };
                this.articleService.createArticle(value).toPromise().then((createArticleRes) => {
                    this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['manage-articles'] } }]);
                }, (createArticleRej) => {
                    window.confirm(createArticleRej);
                });
            }
        } else {
            window.confirm(`Veuillez compléter l'intégralité du formulaire.`);
        }
    }
}
```

/modules/news/components/article-form/article-form.component.html
``` html
<div class="article-form">
    <h3>{{title}}</h3>
    <form [formGroup]="articleForm">
        <label> Titre
            <input type="text" formControlName="title">
        </label>
        <label>Description
            <textarea formControlName="description"></textarea>
        </label>
        <label>Contenu
            <textarea formControlName="content"></textarea>
        </label>
        <button type="button" (click)="addOrEditArticle(articleForm)">Enregistrer</button>
    </form>
</div>

```


Dans ce composant nous affichons un formulaire qui sera autocomplété en cas d'édition d'un article.
Si le formulaire est valide, nous utilisons soit la méthode ```createArticle()``` en cas d'ajout ou soit ```updateArticle()``` en cas d'édition.

Cette fois-ci nous mettons en place les cycles de vie ```OnInit``` et ```OnDestroy``` car en cas d'édition d'un article nous devons souscrire à notre service afin de remplir les champs du formulaire. Donc il est important de si désinscrire afin d'éviter toutes fuites de mémoires.




## Gestion des commentaires

Afin de modérer les commentaires lié à nos articles, nous allons mettre en place une page qui va lister les commentaires.
Pour déterminer si un commentaire à déjà était modéré, il est nécéssaire de modifier nos données en base ainsi que le modèle des commentaires :


/modules/news/models/comment.interface.ts
``` typescript
import { Author } from './author.interface';

export interface Comment {
    id?: number;
    author?: Author;
    content?: string;
    articleId?: number;
    isModerate?: boolean;
}

```


/db.json
``` json
{
  "articles": [
    {
      "id": 1,
      "title": "Première news",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "content": "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam",
      "author": {
        "fullName": "Author 1"
      }
    },
    {
      "id": 2,
      "title": "Seconde news",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "content": "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam",
      "author": {
        "fullName": "Author 2"
      }
    },
    {
      "title": "titre 1",
      "description": "description",
      "content": "contenu",
      "author": {
        "fullName": "Author N"
      },
      "id": 3
    }
  ],
  "comments": [
    {
      "id": 1,
      "author": {
        "fullName": "Author 3"
      },
      "content": "Contenu du commentaire 1, Andouille !",
      "articleId": 1,
      "isModerate":false
    },
    {
      "id": 2,
      "author": {
        "fullName": "Author 3"
      },
      "content": "Contenu du commentaire 2",
      "articleId": 2,
      "isModerate":false
    },
    {
      "id": 3,
      "author": {
        "fullName": "Author 4"
      },
      "content": "Contenu du commentaire 3",
      "articleId": 1,
      "isModerate":false
    },
    {
      "id": 4,
      "author": {
        "fullName": "Author 4"
      },
      "content": "Contenu du commentaire 4",
      "articleId": 2,
      "isModerate":false
    }
  ]
}

```

### moderate-comments

/modules/news/components/moderate-comments/moderate-comments.component.ts
``` typescript
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommentService } from '../../services';
import { Subscription, Observable } from 'rxjs';
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'news-moderate-comments',
    styleUrls: ['moderate-comments.component.scss'],
    templateUrl: 'moderate-comments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModerateCommentsComponent implements OnInit {
    comments$: Observable<Comment[]>;
    constructor(
        private commentService: CommentService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.fetchData();
    }
    /**
     * Valide ou supprime un commentaire
     * @param comment Commentaire à valider ou supprimer
     * @param isValid boolean, True si commentaire à valider, False si commentaire à supprimer
     */
    moderateComment(comment: Comment, isValid: boolean): void {
        if (isValid) {
            comment.isModerate = isValid;
            this.commentService.updateComment(comment).toPromise().then((updateCommentResolve) => {
                this.fetchData();
            }, (updateCommentReject) => {
                window.confirm(updateCommentReject);
            });
        } else {
            this.commentService.removeComment(comment).toPromise().then((removeCommentResolve) => {
                this.fetchData();
            }, (removeCommentReject) => {
                window.confirm(removeCommentReject);
            });
        }
    }

    /**
     * Récupérer depuis le service des commentaires la liste des commentaires qui n'ont pas été modéré
     * puis lance une détéction des changements sur le composant
     */
    private fetchData(): void {
        this.comments$ = this.commentService.getComments();
        this.cdr.detectChanges();
    }
}

```

/modules/news/components/moderate-comments/moderate-comments.component.html
``` html
<div class="moderate-comments">
    <div class="comment-card" *ngFor="let comment of (comments$ | async)">
        <div class="actions">
            <button type="button" (click)="moderateComment(comment, true)">Valider</button>
            <button type="button" (click)="moderateComment(comment, false)">Refuser</button>
            <p>{{ comment.content }}</p>
            <span>{{ comment.author.fullName }}</span>
        </div>
    </div>
</div>

```

Maintenant que nous avons mis en place la modération des commentaires, nous pouvons l'utiliser dans le composant qui les affichent. Pour ce faire nous allons modifier le service des commentaires :

/modules/news/services/comment.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Models
import { Comment } from '../../models/comment.interface';

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

    getCommentsByArticle(articleId: number): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments?articleId=${articleId}&isModerate=true`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    getComments(): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments?isModerate=false`)
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

Nous avons simplement modifié la méthode ```getCommentsByArticle(articleId: number)``` pour ajouter à l'URL de la requête ```isModerate=true```.

Ainsi, les commentaires que ne sont pas validé, ne sont pas affiché sur la page d'un article.




Nous avons donc la possibilité d'ajouter/modifier ou supprimer des articles, ainsi que modérer les commentaires.

La page d'administration est donc terminée pour le moment.


Seulement voila, actuellement les auteurs sont spécifié directement dans le code. De plus n'importe qui peut accèder à la page d'administration du module.

Il est donc temps de mettre en place l'authentification ainsi que les guards.

## Core

Afin de connecter nos différents modules entre eux, nous allons mettre en place le coeur de l'application.
Le core va servire de liant entre nos modules, mais va également servir à mettre en place la navigation et le header qui seront commun. Dans un sens, ces bloques (navigation, authentification, header, etc..) sont globalement basique à quelques exception prés. De plus nous les retrouvons dans chaque application.

Vous pouvez dès à présent ajouter un dossier dans "app" nommé "core" :

- src
    - app
        - core



### Gestion des erreurs

Plusieurs possibilités concernant les erreurs :
- L'utilisateur essaie d'accéder à une URL incorrect
- Une requête HTTP(S) retourne un code erreur (404, 500 ...)
- Le code génère une erreur

Dasn tous les cas l'utilisateur ne devra pas être bloqué, de plus il sera bon de l'informer

La page 404 est un élément important pour ne pas frustrer l'utilisateur lors de sa navigation.
Chaque fois que l'URL ne correspondra pas à une route de l'application, l'utilisateur sera automatiquement redirigé vers la page 404.

Dans le dossier core nous allons ajouter le module "not-found" :
- src
    - app
        - core
            - not-found

Il s'agit d'un module, comme "news". Cependant, il est bien moins complexe. À l'inverse du module "news", il est un élément indispensable de chaque application. C'est un module commun que l'on retrouvera dans toutes les applications.

Voici la structure de ```not-found```

- not-found
    - pages
        - not-found
            - not-found.component.html
            - not-found.component.scss
            - not-found.component.ts
    index.ts
not-found-routing.module.ts
not-found.module.ts

/not-found/pages/not-found/not-found.component.html
``` html
<div class="no-found">
  <h2>Page introuvable !</h2>
  <a routerLink=''>Retour à l'accueil</a>
</div>
```

/not-found/pages/not-found/not-found.component.ts
``` typescript
import { Component } from "@angular/core";

@Component({
    selector: 'not-found',
    templateUrl: 'not-found.component.html',
    styleUrls: ['not-found.component.scss']
})
export class NotFoundComponent {
    constructor() { }
}
```

/not-found/pages/index.ts
``` typescript
import { NotFoundComponent } from './not-found/not-found.component';

export const pages: any[] = [
    NotFoundComponent
];

export * from './not-found/not-found.component';

```

/not-found/not-found-routing.module.ts
``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import * as fromPages from './pages';

const routes: Routes = [
  {
    path: '**',
    component: fromPages.NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }

```

/not-found/not-found.module.ts
``` typescript
import { NgModule } from "@angular/core";

// Pages
import * as fromPages from './pages';

// Routes
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
    imports: [
        NotFoundRoutingModule
    ],
    declarations: [
        ...fromPages.pages
    ]
})
export class NotFoundModule { }

```


Afin de connecter ```not-found``` au reste de l'application, il est essentiel d'ajouter une route dans le fichier app-routing.module.ts


/app/app-routing.module.ts
``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'news' },
  {
    path: 'news',
    loadChildren: './modules/news/news.module#NewsModule',
  },
  {
    path: 'authentication',
    loadChildren: './core/auth/auth.module#AuthModule'
  },
  {
    path: '**',
    loadChildren: './core/not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```


``` 
  {
    path: '**',
    loadChildren: './core/not-found/not-found.module#NotFoundModule'
  }
```

Cette route est un peu particulière. Elle est utilisée comme joker par le routeur si l'URL demandée ne correspond à aucune des routes. Ainsi l'utilisateur est redirigé vers le composant ou la route de notre choix. À noter qu'ici l'application ne retournera pas le code erreur 404 au navigateur. Il faudra mettre en place une stratégie selon le serveur utilisé.

L'ordre des routes est important. Le routeur utilise une stratégie par première correspondance. Par conséquent, les routes plus spécifiques doivent être placées au-dessus des routes moins spécifiques.


### Header

Le composant header, va nous permettre d'afficher le logo de l'application ainsi que l'option de connexion / Deconnexion et affichage du pseudo de l'utilisateur.

### Navigation




### Authentification


Pour mettre en place un système d'authentification efficace, nous allons avoir besoin de plusieurs éléments :

1. Interceptors
2. Guards
3. Pages
4. Components
5. Models
6. Services


Pour résumer, l'utilisateur effectuera une inscription ou une connexion via une page qui pourra afficher les différents composants.
Un service sera mis en place pour traiter les demandes avec l'API. Les données émissent et récupérée devront correspondre à des modèles de données. Un ou plusieurs interceptors seront mis en place afin d'intercepter les requêtes pour y ajouter des paramètres. Puis nous verrouillerons notre page d’administration (celle du module News).



#### Interceptor

Un "interceptor" permet comme son nom l'indique d'intercepter, en l'occurrence des requêtes HTTP(S)entrante ou sortante.
De ce fait il est possible d'ajouter des paramètres aux requêtes sortantes ou de traiter les requêtes entrantes. Dans notre cas nous intercepterons les requêtes entrantes générant des erreurs afin de les traiter, et concernant les requêtes sortantes, nous passerons le JWT (Json Web Token) si l'utilisateur en possède un.

Une chose très importante avec les interceptors, c'est d'éviter de déclarer plusieurs HttpClientModule. De préférence on déclare un HttpClientModule dans le fichier app.module.ts. De ce fait, nous sommes sûr de pouvoir intercepter les requêtes. 


core/auth/interceptors/http-token.interceptor.ts
``` ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// Rxjs
import { Observable } from 'rxjs';

// Services
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: ''
        };
        // Récupération du token si l'utilisateur est connecté
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
            // Ajout du token dans le header
            headers.Authorization = `Bearer ${currentUser.token}`;
        }
        // Clone de la requête et ajout du header
        const request = httpRequest.clone({ setHeaders: headers });
        // Renvoie la requête
        return next.handle(request);
    }
}

```

concrètement, l'intercepteur va récupérer la requête avant de l'envoyer pour ajouter dans le header le Json Web Token et ensuite la renvoyer.

Dans le cadre du cours, nous allons mettre en place un intercepteur pour simuler l'utilisation du service d'authentification.

core/auth/interceptors/fakeBackend.interceptor.ts
``` ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// Rxjs
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// Models
import { User } from '../models/user.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Mise en place de deux utilisateus avec des rôles différents
        const users: User[] = [
            { id: 1, username: 'admin', password: 'admin', firstName: 'admin', lastName: 'admin', email: 'admin@exemple.com', role: 'admin' },
            { id: 2, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', email: 'user@exemple.com', role: 'user' }

        ];

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // Ajout un delai pour simuler l'API
        return of(null).pipe(mergeMap(() => {

            // Si la requête pointe sur le end point "/auth" et qu'il s'agit d'un POST
            // On récupére les identifiants dans la requête pour les comparer avec notre tableau ci dessus
            if (request.url.endsWith('/auth') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) {
                    return error('Username or password is incorrect');
                }
                // Map les informations de l'utilisateur pour les retourner
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: `fake-jwt-token`,
                    role: user.role
                });
            }

            // Laisse passer toutes les requêtes qui ne correspondent pas à la méthode POST et au end point "/auth"
            return next.handle(request);
        }))
            // appelle materialize et dematerialize pour s'assurer d'ajouter un delai même si un erreur est levée
            // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
```


Le fichier index.ts :
core/auth/interceptors/index.ts
``` ts
import { HttpTokenInterceptor } from './http.token.interceptor';

export const interceptors: any[] = [
    HttpTokenInterceptor
];

export * from './http.token.interceptor';

```

L'intercepteur fakeBackend n'est pas présent dans le fichier index.ts car il n'est utile que le temp du développement. 


#### Guards

Un guard permet de contrôler l'accès à une route. En aucun cas il ne permet de sécuriser efficacement. Il est important de mettre en place la sécurité coté API.

Afin de permettre à l'administrateur d'accéder à la page de gestion des articles, nous allons ajouter un guard.

core/auth/guards/admin-auth.guard.ts
``` ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// Services
import { AuthService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Récupération de l'utilisateur
        const currentUser = this.authService.currentUserValue;
        // Si l'utilisateur est connecté et qu'il est administrateur
        if (currentUser && currentUser.role === 'admin') {
            return true;
        }
        this.router.navigate(['/authentication']);
        return false;
    }
}

```

Si l'utilisateur est connecté et que son rôle est administrateur, alors on lui permet d'activer la route.
Sinon, on le redirige vers la page de connexion.

core/auth/guards/index.ts
``` ts
import { AdminAuthGuard } from './admin-auth.guard';

export const guards: any[] = [
    AdminAuthGuard
];

export * from './admin-auth.guard';

```

