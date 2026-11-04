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
  var past = S.events.filter(function (e) { return e.date < today || e.dateUnconfirmed; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });

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
  [["events.html", "Events", "events"], ["gallery.html", "Gallery", "gallery"], ["team.html", "Team", "team"], ["#contact", "Contact", ""]].forEach(function (i) {
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
  if (S.instagram) box.appendChild(link("btn ghost", S.instagram, "Instagram"));
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
  function program(host, items) {
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
      if (btns[i].scrollIntoView && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = btns[i].offsetLeft - 16;
    }
    wrap.appendChild(tabs); wrap.appendChild(panel); host.appendChild(wrap);
    pick(items.length - 1);
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
  function photosSoon(host, text) {
    var box = el("div", "soon reveal"); box.dataset.batik = "";
    box.appendChild(el("p", "", text));
    host.appendChild(box);
  }

  /* Event cards */
  function card(e) {
    var li = el("li", "reveal");
    li.dataset.kind = /festival/i.test(e.title) ? "Festivals" : /cultural night/i.test(e.title) ? "Cultural nights" : "Community";
    if (e.featured) li.dataset.featured = "1";
    var a = link("card spot", eventUrl(e));
    if (e.photos && e.photos[0]) {
      var im = el("img"); im.src = e.photos[0].src; im.alt = ""; im.loading = "lazy"; a.appendChild(im);
    }
    a.appendChild(el("span", "c-year", e.dateUnconfirmed ? "Past" : e.date.slice(0, 4)));
    a.appendChild(el("strong", "", e.title));
    a.appendChild(el("span", "c-sum", e.summary));
    a.appendChild(el("span", "c-go", "View event"));
    li.appendChild(a);
    return li;
  }
  function layoutCards(ul) {
    var items = [].filter.call(ul.children, function (li) { return !li.hidden; }), used = 0;
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
    var fest = S.events.filter(function (e) { return e.id === "icf-2026"; })[0];
    if (fest) program($("home-program"), fest.schedule);
  }
  if (page === "events") {
    renderUpcoming($("upcoming"));
    var pastList = $("past");
    past.forEach(function (e) { pastList.appendChild(card(e)); });
    layoutCards(pastList);
    var fbox = $("filters");
    ["All", "Festivals", "Cultural nights", "Community"].forEach(function (name) {
      var b = el("button", "chip", name);
      b.type = "button"; b.setAttribute("aria-pressed", name === "All");
      b.addEventListener("click", function () {
        [].forEach.call(fbox.children, function (o) { o.setAttribute("aria-pressed", o === b); });
        [].forEach.call(pastList.children, function (li) {
          li.hidden = name !== "All" && li.dataset.kind !== name;
          li.classList.add("in");
        });
        layoutCards(pastList);
      });
      fbox.appendChild(b);
    });
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
    [e.dateLabel, e.venue].forEach(function (x) { if (x) $("event-facts").appendChild(el("li", "", x)); });
    var body = $("event-body");
    (e.overview || []).forEach(function (t) { body.appendChild(el("p", "lead reveal", t)); });
    if (e.signup && e.date >= today) body.appendChild(link("btn blue", e.signup, "Sign up"));
    if (e.highlights && e.highlights.length) {
      var hl = el("ul", "pills reveal");
      e.highlights.forEach(function (h) { hl.appendChild(el("li", "", h)); });
      body.appendChild(hl);
    }
    if (e.quote) {
      var q = el("blockquote", "reveal", "“" + e.quote.text + "”");
      q.dataset.batik = "";
      q.appendChild(el("cite", "", e.quote.by));
      body.appendChild(q);
    }
    if (e.schedule) {
      body.appendChild(el("h2", "spaced reveal", "Program"));
      var pr = el("div", "light reveal"); pr.id = "event-program";
      body.appendChild(pr);
      program(pr, e.schedule);
    }
    body.appendChild(el("h2", "spaced reveal", "Gallery"));
    if (e.photos && e.photos.length) gallery(body, e.photos, e.title);
    else photosSoon(body, "Photos coming soon.");
    var pn = el("div", "pager reveal");
    (e.links || []).forEach(function (l) { pn.appendChild(link("", l.url, l.label)); });
    var n = past.indexOf(e);
    if (n > -1 && past[n + 1]) pn.appendChild(link("next", eventUrl(past[n + 1]), "Older: " + past[n + 1].title));
    body.appendChild(pn);
  }
  if (page === "gallery") {
    var host = $("all-photos");
    var withPhotos = S.events.filter(function (e) { return e.photos && e.photos.length; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!withPhotos.length) photosSoon(host, "Photos from our events are coming soon.");
    withPhotos.forEach(function (e, i) {
      var head = el("h2", i ? "spaced reveal" : "reveal");
      head.appendChild(link("", eventUrl(e), e.title));
      host.appendChild(head);
      gallery(host, e.photos, e.title);
    });
  }
  if (page === "team") {
    var person = function (p) {
      var li = el("li", "person spot reveal");
      var a = el("div", "avatar");
      if (p.photo) { var im = el("img"); im.src = p.photo; im.alt = "Photo of " + p.name; im.loading = "lazy"; a.appendChild(im); }
      li.appendChild(a);
      li.appendChild(el("h3", "", p.name));
      li.appendChild(el("p", "role", p.role || "Member"));
      var meta = [p.major, p.year].filter(Boolean).join(", ");
      if (meta) li.appendChild(el("p", "", meta));
      if (p.bio) li.appendChild(el("p", "", p.bio));
      if (p.linkedin) li.appendChild(link("", p.linkedin, "LinkedIn"));
      return li;
    };
    var depts = $("departments"), dfBox = $("dept-filters");
    var secs = S.departments.map(function (dep) {
      var sec = el("section", "dept");
      var dh = el("div", "dept-head reveal");
      dh.appendChild(el("h2", "", dep.name));
      if (dep.about) dh.appendChild(el("p", "", dep.about));
      sec.appendChild(dh);
      var ul = el("ul", "people");
      dep.people.forEach(function (p) { ul.appendChild(person(p)); });
      sec.appendChild(ul);
      depts.appendChild(sec);
      return sec;
    });
    if (secs.length > 1) {
      ["All"].concat(S.departments.map(function (x) { return x.name; })).forEach(function (name, i) {
        var b = el("button", "chip", name);
        b.type = "button"; b.setAttribute("aria-pressed", i === 0);
        b.addEventListener("click", function () {
          [].forEach.call(dfBox.children, function (o) { o.setAttribute("aria-pressed", o === b); });
          secs.forEach(function (sec, n) {
            sec.hidden = i !== 0 && n !== i - 1;
            [].forEach.call(sec.querySelectorAll(".reveal"), function (r) { r.classList.add("in"); });
          });
        });
        dfBox.appendChild(b);
      });
    } else dfBox.hidden = true;
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
