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
  var navItems = [["index.html", "About", "home"], ["events.html", "Events", "events"], ["gallery.html", "Gallery", "gallery"], ["team.html", "Team", "team"], ["#contact", "Contact", ""]];
  var bar = $("bar");
  var inner = el("div", "wrap bar-in");
  var home = link("", "index.html");
  var logo = el("img", "logo"); logo.src = "assets/logo.png"; logo.alt = "Indonesian Students Association at Umich, home";
  home.appendChild(logo); inner.appendChild(home);
  var menu = el("button", "menu", "Menu"); menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-controls", "nav");
  inner.appendChild(menu);
  var nav = el("nav"); nav.id = "nav";
  navItems.forEach(function (i) {
    var a = link("", i[0], i[1]);
    if (i[2] === page) a.setAttribute("aria-current", "page");
    nav.appendChild(a);
  });
  inner.appendChild(nav); bar.appendChild(inner);
  menu.addEventListener("click", function () { menu.setAttribute("aria-expanded", nav.classList.toggle("open")); });
  nav.addEventListener("click", function () { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); });

  var foot = $("site-foot");
  var c = el("section", "contact"); c.id = "contact";
  var cw = el("div", "wrap sec split");
  var left = el("div");
  left.appendChild(el("h2", "", "Contact"));
  left.appendChild(el("p", "lead", "Want to join, partner with us, or reconnect as an alum? We'd love to hear from you."));
  var ul = el("ul", "contact-links");
  [["Email", "mailto:" + S.email, S.email], ["Instagram", S.instagram, "Follow us on Instagram"], ["LinkedIn", S.linkedin, "Connect on LinkedIn"]].forEach(function (r) {
    if (r[1]) { var li = el("li"); li.appendChild(el("span", "", r[0])); li.appendChild(link("", r[1], r[2])); ul.appendChild(li); }
  });
  cw.appendChild(left); cw.appendChild(ul); c.appendChild(cw); foot.appendChild(c);
  var f = el("div", "wrap foot");
  f.appendChild(el("p", "", "© " + d.getFullYear() + " Indonesian Students Association at Umich. Ann Arbor, Michigan."));
  foot.appendChild(f);

  /* Photo viewer */
  var dlg, shown = [], at = 0;
  function show() {
    var p = shown[at];
    dlg.querySelector("img").src = p.src;
    dlg.querySelector("img").alt = p.caption || p.event || "Event photo";
    dlg.querySelector("figcaption").textContent = (p.caption || p.event || "") + "  (" + (at + 1) + " of " + shown.length + ")";
  }
  function step(n) { at = (at + n + shown.length) % shown.length; show(); }
  function viewer() {
    if (dlg) return;
    dlg = el("dialog", "viewer");
    var close = el("button", "v-close", "Close");
    var prev = el("button", "v-nav", "Previous");
    var next = el("button", "v-nav", "Next");
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

  /* Event rows */
  function row(e) {
    var li = el("li");
    li.appendChild(el("span", "year", e.date.slice(0, 4)));
    var b = el("div");
    b.appendChild(el("h3", "", e.title));
    if (e.theme) b.appendChild(el("p", "theme-ink", e.theme));
    b.appendChild(el("p", "date", e.dateLabel));
    b.appendChild(el("p", "", e.summary));
    var more = link("more", eventUrl(e), "View " + e.title);
    b.appendChild(more);
    li.appendChild(b);
    if (e.photos && e.photos[0]) {
      var im = el("img", "thumb"); im.src = e.photos[0].src; im.alt = ""; im.loading = "lazy"; li.appendChild(im);
    }
    return li;
  }
  function renderUpcoming(host) {
    if (!upcoming.length) {
      var p = el("p", "empty");
      p.appendChild(document.createTextNode("No upcoming events are posted yet. "));
      p.appendChild(link("", "#contact", "Contact us"));
      p.appendChild(document.createTextNode(" to hear what's next."));
      host.appendChild(p);
      return;
    }
    var ol = el("ol", "timeline");
    upcoming.forEach(function (e) { ol.appendChild(row(e)); });
    host.appendChild(ol);
  }

  /* Pages */
  if (page === "home") {
    renderUpcoming($("home-upcoming"));
  }
  if (page === "events") {
    renderUpcoming($("upcoming"));
    var pl = $("past");
    past.forEach(function (e) { pl.appendChild(row(e)); });
  }
  if (page === "event") {
    var id = new URLSearchParams(location.search).get("id");
    var i = S.events.findIndex(function (e) { return e.id === id; });
    var e = S.events[i];
    if (!e) {
      $("event-title").textContent = "We couldn't find that event";
      var m = el("p", "");
      m.appendChild(link("", "events.html", "See all events"));
      $("event-body").appendChild(m);
    } else renderEvent(e);
  }
  function renderEvent(e) {
    document.title = e.title + " | PERMIAS Michigan";
    $("event-title").textContent = e.title;
    if (e.theme) $("event-theme").textContent = e.theme;
    var body = $("event-body");
    var top = el("div", "split");
    var main = el("div", "prose");
    (e.overview || []).forEach(function (t, n) { main.appendChild(el("p", n ? "" : "lead", t)); });
    top.appendChild(main);
    var side = el("div", "year-round");
    side.appendChild(el("h2", "h-small", "Event details"));
    var dl = el("dl");
    [["Date", e.dateLabel], ["Location", e.venue], ["Hosted by", "Indonesian Students Association at Umich"]].forEach(function (r) {
      if (r[1]) { dl.appendChild(el("dt", "", r[0])); dl.appendChild(el("dd", "", r[1])); }
    });
    side.appendChild(dl);
    if (e.signup && e.date >= today) side.appendChild(link("btn gold side-btn", e.signup, "Sign up"));
    top.appendChild(side);
    body.appendChild(top);

    if (e.highlights && e.highlights.length) {
      body.appendChild(el("h2", "sub", "Highlights"));
      var hl = el("ul", "highlights");
      e.highlights.forEach(function (h) { hl.appendChild(el("li", "", h)); });
      body.appendChild(hl);
    }
    if (e.quote) {
      var q = el("blockquote", "", "“" + e.quote.text + "”");
      q.appendChild(el("cite", "", e.quote.by));
      body.appendChild(q);
    }
    if (e.schedule) {
      body.appendChild(el("h2", "sub", "Program"));
      var pr = el("ol", "schedule");
      e.schedule.forEach(function (s) {
        var li = el("li");
        li.appendChild(el("time", "", s.when));
        var dv = el("div");
        dv.appendChild(el("h3", "", s.title));
        dv.appendChild(el("p", "where", s.where));
        dv.appendChild(el("p", "", s.text));
        li.appendChild(dv); pr.appendChild(li);
      });
      body.appendChild(pr);
    }
    body.appendChild(el("h2", "sub", "Gallery"));
    if (e.photos && e.photos.length) gallery(body, e.photos, e.title);
    else body.appendChild(el("p", "empty", "Photos from this event are being added."));

    if (e.links && e.links.length) {
      body.appendChild(el("h2", "sub", "Read more"));
      var ll = el("ul", "read-more");
      e.links.forEach(function (l) { var li = el("li"); li.appendChild(link("", l.url, l.label)); ll.appendChild(li); });
      body.appendChild(ll);
    }
    var pn = el("div", "pager");
    var newer = past[past.indexOf(e) - 1], older = past[past.indexOf(e) + 1];
    pn.appendChild(link("", "events.html", "All events"));
    if (past.indexOf(e) > -1 && newer) pn.appendChild(link("", eventUrl(newer), "Newer: " + newer.title));
    if (past.indexOf(e) > -1 && older) pn.appendChild(link("", eventUrl(older), "Older: " + older.title));
    body.appendChild(pn);
  }
  if (page === "gallery") {
    var host = $("all-photos");
    var withPhotos = S.events.filter(function (e) { return e.photos && e.photos.length; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!withPhotos.length) host.appendChild(el("p", "empty", "Event photos are being added."));
    withPhotos.forEach(function (e) {
      var head = el("h2", "sub");
      head.appendChild(link("", eventUrl(e), e.title));
      host.appendChild(head);
      gallery(host, e.photos, e.title);
    });
  }
  if (page === "team") {
    function person(p) {
      var li = el("li", "person");
      var a = el("div", "avatar");
      if (p.photo) { var im = el("img"); im.src = p.photo; im.alt = "Photo of " + p.name; im.loading = "lazy"; a.appendChild(im); }
      li.appendChild(a);
      var t = el("div");
      t.appendChild(el("h3", p.name ? "" : "todo", p.name || "Name to add"));
      t.appendChild(el("p", "role", p.role || (p.name ? "Member" : "Role to add")));
      var meta = [p.major, p.year].filter(Boolean).join(", ");
      if (meta) t.appendChild(el("p", "", meta));
      if (p.bio) t.appendChild(el("p", "", p.bio));
      if (p.linkedin) t.appendChild(link("more", p.linkedin, "LinkedIn profile for " + p.name));
      li.appendChild(t);
      return li;
    }
    var tm = $("team");
    S.team.forEach(function (p) { tm.appendChild(person(p)); });
    if (S.members.length) S.members.forEach(function (p) { $("members").appendChild(person(p)); });
    else { $("members").hidden = true; $("members-empty").hidden = false; }
  }
})();
