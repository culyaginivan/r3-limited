# 🌐 LANDING PAGE: SEO, ACCESSIBILITY (a11y), AND SCREEN READER STANDARDS

> You must generate markup and styling code that strictly complies with WCAG 2.2 standards (Level AA) and modern search engine ranking factors (Google Core Web Vitals).

### 1. Semantics and Screen Readers
- **Heading Hierarchy**: There must be strictly **one** `<h1>` heading on the page. The `<h2>`–`<h6>` hierarchy must be strictly sequential (do not jump from `<h2>` directly to `<h4>`).
- **Semantic Tags**: It is forbidden to use `<div>` for interactive elements and logical blocks. Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **Interactive Elements**: 
  - Links `<a>` are used *only* for navigating to other pages or anchor links.
  - Buttons `<button>` are used for all other actions (opening modals, submitting forms, sliders).
- **Image Accessibility**: Every `<img>` image must have an `alt` attribute. If an image is decorative, use `alt=""` (empty); if it conveys meaning, provide a clear text description. It is forbidden to use phrases like "image of" or "picture of..." in the `alt` text.

### 2. ARIA Attributes and Keyboard Navigation
- **Non-Obvious Interfaces**: For custom elements (e.g., custom dropdowns or tabs), always generate the correct roles and states: `aria-expanded`, `aria-controls`, `aria-selected`, `role="tablist"`.
- **Keyboard Interactivity**: All interactive elements must be accessible via the `Tab` key and activated using `Enter` / `Space`.
- **Hiding Elements**: To hide elements visually while preserving them for screen readers, use a `.visually-hidden` utility class (or `sr-only` in Tailwind). Do not use `display: none` or `visibility: hidden` for text that screen readers should read.
- **Form Labels**: Every `<input>` field must be explicitly linked to a `<label>` via `id` and `for` attributes. For visually hidden labels, use `aria-label`.

### 3. Search Engine Optimization (SEO) and Core Web Vitals
- **Meta Tags**: When creating or modifying pages, ensure the presence of correct `title`, `meta description`, and Open Graph tags (`og:title`, `og:description`, `og:image`).
- **Image Optimization**: All images must have explicit `width` and `height` attributes to prevent layout shifts (Cumulative Layout Shift - CLS). Use next-generation formats (WebP/AVIF) and the `loading="lazy"` attribute for below-the-fold content.
- **Link Attributes**: All external links must contain `rel="noopener noreferrer"`. If a link should not pass link equity, add `rel="nofollow"`.

### 4. Automated Validation (Definition of Done)
Before completing the task, ensure that:
## 1. Run the Linter
Execute the following command to check for linting errors across the codebase:

```bash
npx eslint .
```

### Guidelines & Requirements:
- **Category Fixes**: If the linter returns errors from the `astro/*` or `jsx-a11y/*` categories, you must resolve them completely.
- **Strict Compliance**: Ignoring missing `alt` attributes on images or semantic markup errors in `.astro` files is strictly prohibited.

---

## 2. Verify the Build
Execute the build command to ensure the project compiles cleanly:

```bash
npm run build
```

### Guidelines & Requirements:
- **Markup & Script Check**: Verify that Astro compiles all pages and HTML templates without syntax errors in either markup or embedded scripts.
- **Production Readiness**: Ensure no build-blocking issues or unresolved compilation warnings remain prior to deployment.


## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

