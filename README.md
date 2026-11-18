# TechTwist Global – Website

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Node.js API

## Run
```bash
npm install
cp .env.example .env.local   # add your SMTP details (optional)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Speed notes
- Photos live in `public/images/*` and are already resized (about 1.6 MB in total).
  When you add new photos, keep them under ~200 KB and about 1200 px wide / 800 px tall (WebP).
- All 3D sliders (hero, journey, solutions) animate only `transform` and `opacity`.
  Do not add `backdrop-blur`, `blur-*` or width/height transitions to moving cards.
- Scroll animations use one shared IntersectionObserver (`components/Reveal.tsx`), no animation library.
