# 🏔️ PD Konjuh — Mountaineering Club Website

A modern, fully responsive website for **Planinarsko društvo Konjuh**, a mountaineering club based in **Tuzla, Bosnia and Herzegovina**, founded in **1951**.

Built entirely with **HTML5**, **Tailwind CSS (CDN)**, and **vanilla JavaScript**, the project requires **no build process**, **no frameworks**, and **no dependencies**. Every page is completely self-contained, meaning each `.html` file includes its own CSS and JavaScript.

Simply open any page in your browser or deploy the repository to **GitHub Pages**, **Netlify**, **Vercel**, or any other static hosting provider.

---

## 🔎 About

> **Static, single-file mountaineering club website built with HTML, Tailwind CSS (CDN), and vanilla JavaScript — no build process required, ready for GitHub Pages.**

---

## ✨ Features

- 📱 Fully responsive, mobile-first layout
- 🍔 Fullscreen mobile navigation
- 🪟 Floating glass navigation bar
- 🎥 Auto-hiding header
- 🖼️ Fullscreen image lightbox
- ❓ Animated FAQ accordion
- 📊 Scroll-triggered count-up statistics
- ✨ Scroll reveal animations
- 🧲 Magnetic buttons (desktop)
- 🎴 Interactive 3D card tilt
- 🏔️ Hero parallax effect
- 💬 Infinite testimonial marquee
- 🌙 Automatic dark mode support
- 🥾 Hike filtering interface
- 📩 Client-side contact/newsletter feedback
- 📍 GPX download placeholder
- ♿ Accessibility-friendly interactions
- 🔍 SEO-ready metadata
- 📄 Schema.org JSON-LD markup

---

## 📄 Pages

| Page | Description |
|------|-------------|
| **index.html** | Homepage featuring a cinematic hero section, parallax image, about preview, hiking destinations, FAQ, testimonial marquee, and CTA video section. |
| **about.html** | About page with club history, mission, values, animated statistics, timeline, and CTA banner. |
| **gallery.html** | Responsive masonry gallery with fullscreen lightbox and "Show More" functionality. |

All pages share the same design system, including:

- Floating navigation bar
- Mega menu
- Fullscreen mobile menu
- Shared footer
- Shared animations
- Shared JavaScript functionality

> **Note:** Navigation already includes links for `hikes.html`, `plan.html`, `membership.html`, `vijesti.html`, and `contact.html`. These pages are planned but not yet included in this repository.

---

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript (ES6)
- Google Fonts
  - Fraunces
  - Inter
  - IBM Plex Mono
  - Poppins
  - Open Sans
- Schema.org JSON-LD

No frameworks.

No package manager.

No bundler.

No build step.

---

## 📁 Project Structure

Every page is completely self-contained.

```html
<head>

    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {...},
                    fontFamily: {...}
                }
            }
        };
    </script>

    <style>
        /* Entire stylesheet */
    </style>

</head>

<body>

    <!-- Page content -->

    <script>
        /* Entire JavaScript */
    </script>

</body>
```

---

## 📝 Naming Conventions

Custom code follows a consistent naming style.

### CSS Classes

```css
.siteHeader
.heroSection
.navLink
.mobileMenu
.galleryGrid
```

### JavaScript

```javascript
openMobileNavigation()
closeLightboxViewer()
initializeAccordion()
```

### CSS Variables

```css
--forestDeep
--brandRed
--iceBlue
```

Tailwind utility classes remain unchanged.

```html
bg-beige
text-charcoal
px-6
hover:text-forest
```

HTML `data-*` attributes also keep their standard format.

```html
data-lightbox
data-gallery-item
data-accordion-trigger
```

All comments inside the source code are written in **English** using **uppercase section headers**.

---

## 🚀 Getting Started

### Option 1 — Open Directly

Simply open any `.html` file in your browser.

---

### Option 2 — Local Server

#### Python

```bash
python3 -m http.server 8000
```

#### Node.js

```bash
npx serve .
```

Visit:

```
http://localhost:8000
```

---

### Option 3 — GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select the **main** branch.
5. Choose the repository root (`/`).

Your website will be available at:

```
https://username.github.io/repository-name/
```

---

## 🎨 Brand Palette

| Color | Hex |
|--------|-----|
| Forest | `#184D3B` |
| Forest Deep | `#0E332A` |
| Moss | `#557A46` |
| Beige | `#F6F3EE` |
| Stone | `#E7E5E2` |
| Charcoal | `#1E1E1E` |
| Navy | `#0F5875` |
| Navy Deep | `#02445E` |
| Brand Red | `#DC292B` |
| Ice Blue | `#51B1DB` |
| Alpenglow | `#C97B3D` |
| Rust | `#8B3A2B` |

---

## 🔤 Typography

| Font | Purpose |
|------|---------|
| Fraunces | Display headings |
| Inter | Body text |
| IBM Plex Mono | Labels & metadata |
| Poppins | About page headings |
| Open Sans | About page content |

---

## ♿ Accessibility

- Keyboard accessible
- Proper ARIA attributes
- Visible focus states
- Skip-to-content link
- Supports `prefers-reduced-motion`
- Semantic HTML
- Lazy-loaded images
- Optimized hero loading

---

## 📜 License

This repository currently does not include a license.

If you plan to publish the project publicly, consider adding an **MIT License**.

---

## 👨‍💻 Author

Developed with ❤️ by **Halid Kartal, Jusuf Salkanovic**
