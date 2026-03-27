# 🎿 Espace Nordique du Barioz — Site Web Officiel

> Site web officiel de l'Espace Nordique du Barioz, au cœur du massif de Belledonne (Isère).  
> Ski de fond · Raquettes · Biathlon · Refuge Crêt du Poulet · 52 km de pistes damées

🌐 **Site en ligne :** [espacenordiquedubarioz.fr](https://espacenordiquedubarioz.fr)  
🌐 **Nouveaux Site en ligne :** [maxxmoai.github.io/Barioz/](https://maxxmoai.github.io/Barioz/)
📍 **Localisation :** Plateau du Barioz, 38830 Crêts en Belledonne  
📞 **Téléphone foyer :** 04 76 71 06 47



---

## 📁 Structure du projet

```
barioz/
├── index.html                      ← Site complet (toutes les pages)
├── style.css                       ← Feuille de style complète
├── script.js                       ← JavaScript (données live, météo, webcam…)
├── PXL_20260124_095901306_MP.jpg   ← Photo de fond de la page d'accueil
├── plan_piste_télécharger.pdf      ← Plan des pistes de ski de fond
├── parcours_raquette.pdf           ← Plan des itinéraires raquettes
└── README.md                       ← Ce fichier
```

> ⚠️ Le site est entièrement **mono-fichier HTML** : toutes les pages (Accueil, Foyer, Pistes, Refuge, Événements, Scolaires, Histoire, Enneigement, Accès) sont contenues dans `index.html` et la navigation se fait en JavaScript sans rechargement de page.

---

## ✨ Fonctionnalités

### 🗺 Navigation multi-pages sans rechargement
Le site simule une navigation multi-pages (SPA — Single Page Application) : chaque section est une `<div class="page">` et la fonction `showPage()` en JavaScript masque/affiche les pages dynamiquement. L'URL ne change pas mais l'expérience est fluide et instantanée.

### ❄️ Conditions des pistes en temps réel
Les données de conditions sont récupérées **dynamiquement depuis un Google Sheet** via Google Apps Script déployé en Web App.

- Statut global du domaine (OUVERT / FERMÉ / RÉDUIT)
- État de chaque piste (ouverte, fermée, damée…)
- Hauteur de neige par zone
- Date et heure du dernier damage
- État de la route (pneus neige, chaînes…)
- Message spécial affiché sur le site
- Horaires et statut du foyer d'accueil

L'équipe du Barioz met à jour le Google Sheet directement, et le site se met à jour automatiquement sans toucher au code.

**Configuration :** dans `script.js`, variable `CONFIG.APPS_SCRIPT_URL` — remplacer par l'URL de déploiement de votre Apps Script.

### 🌤 Météo automatique (Open-Meteo)
Météo en direct récupérée via l'API gratuite [Open-Meteo](https://open-meteo.com/) :
- Température actuelle au Barioz (1400m)
- Description météo (neige, soleil, nuageux…)
- Prévisions sur 5 jours avec icônes
- Mise à jour automatique à chaque chargement

Aucune clé API requise — Open-Meteo est entièrement gratuit.

### 📷 Webcam live — Crêt du Poulet (1726m)
La webcam installée au sommet du Crêt du Poulet est affichée directement sur le site et **se rafraîchit automatiquement toutes les 60 secondes**.

Source : `https://cretdupoulet.epok.network/camera/cret_du_poulet.jpg`

### 🗺 Carte interactive (OpenStreetMap)
Page Accès & Contact : carte interactive OpenStreetMap avec marqueur sur le foyer d'accueil, intégrée via iframe sans clé API. Boutons de navigation directe vers Waze, Google Maps et Apple Maps.

### 📱 Design responsive (mobile / tablette / desktop)
Le site est entièrement responsive grâce à un CSS en `grid` et `flexbox` avec breakpoints adaptés. Menu burger sur mobile, navigation compacte, cartes empilées sur petits écrans.

### 🔍 SEO complet
- Balises `<meta>` description et keywords
- Open Graph (Facebook, WhatsApp, LinkedIn) avec photo et description
- Twitter Card
- Données structurées JSON-LD (Schema.org `SportsActivityLocation`)
- Balise canonical
- Attributs `alt` sur toutes les images

### ♿ Accessibilité
- Attributs `aria-label` sur les liens de navigation GPS
- Titres hiérarchiques (`h1`, `h2`, `h3`) cohérents
- Contrastes respectés (fond sombre / texte clair)
- Navigation au clavier fonctionnelle

---

## 📄 Pages du site

| Page | ID | Contenu |
|---|---|---|
| Accueil | `page-home` | Hero, statut live, webcam, activités, webcam CO7Laux |
| Foyer & Tarifs | `page-foyer` | Horaires, tarifs forfaits, location matériel, bar |
| Pistes | `page-pistes` | Plan des pistes, niveaux, statut live piste par piste |
| Refuge | `page-refuge` | Crêt du Poulet, tarifs demi-pension, accès nocturne |
| Événements | `page-evenements` | Programme concerts, courses nordiques, vidéo refuge |
| Scolaires | `page-scolaires` | Accueil classes, matériel, moniteurs BE, biathlon |
| Notre histoire | `page-histoire` | 50 ans du Barioz, bénévoles, association |
| Enneigement | `page-enneigement` | Données live Google Sheet, météo, webcam, prévisions |
| Accès & Contact | `page-acces` | Carte OSM, GPS, état de la route, téléphone |

---

## 🔧 Google Apps Script (backend)

Le fichier Apps Script (fourni séparément) se déploie dans Google Sheets et expose une API JSON via `doGet()`.

### Structure du Google Sheet — *"Conditions des Pistes"*

| Ligne (index) | Contenu |
|---|---|
| 6 (index 5) | Mise à jour par |
| 7 (index 6) | Date de mise à jour |
| 8 (index 7) | Statut global (OUVERT / FERME / REDUIT) |
| 9 (index 8) | Message spécial |
| 10 (index 9) | Date du dernier damage |
| 11 (index 10) | Heure du dernier damage |
| 16 (index 15) | État de la route |
| 17 (index 16) | Heure ouverture foyer |
| 18 (index 17) | Heure fermeture foyer |
| 19 (index 18) | Message spécial foyer |
| 24–27 (index 23–26) | Zones d'enneigement (Nom / Hauteur / Qualité / Tendance) |
| 32–44 (index 31–43) | Pistes (Nom / Niveau / Type / Statut / Km / Notes) |
| 49–53 (index 48–52) | Services (Nom / Statut / Horaires / Notes) |

### Installation du Apps Script
1. Ouvrir le Google Sheet → **Extensions → Apps Script**
2. Coller le code du fichier Apps Script fourni
3. Sauvegarder (`Ctrl+S`)
4. **Déployer → Nouveau déploiement → Application Web**
   - Exécuter en tant que : **Moi**
   - Accès : **Tout le monde (anonyme)**
5. Copier l'URL générée et la coller dans `script.js` → `CONFIG.APPS_SCRIPT_URL`

---

## 🚀 Déploiement sur GitHub Pages

### Étape 1 — Créer un compte GitHub
Rendez-vous sur [github.com](https://github.com) et créez un compte gratuit si ce n'est pas déjà fait.

### Étape 2 — Créer un nouveau dépôt
1. Cliquez sur le bouton vert **"New"** (ou **"+"** → **"New repository"**)
2. Nommez-le : `barioz` (ou `espacenordiquedubarioz`)
3. Laissez-le en **Public** (obligatoire pour GitHub Pages gratuit)
4. Cochez **"Add a README file"** si vous voulez partir de ce README
5. Cliquez **"Create repository"**

### Étape 3 — Uploader les fichiers
Sur la page de votre dépôt, cliquez **"Add file" → "Upload files"** et glissez-déposez tous vos fichiers :
- `index.html`
- `style.css`
- `script.js`
- `PXL_20260124_095901306_MP.jpg`
- `plan_piste_télécharger.pdf`
- `parcours_raquette.pdf`
- `README.md`

Cliquez **"Commit changes"** pour valider l'upload.

### Étape 4 — Activer GitHub Pages
1. Allez dans **Settings** (onglet en haut du dépôt)
2. Dans le menu gauche, cliquez **"Pages"**
3. Sous **"Branch"**, sélectionnez **`main`** et le dossier **`/ (root)`**
4. Cliquez **"Save"**

⏳ Attendez 1 à 2 minutes, puis votre site sera accessible à l'adresse :
```
https://VOTRE-PSEUDO-GITHUB.github.io/barioz/
```

### Étape 5 — Mettre à jour le site plus tard
Pour modifier le site ensuite :
1. Sur GitHub, cliquez sur le fichier à modifier (ex: `index.html`)
2. Cliquez l'icône ✏️ **crayon** en haut à droite
3. Faites vos modifications
4. Cliquez **"Commit changes"**

Le site se met à jour automatiquement en moins de 2 minutes.

---

## 🌐 Lier un nom de domaine personnalisé (optionnel)

Si vous avez un domaine comme `espacenordiquedubarioz.fr` :

1. Dans **Settings → Pages**, renseignez votre domaine dans **"Custom domain"**
2. Chez votre hébergeur DNS, ajoutez ces enregistrements :
   ```
   Type A  →  185.199.108.153
   Type A  →  185.199.109.153
   Type A  →  185.199.110.153
   Type A  →  185.199.111.153
   ```
3. Cochez **"Enforce HTTPS"** une fois le domaine validé

---

## 🛠 Modifier les données du site

### Conditions des pistes → Google Sheet
Tout se passe dans le Google Sheet. Aucune compétence technique requise.

### Modifier un texte → `index.html`
Ouvrez `index.html` dans un éditeur de texte (Notepad++, VS Code…) et modifiez directement le texte entre les balises HTML.

### Modifier les couleurs / polices → `style.css`
Les couleurs principales sont définies en variables CSS au début du fichier :
```css
:root {
  --navy:  #0f172a;   /* fond principal */
  --sky:   #7ec8e3;   /* bleu ciel / accent */
  --gold:  #f59e0b;   /* doré / alertes */
  --white: #ffffff;
  --muted: #94a3b8;   /* texte secondaire */
}
```

### Ajouter / modifier une photo
Placez votre photo dans le dossier du projet, puis dans `index.html` remplacez le bloc placeholder :
```html
<!-- Avant -->
<div class="card-img card-img--ski">
  <div class="card-img-emoji">⛷</div>
</div>

<!-- Après -->
<img src="ma-photo.jpg" alt="Description de la photo"
     style="width:100%;height:100%;object-fit:cover;" />
```

### Modifier la vidéo YouTube
Dans `index.html`, cherchez `youtube.com/embed/` et remplacez l'ID de la vidéo :
```html
<iframe src="https://www.youtube.com/embed/VOTRE_ID_VIDEO" ...>
```
L'ID de la vidéo est la suite de caractères après `v=` dans l'URL YouTube.

---

## 📦 Technologies utilisées

| Technologie | Usage | Coût |
|---|---|---|
| HTML5 / CSS3 / JavaScript vanilla | Site web complet | Gratuit |
| Google Apps Script | API conditions des pistes | Gratuit |
| Google Sheets | Base de données conditions | Gratuit |
| Open-Meteo API | Météo en direct | Gratuit |
| OpenStreetMap | Carte interactive | Gratuit |
| Google Fonts (Cormorant Garamond + Outfit) | Typographie | Gratuit |
| GitHub Pages | Hébergement du site | Gratuit |
| Webcam epok.network | Image live Crêt du Poulet | Externe |

**Coût total d'hébergement : 0 €**

---

## 👥 Crédits

- **Association** : Espace Nordique du Barioz
- **Partenaire sportif** : [CO 7 Laux Nordique](http://www.co7lauxnordique.fr)
- **Réservations refuge** : [barioz.epok.network](https://barioz.epok.network/)
- **Webcam** : [cretdupoulet.epok.network](https://cretdupoulet.epok.network/)

---

## 📞 Contact

Pour toute question sur le domaine nordique :

- 📞 **Foyer d'accueil :** 04 76 71 06 47
- 📍 **Adresse :** Plateau du Barioz, 38830 Crêts en Belledonne
- 🌐 **Réservations :** [barioz.epok.network](https://barioz.epok.network/)

*Ouvert les weekends, jours fériés et vacances scolaires · 9h – 17h · Selon conditions d'enneigement*
