// ============================================================================
// PD KONJUH — SHARED SITE SCRIPT
// Injects the common header, mobile menu, CTA video section and footer into
// every page, marks the active navigation link, and wires up all the
// interactive behaviour (menu, reveals, counters, lightbox, forms, etc.)
// ============================================================================
(function () {
  "use strict";

  /* ==========================================================================
     1. SHARED CONTENT / MARKUP
     ========================================================================== */

  // SINGLE SOURCE OF TRUTH FOR THE MAIN NAVIGATION — REUSED FOR THE DESKTOP
  // NAV, THE MOBILE MENU AND THE FOOTER "EXPLORE" LIST
  var NAV_ITEMS = [
    { key: "index", href: "index.html", label: "Naslovna" },
    { key: "about", href: "about.html", label: "O nama" },
    { key: "hikes", href: "hikes.html", label: "Ture" },
// { key: "routes", href: "routes.html", label: "Staze" },
    { key: "domovi", href: "lodges.html", label: "Planinarski domovi" },
    { key: "gallery", href: "gallery.html", label: "Galerija" },

    { key: "contact", href: "contact.html", label: "Kontakt" }
  ];

  // SLJEDEĆI TERMINI ZA SVAKU TURU — KORISTI SE NA NASLOVNOJ (HERO "SLJEDEĆA TURA").
  // VAŽNO: ako promijeniš/dodaš datum ovdje, promijeni ga i na odgovarajućoj
  // kartici u hikes.html (data-date atribut + "Sljedeći termin" oznaka u kartici),
  // da obje stranice ostanu usklađene.
  var UPCOMING_TOURS = [
    { id: "bjelasnica", title: "Bjelašnica", date: "2026-08-23", image: "assets/pictures/bjelasnica.jpg" },
    { id: "prenj", title: "Prenj", date: "2026-08-30", image: "assets/pictures/prenj.jpg" },
    { id: "velez", title: "Velež", date: "2026-09-06", image: "assets/pictures/velez.webp" },
    { id: "cvrsnica", title: "Čvrsnica", date: "2026-09-20", image: "assets/pictures/crvrsnica.jpg" },
    { id: "maglic", title: "Maglić", date: "2026-10-04", image: "assets/pictures/maglic.jpg" },
    { id: "konjuh", title: "Konjuh", date: "2026-10-18", image: "assets/pictures/konjuh.webp" }
  ];

  var MEGA_PANEL_ITEMS = [
    { href: "hikes.html#prenj", label: "Prenj" },
    { href: "hikes.html#cvrsnica", label: "Čvrsnica" },
    { href: "hikes.html#velez", label: "Velež" },
    { href: "hikes.html#maglic", label: "Maglić" },
    { href: "hikes.html#bjelasnica", label: "Bjelašnica" },
    { href: "hikes.html#konjuh", label: "Konjuh" }
  ];

  var BRAND_MARK_SVG =
    '<svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
    '<path d="M2 26L11 9L16 17" stroke="#2E8B57" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M11 9L16 17L20 11" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M20 11L30 26" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  var HAMBURGER_ICON =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var CLOSE_ICON =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  function buildMegaPanel() {
    var links = MEGA_PANEL_ITEMS.map(function (item) {
      return (
        '<a href="' + item.href + '" class="text-charcoal/80 hover:text-forest text-sm py-1 border-b border-stone/70">' +
        item.label +
        "</a>"
      );
    }).join("");
    return (
      '<div class="megaTrigger relative">' +
      '<a href="hikes.html" class="navLink" data-nav-key="hikes">Ture</a>' +
      '<div class="megaPanel absolute left-1/2 -translate-x-1/2 top-full pt-5 w-[520px]">' +
      '<div class="bg-white rounded-2xl shadow-2xl border border-stone/60 p-6 grid grid-cols-2 gap-x-8 gap-y-3">' +
      links +
      '<a href="hikes.html" class="col-span-2 mt-1 text-forest text-sm font-semibold">Sve ture →</a>' +
      "</div></div></div>"
    );
  }

  

  function buildDesktopNav() {
    return NAV_ITEMS.map(function (item) {
      if (item.mega) return buildMegaPanel();
      return '<a href="' + item.href + '" class="navLink" data-nav-key="' + item.key + '">' + item.label + "</a>";
    }).join("");
  }

  function buildMobileNav() {
    var links = NAV_ITEMS.map(function (item) {
      return (
        '<a href="' + item.href + '" data-nav-key="' + item.key + '"><span class="mobileMenuLabel">' + item.label + "</span></a>"
      );
    }).join("");
    links += '<a href="membership.html" data-nav-key="membership"><span class="mobileMenuLabel">Članstvo</span></a>';
    return links;
  }

  function buildHeader() {
    return (
      '<header class="siteHeader">' +
      '<div class="px-5 lg:px-7 flex items-center justify-between h-16">' +
      '<a href="index.html" class="brandMark flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight" data-nav-key="index">' +
      '<img src="assets/pictures/konjuh-logo.png" alt="PD Konjuh logo" class="h-16 w-16 object-contain" />' +

      '<nav class="hidden lg:flex items-center gap-8 text-[1.05rem]" aria-label="Glavna navigacija">' +
      buildDesktopNav() +
      "</nav>" +
      '<div class="flex items-center gap-3">' +
      '<a href="membership.html" class="hidden sm:inline-flex navCta" data-nav-key="membership">Postani član</a>' +
      '<button id="menuToggle" aria-expanded="false" aria-controls="mobileMenu" class="lg:hidden text-beige p-2 relative z-50" aria-label="Otvori meni">' +
      HAMBURGER_ICON +
      "</button></div></div></header>"
    );
  }

  function buildMobileMenu() {
    // DELIBERATELY RENDERED AS A SIBLING OF <HEADER> (NOT NESTED INSIDE IT), SINCE
    // THE HEADER USES A TRANSFORM AND FIXED-POSITION CHILDREN OF A TRANSFORMED
    // ELEMENT ARE COMPUTED RELATIVE TO IT INSTEAD OF THE VIEWPORT
    return (
      '<div id="mobileMenuScrim" class="lg:hidden" aria-hidden="true"></div>' +
      '<div id="mobileMenu" class="lg:hidden text-beige font-display" aria-hidden="true">' +
      '<nav class="mobileMenuList" aria-label="Mobilna navigacija">' +
      buildMobileNav() +
      "</nav></div>"
    );
  }

  function buildCtaVideo() {
    return (
      '<section id="ctaVideoSection" class="relative min-h-[110vh] px-6 lg:px-10 overflow-hidden flex items-center">' +
      '<video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline>' +
      '<source src="https://www.pexels.com/download/video/5677389/" type="video/mp4">' +
      "</video>" +
      '<div class="absolute inset-0 bg-navydeep/40"></div>' +
      '<div class="relative max-w-2xl mx-auto text-center reveal">' +
      '<h2 class="font-display text-beige text-4xl lg:text-5xl font-semibold mb-6">Neka sljedeći vikend bude dan za novi vrh i nezaboravne poglede.</h2>' +
      '<p class="text-beige/75 mb-9">Bez obzira jeste li već planinarili ili tek razmišljate o prvom usponu, uvijek ćete biti u pratnji iskusnih vodiča.</p>' +
      '<a href="membership.html" class="btn btnPrimary">Pridruži se društvu</a>' +
      "</div></section>"
    );
  }

  function buildFooterGalleryStrip() {
    var items = [
      ["assets/pictures/footer/footer1.jpg", "assets/pictures/footer/footer1.jpg", "", ""],
      ["assets/pictures/footer/footer2.jpg", "assets/pictures/footer/footer2.jpg", "", "revealDelay1"],
      ["assets/pictures/footer/footer3.jpg", "assets/pictures/footer/footer3.jpg", "", "revealDelay2"],
      ["assets/pictures/footer/footer4.jpg", "assets/pictures/footer/footer4.jpg", "", "revealDelay3"],
      ["assets/pictures/footer/footer5.jpg", "assets/pictures/footer/footer5.jpg", "", "revealDelay4"],
      ["assets/pictures/footer/footer6.jpg", "assets/pictures/footer/footer6.jpg", "", "revealDelay5"]
    ];
    return items
      .map(function (item) {
        var full = item[0], thumb = item[1], caption = item[2], delay = item[3];
        return (
          '<button type="button" data-lightbox data-full="' + full + '" data-caption="' + caption + '" class="footerGalleryItem reveal ' + delay + '" aria-label="Otvori sliku: ' + caption + '">' +
          '<img src="' + thumb + '" alt="' + caption + '" class="rounded-lg aspect-square object-cover">' +
          "</button>"
        );
      })
      .join("");
  }

  function buildFooter() {
    var exploreItems = ["about", "hikes", "domovi", "gallery"]
      .map(function (key) {
        var item = NAV_ITEMS.filter(function (n) { return n.key === key; })[0];
        return '<li><a href="' + item.href + '" class="hover:text-beige">' + item.label + "</a></li>";
      })
      .join("");

    return (
      '<footer class="relative bg-navydeep text-beige">' +
      '<div class="footerTopoDivider" aria-hidden="true"><svg viewBox="0 0 1200 90" preserveAspectRatio="none">' +
      '<path d="M0,55 C40,20 70,15 110,32 C150,49 175,10 215,22 C255,34 280,58 320,40 C360,22 390,5 430,18 C470,31 500,55 540,45 C580,35 610,12 650,25 C690,38 720,60 760,48 C800,36 830,15 870,28 C910,41 940,58 980,44 C1020,30 1050,10 1090,24 C1130,38 1160,55 1200,42 L1200,90 L0,90 Z"/></svg></div>' +
      '<div class="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">' +
      '<div class="grid lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-12 mb-16">' +
      "<div>" +
      '<p class="font-display text-2xl font-semibold mb-4">PD Konjuh</p>' +
      '<p class="text-beige/65 text-sm leading-relaxed max-w-xs mb-6">Planinarsko društvo iz Tuzle. Organizujemo ture, edukaciju i druženje na planinama Bosne i Hercegovine i šire od 1951. godine.</p>' +
      '<div class="flex gap-4">' +
      '<a href="https://www.instagram.com/pdkonjuh/" aria-label="Instagram" class="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-beige/25 flex items-center justify-center hover:bg-beige/10 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>' +
      '<a href="https://www.facebook.com/pdkonjuh.ba/?locale=hr_HR" aria-label="Facebook" class="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-beige/25 flex items-center justify-center hover:bg-beige/10 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg></a>' +
      
      "</div></div>" +
      "<div>" +
      '<p class="eyebrow text-beige/30 mb-5">Osnovno</p>' +
      '<ul class="space-y-3 text-sm text-beige/75">' + exploreItems + "</ul></div>" +
      "<div>" +
      '<p class="eyebrow text-beige/30 mb-5">Društvo</p>' +
      '<ul class="space-y-3 text-sm text-beige/75">' +
      '<li><a href="membership.html" class="hover:text-beige">Članstvo</a></li>' +
      '<li><a href="contact.html" class="hover:text-beige">Kontakt</a></li>' +
      "</ul></div>" +
      "<div>" +
      '<p class="eyebrow text-beige/30 mb-5">Kontakt</p>' +
      '<div class="space-y-4 text-sm text-beige/75">' +
      '<div class="flex items-start gap-3"><svg class="w-5 h-5 mt-0.5 text-iceblue" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg><span>Patriotske lige br. 4, Tuzla, Bosna i Hercegovina</span></div>' +
      '<div class="flex items-center gap-3"><svg class="w-5 h-5 text-iceblue" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h18M5 5v14h14V5M5 7l7 5 7-5"/></svg><a href="mailto:pdkonjuh1951@gmail.com" class="hover:text-beige transition-colors">pdkonjuh1951@gmail.com</a></div>' +
      '<div class="flex items-center gap-3"><svg class="w-5 h-5 text-iceblue" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.3a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.25 1.02L8.9 9.6a16 16 0 006.5 6.5l1.3-1.3a1 1 0 011.02-.25l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.3 21 3 14.7 3 7V5z"/></svg><a href="tel:+38761562277" class="hover:text-beige transition-colors">+387 61 562 277</a></div>' +
      "</div></div></div>" +
      '<div class="pt-4 mb-10"><p class="eyebrow text-beige/50 mb-4">Iz naše galerije</p>' +
      '<div class="grid grid-cols-3 sm:grid-cols-6 gap-2">' + buildFooterGalleryStrip() + "</div></div>" +
      "</div>" +
      '<div class="footerGiantMark reveal" aria-hidden="true"><span>PD Konjuh</span></div>' +
      '<div class="max-w-7xl mx-auto px-6 lg:px-10 pb-10">' +
      '<div class="footerBottomRow flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 text-xs text-beige/45">' +
      "<p>© 2026 Planinarsko društvo Konjuh, Tuzla. Sva prava zadržana.</p>" +
      '<p class="footerCredit">Developed by <span>Kartal</span></p>' +
      "</div></div></footer>" +
      '<div id="lightbox" aria-hidden="true">' +
      '<button data-close aria-label="Zatvori" class="absolute top-6 right-6 text-beige/80 hover:text-beige"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>' +
      '<figure class="text-center"><img src="" alt=""><figcaption class="text-beige/70 text-sm mt-4"></figcaption></figure>' +
      "</div>"
    );
  }

  /* ==========================================================================
     2. MOUNT SHARED PARTIALS
     ========================================================================== */

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  function mountSharedPartials() {
    mount("siteHeaderRoot", buildHeader());
    mount("mobileMenuRoot", buildMobileMenu());
    mount("ctaVideoRoot", buildCtaVideo());
    mount("siteFooterRoot", buildFooter());
  }

  /* ==========================================================================
     3. ACTIVE NAVIGATION STATE
     ========================================================================== */

  function currentPageKey() {
    var file = location.pathname.split("/").pop();
    if (!file || file === "") file = "index.html";
    var name = file.replace(/\.html?$/, "");
    return name === "" ? "index" : name;
  }

  function setActiveNav() {
    var key = currentPageKey();
    document.querySelectorAll("[data-nav-key]").forEach(function (link) {
      if (link.getAttribute("data-nav-key") === key) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ==========================================================================
     3b. FAVICON (LOGO U TABU BROWSERA) — ISTI SVG KAO BRAND MARK U HEADERU.
     Ubacuje se ovdje, u zajedničkom script.js koji se učitava na svakoj
     stranici, pa se favicon automatski pojavljuje na SVAKOJ sekciji sajta
     (index, o nama, ture, vijesti, plan, domovi, galerija, kontakt...).
     ========================================================================== */

  function initFavicon() {
    // UKLONI POSTOJEĆI FAVICON (AKO GA STRANICA VEĆ IMA U <HEAD>) DA NE BUDE DUPLO
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(function (el) {
      el.remove();
    });

    // FAVICON KAO PRAVA SLIKA LOGA (ISTA DATOTEKA KOJA SE KORISTI I U NAVBARU)
    var link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "assets/pictures/konjuh-logo.png";
    document.head.appendChild(link);
  }

  /* ==========================================================================
     4. SMOOTH PAGE TRANSITIONS (SIMPLE CROSSFADE, NO OVER-ENGINEERING)
     ========================================================================== */

  function initPageTransitions() {
    var TRANSITION_MS = 220;

    document.body.classList.add("isReady");

    // RESTORE FROM BROWSER BACK/FORWARD CACHE WITHOUT A STUCK FADE-OUT STATE
    window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
        document.body.classList.remove("isLeaving");
        document.body.classList.add("isReady");
      }
    });

    document.addEventListener("click", function (event) {
      var link = event.target.closest ? event.target.closest("a[href]") : null;
      if (!link) return;
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

      var url;
      try {
        url = new URL(href, location.href);
      } catch (e) {
        return;
      }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // SAME PAGE, ONLY A HASH CHANGES

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      document.body.classList.remove("isReady");
      document.body.classList.add("isLeaving");
      window.setTimeout(function () {
        location.href = url.href;
      }, TRANSITION_MS);
    });
  }

  /* ==========================================================================
     5. HEADER AUTO-HIDE (HIDES WHEN SCROLLING DOWN, REAPPEARS WHEN SCROLLING UP)
     ========================================================================== */

  function initHeaderAutoHide() {
    var siteHeader = document.querySelector(".siteHeader");
    if (!siteHeader) return;

    siteHeader.classList.add("headerAutoHide");

    var lastScrollY = window.scrollY || window.pageYOffset || 0;
    var headerTicking = false;
    var TOP_OFFSET = 80; // ALWAYS SHOW THE HEADER NEAR THE TOP OF THE PAGE
    var DELTA = 6; // IGNORE TINY SCROLL JITTER (E.G. MOBILE BOUNCE)

    var updateHeaderVisibility = function () {
      var currentY = window.scrollY || window.pageYOffset || 0;
      var diff = currentY - lastScrollY;

      if (currentY <= TOP_OFFSET) {
        siteHeader.classList.remove("isHidden");
        lastScrollY = currentY;
      } else if (diff > DELTA) {
        // SCROLLING DOWN → HIDE
        siteHeader.classList.add("isHidden");
        lastScrollY = currentY;
      } else if (diff < -DELTA) {
        // SCROLLING UP → SHOW
        siteHeader.classList.remove("isHidden");
        lastScrollY = currentY;
      }

      headerTicking = false;
    };
    var onHeaderScroll = function () {
      if (headerTicking) return;
      headerTicking = true;
      requestAnimationFrame(updateHeaderVisibility);
    };
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
    window.addEventListener("resize", onHeaderScroll);
  }

  /* ==========================================================================
     6. MOBILE MENU (FULLSCREEN OVERLAY, ICON MORPH HAMBURGER <-> CLOSE)
     ========================================================================== */

  function initMobileMenu() {
    var menuBtn = document.getElementById("menuToggle");
    var mobileMenu = document.getElementById("mobileMenu");
    var scrim = document.getElementById("mobileMenuScrim");
    if (!menuBtn || !mobileMenu) return;

    menuBtn.classList.add("menuIconMorph");
    var savedScrollY = 0;

    var setMenuState = function (open) {
      mobileMenu.classList.toggle("isOpen", open);
      mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
      if (scrim) scrim.classList.toggle("isOpen", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.innerHTML = open ? CLOSE_ICON : HAMBURGER_ICON;
      if (open) {
        savedScrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = "-" + savedScrollY + "px";
        document.body.style.width = "100%";
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, savedScrollY);
      }
      document.body.classList.toggle("overflow-hidden", open);
    };

    menuBtn.addEventListener("click", function () {
      setMenuState(!mobileMenu.classList.contains("isOpen"));
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenuState(false); });
    });
    if (scrim) {
      scrim.addEventListener("click", function () { setMenuState(false); });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("isOpen")) setMenuState(false);
    });
  }

  /* ==========================================================================
     7. BACK TO TOP BUTTON
     ========================================================================== */

  function initBackToTop() {
    var backToTop = document.createElement("button");
    backToTop.className = "backToTop";
    backToTop.setAttribute("aria-label", "Nazad na vrh stranice");
    backToTop.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(backToTop);

    var backToTopTicking = false;
    var toggleBackToTop = function () {
      backToTop.classList.toggle("isVisible", window.scrollY > 600);
      backToTopTicking = false;
    };
    toggleBackToTop();
    window.addEventListener(
      "scroll",
      function () {
        if (backToTopTicking) return;
        backToTopTicking = true;
        requestAnimationFrame(toggleBackToTop);
      },
      { passive: true }
    );
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  }

  /* ==========================================================================
     8. MAGNETIC BUTTONS + CARD TILT (DESKTOP, HOVER-CAPABLE ONLY)
     ========================================================================== */

  function initMagneticAndTilt() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.classList.add("magnetic");
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.18 + "px, " + y * 0.35 + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });

    document.querySelectorAll(".lift").forEach(function (card) {
      card.classList.add("tilt");
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(900px) rotateX(" + py * -5 + "deg) rotateY(" + px * 7 + "deg) translateY(-6px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ==========================================================================
     9. SCROLL REVEAL
     ========================================================================== */

  function initScrollReveal() {
    var revealEls = document.querySelectorAll(".reveal, .revealLeft");
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("isVisible"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            // WAIT TWO FRAMES BEFORE ADDING isVisible SO THE BROWSER HAS
            // DEFINITELY PAINTED THE INITIAL opacity:0 STATE FIRST —
            // OTHERWISE ELEMENTS ALREADY IN VIEW ON LOAD (SHORT PAGES LIKE
            // KONTAKT / ČLANSTVO) JUMP STRAIGHT TO VISIBLE WITH NO ANIMATION
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                entry.target.classList.add("isVisible");
              });
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    // ALSO DELAY THE INITIAL observe() CALL BY A FRAME FOR THE SAME REASON —
    // GIVES THE BROWSER TIME TO RENDER THE STARTING STATE BEFORE THE
    // OBSERVER CAN POSSIBLY FIRE FOR ELEMENTS ALREADY IN VIEW
    requestAnimationFrame(function () {
      revealEls.forEach(function (el) { io.observe(el); });
    });
  }

  /* ==========================================================================
     9b. HERO BACKGROUND IMAGE FADE-IN
     Waits for the hero photo to be FULLY loaded before revealing it, so on
     slow hosting it never pops in half-painted — it fades/unblurs in
     smoothly on top of the dark fallback background instead.
     ========================================================================== */

  function initHeroBgFade() {
    document.querySelectorAll(".heroBg").forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("heroBgLoaded");
      } else {
        img.addEventListener("load", function () { img.classList.add("heroBgLoaded"); });
        img.addEventListener("error", function () { img.classList.add("heroBgLoaded"); });
      }
    });
  }

  /* ==========================================================================
     10. ANIMATED COUNTERS
     ========================================================================== */

  function initCounters() {
    var counters = document.querySelectorAll(".counter");
    if (!counters.length || !("IntersectionObserver" in window)) return;

    var countIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.dataset.target, 10) || 0;
          var suffix = el.dataset.suffix || "";
          var duration = 2400;
          var start = performance.now();
          var step = function (now) {
            var p = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countIO.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { countIO.observe(el); });
  }

  /* ==========================================================================
     11. GENTLE PARALLAX ON HERO IMAGE
     ========================================================================== */

  function initParallax() {
    var parallax = document.querySelector(".parallaxImg");
    if (!parallax || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var parallaxTicking = false;
    var updateParallax = function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        parallax.style.transform = "translate3d(0, " + y * 0.18 + "px, 0) scale(1.06)";
      }
      parallaxTicking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (parallaxTicking) return;
        parallaxTicking = true;
        requestAnimationFrame(updateParallax);
      },
      { passive: true }
    );
  }

  /* ==========================================================================
     12. LIGHTBOX (SITE-WIDE)
     ========================================================================== */

  function initLightbox() {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector("figcaption");

    document.querySelectorAll("[data-lightbox]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var src = trigger.getAttribute("data-full") || (trigger.querySelector("img") ? trigger.querySelector("img").src : "");
        var caption = trigger.getAttribute("data-caption") || "";
        if (lbImg) lbImg.src = src;
        if (lbCaption) lbCaption.textContent = caption;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");
      });
    });

    var closeLb = function () {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("overflow-hidden");
    };
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
    var closeBtn = lightbox.querySelector("[data-close]");
    if (closeBtn) closeBtn.addEventListener("click", closeLb);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* ==========================================================================
     13. HIKE FILTERS (HIKES.HTML)
     ========================================================================== */

  function initHikeFilters() {
    var filterForm = document.getElementById("hikeFilters");
    var hikeCards = document.querySelectorAll("[data-hike]");
    if (!filterForm || !hikeCards.length) return;

    var applyFilters = function () {
      var difficulty = filterForm.querySelector('[name="difficulty"]').value;
      var season = filterForm.querySelector('[name="season"]').value;
      var duration = filterForm.querySelector('[name="duration"]').value;
      var visible = 0;
      hikeCards.forEach(function (card) {
        var d = card.dataset.difficulty, s = card.dataset.season, du = card.dataset.duration;
        var match =
          (difficulty === "all" || d === difficulty) &&
          (season === "all" || s === season) &&
          (duration === "all" || du === duration);
        card.style.display = match ? "" : "none";
        if (match) visible++;
      });
      var emptyState = document.getElementById("hikesEmpty");
      if (emptyState) emptyState.classList.toggle("hidden", visible !== 0);
    };
    filterForm.addEventListener("change", applyFilters);
  }

  /* ==========================================================================
     14. NEWSLETTER / CONTACT FORM FEEDBACK (NO BACKEND)
     ========================================================================== */

  function initFormFeedback() {
    document.querySelectorAll("form[data-noop]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var note = form.querySelector("[data-form-note]");
        if (note) {
          note.textContent = form.dataset.successMessage || "Hvala! Javit ćemo vam se uskoro.";
          note.classList.remove("hidden");
        }
        form.reset();
      });
    });
  }

  /* ==========================================================================
     15. GPX DOWNLOAD PLACEHOLDER
     ========================================================================== */

  function initGpxDownloads() {
    document.querySelectorAll("[data-gpx]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.dataset.gpx || "ruta";
        var gpxContent =
          '<?xml version="1.0"?>\n<gpx version="1.1" creator="PD Konjuh"><trk><name>' + name + "</name><trkseg></trkseg></trk></gpx>";
        var blob = new Blob([gpxContent], { type: "application/gpx+xml" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = name + ".gpx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
    });
  }

  /* ==========================================================================
     16. ACCORDION (FAQ)
     ========================================================================== */

  function initAccordion() {
    document.querySelectorAll("[data-accordion-trigger]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
        var waypoint = trigger.closest("[data-faq-waypoint]");
        if (waypoint) waypoint.classList.toggle("isOpen", !expanded);
      });
    });
  }

  /* ==========================================================================
     17b. HERO — SLJEDEĆA TURA (NASLOVNA)
     Ispisuje najbližu nadolazeću turu iz UPCOMING_TOURS (vidi vrh fajla) u
     #heroNextTour, ako taj element postoji na stranici, i (ako postoji)
     u glavni hero-box preko [data-hero-box] atributa — vidi initHeroBoxLink().
     PRIKAZ JE SAMO TEKSTUALNA OBAVIJEST (bez slike) — vidi .heroNextTourCard
     u style.css.
     ========================================================================== */

  function initHeroNextTour() {
    var el = document.getElementById("heroNextTour");
    var heroBox = document.querySelector("[data-hero-box]");
    if (!el && !heroBox) return;

    var MON_ABBR = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];

    function parseDate(d) {
      var p = d.split("-");
      return new Date(+p[0], +p[1] - 1, +p[2]);
    }

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var next = null;

    UPCOMING_TOURS.forEach(function (tour) {
      var d = parseDate(tour.date);
      if (d < today) return;
      if (!next || d < next.dateObj) next = { id: tour.id, title: tour.title, dateObj: d };
    });

    if (!next) return;

    var label = next.dateObj.getDate() + ". " + MON_ABBR[next.dateObj.getMonth()] + ".";

    if (el) {
      var arrowSvg =
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      el.innerHTML =
        '<a href="hikes.html#' + next.id + '" class="heroNextTourCard">' +
        '<span class="heroNextTourBody">' +
        '<span class="eyebrow block">Sljedeća tura</span>' +
        '<span class="heroNextTourTitle block">' + next.title + "</span>" +
        '<span class="heroNextTourDate block">' + label + "</span>" +
        '<span class="heroNextTourLink">Pogledaj turu ' + arrowSvg + "</span>" +
        "</span>" +
        "</a>";
    }

    // POVEŽI CIJELI HERO-BOX (GLAVNI HERO NA NASLOVNOJ) SA STRANICOM
    // NAJBLIŽE NADOLAZEĆE TURE — VIDI initHeroBoxLink() ZA STVARNI KLIK/TIPKOVNICA HANDLER.
    if (heroBox) {
      heroBox.dataset.href = "hikes.html#" + next.id;
      heroBox.classList.add("heroBoxLinked");
      heroBox.setAttribute("role", "link");
      heroBox.setAttribute("tabindex", "0");
      heroBox.setAttribute("aria-label", "Otvori turu: " + next.title + ", sljedeći termin " + label);
    }
  }

  /* ==========================================================================
     17c. GLAVNI HERO — KLIK/TIPKOVNICA NAVIGACIJA NA [data-hero-box]
     Cijeli hero-box je klikabilan (osim stvarnih <a>/<button> unutar njega,
     kao npr. "Istraži ture" i kartica "Sljedeća tura", koji zadržavaju
     svoje vlastito ponašanje). Href postavlja initHeroNextTour() gore.
     ========================================================================== */

  function initHeroBoxLink() {
    document.querySelectorAll("[data-hero-box]").forEach(function (box) {
      var go = function () {
        var href = box.dataset.href;
        if (href) location.href = href;
      };
      box.addEventListener("click", function (e) {
        if (e.target.closest && e.target.closest("a, button")) return;
        go();
      });
      box.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && !(e.target.closest && e.target.closest("a, button"))) {
          e.preventDefault();
          go();
        }
      });
    });
  }

  /* ==========================================================================
     17d. MEMBERSHIP PRICING TOGGLE (ANNUAL/MONTHLY)
     ========================================================================== */

  function initPlanToggle() {
    var planToggle = document.getElementById("planToggle");
    if (!planToggle) return;

    planToggle.addEventListener("change", function () {
      var annual = planToggle.checked;
      document.querySelectorAll("[data-price-monthly]").forEach(function (el) {
        el.textContent = annual ? el.dataset.priceAnnual : el.dataset.priceMonthlyVal;
      });
      document.querySelectorAll("[data-period]").forEach(function (el) {
        el.textContent = annual ? "/god." : "/mj.";
      });
    });
  }

  /* ==========================================================================
     18. MAIN GALLERY GRID: STAGGERED SCALE + BLUR REVEAL ON SCROLL (GALLERY.HTML)
     ========================================================================== */

  function initGalleryReveal() {
    var galleryRevealEls = document.querySelectorAll("#galleryGrid .galleryReveal:not(.galleryItemExtra)");
    if (!galleryRevealEls.length) return;

    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var galleryIO = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              var i = Array.prototype.indexOf.call(galleryRevealEls, el);
              el.style.transitionDelay = Math.min(i, 8) * 70 + "ms";
              el.classList.add("isVisible");
              galleryIO.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      galleryRevealEls.forEach(function (el) { galleryIO.observe(el); });
    } else {
      galleryRevealEls.forEach(function (el) { el.classList.add("isVisible"); });
    }
  }

  /* ==========================================================================
     19. GALLERY "SHOW MORE" (GALLERY.HTML)
     ========================================================================== */

  function initGalleryShowMore() {
    var showMoreButton = document.getElementById("galleryShowMoreButton");
    var extraItems = document.querySelectorAll("#galleryGrid .galleryItemExtra");
    if (!showMoreButton) return;

    showMoreButton.addEventListener("click", function () {
      extraItems.forEach(function (item, i) {
        item.classList.remove("hidden");
        item.style.transitionDelay = i * 90 + "ms";
        // FORCE A REFLOW BEFORE ADDING isVisible SO THE FADE/SCALE/BLUR TRANSITION ACTUALLY PLAYS
        void item.offsetWidth;
        requestAnimationFrame(function () { item.classList.add("isVisible"); });
      });
      showMoreButton.remove();
    });
  }

  /* ==========================================================================
     20. ABOUT PAGE — REVEAL, COUNT-UP AND SCOPED LIGHTBOX (ABOUT.HTML)
     ========================================================================== */

  function initAboutSection() {
    var root = document.querySelector(".aboutSection");
    if (!root) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var rev = root.querySelectorAll(".onReveal");
    if (reduced) {
      rev.forEach(function (el) { el.classList.add("visible"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
      );
      rev.forEach(function (el) { io.observe(el); });
    }

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
    function startCount(el) {
      var target = +el.dataset.count;
      if (reduced) { el.textContent = target; return; }
      var dur = 1800, t0 = performance.now();
      function tick(now) {
        var p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(easeOutCubic(p) * target);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { startCount(entry.target); cio.unobserve(entry.target); }
        });
      },
      { threshold: 0.4 }
    );
    root.querySelectorAll("[data-count]").forEach(function (el) {
      if (reduced) el.textContent = el.dataset.count; else cio.observe(el);
    });

    var lb = document.getElementById("aboutLightbox");
    if (!lb) return;
    var lbImg = lb.querySelector("img");
    var lbClose = document.getElementById("aboutLightboxClose");

    function openLb(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    }
    function closeLb() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lbImg.src = "";
    }
    root.querySelectorAll(".galleryGrid figure[data-full]").forEach(function (fig) {
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.addEventListener("click", function () { openLb(fig.dataset.full, fig.querySelector("img").alt); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(fig.dataset.full, fig.querySelector("img").alt); }
      });
    });
    lbClose.addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* ==========================================================================
     21. BOOTSTRAP
     ========================================================================== */

  function init() {
    mountSharedPartials();
    setActiveNav();
    initFavicon();
    initPageTransitions();
    initHeaderAutoHide();
    initMobileMenu();
    initBackToTop();
    initMagneticAndTilt();
    initScrollReveal();
    initHeroBgFade();
    initCounters();
    initParallax();
    initLightbox();
    initHikeFilters();
    initFormFeedback();
    initGpxDownloads();
    initAccordion();
    initHeroNextTour();
    initHeroBoxLink();
    initPlanToggle();
    initGalleryReveal();
    initGalleryShowMore();
    initAboutSection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();