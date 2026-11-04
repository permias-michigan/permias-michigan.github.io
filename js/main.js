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
  var upcoming = S.events.filter(function (e) { return e.date >= today; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var past = S.events.filter(function (e) { return e.date < today; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  /* Shared header and footer */
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
  menu.addEventListener("click", function () { menu.setAttribute("aria-expanded", nav.classList.toggle("open")); });
  nav.addEventListener("click", function () { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); });

  var foot = $("site-foot");
  var c = el("section", "contact"); c.id = "contact";
  var cw = el("div", "wrap contact-in");
  var left = el("div");
  left.appendChild(el("h2", "", "Say hello"));
  left.appendChild(el("p", "", "Join us, partner with us, or reconnect as an alum."));
  cw.appendChild(left);
  var ul = el("div", "contact-links");
  ul.appendChild(link("btn sun mail", "mailto:" + S.email, S.email));
  if (S.instagram) ul.appendChild(link("btn ghost", S.instagram, "Instagram"));
  if (S.linkedin) ul.appendChild(link("btn ghost", S.linkedin, "LinkedIn"));
  cw.appendChild(ul); c.appendChild(cw); foot.appendChild(c);
  var f = el("div", "wrap foot");
  f.appendChild(el("p", "", "© " + d.getFullYear() + " Indonesian Students Association at U-M"));
  foot.appendChild(f);

  /* Photo viewer */
  var dlg, shown = [], at = 0;
  function show() {
    var p = shown[at];
    dlg.querySelector("img").src = p.src;
    dlg.querySelector("img").alt = p.caption || p.event || "Event photo";
    dlg.querySelector("figcaption").textContent = (p.caption || p.event || "") + " (" + (at + 1) + " of " + shown.length + ")";
  }
  function step(n) { at = (at + n + shown.length) % shown.length; show(); }
  function viewer() {
    if (dlg) return;
    dlg = el("dialog", "viewer");
    var close = el("button", "v-close", "Close");
    var prev = el("button", "", "Previous");
    var next = el("button", "", "Next");
    var fig = el("figure");
    fig.appendChild(el("img"));
    fig.appendChild(el("figcaption"));
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
      var li = el("li");
      var b = el("button");
      b.setAttribute("aria-label", "Open photo: " + (p.caption || eventName));
      var im = el("img"); im.src = p.src; im.alt = ""; im.loading = "lazy";
      b.appendChild(im);
      b.onclick = function () { viewer(); shown = list; at = i; show(); dlg.showModal(); };
      li.appendChild(b); grid.appendChild(li);
    });
    host.appendChild(grid);
  }

  /* Event cards */
  var tones = ["c-blue", "c-sky", "c-sun"];
  function card(e, i) {
    var li = el("li", e.featured ? "wide" : "");
    var a = link("card " + tones[i % 3], eventUrl(e));
    if (e.photos && e.photos[0]) {
      var im = el("img"); im.src = e.photos[0].src; im.alt = ""; im.loading = "lazy"; a.appendChild(im);
    }
    a.appendChild(el("span", "c-year", e.date.slice(0, 4)));
    a.appendChild(el("strong", "", e.title));
    a.appendChild(el("span", "c-sum", e.summary));
    li.appendChild(a);
    return li;
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
    if (hideEmpty) host.appendChild(el("h2", "spaced", "Coming up"));
    var ul = el("ul", "cards");
    upcoming.forEach(function (e, i) { ul.appendChild(card(e, i + 2)); });
    host.appendChild(ul);
  }

  /* Pages */
  if (page === "home") renderUpcoming($("home-upcoming"), true);
  if (page === "events") {
    renderUpcoming($("upcoming"));
    past.forEach(function (e, i) { $("past").appendChild(card(e, i)); });
    var used = past.length + past.filter(function (e) { return e.featured; }).length;
    var last = $("past").lastElementChild;
    if (last && used % 3 === 1) last.className = "full";
    if (last && used % 3 === 2) last.className = "wide";
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
    (e.overview || []).forEach(function (t) { body.appendChild(el("p", "lead", t)); });
    if (e.signup && e.date >= today) body.appendChild(link("btn blue", e.signup, "Sign up"));
    if (e.highlights && e.highlights.length) {
      var hl = el("ul", "pills");
      e.highlights.forEach(function (h) { hl.appendChild(el("li", "", h)); });
      body.appendChild(hl);
    }
    if (e.quote) {
      var q = el("blockquote", "", "“" + e.quote.text + "”");
      q.appendChild(el("cite", "", e.quote.by));
      body.appendChild(q);
    }
    if (e.schedule) {
      body.appendChild(el("h2", "spaced", "Program"));
      var pr = el("ol", "program");
      e.schedule.forEach(function (s) {
        var li = el("li");
        li.appendChild(el("time", "", s.when));
        li.appendChild(el("h3", "", s.title));
        li.appendChild(el("p", "", s.where));
        pr.appendChild(li);
      });
      body.appendChild(pr);
    }
    body.appendChild(el("h2", "spaced", "Gallery"));
    if (e.photos && e.photos.length) gallery(body, e.photos, e.title);
    else body.appendChild(el("p", "note", "Photos coming soon."));
    var pn = el("div", "pager");
    (e.links || []).forEach(function (l) { pn.appendChild(link("", l.url, l.label)); });
    var n = past.indexOf(e);
    if (n > -1 && past[n + 1]) pn.appendChild(link("next", eventUrl(past[n + 1]), "Older: " + past[n + 1].title));
    body.appendChild(pn);
  }
  if (page === "gallery") {
    var host = $("all-photos");
    var withPhotos = S.events.filter(function (e) { return e.photos && e.photos.length; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!withPhotos.length) {
      host.appendChild(el("p", "note", "Photos coming soon."));
      host.appendChild(link("btn blue", "events.html", "See our events"));
    }
    withPhotos.forEach(function (e, i) {
      var head = el("h2", i ? "spaced" : "");
      head.appendChild(link("", eventUrl(e), e.title));
      host.appendChild(head);
      gallery(host, e.photos, e.title);
    });
  }
  if (page === "team") {
    var person = function (p, i) {
      var li = el("li", "person");
      var a = el("div", "avatar " + (i % 2 ? "a-sun" : "a-blue"));
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
    S.team.forEach(function (p, i) { $("team").appendChild(person(p, i)); });
    if (S.team.length > 1) $("team-more").hidden = true;
    if (S.members.length) {
      $("member-block").hidden = false;
      S.members.forEach(function (p, i) { $("members").appendChild(person(p, i)); });
    }
  }
})();
