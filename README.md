# Portfolio — Usama Ahmed

Live site: https://usamaahmedsh.github.io/portfolio

---

## Stack

- React 19 + Vite
- Tailwind CSS
- Framer Motion
- Deployed via GitHub Pages (`gh-pages`)

---

## Local Development

```bash
cd /Users/usamaahmedsh/Documents/GitHub/portfolio
npm run dev
```

Open http://localhost:5173 in your browser.

---

## How to Edit Content

All text content (experience, projects, education, skills) lives in one file:

**`src/data/projects.js`**

| Export | What it controls |
|---|---|
| `experience` | Experience section — roles, bullets, dates |
| `education` | Education section — degrees, awards |
| `financialPipeline` | Financial AI pipeline nodes in Projects |
| `irPipeline` | IR/LLM pipeline nodes in Projects |
| `otherProjects` | The 4 smaller project cards |
| `skills` | Skills grid in About section |

### Edit bio / tagline / social links

- **Hero section** (name, tagline, bio blurb, social links): `src/components/Hero.jsx`
- **About section** (stats, bio paragraphs, location tags): `src/components/About.jsx`
- **Contact section** (email, links, location): `src/components/Contact.jsx`
- **Navbar** (site title, nav links): `src/components/Navbar.jsx`

---

## How to Change the Profile Picture

1. Get your photo and rename it `profile.jpg`
2. Copy it into `public/profile.jpg`
   ```
   portfolio/
   └── public/
       ├── favicon.svg
       ├── icons.svg
       └── profile.jpg   ← put it here
   ```
3. The Hero component will automatically load it. No code changes needed.

If the image fails to load, it falls back to the "UA" initials automatically.

---

## How to Re-deploy

Any time you make changes, run:

```bash
cd /Users/usamaahmedsh/Documents/GitHub/portfolio
npm run deploy
```

This runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch on GitHub. The live site updates within 1–2 minutes.

### Also push your source changes to main

`npm run deploy` only publishes the built site. To save your code changes:

```bash
git add src/         # or specify exact files
git commit -m "your message"
git push
```

---

## First-Time Setup on a New Machine

If you ever need to set this up from scratch on a new machine:

### 1. Clone the repo

```bash
git clone git@github.com:usamaahmedsh/portfolio.git
cd portfolio
npm install
```

### 2. Set up SSH for GitHub (if not already done)

```bash
ssh-keygen -t ed25519 -C "usamaahmed@arizona.edu" -f ~/.ssh/id_ed25519 -N ""
ssh-keyscan github.com >> ~/.ssh/known_hosts
cat ~/.ssh/id_ed25519.pub
```

Copy the output and add it at: **github.com → Settings → SSH and GPG keys → New SSH key**

Test it:
```bash
ssh -T git@github.com
# Should print: Hi usamaahmedsh! You've successfully authenticated...
```

### 3. Run locally or deploy

```bash
npm run dev       # local dev server
npm run deploy    # build + push to GitHub Pages
```

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── profile.jpg          ← profile photo goes here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx          ← name, tagline, social links
│   │   ├── About.jsx         ← stats, bio, skills grid
│   │   ├── Experience.jsx    ← timeline cards
│   │   ├── Projects.jsx      ← pipeline clusters + other cards
│   │   ├── PipelineNode.jsx  ← interactive node + detail panel
│   │   ├── Education.jsx     ← degree cards
│   │   └── Contact.jsx       ← links, footer
│   ├── data/
│   │   └── projects.js       ← ALL content data lives here
│   ├── App.jsx
│   ├── index.css             ← global styles + Tailwind
│   └── main.jsx
├── vite.config.js            ← base: '/portfolio/' for GitHub Pages
├── tailwind.config.js
└── package.json              ← deploy scripts + homepage URL
```

---

## GitHub Pages Config Notes

- `vite.config.js` has `base: '/portfolio/'` — required for assets to load correctly on GitHub Pages
- `package.json` has `"homepage": "https://usamaahmedsh.github.io/portfolio"`
- Deploys to the `gh-pages` branch automatically via the `gh-pages` npm package
- GitHub Pages must be set to serve from the `gh-pages` branch (check: repo Settings → Pages)
