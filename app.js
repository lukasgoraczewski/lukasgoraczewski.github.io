// The game cards are written into index.html by build.js (so the page reads
// without JavaScript). This script only opens and closes the detail overlay.
(function () {
  var dialog = document.getElementById('detail');
  var games = [];
  var lastCard = null;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  // The overlay's content (including its close button) only exists while it is open.
  var body = el('div', { id: 'detail-body' });
  var closeBtn = el('button', { type: 'button', 'class': 'close', id: 'close', 'aria-label': 'Close', text: '×' });

  function youtubeEmbed(url) {
    var m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    if (m) return 'https://www.youtube-nocookie.com/embed/' + m[1];
    m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return 'https://player.vimeo.com/video/' + m[1];
    return null;
  }

  function storeBadge(store) {
    var names = {
      'google-play': { small: 'GET IT ON', big: 'Google Play' },
      'steam': { small: 'AVAILABLE ON', big: 'Steam' },
      'nintendo-switch': { small: 'AVAILABLE ON', big: 'Nintendo Switch' },      'app-store': { small: 'DOWNLOAD ON THE', big: 'App Store' }
    };
    var n = names[store.type] || { small: 'STORE', big: store.type };
    if (store.available === false) {
      return el('span', { 'class': 'unavailable', text: n.big + ': no longer available' });
    }
    var a = el('a', { 'class': 'badge', href: store.url, target: '_blank', rel: 'noopener' }, [
      el('small', { text: n.small }),
      el('b', { text: n.big })
    ]);
    return a;
  }

  function media(game) {
    if (game.trailerFile) {
      var v = el('video', { 'class': 'detail-video', controls: '', preload: 'metadata', playsinline: '', poster: game.base + game.cover });
      v.appendChild(el('source', { src: game.base + game.trailerFile, type: 'video/mp4' }));
      v.setAttribute('aria-label', game.title + ' trailer');
      if (game.trailerAspect) v.style.aspectRatio = game.trailerAspect;
      return v;
    }
    var embed = game.trailerUrl && youtubeEmbed(game.trailerUrl);
    if (embed) {
      return el('iframe', { 'class': 'detail-video', src: embed, title: game.title + ' trailer', allow: 'fullscreen; picture-in-picture', loading: 'lazy' });
    }
    return null;
  }

  function render(game) {
    body.textContent = '';
    var trailer = media(game);
    if (trailer) body.appendChild(trailer);

    if (game.screens && game.screens.length) {
      var strip = el('div', { 'class': 'strip', role: 'list', 'aria-label': 'Screenshots' });
      game.screens.forEach(function (s) {
        var img = el('img', { src: game.base + s.file, alt: s.alt, loading: 'lazy', role: 'listitem' });
        strip.appendChild(img);
      });
      body.appendChild(strip);
    }

    var pad = el('div', { 'class': 'detail-pad' });
    pad.appendChild(el('h2', { id: 'detail-title', text: game.title }));
    pad.appendChild(el('p', { 'class': 'tagline', text: game.tagline }));
    (game.description || []).forEach(function (p) { pad.appendChild(el('p', { text: p })); });

    if (game.role) {
      pad.appendChild(el('h3', { text: 'My role' }));
      pad.appendChild(el('p', { text: game.role }));
    }
    if (game.metrics && game.metrics.length) {
      pad.appendChild(el('h3', { text: 'Results' }));
      var ul = el('ul', { 'class': 'metrics' });
      game.metrics.forEach(function (m) {
        ul.appendChild(el('li', {}, [el('strong', { text: m.value }), el('span', { text: m.label })]));
      });
      pad.appendChild(ul);
    }
    if (game.monetization) {
      pad.appendChild(el('h3', { text: 'Monetization' }));
      pad.appendChild(el('p', { text: game.monetization }));
    }
    if (game.stores && game.stores.length) {
      var stores = el('div', { 'class': 'stores' });
      game.stores.forEach(function (s) { stores.appendChild(storeBadge(s)); });
      pad.appendChild(stores);
    }
    body.appendChild(pad);
  }

  function open(game, trigger) {
    lastCard = trigger || null;
    render(game);
    dialog.textContent = '';
    dialog.appendChild(closeBtn);
    dialog.appendChild(body);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    if (location.hash !== '#' + game.slug) history.replaceState(null, '', '#' + game.slug);
  }

  function cleanup() {
    body.querySelectorAll('video').forEach(function (v) { v.pause(); });
    body.textContent = '';
    dialog.textContent = '';
    history.replaceState(null, '', location.pathname + location.search);
    if (lastCard) lastCard.focus();
  }

  function close() {
    if (!dialog.open) return;
    dialog.close();
    cleanup();
  }

  dialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    close();
  });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) close();
  });
  closeBtn.addEventListener('click', close);

  fetch('games.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      games = data.games || [];
      var bySlug = {};
      games.forEach(function (g) { bySlug[g.slug] = g; });
      document.querySelectorAll('.card[data-slug]').forEach(function (btn) {
        var game = bySlug[btn.getAttribute('data-slug')];
        if (game) btn.addEventListener('click', function () { open(game, btn); });
      });
      var target = bySlug[location.hash.slice(1)];
      if (target) open(target, null);
    })
    .catch(function () {
      // Cards stay readable; only the detail overlay is unavailable.
    });
})();
