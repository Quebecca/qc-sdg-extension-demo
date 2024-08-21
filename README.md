# Exemple de projet d'extension de la trousse de développement du système de design gouvernemental du Québec

## Présentation

Ce projet est un exemple d'extension de la trousse SDG, dans lequel :
- on recompile la feuille de style qc-sdg.css avec un root-font-size de 100% (et non 62,5%) et sans le système de grille ;
- on recompile quelques modules bootstrap en basant les réglages sur les jetons de design de la trousse ;
- on compile une feuille de style personnalisée en utilisant jetons et fonctions de la la trousse.


## Installation
Dans un terminal :
- Cloner le projet : `git clone <url-github> && cd qc-sdg-extension`
- Installer les dépendances npm : `npm i`

### Developpement

- lancer la commande `npm run start`

Toute modification d'une scss sera dès lors compilée à la volée.

### Refonte de la feuille de style de la trousse avec de nouveaux réglages


Pour étendre ou personnaliser la trousse de dev SDG, il faut  reproduire la structure du répertoire `/src` de la trousse.

```
qc-sdg-extension
|_ src
   |_ scss
      |_ settings
         |_ _settings.scss
```

L'astuce est que dans les options de compilation de sass, on place en priorité le chemin d'inclusion du projet d'extension :

```js 
// qc-sdg-extension/gulpfile.js
// ...
const scssOptions = {
    // ...
    includePaths: [
        'src/scss',
        'node_modules/',
        'node_modules/qc-trousse-sdg/src/sdg/scss',
    ],
    // ...
};
```

Le fichier js `qc-sdg-reforged.scss` ne fait qu'importer le fichier `qc-sdg.scss`.

```scss
// src/scss/qc-sdg-reforged.scss 
@use 'qc-sdg.scss';
```

Quand ce fichier est compilé, sass se base sur le chemin d'inclusion défini dans ses options de compilation et qui priorise les fichiers de l'extension.
Ainsi, les directives `@use settings/settings` incluent en priorité le fichier `qc-sdg-extension/src/scss/settings/settings.scss` dans lequel on a écrasé les valeurs du root font-size.

```scss
// Import des réglages de la trousse
@use "qc-trousse-sdg/src/sdg/scss/settings/settings" as *;
// exposition des variables que l'on écrase
@forward "qc-trousse-sdg/src/sdg/scss/settings/settings";
// modification des réglages pour nos besoins
$percent-root-font-size: 100;
$enable-grid-classes: false;
```
De cette façon, nous avons recompilé le css de la trousse, avec des réglages différents.

### Personnalisation de bootstrap avec les jetons de la trousse

Cf `src/scss/bootstrap-extension.scss`, qui suit les directives de https://getbootstrap.com/docs/5.0/customize/sass/#variable-defaults pour personnaliser Bootstrap.

### Feuille de style personnalisée, basée sur les jetons de design de la trousse

Cf `src/scss/custom-stylesheet.scss` pour les instructions en commentaire.
