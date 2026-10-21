# Audit centrale sol

Application web (PWA) de visite d'audit de centrale photovoltaïque au sol, construite sur la grille de contrôle de la **Fiche Projet** (onglets *Sol Onduleurs String* et *Sol Onduleurs Centraux*). Même charte graphique que l'app *Relevé de masque*.

Application en ligne : `https://cbt135.github.io/audit-centrale-sol/`

## Fonctionnement

1. **Nouvel audit** : choix de l'architecture (onduleurs string ou centraux), nom du site, date, auditeur, matériel d'audit emporté.
2. **Sommaire** : sections de la grille (Site, Champ PV, Poste de transformation, Poste de livraison, Sécurité, Spare parts) avec avancement et nombre de NOK.
3. **Points de contrôle** : pour chaque ligne de l'onglet, statut **OK / NOK / N/A**, commentaire au clavier ou en **dictée**, **photos** (appareil photo ou galerie) et **messages vocaux**.
4. **Export** :
   - **Exporter l'audit (.zip)** : un classeur Excel autonome (onglet Audit + onglet renseigné, mise en forme d'origine), les dossiers `photos/` et `vocaux/`, et `sauvegarde-audit.json`.
   - **Remplir ma Fiche Projet** : sélectionnez votre fichier *Fiche Projet* .xlsx ; l'app écrit dans l'onglet correspondant sans toucher au reste du classeur.

### Correspondance avec l'onglet Excel

| Donnée | Cellule |
|---|---|
| Statut OK / NOK / N/A | colonne **B** de la ligne |
| Commentaire + noms des photos et vocaux | colonne **C** |
| Points complémentaires (bas de l'onglet Centraux, lignes 136 à 160) | statut en **C**, commentaire en **D** |
| Matériel d'audit coché | « ✓ » en colonne **E**, en face de la liste de la colonne F |

Les fichiers joints sont nommés d'après la ligne Excel : `L005_Existe-t-il-des-contraintes_photo1.jpg`, `L057_Mesure-des-tensions-AC-et_vocal1.m4a`…

## Données

- Tout est stocké **sur le téléphone** (IndexedDB) ; rien n'est envoyé sur un serveur.
- Les photos sont réduites à 2048 px (JPEG) pour limiter la place.
- La sauvegarde `.zip` peut être réimportée (**Importer une sauvegarde**) pour reprendre un audit sur un autre appareil.
- Après une première ouverture avec réseau, l'app fonctionne **hors ligne** sur site.

## Installation sur l'iPhone

1. Ouvrez l'adresse dans Safari (ou Chrome).
2. Partager › **Sur l'écran d'accueil**.
3. Autorisez **micro** et **appareil photo** à la première utilisation.

La **Dictée** utilise la reconnaissance vocale du navigateur (Chrome Android, Safari). Si elle n'est pas disponible dans l'app installée, le micro du clavier iOS fait la même chose dans le champ commentaire.

## Mettre à jour l'app

Modifiez les fichiers, puis changez `VERSION` dans `sw.js` (par exemple `audit-sol-v2`) pour que les téléphones rechargent la nouvelle version.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | L'application |
| `checklist.js` | Points de contrôle extraits des deux onglets (numéros de ligne Excel) |
| `modele-audit.xlsx` | Modèle Excel autonome (onglets Audit, String, Centraux) |
| `lib/jszip.min.js` | Lecture / écriture des .xlsx et .zip (JSZip 3.10.1, MIT) |
| `manifest.webmanifest`, `sw.js` | Installation sur l'écran d'accueil et mode hors ligne |
| `*.png` | Icônes |
