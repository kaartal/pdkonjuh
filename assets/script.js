// ============================================================================
// PLANINARSKO DRUŠTVO TRESKAVICA — SHARED BEHAVIOUR
// ============================================================================
(function(){
  "use strict";

  /* ---------- HEADER: ALWAYS THE SAME BLURRED GLASS LOOK, NEVER CHANGES ON SCROLL ------ */
  // (intentionally no scroll listener here — the header keeps its opening appearance)

  /* ---------- HEADER HIDES FROM THE MOMENT THE CTA VIDEO SECTION IS REACHED, AND STAYS
     HIDDEN THROUGH THE REST OF THE PAGE (INCLUDING THE FOOTER) — DESKTOP + MOBILE ---------- */
  const siteHeader = document.querySelector(".site-header");
  const ctaVideoSection = document.getElementById("ctaVideoSection");
  if(siteHeader && ctaVideoSection){
    siteHeader.classList.add("headerAutoHide");
    const updateHeaderVisibility = ()=>{
      const rectTop = ctaVideoSection.getBoundingClientRect().top;
      // ČIM VRH VIDEO SEKCIJE DOĐE DO VRHA EKRANA (ILI GA PRIJEĐE), NAVBAR OSTAJE SKLONJEN
      siteHeader.classList.toggle("is-hidden", rectTop <= 0);
    };
    updateHeaderVisibility();
    window.addEventListener("scroll", updateHeaderVisibility, {passive:true});
    window.addEventListener("resize", updateHeaderVisibility);
  }

  /* ---------- MOBILE MENU (FULL-SCREEN OVERLAY, ICON MORPH HAMBURGER <-> CLOSE) ---------- */
  const menuBtn = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const HAMBURGER_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const CLOSE_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  if(menuBtn && mobileMenu){
    menuBtn.classList.add("menuIconMorph");
    let savedScrollY = 0;
    const setMenuState = (open)=>{
      mobileMenu.classList.toggle("is-open", open);
      mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.innerHTML = open ? CLOSE_ICON : HAMBURGER_ICON;
      if(open){
        savedScrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = "100%";
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, savedScrollY);
      }
      document.body.classList.toggle("overflow-hidden", open);
    };
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("is-open");
      setMenuState(!isOpen);
    });
    mobileMenu.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", ()=> setMenuState(false));
    });
    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape" && mobileMenu.classList.contains("is-open")) setMenuState(false);
    });
  }

  /* ---------- BACK TO TOP BUTTON ---------- */
  const backToTop = document.createElement("button");
  backToTop.className = "backToTop";
  backToTop.setAttribute("aria-label", "Nazad na vrh stranice");
  backToTop.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(backToTop);
  const toggleBackToTop = ()=> backToTop.classList.toggle("is-visible", window.scrollY > 600);
  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop, {passive:true});
  backToTop.addEventListener("click", ()=>{
    window.scrollTo({top:0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
  });

  /* ---------- MAGNETIC BUTTONS ---------- */
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(hover: hover)").matches){
    document.querySelectorAll(".btn").forEach(btn=>{
      btn.classList.add("magnetic");
      btn.addEventListener("mousemove", (e)=>{
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        btn.style.transform = `translate(${x*0.18}px, ${y*0.35}px)`;
      });
      btn.addEventListener("mouseleave", ()=>{ btn.style.transform = ""; });
    });

    /* ---------- CARD TILT ---------- */
    document.querySelectorAll(".lift").forEach(card=>{
      card.classList.add("tilt");
      card.addEventListener("mousemove", (e)=>{
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${py*-5}deg) rotateY(${px*7}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", ()=>{ card.style.transform = ""; });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-left");
  if("IntersectionObserver" in window && revealEls.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:"0px 0px -60px 0px"});
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add("is-visible"));
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll(".counter");
  if("IntersectionObserver" in window && counters.length){
    const countIO = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10) || 0;
        const suffix = el.dataset.suffix || "";
        const duration = 2400;
        const start = performance.now();
        const step = (now)=>{
          const p = Math.min((now-start)/duration, 1);
          const eased = 1 - Math.pow(1-p, 3);
          el.textContent = Math.round(eased*target) + suffix;
          if(p<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, {threshold:.6});
    counters.forEach(el=>countIO.observe(el));
  }

  /* ---------- GENTLE PARALLAX ON HERO IMAGE ---------- */
  const parallax = document.querySelector(".parallax-img");
  if(parallax && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    window.addEventListener("scroll", ()=>{
      const y = window.scrollY;
      if(y < window.innerHeight){
        parallax.style.transform = `translate3d(0, ${y*0.18}px, 0) scale(1.06)`;
      }
    }, {passive:true});
  }

  /* ---------- LIGHTBOX (GALLERY) ---------- */
  const lightbox = document.getElementById("lightbox");
  if(lightbox){
    const lbImg = lightbox.querySelector("img");
    const lbCaption = lightbox.querySelector("figcaption");
    document.querySelectorAll("[data-lightbox]").forEach(trigger=>{
      trigger.addEventListener("click", ()=>{
        const src = trigger.getAttribute("data-full") || trigger.querySelector("img")?.src;
        const caption = trigger.getAttribute("data-caption") || "";
        if(lbImg) lbImg.src = src;
        if(lbCaption) lbCaption.textContent = caption;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden","false");
        document.body.classList.add("overflow-hidden");
      });
    });
    const closeLb = ()=>{
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden","true");
      document.body.classList.remove("overflow-hidden");
    };
    lightbox.addEventListener("click", (e)=>{ if(e.target === lightbox) closeLb(); });
    lightbox.querySelector("[data-close]")?.addEventListener("click", closeLb);
    document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeLb(); });
  }

  /* ---------- HIKE FILTERS (HIKES.HTML) ---------- */
  const filterForm = document.getElementById("hikeFilters");
  const hikeCards = document.querySelectorAll("[data-hike]");
  if(filterForm && hikeCards.length){
    const applyFilters = ()=>{
      const difficulty = filterForm.querySelector('[name="difficulty"]').value;
      const season = filterForm.querySelector('[name="season"]').value;
      const duration = filterForm.querySelector('[name="duration"]').value;
      let visible = 0;
      hikeCards.forEach(card=>{
        const d = card.dataset.difficulty, s = card.dataset.season, du = card.dataset.duration;
        const match =
          (difficulty === "all" || d === difficulty) &&
          (season === "all" || s === season) &&
          (duration === "all" || du === duration);
        card.style.display = match ? "" : "none";
        if(match) visible++;
      });
      const emptyState = document.getElementById("hikesEmpty");
      if(emptyState) emptyState.classList.toggle("hidden", visible !== 0);
    };
    filterForm.addEventListener("change", applyFilters);
  }

  /* ---------- NEWSLETTER / CONTACT FORM FEEDBACK (NO BACKEND) ---------- */
  document.querySelectorAll("form[data-noop]").forEach(form=>{
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const note = form.querySelector("[data-form-note]");
      if(note){
        note.textContent = form.dataset.successMessage || "Hvala! Javit ćemo vam se uskoro.";
        note.classList.remove("hidden");
      }
      form.reset();
    });
  });

  /* ---------- GPX DOWNLOAD PLACEHOLDER ---------- */
  document.querySelectorAll("[data-gpx]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const name = btn.dataset.gpx || "ruta";
      const gpxContent = `<?xml version="1.0"?>\n<gpx version="1.1" creator="PD Treskavica"><trk><name>${name}</name><trkseg></trkseg></trk></gpx>`;
      const blob = new Blob([gpxContent], {type:"application/gpx+xml"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${name}.gpx`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
  });

  /* ---------- ACCORDION (FAQ) ---------- */
  document.querySelectorAll("[data-accordion-trigger]").forEach(trigger=>{
    trigger.addEventListener("click", ()=>{
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      if(panel){
        panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- MEMBERSHIP PRICING TOGGLE (ANNUAL/MONTHLY) ---------- */
  const planToggle = document.getElementById("planToggle");
  if(planToggle){
    planToggle.addEventListener("change", ()=>{
      const annual = planToggle.checked;
      document.querySelectorAll("[data-price-monthly]").forEach(el=>{
        el.textContent = annual ? el.dataset.priceAnnual : el.dataset.priceMonthlyVal;
      });
      document.querySelectorAll("[data-period]").forEach(el=>{
        el.textContent = annual ? "/god." : "/mj.";
      });
    });
  }

})();
