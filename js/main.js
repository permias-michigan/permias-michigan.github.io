(function () {
  var S = window.SITE;
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function link(cls, href, text) { var a = el("a", cls, text); a.href = href; return a; }
  function eventUrl(e) { return "event.html?id=" + encodeURIComponent(e.id); }

  var d = new Date();
  var today = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  var upcoming = S.events.filter(function (e) { return e.date >= today && !e.dateUnconfirmed; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var past = S.events.filter(function (e) { return e.date < today || e.dateUnconfirmed; }).sort(function (a, b) {
    if (!a.dateUnconfirmed !== !b.dateUnconfirmed) return a.dateUnconfirmed ? 1 : -1;
    return a.date < b.date ? 1 : -1;
  });

  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.documentElement.classList.add("js");

  /* Header */
  var page = document.body.dataset.page;
  var bar = $("bar");
  var inner = el("div", "wrap bar-in");
  var home = link("brand", "index.html");
  var logo = el("img"); logo.src = "assets/favicon.png"; logo.alt = "";
  home.appendChild(logo); home.appendChild(el("span", "", "PERMIAS Michigan"));
  inner.appendChild(home);
  var menu = el("button", "menu", "Menu"); menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-controls", "nav");
  inner.appendChild(menu);
  var nav = el("nav"); nav.id = "nav";
  [["events.html", "Events", "events"], ["team.html", "Team", "team"], ["resources.html", "Resources", "resources"], ["#contact", "Contact", ""]].forEach(function (i) {
    var a = link("", i[0], i[1]);
    if (i[2] === page || (page === "event" && i[2] === "events")) a.setAttribute("aria-current", "page");
    nav.appendChild(a);
  });
  inner.appendChild(nav); bar.appendChild(inner);
  var progress = el("div", "progress"); bar.appendChild(progress);
  menu.addEventListener("click", function () { menu.setAttribute("aria-expanded", nav.classList.toggle("open")); });
  nav.addEventListener("click", function () { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); });
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = "scaleX(" + (h > 0 ? scrollY / h : 0) + ")";
    bar.classList.toggle("scrolled", scrollY > 12);
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* Contact */
  var foot = $("site-foot");
  var c = el("section", "contact"); c.id = "contact"; c.dataset.batik = "";
  var cw = el("div", "wrap contact-in");
  var left = el("div", "reveal");
  left.appendChild(el("h2", "", "Let's connect"));
  left.appendChild(el("p", "", "Join us, partner with us, or reconnect as an alum."));
  cw.appendChild(left);
  var box = el("div", "contact-links reveal");
  box.appendChild(link("btn sun mail", "mailto:" + S.email, S.email));
  var copy = el("button", "btn ghost", "Copy email");
  copy.addEventListener("click", function () {
    var done = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy email"; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(S.email).then(done, function () { copy.textContent = "Press and hold the address to copy"; });
    else copy.textContent = "Press and hold the address to copy";
  });
  box.appendChild(copy);
  if (S.instagram) box.appendChild(link("btn ghost", S.instagram, "@indonesia.umich on Instagram"));
  if (S.linkedin) box.appendChild(link("btn ghost", S.linkedin, "LinkedIn"));
  cw.appendChild(box); c.appendChild(cw); foot.appendChild(c);
  var f = el("div", "wrap foot");
  f.appendChild(el("p", "", "© " + d.getFullYear() + " Indonesian Students Association at U-M"));
  foot.appendChild(f);

  /* Live batik: a kawung field that blooms around the pointer */
  function batik(host) {
    var hero = host.dataset.batik === "hero";
    var cv = el("canvas", "batik"); cv.setAttribute("aria-hidden", "true");
    host.insertBefore(cv, host.firstChild);
    var ctx = cv.getContext("2d"), w = 0, h = 0, size = hero ? 92 : 72;
    var born = performance.now(), visible = true, raf = 0;
    var tx = 0, ty = 0, px = 0, py = 0, lastMove = -1e9;
    function resize() {
      var r = host.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!tx) { px = tx = w * .75; py = ty = h * .5; }
    }
    function petal(cx, cy, sx, sy, bulge) {
      var ex = cx + sx * size / 2, ey = cy + sy * size / 2;
      var mx = (cx + ex) / 2, my = (cy + ey) / 2, nx = -sy * size * bulge, ny = sx * size * bulge;
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(mx + nx, my + ny, ex, ey);
      ctx.quadraticCurveTo(mx - nx, my - ny, cx, cy);
    }
    function draw(now) {
      var t = (now - born) / 1000;
      if (now - lastMove > 2500) {   /* gentle drift when nobody is pointing */
        tx = w * (.68 + .24 * Math.sin(t * .35)); ty = h * (.5 + .36 * Math.cos(t * .47));
      }
      px += (tx - px) * .07; py += (ty - py) * .07;
      ctx.clearRect(0, 0, w, h);
      var radius = hero ? 230 : 170, wide = w > 860, glow = wide ? 1 : .45;
      for (var yi = 0; yi * size <= h + size; yi++) {
        for (var xi = 0; xi * size <= w + size; xi++) {
          var x = xi * size, y = yi * size;
          var dx = x - px, dy = y - py;
          var near = glow * Math.exp(-(dx * dx + dy * dy) / (radius * radius));
          var wave = .5 + .5 * Math.sin(t * .7 + (x + y) * .006);
          var side = wide ? Math.min(1, Math.max(.28, (x / w - .25) * 2.2)) : .45;
          var intro = calm ? 1 : Math.min(1, Math.max(0, t * 1.1 - (w - x) / w * .7));
          var alpha = (.08 + .16 * wave) * side * intro;
          ctx.beginPath();
          var bulge = .17 + near * .1;
          petal(x, y, 1, 1, bulge); petal(x, y, -1, 1, bulge); petal(x, y, 1, -1, bulge); petal(x, y, -1, -1, bulge);
          if (near > .02) { ctx.fillStyle = "rgba(245,184,46," + (near * .3 * intro) + ")"; ctx.fill(); }
          ctx.strokeStyle = "rgba(245,184,46," + Math.min(1, alpha + near * .85 * intro) + ")";
          ctx.lineWidth = 1 + near * .7;
          ctx.stroke();
          if (near > .12) {
            ctx.beginPath(); ctx.arc(x, y, 1.5 + near * 3, 0, 6.3);
            ctx.fillStyle = "rgba(255,226,150," + near * intro + ")"; ctx.fill();
          }
        }
      }
      if (visible && !calm) raf = requestAnimationFrame(draw);
    }
    resize();
    addEventListener("resize", function () { resize(); if (calm) draw(born + 5000); });
    host.addEventListener("pointermove", function (e) {
      var r = host.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top; lastMove = performance.now();
    }, { passive: true });
    if (calm) { draw(born + 5000); return; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(draw);
      }).observe(host);
    } else raf = requestAnimationFrame(draw);
  }

  /* Hover: batik spotlight and a slight tilt */
  function spot(n) {
    if (!fine) return;
    n.addEventListener("pointermove", function (e) {
      var r = n.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      n.style.setProperty("--mx", x + "px"); n.style.setProperty("--my", y + "px");
      if (!calm) n.style.setProperty("--tilt", "perspective(900px) rotateX(" + ((r.height / 2 - y) / r.height * 3).toFixed(2) + "deg) rotateY(" + ((x - r.width / 2) / r.width * 3).toFixed(2) + "deg)");
    });
    n.addEventListener("pointerleave", function () { n.style.removeProperty("--tilt"); });
  }

  /* Interactive program timeline */
  function program(host, items, start) {
    var wrap = el("div", "stepper");
    var tabs = el("div", "steps"); tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-label", "Festival program");
    var panel = el("div", "panel"); panel.setAttribute("role", "tabpanel"); panel.tabIndex = 0;
    var uid = host.id || "prog";
    panel.id = uid + "-panel";
    var fill = el("span", "fill"); fill.setAttribute("aria-hidden", "true"); tabs.appendChild(fill);
    var btns = items.map(function (s, i) {
      var b = el("button", "step");
      b.type = "button"; b.id = uid + "-tab-" + i;
      b.setAttribute("role", "tab"); b.setAttribute("aria-controls", panel.id);
      b.appendChild(el("time", "", s.when));
      b.appendChild(el("span", "", s.title));
      b.addEventListener("click", function () { pick(i); });
      b.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (n) { e.preventDefault(); pick((i + n + items.length) % items.length); btns[(i + n + items.length) % items.length].focus(); }
      });
      tabs.appendChild(b);
      return b;
    });
    function pick(i) {
      btns.forEach(function (b, n) {
        b.setAttribute("aria-selected", n === i);
        b.tabIndex = n === i ? 0 : -1;
        b.classList.toggle("done", n <= i);
      });
      fill.style.setProperty("--p", items.length > 1 ? i / (items.length - 1) : 0);
      panel.setAttribute("aria-labelledby", btns[i].id);
      panel.textContent = "";
      var inner = el("div", "panel-in");
      inner.appendChild(el("h3", "", items[i].title));
      inner.appendChild(el("p", "where", items[i].where));
      if (items[i].text) inner.appendChild(el("p", "", items[i].text));
      panel.appendChild(inner);
      panel.classList.toggle("has-photo-panel", !!items[i].photo);
      if (items[i].photo) { var ph = el("img", "panel-photo"); ph.src = items[i].photo; ph.alt = items[i].title; panel.appendChild(ph); }
      if (btns[i].scrollIntoView && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = btns[i].offsetLeft - 16;
    }
    wrap.appendChild(tabs); wrap.appendChild(panel); host.appendChild(wrap);
    pick(start === undefined ? items.length - 1 : start);
  }

  /* Photo viewer */
  var dlg, shown = [], at = 0;
  function show() {
    var p = shown[at], im = dlg.querySelector("img");
    im.classList.remove("swap"); void im.offsetWidth; im.classList.add("swap");
    im.src = p.src;
    im.alt = p.caption || p.event || "Event photo";
    dlg.querySelector("figcaption").textContent = (p.caption || p.event || "") + " (" + (at + 1) + " of " + shown.length + ")";
  }
  function step(n) { at = (at + n + shown.length) % shown.length; show(); }
  function viewer() {
    if (dlg) return;
    dlg = el("dialog", "viewer");
    var close = el("button", "v-close", "Close"), prev = el("button", "", "Previous"), next = el("button", "", "Next");
    var fig = el("figure");
    fig.appendChild(el("img")); fig.appendChild(el("figcaption"));
    var ctl = el("div", "v-ctl");
    ctl.appendChild(prev); ctl.appendChild(next); ctl.appendChild(close);
    dlg.appendChild(fig); dlg.appendChild(ctl);
    document.body.appendChild(dlg);
    close.onclick = function () { dlg.close(); };
    prev.onclick = function () { step(-1); };
    next.onclick = function () { step(1); };
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }
  function gallery(host, photos, eventName) {
    var grid = el("ul", "gallery");
    var list = photos.map(function (p) { return { src: p.src, caption: p.caption, event: eventName }; });
    list.forEach(function (p, i) {
      var li = el("li", "reveal");
      var b = el("button");
      b.setAttribute("aria-label", "Open photo: " + (p.caption || eventName));
      var im = el("img"); im.src = p.src; im.alt = ""; im.loading = "lazy";
      b.appendChild(im);
      if (p.caption) b.appendChild(el("span", "cap", p.caption));
      b.onclick = function () { viewer(); shown = list; at = i; show(); dlg.showModal(); };
      li.appendChild(b); grid.appendChild(li);
    });
    host.appendChild(grid);
  }
  function longDate(iso) {
    var p = iso.split("-");
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return Number(p[2]) + " " + months[Number(p[1]) - 1] + " " + p[0];
  }

  /* Event cards */
  function card(e) {
    var li = el("li", "reveal");
        if (e.featured) li.dataset.featured = "1";
    var a = link("card spot", eventUrl(e));
    if (e.photos && e.photos[0]) {
      var im = el("img"); im.src = e.photos[0].src; im.alt = ""; im.loading = "lazy"; if (e.cardPos) im.style.objectPosition = e.cardPos; a.appendChild(im);
    }
    if (e.tba) a.appendChild(el("span", "c-year", "Soon"));
    else if (!e.dateUnconfirmed) a.appendChild(el("span", "c-year", e.cardDate || longDate(e.date)));
    if (e.category) a.appendChild(el("span", "c-tag", e.category));
    a.appendChild(el("strong", "", e.title));
    a.appendChild(el("span", "c-sum", e.summary));
    a.appendChild(el("span", "c-go", "View event"));
    li.appendChild(a);
    return li;
  }
  function layoutCards(ul) {
    var items = [].filter.call(ul.children, function (li) { return !li.hidden; }), used = 0;
    if (items.length === 3 && items[0].dataset.featured) {   /* one big card over two equal cards */
      ul.classList.add("two-up");
      items[0].classList.add("wide");
      return;
    }
    items.forEach(function (li) {
      li.classList.remove("wide", "full");
      if (li.dataset.featured) { li.classList.add("wide"); used += 2; } else used += 1;
    });
    var last = items[items.length - 1];
    if (last && used % 3 === 1) { last.classList.remove("wide"); last.classList.add("full"); }
    if (last && used % 3 === 2 && !last.dataset.featured) last.classList.add("wide");
  }
  function renderUpcoming(host, hideEmpty) {
    if (!upcoming.length) {
      if (hideEmpty) return;
      var p = el("p", "note");
      p.appendChild(document.createTextNode("Nothing posted yet. "));
      p.appendChild(link("", "#contact", "Ask us what's next."));
      host.appendChild(p);
      return;
    }
    if (hideEmpty) host.appendChild(el("h2", "spaced reveal", "Coming up"));
    var ul = el("ul", "cards");
    upcoming.forEach(function (e) { ul.appendChild(card(e)); });
    host.appendChild(ul);
    layoutCards(ul);
  }

  /* Pages */
  if (page === "home") {
    renderUpcoming($("home-upcoming"), true);
  }
  if (page === "events") {
    renderUpcoming($("upcoming"));
    var pastList = $("past");
    past.forEach(function (e) { pastList.appendChild(card(e)); });
    layoutCards(pastList);
  }
  if (page === "event") {
    var id = new URLSearchParams(location.search).get("id");
    var ev = S.events.filter(function (e) { return e.id === id; })[0];
    if (!ev) {
      $("event-title").textContent = "We couldn't find that event";
      $("event-body").appendChild(link("btn blue", "events.html", "See all events"));
    } else renderEvent(ev);
  }
  function renderEvent(e) {
    document.title = e.title + " | PERMIAS Michigan";
    $("event-title").textContent = e.title;
    if (e.theme) $("event-theme").textContent = e.theme;
    [e.category, e.dateLabel, e.venue].forEach(function (x) { if (x) $("event-facts").appendChild(el("li", "", x)); });
    var body = $("event-body");
    (e.overview || []).forEach(function (t, n2) { body.appendChild(el("p", n2 ? "ev-copy reveal" : "lead reveal", t)); });
    if (e.signup && e.date >= today) body.appendChild(link("btn blue", e.signup, "Sign up"));
    if (e.highlights && e.highlights.length) {
      var hl = el("ul", "pills reveal");
      e.highlights.forEach(function (h) { hl.appendChild(el("li", "", h)); });
      body.appendChild(hl);
    }
    if (e.speakers && e.speakers.length) {
      body.appendChild(el("h2", "spaced reveal", "Speakers"));
      var sp = el("ul", "speakers");
      e.speakers.forEach(function (s) {
        var li = el("li", "reveal");
        li.appendChild(el("h3", "", s.name));
        li.appendChild(el("p", "", s.role));
        if (s.url) li.appendChild(link("c-go", s.url, "LinkedIn profile"));
        sp.appendChild(li);
      });
      body.appendChild(sp);
    }
    if (e.quote) {
      var q = el("blockquote", "reveal", "“" + e.quote.text + "”");
      q.dataset.batik = "";
      q.appendChild(el("cite", "", e.quote.by));
      body.appendChild(q);
    }
    if (e.schedule) {
      body.appendChild(el("h2", "spaced reveal", e.scheduleTitle || "Program"));
      var pr = el("div", "light reveal"); pr.id = "event-program";
      body.appendChild(pr);
      program(pr, e.schedule, e.scheduleStart);
    }
    if (e.photos && e.photos.length) {
      body.appendChild(el("h2", "spaced reveal", "Photos"));
      gallery(body, e.photos, e.title);
    }
    var pn = el("div", "pager reveal");
    (e.links || []).forEach(function (l) { pn.appendChild(link("", l.url, l.label)); });
    var n = past.indexOf(e);
    if (n > -1 && past[n + 1]) pn.appendChild(link("next", eventUrl(past[n + 1]), "Older: " + past[n + 1].title));
    body.appendChild(pn);
  }
  if (page === "team") {
    var board = [], pdlg, pAt = 0;
    var fact = function (box, label, value) {
      if (!value) return;
      box.appendChild(el("dt", "", label));
      box.appendChild(el("dd", "", value));
    };
    var showPerson = function () {
      var p = board[pAt], body = pdlg.querySelector(".pf-body");
      var im = pdlg.querySelector(".pf-photo");
      im.src = p.photo || ""; im.alt = "Portrait of " + p.name; im.hidden = !p.photo;
      body.textContent = "";
      var box = el("div", "pf-in");
      box.appendChild(el("h2", "", p.name));
      if (p.pronouns) box.appendChild(el("p", "pf-pro", p.pronouns));
      if (p.role) box.appendChild(el("p", "role", p.role));
      if (p.degree) box.appendChild(el("p", "pf-deg", p.degree));
      if (p.bio) box.appendChild(el("p", "pf-bio", p.bio));
      var dl = el("dl");
      fact(dl, "Undergraduate institution", p.undergrad);
      if (p.clubs && p.clubs.length) {
        dl.appendChild(el("dt", "", "Clubs and affiliations"));
        var cd = el("dd"), cu = el("ul", "pf-clubs");
        p.clubs.forEach(function (x) { cu.appendChild(el("li", "", x)); });
        cd.appendChild(cu); dl.appendChild(cd);
      }
      fact(dl, "Research and professional interests", p.interests);
      fact(dl, "Always up for", p.upFor);
      fact(dl, "Favorite Indonesian food", p.food);
      box.appendChild(dl);
      if (p.linkedin) box.appendChild(link("", p.linkedin, "LinkedIn profile"));
      body.appendChild(box);
      pdlg.querySelector(".pf-count").textContent = (pAt + 1) + " of " + board.length;
      pdlg.scrollTop = 0; body.scrollTop = 0;
    };
    var stepPerson = function (n) { pAt = (pAt + n + board.length) % board.length; showPerson(); };
    var openPerson = function (i) {
      if (!pdlg) {
        pdlg = el("dialog", "profile");
        pdlg.setAttribute("aria-label", "Board profile");
        var card = el("div", "pf-card");
        var im = el("img", "pf-photo"); card.appendChild(im);
        var right = el("div", "pf-right");
        right.appendChild(el("div", "pf-body"));
        var ctl = el("div", "v-ctl");
        var prev = el("button", "", "Previous"), next = el("button", "", "Next"), close = el("button", "v-close", "Close");
        prev.onclick = function () { stepPerson(-1); }; next.onclick = function () { stepPerson(1); }; close.onclick = function () { pdlg.close(); };
        ctl.appendChild(prev); ctl.appendChild(next); ctl.appendChild(el("span", "pf-count")); ctl.appendChild(close);
        right.appendChild(ctl); card.appendChild(right); pdlg.appendChild(card);
        document.body.appendChild(pdlg);
        pdlg.addEventListener("click", function (e) { if (e.target === pdlg) pdlg.close(); });
        pdlg.addEventListener("keydown", function (e) {
          if (e.key === "ArrowLeft") stepPerson(-1);
          if (e.key === "ArrowRight") stepPerson(1);
        });
      }
      pAt = i; showPerson(); pdlg.showModal(); pdlg.scrollTop = 0; pdlg.querySelector(".pf-body").scrollTop = 0;
    };
    var person = function (p) {
      var li = el("li", "person spot reveal");
      var i = board.push(p) - 1;
      var b = el("button", "person-btn");
      b.type = "button";
      b.setAttribute("aria-label", "View profile: " + p.name);
      var a = el("div", "avatar");
      if (p.photo) { var im = el("img"); im.src = p.photo; im.alt = ""; im.loading = "lazy"; a.appendChild(im); }
      b.appendChild(a);
      b.appendChild(el("span", "p-name", p.name));
      if (p.role) b.appendChild(el("span", "role", p.role));
      if (p.degree) b.appendChild(el("span", "p-deg", p.degree));
      b.appendChild(el("span", "p-go", "View profile"));
      b.onclick = function () { openPerson(i); };
      li.appendChild(b);
      return li;
    };
    var depts = $("departments");
    S.departments.forEach(function (dep) {
      var sec = el("section", "dept");
      var dh = el("div", "dept-head reveal");
      dh.appendChild(el("h2", "", dep.name));
      if (dep.about) dh.appendChild(el("p", "", dep.about));
      sec.appendChild(dh);
      var ul = el("ul", "people");
      dep.people.forEach(function (p) { ul.appendChild(person(p)); });
      sec.appendChild(ul);
      depts.appendChild(sec);
    });
    var joinBox = el("div", "join-row reveal");
    var jt = el("div");
    jt.appendChild(el("h2", "", "Want to get involved?"));
    jt.appendChild(el("p", "", "We'd love to meet you."));
    joinBox.appendChild(jt);
    joinBox.appendChild(link("btn sun", "#contact", "Get in touch"));
    depts.parentNode.insertBefore(joinBox, $("member-block"));
    if (S.members.length) {
      $("member-block").hidden = false;
      S.members.forEach(function (p) { $("members").appendChild(person(p)); });
    }
  }

  /* Grocery popup */
  if ($("grocery-open")) {
    var gd = $("grocery-dialog");
    $("grocery-open").addEventListener("click", function () { gd.showModal(); gd.scrollTop = 0; });
    $("grocery-close").addEventListener("click", function () { gd.close(); });
    gd.addEventListener("click", function (e) { if (e.target === gd) gd.close(); });
  }

  /* Effects */
  [].forEach.call(document.querySelectorAll("[data-batik]"), batik);
  [].forEach.call(document.querySelectorAll(".spot"), spot);

  /* Optional homepage photo */
  var heroBox = document.querySelector(".hero");
  if (heroBox && S.heroPhoto) {
    heroBox.classList.add("has-photo");
    heroBox.insertBefore(el("div", "hero-shade"), heroBox.firstChild);
    var hp = el("img", "hero-photo"); hp.src = S.heroPhoto; hp.alt = "";
    heroBox.insertBefore(hp, heroBox.firstChild);
  }

  function countUp(n) {
    var to = +n.dataset.count, suffix = n.dataset.suffix || "", start = performance.now();
    function tick(now) {
      var k = Math.min(1, (now - start) / 1100), e = 1 - Math.pow(1 - k, 3);
      n.textContent = Math.round(to * e) + suffix;
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !calm) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        [].forEach.call(e.target.querySelectorAll("[data-count]"), countUp);
        io.unobserve(e.target);
      });
    }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    [].forEach.call(reveals, function (n) {
      var sibs = n.parentNode ? [].indexOf.call(n.parentNode.children, n) : 0;
      n.style.setProperty("--d", Math.min(sibs, 5) * 70 + "ms");
      io.observe(n);
    });
  } else {
    [].forEach.call(reveals, function (n) { n.classList.add("in"); });
  }
  onScroll();
})();
