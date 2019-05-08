# TypeScript


Créée et pris en charge par Microsoft, c'est un langage Open source.

Le co inventeur du langage n'est pas moins que le créateur du langage C#.

TypeScript est un langage de programmation utilisé par Angular depuis le passage de la version AngularJS à Angular 2.
Voir le chapitre dédié à l'histoire d'Angular.


Il ne s'agit pas de n'importe quelle type de langage étant donné que celui ci n'est pas utilisé directement coté serveur ou coté client.
Disons que c'est un langage côté développeur.

Il est un sur-ensemble de JavaScript. Tout code JavaScript est valide en TypeScript.

Voiçi une fonction JavaScript :

``` js

function maFonction(a, b) {
    return a - b;
}

console.log(mafunction('hello', 'world'));
```

Il est facile d'identifier le problème. Impossible d'effectuer une soustraction avec des chaines de caractères. Simplement, dans une application à taille réell, comportant plusieurs milliers de lignes de codes, avec des centaines de composants, difficile de si retrouver en JavaScript pure.


Voici la même fonction avec TypeScript :

``` ts

function maFonction(a:number, b:number): number {
    return a - b;
}

```

Ici le typage des variables, mais également le typage du retour de la fonction permet de mieux travailler en équipe sur un projet.

Voila tout l'intéret de mon point vue :
- Faciliter le développement en équipe de grosse application.
- Remonter directement les erreurs avant la mise en production.
- Eviter les erreurs du au manque de typage de JavaScript
- Faciliter la compréhention du code

Etant donné qu'il s'agit d'un code côté développeur, celui-ci est transformé en JavaScript via une transcompilation.

Grace à cela, TypeScript prends en charge les dernières normes ECMAScript.
