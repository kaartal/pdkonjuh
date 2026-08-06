PD Konjuh — Mountaineering Club Website

A modern, fully responsive static website for Planinarsko društvo Konjuh, a mountaineering club based in Tuzla, Bosnia and Herzegovina, founded in 1951.

The project is built entirely with HTML5, Tailwind CSS (CDN) and vanilla JavaScript, with no build step, no framework, and no dependencies. Every page is completely self-contained, meaning each .html file includes its own CSS and JavaScript.

Simply open a page in your browser or deploy the repository to any static hosting provider such as GitHub Pages, Netlify, Vercel, or Amazon S3.

🔎 About

Static, single-file mountaineering club website built with HTML, Tailwind CSS (CDN), and vanilla JavaScript — no build process required, ready for GitHub Pages.

📄 Pages
File	Description
index.html	Homepage featuring a full-screen hero, parallax background, about preview, popular hiking destinations, FAQ accordion, testimonial marquee, and a cinematic CTA video section.
about.html	Club overview with an introduction, mission & values, animated statistics, historical timeline (1951–2026), and a closing call-to-action section.
gallery.html	Responsive masonry gallery with a "Show More" feature and a fullscreen lightbox for image viewing.

All pages share the same:

Floating glass navigation bar
Mega menu for hikes
Fullscreen mobile navigation
Footer with social links, photo strip, and oversized textured wordmark

Note: Navigation already includes links for hikes.html, plan.html, vijesti.html, membership.html, and contact.html. These pages reuse the same design system but are not included in this repository yet.

✨ Features
📱 Fully responsive, mobile-first layout
🍔 Fullscreen mobile navigation with animated hamburger icon
🪟 Floating glass navigation bar
🎥 Auto-hiding header while the CTA video section is visible
🖼️ Fullscreen image lightbox with captions
❓ Accessible FAQ accordion with smooth animations
📊 Animated count-up statistics using IntersectionObserver
✨ Scroll reveal animations with staggered timing
🧲 Magnetic buttons (desktop)
🎴 Interactive 3D card tilt effect
🏔️ Hero parallax effect
💬 Infinite testimonial marquee
🌙 Automatic dark mode support
🥾 Hike filtering UI (prepared for future pages)
📩 Client-side contact/newsletter feedback
📍 Client-generated GPX download placeholder
♿ Accessibility-friendly interactions
🔍 SEO-ready metadata and Open Graph tags
📄 JSON-LD (SportsOrganization) structured data
🛠️ Tech Stack
HTML5
Tailwind CSS (CDN)
Vanilla JavaScript (ES6)
Google Fonts
Fraunces
Inter
IBM Plex Mono
Poppins
Open Sans
Schema.org JSON-LD

No frameworks, bundlers, package managers, or build tools are required.

📁 Project Structure

Each page is completely self-contained.

<head>
    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { ... },
                    fontFamily: { ... }
                }
            }
        }
    </script>

    <style>
        /* Entire stylesheet */
    </style>
</head>

<body>

    <!-- Page Content -->

    <script>
        /* Entire JavaScript */
    </script>

</body>


📝 Naming Conventions

The project follows a consistent naming style:

Custom CSS classes → lowerCamelCase
Element IDs → lowerCamelCase
CSS variables → --forestDeep
JavaScript variables/functions → lowerCamelCase

Examples:

.siteHeader
.mobileMenu
.navLink
.heroSection
--forestDeep

Tailwind utility classes remain unchanged:

bg-beige
text-charcoal
px-6
hover:text-forest

data-* attributes also keep the standard HTML convention:

data-lightbox
data-gallery-item
data-accordion-trigger

JavaScript accesses them through the native dataset API.

All source code comments are written in English using uppercase section headers for consistency throughout the project.

🚀 Getting Started
Option 1 — Open Directly

Simply open any .html file in your preferred browser.

Option 2 — Run a Local Server

Python

python3 -m http.server 8000

Node.js

npx serve .

Open:

http://localhost:8000
Option 3 — GitHub Pages
Push the repository to GitHub.
Open Settings → Pages.
Under Build and deployment, choose Deploy from a branch.
Select the main branch and the repository root (/).
Save.

Your website will be available at:

https://username.github.io/repository-name/
🎨 Brand Palette
Color	Hex	Purpose
Forest	#184D3B	Primary brand color
Forest Deep	#0E332A	Dark backgrounds & hover states
Moss	#557A46	Secondary accent
Beige	#F6F3EE	Main page background
Stone	#E7E5E2	Borders & dividers
Charcoal	#1E1E1E	Body text
Navy	#0F5875	Primary buttons
Navy Deep	#02445E	Footer background
Brand Red	#DC292B	Logo accent
Ice Blue	#51B1DB	Logo accent
Alpenglow	#C97B3D	Moderate difficulty
Rust	#8B3A2B	Hard difficulty
🔤 Typography
Font	Usage
Fraunces	Display headings
Inter	Body text & UI
IBM Plex Mono	Labels & metadata
Poppins	About page headings
Open Sans	About page body text
♿ Accessibility & Performance
Keyboard-friendly navigation
Proper ARIA attributes
Visible :focus-visible states
Skip-to-content link
Full support for prefers-reduced-motion
Motion effects automatically disabled when appropriate
Lazy-loaded images
Optimized hero image loading
Semantic HTML throughout
📜 License

This repository currently does not include a license.

If you plan to publish or share the project publicly, consider adding an MIT License or another open-source license of your choice.

👨‍💻 Author

Developed by Jusuf and Halid
