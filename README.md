# Hema N — Software Engineer Portfolio

**Live site:** https://hema-portfolio-beige.vercel.app

Personal portfolio built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · GSAP ScrollTrigger · Lenis**.
Fully static — no backend, no paid services. Deploys to Vercel as-is.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Quality checks:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript
npm run build      # production build
npm start          # serve the production build
```

## Editing content

Everything on the site comes from **`src/data/portfolio.ts`**: profile, links, projects, skills, training, education, credentials and contact.

| Want to…                         | Change in `portfolio.ts`                                                  |
| -------------------------------- | ------------------------------------------------------------------------- |
| Add a real photo                 | Put it in `public/images/profile/` → set `profile.portrait: "/images/profile/hema.jpg"` |
| Hide the phone number            | `profile.showPhone: false`                                                |
| Add GitHub                       | `profile.github: "https://github.com/…"`                                  |
| Show GitHub / Live Demo on a project | Fill that project's `github` / `demo` (buttons stay hidden while empty) |
| Add project screenshots          | Put files in `public/images/projects/` → add to that project's `screenshots` |
| Add implementation notes         | Fill the project's `implementation` array                                 |
| Enable certificate preview       | Put the PDF/image in `public/images/certificates/` → set the credential's `file` |
| Add a verification link          | Set the credential's `verifyUrl`                                          |
| Replace the resume               | Overwrite `public/resume/Hema_SE_resume.pdf` (keep the same filename)     |
| Set the live domain (SEO)        | `site.url` — used for sitemap, robots, canonical and Open Graph URLs      |

Brand logos live in `public/icons/` (from Devicon and Simple Icons).

## Project structure

```
src/
  app/                    routes, metadata, sitemap, robots, OG image, favicon, 404
    projects/[slug]/      statically generated case-study pages
  components/
    layout/               navbar, footer, theme, smooth scroll, scroll progress
    sections/             homepage sections + interactive terminal
    illustrations/        animated SVG visuals (conceptual, not screenshots)
    ui/                   buttons, reveals, headings, brand icons
  data/portfolio.ts       ← all content
  lib/                    hooks and helpers
public/
  icons/  images/{profile,projects,certificates}/  resume/
```

## Deployment

The Vercel project is connected to this GitHub repository:

- **Push to `main`** → Vercel builds and publishes to the live site automatically (about a minute).
- **Push to any other branch** → Vercel creates a private preview deployment.

Manual deploy from the CLI, if ever needed: `npx vercel --prod`.

If you add a custom domain, update `site.url` in `src/data/portfolio.ts` so the sitemap and link previews use it.

## Accessibility & motion

- Light/dark theme follows the system by default; the choice is saved in `localStorage`.
- `prefers-reduced-motion` turns off Lenis smooth scrolling, GSAP scroll effects, the marquee and Motion transforms.
- Skip link, visible focus rings, labelled controls, keyboard-usable terminal (↑/↓ history, Tab completion).
