# Ssemuli Joseph Portfolio Site

A single-page portfolio built from your CV and Industrial Training Report — no build tools, no frameworks, just HTML/CSS/JS. Runs anywhere, including GitHub Pages for free.

## What's inside

```
index.html            → the whole site
admin.html             → local tool for your profile picture and achievements (see below)
css/style.css          → all styling (design tokens at the top)
js/main.js              → nav menu, typewriter console, galaxy background, scroll reveals, project filters, lightbox
js/achievements-data.js → the achievements list — edit this to add/change entries
js/profile-data.js       → your nav bar profile picture — edit this to change/remove it
js/admin.js               → logic for admin.html
assets/joseph-marathon.jpg   → your Fort Portal Marathon photo (About section)
assets/Ssemuli_Joseph_CV.pdf → your CV, wired to the "Download CV" buttons
assets/certificates/          → certificate images shown in the lightbox on Achievements
```

## Adding a profile picture

By default the nav bar shows your "JS" initials. To swap in an actual photo: open `admin.html`, use the **Profile Picture** panel at the very top to upload a photo, then click **Export profile-data.js** and replace that file in your project. Square photos work best — it's displayed as a circle. Click **Remove photo** and export again to go back to initials.

## Adding new achievements later

The Achievements section reads from `js/achievements-data.js` and builds the cards automatically — you never need to touch `index.html`. Two ways to add a new one:

**Option A — the visual editor.** Open `admin.html` in a browser (works by double-clicking the file, or via a local server — see below). Fill in the form: title, issuer, date, an icon, an optional verification link, and an optional certificate image (upload a file and it gets embedded automatically, no need to manage image files yourself). Use the Up/Down/Edit/Delete controls to manage existing entries. When you're happy, click **Export achievements-data.js** — it downloads an updated copy of the file. Replace the one in your project with it and push to GitHub.

This is a local tool, not a live CMS: nothing you do in `admin.html` touches your published site until you export the file and commit it.

**Option B — edit the file directly.** Open `js/achievements-data.js`, copy one of the existing entries, and edit the fields (there's a field reference in the comment at the top of the file).

If double-clicking `admin.html` doesn't load your existing achievements (some browsers restrict local file access), run this from the project folder and open `http://localhost:8000/admin.html` instead:
```bash
python3 -m http.server 8000
```

## Publish it on GitHub Pages (free, ~5 minutes)

1. Create a new repository on GitHub — name it exactly **`SsemuliJoseph.github.io`** if you want it at the root of `ssemulijoseph.github.io`, or anything else (e.g. `portfolio`) if you're fine with a URL like `ssemulijoseph.github.io/portfolio`.
2. Upload all the files in this folder to the repo, **keeping the folder structure** (`css/`, `js/`, `assets/` must stay as subfolders).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
5. GitHub gives you a live URL in a minute or two — that's the link to put in your GitHub bio, LinkedIn, and social posts.

Or, from your terminal, if you already have git set up:
```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/SsemuliJoseph/SsemuliJoseph.github.io.git
git push -u origin main
```
Then just turn on Pages as in step 3–4 above.

## Before you publish — a few things worth checking

- **Email**: the site uses `2024bcs152@std.must.ac.ug` throughout, since that's what's on your CV. Once you graduate that inbox may stop working — swap in a personal email when you have one, in `index.html` (search for `mailto:`) and in the CV PDF.
- **HuggingFace links**: I linked `SmolGRPO-135M` and the NLLB/QLoRA models under `huggingface.co/SsemuliJoseph` based on your report — double check those model repos are set to **public** on the Hub, or the links will 404 for visitors.
- **GitHub repos**: same check for `TrainBookingSystem`, `Career-hub`, `Task-Flow`, and `CampusGPT_Uganda` — make sure none of them are private.
- **CV PDF**: it's a straight conversion of your uploaded CV docx. If you update the CV later, regenerate the PDF and replace `assets/Ssemuli_Joseph_CV.pdf` (keep the filename the same so the download buttons keep working).

## Making changes later

- **Colors/fonts**: all defined as CSS variables at the top of `css/style.css` under `:root`.
- **Text content**: everything is plain HTML in `index.html` — search for the section you want (comments like `<!-- ============================== PROJECTS ============================== -->` mark each one).
- **Adding a project card**: copy one `.pcard` block in the Projects section and edit it — icon, title, description, tags, and link.
- **Achievements, certificates & profile picture**: don't edit HTML for these — use `admin.html` or edit `js/achievements-data.js` / `js/profile-data.js` directly (see sections above).
- **Background starfield**: it's a canvas animation defined in `js/main.js` under `initGalaxy()`. Star count, colors, twinkle speed, and shooting-star frequency are all adjustable there if you want it denser, sparser, or different-colored. It automatically turns off for visitors with "reduce motion" enabled in their OS settings.

