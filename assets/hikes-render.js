/* HIKES RENDERER: READS /content/hikes.json (EDITED VIA DECAP CMS) AND BUILDS THE HIKE CARDS */
(function () {
  'use strict';

  var list = document.getElementById('hikeList');
  if (!list) return;
  var emptyState = document.getElementById('hikesEmpty');

  var PLUS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function formatDate(iso) {
    var p = iso.split('-');
    return p[2] + '.' + p[1] + '.' + p[0] + '.';
  }

  function isPast(iso) {
    if (!iso) return false;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(iso + 'T00:00:00') < today;
  }

  function buildCard(h) {
    var date = /^\d{4}-\d{2}-\d{2}/.test(h.date || '') ? h.date.slice(0, 10) : '';
    var panelId = 'panel-' + h.id;

    var card = el('article', 'hikeCard rounded-2xl bg-white overflow-hidden');
    card.id = h.id;
    card.setAttribute('data-hike', '');
    card.setAttribute('data-difficulty', h.difficulty || '');
    card.setAttribute('data-season', h.season || '');
    card.setAttribute('data-duration', h.duration || '');
    card.setAttribute('data-date', date);

    /* TRIGGER */
    var btn = el('button', 'tourTrigger accordionTrigger');
    btn.type = 'button';
    btn.setAttribute('data-accordion-trigger', '');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', panelId);

    var imgWrap = el('span', 'tourTriggerImg imgZoom');
    var img = document.createElement('img');
    img.src = h.image || '';
    img.alt = h.image_alt || '';
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    var txt = el('span');
    var eyebrow = el('span', 'eyebrow mb-1 block');
    if (date) {
      eyebrow.appendChild(document.createTextNode('Sljedeći termin: '));
      var t = el('time', null, formatDate(date));
      t.setAttribute('datetime', date);
      eyebrow.appendChild(t);
    } else {
      eyebrow.textContent = 'Termin uskoro';
    }
    txt.appendChild(eyebrow);
    txt.appendChild(el('span', 'tourTitle block', h.title));
    txt.appendChild(el('span', 'tourTeaser block', h.teaser));

    var chev = el('span', 'accordionIconWrap tourChevron');
    chev.setAttribute('aria-hidden', 'true');
    chev.innerHTML = PLUS; /* STATIC CONSTANT ONLY */

    btn.appendChild(imgWrap);
    btn.appendChild(txt);
    btn.appendChild(chev);

    /* PANEL */
    var panel = el('div', 'accordionPanel');
    panel.id = panelId;
    var inner = el('div', 'accordionPanelInner');
    inner.appendChild(el('p', 'tourDesc', h.description));

    if (h.itinerary && h.itinerary.length) {
      var ol = el('ol', 'tourItinerary');
      h.itinerary.forEach(function (s) {
        var li = el('li');
        li.appendChild(el('p', 'tourItineraryDay', s.time));
        li.appendChild(el('p', null, s.text));
        ol.appendChild(li);
      });
      inner.appendChild(ol);
    }

    if (h.meta && h.meta.length) {
      var dl = el('dl', 'tourMetaGrid');
      h.meta.forEach(function (m) {
        var row = el('div');
        row.appendChild(el('dt', null, m.label));
        var dd = el('dd');
        if (EMAIL.test(m.value || '')) {
          var a = el('a', null, m.value);
          a.href = 'mailto:' + m.value;
          dd.appendChild(a);
        } else {
          dd.textContent = m.value;
        }
        row.appendChild(dd);
        dl.appendChild(row);
      });
      inner.appendChild(dl);
    }

    if (h.note) {
      var box = el('div', 'tourNoteBox');
      box.appendChild(el('strong', null, 'Napomena:'));
      box.appendChild(document.createTextNode(' ' + h.note));
      inner.appendChild(box);
    }

    panel.appendChild(inner);
    card.appendChild(btn);
    card.appendChild(panel);

    /* ACCORDION: OWN HANDLER; stopPropagation PREVENTS A DOUBLE TOGGLE IF SCRIPT.JS USES DELEGATION */
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
    });

    return card;
  }

  function render(data) {
    var hikes = (data && data.hikes) || [];
    hikes = hikes.filter(function (h) { return h && h.id && !isPast((h.date || '').slice(0, 10)); });
    /* SOONEST FIRST, UNDATED LAST */
    hikes.sort(function (a, b) {
      return (a.date || '9999').localeCompare(b.date || '9999');
    });
    list.textContent = '';
    hikes.forEach(function (h) { list.appendChild(buildCard(h)); });
    if (emptyState) emptyState.classList.toggle('hidden', hikes.length !== 0);
  }

  fetch(list.getAttribute('data-hikes-src') || '/content/hikes.json', { cache: 'no-cache' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(render)
    .catch(function (err) {
      console.error('Hikes could not be loaded:', err);
      if (emptyState) emptyState.classList.remove('hidden');
    });
})();
