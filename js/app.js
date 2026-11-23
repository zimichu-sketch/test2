(function () {
  'use strict';

  var C = null;                 // 콘텐츠
  var shotMap = {};             // id -> screenshot
  var app = document.getElementById('app');

  /* ---------- 유틸 ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(sec) {
    sec = Math.round(sec);
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return h ? h + ':' + pad(m) + ':' + pad(s) : m + ':' + pad(s);
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function watchUrl(sec) { return C.meta.url + (sec ? '&t=' + Math.round(sec) + 's' : ''); }

  // 용어 툴팁: 문장당 용어별 첫 번째만 감싼다
  function glossify(text) {
    var safe = esc(text);
    if (!C.glossary || !C.glossary.length) return safe;
    var used = {};
    var terms = C.glossary.map(function (g) { return g.term; }).sort(function (a, b) { return b.length - a.length; });
    var re = new RegExp('(' + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'g');
    return safe.replace(re, function (m) {
      if (used[m]) return m;
      used[m] = true;
      var g = C.glossary.filter(function (x) { return x.term === m; })[0];
      return '<span class="term" tabindex="0" role="note" data-def="' + esc(g.def) + '">' + m + '</span>';
    });
  }

  function badges(list) {
    return '<div class="badges">' + (list || []).map(function (b) {
      return '<span class="badge ' + b + '">' + esc(C.badgeLabels[b]) + '</span>';
    }).join('') + '</div>';
  }
  function tsChips(list, label) {
    if (!list || !list.length) return '';
    return '<div class="tsrow">' + (label ? '<span class="lbl">' + esc(label) + '</span>' : '') +
      list.map(function (t) {
        return '<button type="button" class="ts" data-sec="' + t.sec + '" aria-label="영상 ' + esc(t.label) + ' 지점으로 이동">' + esc(t.label) + '</button>';
      }).join('') + '</div>';
  }
  function thumb(id) {
    var s = shotMap[id];
    if (!s) return '';
    return '<div><button type="button" class="thumb" data-shot="' + esc(id) + '" aria-label="캡처 확대: ' + esc(s.alt) + '">' +
      '<img loading="lazy" src="' + esc(s.file) + '" alt="' + esc(s.alt) + '"></button>' +
      '<div class="thumb-cap">' + esc(s.caption.split('. ')[0]) + '</div></div>';
  }
  function parseQuery(h) {
    var out = {}, i = h.indexOf('?');
    if (i < 0) return out;
    h.slice(i + 1).split('&').forEach(function (kv) {
      var p = kv.split('=');
      if (p[0]) out[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' '));
    });
    return out;
  }
  function setQuery(path, params) {
    var q = Object.keys(params).filter(function (k) { return params[k]; })
      .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&');
    history.replaceState(null, '', '#/' + path + (q ? '?' + q : ''));
  }

  /* ---------- 화면 ---------- */
  function viewHome() {
    var m = C.meta;
    var h = '<h1>' + esc(m.title) + '</h1>' +
      '<p class="lead">영상 내용을 기술 변경, 포켓몬 평가, 대도각참 실전 후기로 나눠 정리했습니다. 항목의 시각을 누르면 영상 해당 지점으로 이동합니다.</p>' +
      '<section class="card meta" aria-label="영상 정보"><dl>' +
      '<dt>채널</dt><dd>' + esc(m.channel) + '</dd>' +
      '<dt>형식</dt><dd>' + esc(m.format) + '</dd>' +
      '<dt>방송일</dt><dd>' + esc(m.date.replace(/-/g, '.')) + '</dd>' +
      '<dt>길이</dt><dd>' + esc(m.durationLabel) + '</dd>' +
      '<dt>원본</dt><dd><a href="' + esc(m.url) + '" target="_blank" rel="noopener">유튜브에서 보기 ↗</a></dd></dl>' +
      '<ul class="parts">' + m.structure.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>';

    h += '<h2>한눈에 보는 핵심 요약</h2><div class="grid cols2">' + C.summary.map(function (s) {
      return '<article class="card sum-card"><h3>' + esc(s.title) + '</h3><p>' + glossify(s.text) + '</p>' +
        '<div class="sum-foot">' + tsChips(s.ts) + '<a class="go" href="' + esc(s.link) + '">자세히 보기 →</a></div></article>';
    }).join('') + '</div>';

    h += '<h2>요약과 우선순위</h2>' + tsChips(C.prioritiesTs, '영상 구간') +
      '<ul class="plain">' + C.priorities.map(function (p) {
        return '<li' + (p.strong ? ' class="strong-li"' : '') + '>' + glossify(p.text) + '</li>';
      }).join('') + '</ul>';

    h += '<h2>마무리 발언</h2><ul class="plain">' + C.closing.map(function (c) {
      return '<li>' + glossify(c.text) + ' ' + tsChips(c.timestamps) + '</li>';
    }).join('') + '</ul>';

    h += '<h2>용어 도움말</h2><p class="lead">' + esc(C.glossaryNote) + '</p><dl class="gloss">' +
      C.glossary.map(function (g) { return '<div class="card"><dt>' + esc(g.term) + '</dt><dd>' + esc(g.def) + '</dd></div>'; }).join('') + '</dl>';
    app.innerHTML = h;
  }

  function moveCard(m) {
    var kindLabel = m.kind === 'nerf' ? '▼ 너프' : '▲ 버프';
    var arrows = (m.changes || []).map(function (c) {
      return '<span class="arrow"><span class="lbl">' + esc(c.field) + '</span><span class="from">' + esc(c.from) + '</span>→<span>' + esc(c.to) + '</span></span>';
    }).join('');
    return '<details class="card item" data-id="' + esc(m.id) + '"><summary>' +
      '<div class="item-head"><span class="kind ' + m.kind + '">' + kindLabel + '</span>' +
      '<span class="item-name">' + esc(m.nameKo) + '</span><span class="item-en">' + esc(m.nameEn) + '</span><span class="chev" aria-hidden="true">›</span></div>' +
      '<div class="change">' + arrows + glossify(m.changeText) + '</div>' +
      badges(m.badges) + tsChips(m.timestamps) + '</summary>' +
      '<div class="item-body"><p>' + glossify(m.summary) + '</p>' + (m.screenshotIds || []).map(thumb).join('') + '</div></details>';
  }

  function viewMoves(q) {
    var st = { kind: q.kind || 'all', q: q.q || '', sort: q.sort || 'time' };
    app.innerHTML = '<h1>기술 변경 탐색기</h1><p class="lead">유출된 패치 정리를 기준으로 한 기술 변경 11건입니다. 카드를 펼치면 평가와 관련 캡처가 보입니다.</p>' +
      '<div class="filters" role="group" aria-label="기술 필터">' +
      '<div class="seg" role="group" aria-label="변경 유형">' + [['all', '전체'], ['nerf', '너프'], ['buff', '버프']].map(function (k) {
        return '<button type="button" data-kind="' + k[0] + '" aria-pressed="false">' + k[1] + '</button>'; }).join('') + '</div>' +
      '<div class="search"><input type="search" id="mq" placeholder="기술명·포켓몬명 검색 (예: 구멍파기, Dig)" aria-label="기술 검색"></div>' +
      '<select class="sel" id="ms" aria-label="정렬"><option value="time">영상 순서</option><option value="name">이름순</option></select></div>' +
      '<p class="count" id="mc" aria-live="polite"></p><div class="grid cols2" id="ml"></div><div id="mnote"></div>';
    var input = document.getElementById('mq'), sel = document.getElementById('ms');
    input.value = st.q; sel.value = st.sort;
    function draw() {
      var kw = st.q.trim().toLowerCase();
      var list = C.moves.filter(function (m) {
        if (st.kind !== 'all' && m.kind !== st.kind) return false;
        if (!kw) return true;
        return (m.nameKo + ' ' + m.nameEn + ' ' + m.summary + ' ' + m.changeText).toLowerCase().indexOf(kw) >= 0;
      });
      if (st.sort === 'name') list = list.slice().sort(function (a, b) { return a.nameKo.localeCompare(b.nameKo, 'ko'); });
      document.getElementById('ml').innerHTML = list.length ? list.map(moveCard).join('') : '<div class="card empty" style="grid-column:1/-1">조건에 맞는 기술이 없습니다.</div>';
      document.getElementById('mc').textContent = C.moves.length + '건 중 ' + list.length + '건 표시';
      Array.prototype.forEach.call(document.querySelectorAll('[data-kind]'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-kind') === st.kind ? 'true' : 'false'); });
      document.getElementById('mnote').innerHTML = st.kind === 'all' && !kw ?
        '<p class="note">' + esc(C.movesNote) + '</p>' + tsChips(C.movesNoteTs, '영상 구간') : '';
      setQuery('moves', { kind: st.kind === 'all' ? '' : st.kind, q: st.q, sort: st.sort === 'time' ? '' : st.sort });
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-kind]'), function (b) {
      b.addEventListener('click', function () { st.kind = b.getAttribute('data-kind'); draw(); });
    });
    input.addEventListener('input', function () { st.q = input.value; draw(); });
    sel.addEventListener('change', function () { st.sort = sel.value; draw(); });
    draw();
  }

  function pokeCard(p) {
    return '<details class="card item" data-id="' + esc(p.id) + '"><summary>' +
      '<div class="item-head"><span class="kind ' + p.verdict + '">' + esc(C.verdictLabels[p.verdict]) + '</span>' +
      '<span class="item-name">' + esc(p.nameKo) + '</span><span class="item-en">' + esc(p.nameEn) + '</span><span class="chev" aria-hidden="true">›</span></div>' +
      '<ul class="moves-list" aria-label="새로 배우는 기술">' + p.newMoves.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      badges(p.badges) + tsChips(p.timestamps) + '</summary>' +
      '<div class="item-body"><p>' + glossify(p.comment) + '</p>' +
      '<p class="why"><b>분류 근거</b> · ' + esc(p.verdictBasis) + '</p>' +
      (p.screenshotIds || []).map(thumb).join('') + '</div></details>';
  }

  function viewPokemon(q) {
    var st = { verdict: q.verdict || 'all', q: q.q || '' };
    app.innerHTML = '<h1>포켓몬 습득 기술 탐색기</h1><p class="lead">새 기술을 배우는 포켓몬 7건에 대한 스트리머의 평가입니다.</p>' +
      '<p class="note">' + esc(C.verdictRule) + '</p>' +
      '<div class="filters" role="group" aria-label="포켓몬 필터">' +
      '<div class="seg" role="group" aria-label="평가 라벨">' + [['all', '전체'], ['promising', '기대'], ['unsure', '애매'], ['skip', '비추천']].map(function (k) {
        return '<button type="button" data-verdict="' + k[0] + '" aria-pressed="false">' + k[1] + '</button>'; }).join('') + '</div>' +
      '<div class="search"><input type="search" id="pq" placeholder="포켓몬명·기술명 검색 (예: 픽시, Mystical)" aria-label="포켓몬 검색"></div></div>' +
      '<p class="count" id="pc" aria-live="polite"></p><div class="grid cols2" id="pl"></div><p class="lead" style="margin-top:14px">' + esc(C.pokemonNote) + '</p>';
    var input = document.getElementById('pq'); input.value = st.q;
    function draw() {
      var kw = st.q.trim().toLowerCase();
      var list = C.pokemon.filter(function (p) {
        if (st.verdict !== 'all' && p.verdict !== st.verdict) return false;
        if (!kw) return true;
        return (p.nameKo + ' ' + p.nameEn + ' ' + p.newMoves.join(' ') + ' ' + p.comment).toLowerCase().indexOf(kw) >= 0;
      });
      document.getElementById('pl').innerHTML = list.length ? list.map(pokeCard).join('') : '<div class="card empty" style="grid-column:1/-1">조건에 맞는 포켓몬이 없습니다.</div>';
      document.getElementById('pc').textContent = C.pokemon.length + '건 중 ' + list.length + '건 표시';
      Array.prototype.forEach.call(document.querySelectorAll('[data-verdict]'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-verdict') === st.verdict ? 'true' : 'false'); });
      setQuery('pokemon', { verdict: st.verdict === 'all' ? '' : st.verdict, q: st.q });
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-verdict]'), function (b) {
      b.addEventListener('click', function () { st.verdict = b.getAttribute('data-verdict'); draw(); });
    });
    input.addEventListener('input', function () { st.q = input.value; draw(); });
    draw();
  }

  function collectEntries() {
    var out = [];
    C.moves.forEach(function (m) { m.timestamps.forEach(function (t) { out.push({ sec: t.sec, label: t.label, title: m.nameKo, src: '기술 변경', ref: '#/moves?q=' + encodeURIComponent(m.nameKo) }); }); });
    C.pokemon.forEach(function (p) { p.timestamps.forEach(function (t) { out.push({ sec: t.sec, label: t.label, title: p.nameKo, src: '포켓몬', ref: '#/pokemon?q=' + encodeURIComponent(p.nameKo) }); }); });
    C.summary.forEach(function (s) { s.ts.forEach(function (t) { out.push({ sec: t.sec, label: t.label, title: s.title, src: '핵심 요약', ref: '#/' }); }); });
    C.kingambit.rows.forEach(function (r) { r.timestamps.forEach(function (t) { out.push({ sec: t.sec, label: t.label, title: r.key, src: '대도각참', ref: '#/kingambit' }); }); });
    C.closing.forEach(function (c, i) { c.timestamps.forEach(function (t) { out.push({ sec: t.sec, label: t.label, title: '마무리 발언 ' + (i + 1), src: '마무리', ref: '#/' }); }); });
    C.prioritiesTs.forEach(function (t) { out.push({ sec: t.sec, label: t.label, title: '요약과 우선순위', src: '요약', ref: '#/' }); });
    C.movesNoteTs.forEach(function (t) { out.push({ sec: t.sec, label: t.label, title: '기술 변경 총평', src: '기술 변경', ref: '#/moves' }); });
    out.sort(function (a, b) { return a.sec - b.sec; });
    return out;
  }

  function viewTimeline() {
    var dur = C.meta.durationSec, entries = collectEntries();
    var h = '<h1>영상 타임라인</h1><p class="lead">영상은 ' + esc(C.meta.durationLabel) + ' 길이입니다. 구간 막대나 눈금을 누르면 해당 시각으로 이동합니다. 아래 목록은 이 사이트의 모든 시각 표기를 모은 것입니다.</p>';
    h += '<section class="card tl-wrap" aria-label="타임라인"><div class="tl-bar">' + C.timeline.map(function (s) {
      var left = s.startSec / dur * 100, w = (s.endSec - s.startSec) / dur * 100;
      return '<button type="button" class="tl-seg ts-seg" data-sec="' + s.startSec + '" style="left:' + left + '%;width:' + w + '%;background:' + s.color + '" aria-label="' + esc(s.label) + ' ' + fmt(s.startSec) + '부터 재생" title="' + esc(s.label) + ' · ' + fmt(s.startSec) + '~' + fmt(s.endSec) + '">' + esc(s.label) + '</button>';
    }).join('') + '</div><div class="tl-ticks" aria-label="시각 눈금">' + entries.map(function (e) {
      return '<button type="button" class="tl-tick" data-sec="' + e.sec + '" style="left:' + (e.sec / dur * 100) + '%" aria-label="' + esc(e.title + ' ' + e.label) + '" title="' + esc(e.label + ' · ' + e.title) + '"></button>';
    }).join('') + '</div><div class="tl-axis"><span>0:00</span><span>' + fmt(dur / 4) + '</span><span>' + fmt(dur / 2) + '</span><span>' + fmt(dur * 3 / 4) + '</span><span>' + esc(C.meta.durationLabel) + '</span></div></section>';

    var used = {};
    C.timeline.forEach(function (s) {
      var list = entries.filter(function (e, i) { var ok = e.sec >= s.startSec && e.sec <= s.endSec && !used[i]; if (ok) used[i] = true; return ok; });
      h += '<section class="tl-group"><h3><span class="tl-dot" style="background:' + s.color + '"></span>' + esc(s.label) +
        ' <small style="color:var(--muted);font-weight:400">' + fmt(s.startSec) + ' ~ ' + fmt(s.endSec) + '</small></h3>' +
        '<ul class="tl-list">' + (list.length ? list.map(entryLi).join('') : '<li>표시할 항목이 없습니다.</li>') + '</ul></section>';
    });
    var rest = entries.filter(function (e, i) { return !used[i]; });
    if (rest.length) h += '<section class="tl-group"><h3>그 밖의 구간</h3><ul class="tl-list">' + rest.map(entryLi).join('') + '</ul></section>';
    app.innerHTML = h;
  }
  function entryLi(e) {
    return '<li>' + tsChips([{ sec: e.sec, label: e.label }]) + '<a href="' + esc(e.ref) + '">' + esc(e.title) + '</a><span class="src">' + esc(e.src) + '</span></li>';
  }

  function viewKingambit() {
    var k = C.kingambit, r = k.result, delta = r.eloTo - r.eloFrom;
    var h = '<h1>대도각참(킹암비트) 실전 평가</h1><p class="lead">' + esc(k.intro) + '</p>' +
      '<section class="card elo" aria-label="배틀 결과"><div class="elo-row"><div class="elo-num"><small>ELO 시작</small>' + r.eloFrom + '</div><div class="elo-arrow" aria-hidden="true">→</div>' +
      '<div class="elo-num"><small>ELO 종료 화면</small>' + r.eloTo + '</div><div class="elo-delta" aria-label="변동 ' + delta + '">' + (delta > 0 ? '+' : '') + delta + '</div></div>' +
      '<div class="sets"><div class="set"><b>1세트</b><span>' + esc(r.set1) + '</span></div><div class="set"><b>2세트</b><span>' + esc(r.set2) + '</span></div></div>' +
      '<p class="note" style="margin:0">ELO는 화면에 표시된 값이며, 두 값의 차이는 단순 계산입니다.</p></section>';
    h += '<h2>평가 정리</h2><div class="rows">' + k.rows.map(function (row) {
      return '<article class="card krow ' + row.tone + '"><h3>' + esc(row.key) + '</h3><p>' + glossify(row.text) + '</p>' + tsChips(row.timestamps) + '</article>';
    }).join('') + '</div>';
    h += '<h2>배틀 캡처</h2><div class="strip">' + k.screenshotIds.map(function (id) {
      var s = shotMap[id];
      return '<figure class="card shot" style="margin:0"><button type="button" class="thumb" data-shot="' + id + '" aria-label="캡처 확대: ' + esc(s.alt) + '"><img loading="lazy" src="' + esc(s.file) + '" alt="' + esc(s.alt) + '"></button>' +
        '<figcaption class="cap"><p>' + esc(s.caption) + '</p>' + tsChips([{ sec: s.timeSec, label: fmt(s.timeSec) }]) + '</figcaption></figure>';
    }).join('') + '</div>';
    app.innerHTML = h;
  }

  function viewGallery(q) {
    var group = q.group || 'all';
    var names = { all: '전체', moves: '기술 변경', pokemon: '포켓몬', battle: '배틀' };
    app.innerHTML = '<h1>화면 캡처 갤러리</h1><p class="lead">영상에서 캡처한 화면 ' + C.screenshots.length + '장입니다. 누르면 크게 볼 수 있고, 좌우 방향키로 넘길 수 있습니다. 원본 캡처 해상도가 낮아 확대하면 글자가 흐릴 수 있습니다.</p>' +
      '<div class="filters"><div class="seg" role="group" aria-label="캡처 분류">' + Object.keys(names).map(function (g) {
        return '<button type="button" data-g="' + g + '" aria-pressed="' + (g === group) + '">' + names[g] + '</button>'; }).join('') + '</div></div><div class="grid cols2" id="gl"></div>';
    function draw() {
      var list = C.screenshots.filter(function (s) { return group === 'all' || s.group === group; });
      document.getElementById('gl').innerHTML = list.map(function (s) {
        return '<figure class="card shot" style="margin:0"><button type="button" class="thumb" data-shot="' + s.id + '" aria-label="캡처 확대: ' + esc(s.alt) + '"><img loading="lazy" src="' + esc(s.file) + '" alt="' + esc(s.alt) + '"></button>' +
          '<figcaption class="cap"><p>' + esc(s.caption) + '</p><div class="tsrow">' + tsChips([{ sec: s.timeSec, label: fmt(s.timeSec) }]).replace('<div class="tsrow">', '').replace(/<\/div>$/, '') +
          '<a class="go" href="' + esc(s.ref) + '">관련 화면 →</a></div></figcaption></figure>';
      }).join('');
      Array.prototype.forEach.call(document.querySelectorAll('[data-g]'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-g') === group ? 'true' : 'false'); });
      setQuery('gallery', { group: group === 'all' ? '' : group });
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-g]'), function (b) {
      b.addEventListener('click', function () { group = b.getAttribute('data-g'); draw(); });
    });
    draw();
  }

  /* ---------- 라우터 ---------- */
  var routes = {
    '': ['home', '홈', viewHome], home: ['home', '홈', viewHome],
    moves: ['moves', '기술 변경', viewMoves], pokemon: ['pokemon', '포켓몬', viewPokemon],
    timeline: ['timeline', '타임라인', viewTimeline], kingambit: ['kingambit', '대도각참', viewKingambit],
    gallery: ['gallery', '갤러리', viewGallery]
  };
  function route() {
    var h = location.hash || '#/';
    var path = h.replace(/^#\/?/, '').split('?')[0];
    var r = routes[path] || routes[''];
    r[2](parseQuery(h));
    document.title = (r[0] === 'home' ? '' : r[1] + ' · ') + '포켓몬GO 패치 & 대도각참 평가';
    Array.prototype.forEach.call(document.querySelectorAll('#nav a'), function (a) {
      if (a.getAttribute('data-route') === r[0]) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  /* ---------- 라이트박스 ---------- */
  var lb = document.getElementById('lightbox'), lbIdx = 0, lastFocus = null;
  function openShot(id) {
    lbIdx = Math.max(0, C.screenshots.findIndex(function (s) { return s.id === id; }));
    lastFocus = document.activeElement;
    lb.hidden = false; renderShot();
    document.getElementById('lbClose').focus();
    document.body.style.overflow = 'hidden';
  }
  function renderShot() {
    var s = C.screenshots[lbIdx];
    var img = document.getElementById('lbImg'); img.src = s.file; img.alt = s.alt;
    document.getElementById('lbCap').textContent = s.caption + '  (' + (lbIdx + 1) + '/' + C.screenshots.length + ')';
    document.getElementById('lbActions').innerHTML = '<button type="button" class="icon-btn" data-sec="' + s.timeSec + '">▶ 영상 ' + fmt(s.timeSec) + '</button><a href="' + esc(s.ref) + '" id="lbRef">관련 화면 보기</a>';
  }
  function closeShot() {
    lb.hidden = true; document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function stepShot(d) { lbIdx = (lbIdx + d + C.screenshots.length) % C.screenshots.length; renderShot(); }

  /* ---------- 플레이어 ---------- */
  var player = document.getElementById('player'), ytp = null, ytReady = false, ytLoading = false, pending = null;
  var embedBox = document.getElementById('embedToggle');
  var canEmbed = /^https?:$/.test(location.protocol);

  function seek(sec) {
    if (!embedBox.checked || !canEmbed) { window.open(watchUrl(sec), '_blank', 'noopener'); return; }
    player.hidden = false;
    document.getElementById('playerTitle').textContent = C.meta.title + ' · ' + fmt(sec);
    if (ytReady && ytp) { ytp.seekTo(sec, true); ytp.playVideo(); return; }
    pending = sec;
    if (ytLoading) return;
    ytLoading = true;
    var failTimer = setTimeout(function () {       // 불러오지 못하면 새 탭으로 대체
      if (!ytReady) { player.hidden = true; ytLoading = false; window.open(watchUrl(pending), '_blank', 'noopener'); }
    }, 6000);
    window.onYouTubeIframeAPIReady = function () {
      ytp = new YT.Player('ytHost', {
        videoId: C.meta.videoId, playerVars: { start: pending || 0, rel: 0, autoplay: 1 },
        events: { onReady: function () { ytReady = true; clearTimeout(failTimer); if (pending != null) { ytp.seekTo(pending, true); ytp.playVideo(); } },
                  onError: function () { clearTimeout(failTimer); player.hidden = true; ytLoading = false; ytReady = false; window.open(watchUrl(pending), '_blank', 'noopener'); } }
      });
    };
    var sc = document.createElement('script');
    sc.src = 'https://www.youtube.com/iframe_api';
    sc.onerror = function () { clearTimeout(failTimer); player.hidden = true; ytLoading = false; window.open(watchUrl(pending), '_blank', 'noopener'); };
    document.head.appendChild(sc);
  }

  /* ---------- 전역 이벤트 ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-sec]');
    if (t) { e.preventDefault(); seek(Number(t.getAttribute('data-sec'))); return; }
    var s = e.target.closest('[data-shot]');
    if (s) { openShot(s.getAttribute('data-shot')); return; }
    if (e.target.id === 'lbRef') closeShot();
  });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-inner')) closeShot(); });
  document.getElementById('lbClose').addEventListener('click', closeShot);
  document.getElementById('lbPrev').addEventListener('click', function () { stepShot(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { stepShot(1); });
  document.getElementById('playerClose').addEventListener('click', function () { player.hidden = true; if (ytp && ytReady) ytp.pauseVideo(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeShot();
    else if (e.key === 'ArrowLeft') stepShot(-1);
    else if (e.key === 'ArrowRight') stepShot(1);
    else if (e.key === 'Tab') {                         // 포커스 가두기
      var f = Array.prototype.slice.call(lb.querySelectorAll('button,a[href]')).filter(function (x) { return !x.hidden; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });


  // 용어 툴팁 (화면 밖으로 나가지 않도록 위치를 보정)
  var tipEl = document.createElement('div');
  tipEl.id = 'tip'; tipEl.setAttribute('role', 'tooltip'); tipEl.hidden = true;
  document.body.appendChild(tipEl);
  function showTip(el) {
    tipEl.textContent = el.getAttribute('data-def'); tipEl.hidden = false;
    var r = el.getBoundingClientRect(), w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    var left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    var top = r.top - h - 8; if (top < 8) top = r.bottom + 8;
    tipEl.style.left = left + 'px'; tipEl.style.top = top + 'px';
  }
  function hideTip() { tipEl.hidden = true; }
  document.addEventListener('mouseover', function (e) { var t = e.target.closest && e.target.closest('.term'); if (t) showTip(t); });
  document.addEventListener('mouseout', function (e) { if (e.target.closest && e.target.closest('.term')) hideTip(); });
  document.addEventListener('focusin', function (e) { var t = e.target.closest && e.target.closest('.term'); if (t) showTip(t); });
  document.addEventListener('focusout', hideTip);
  window.addEventListener('scroll', hideTip, { passive: true });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });

  // 테마
  var root = document.documentElement;
  function applyTheme(t) { root.setAttribute('data-theme', t); document.getElementById('themeBtn').textContent = t === 'dark' ? '라이트' : '다크'; }
  var savedTheme = store('pgo-theme');
  applyTheme(savedTheme || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  document.getElementById('themeBtn').addEventListener('click', function () {
    var n = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; applyTheme(n); store('pgo-theme', n);
  });

  // 임베드 옵션
  if (!canEmbed) {
    embedBox.disabled = true; embedBox.checked = false;
    document.getElementById('embedToggleWrap').title = '파일을 직접 연 상태(file://)에서는 임베드 재생이 제한되어 새 탭으로 열립니다';
  } else {
    embedBox.checked = store('pgo-embed') === '1';
    embedBox.addEventListener('change', function () { store('pgo-embed', embedBox.checked ? '1' : '0'); });
  }

  /* ---------- 시작 ---------- */
  function init(data) {
    C = data;
    C.screenshots.forEach(function (s) { shotMap[s.id] = s; });
    document.getElementById('bannerFull').textContent = C.disclaimers.map(function (d) { return d.text; }).join(' ');
    var more = document.getElementById('bannerMore');
    more.addEventListener('click', function () {
      var p = document.getElementById('bannerFull'), open = p.hidden;
      p.hidden = !open; more.setAttribute('aria-expanded', String(open)); more.textContent = open ? '접기' : '자세히';
    });
    document.getElementById('foot').innerHTML = '<hr><p>원본 영상: <a href="' + esc(C.meta.url) + '" target="_blank" rel="noopener">' + esc(C.meta.title) + '</a> · ' + esc(C.meta.channel) +
      '. 이 페이지는 영상 내용을 정리한 비공식 자료이며, 화면 캡처의 권리는 원 채널에 있습니다.</p>';
    window.addEventListener('hashchange', route);
    route();
  }
  function fail(msg) { app.innerHTML = '<div class="card empty"><p>' + esc(msg) + '</p></div>'; }

  if (canEmbed && window.fetch) {
    fetch('data/content.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(init).catch(function () { window.CONTENT ? init(window.CONTENT) : fail('데이터를 불러오지 못했습니다.'); });
  } else if (window.CONTENT) init(window.CONTENT);
  else fail('데이터를 불러오지 못했습니다. data/content.js 파일을 확인하세요.');
})();
