(function () {
  var S = window.SITE;
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function person(p, fallbackName, fallbackDetail) {
    var c = el("li", "person");
    var a = el("div", "avatar");
    if (p.photo) {
      var i = el("img");
      i.src = p.photo; i.alt = ""; i.loading = "lazy";
      a.appendChild(i);
    }
    c.appendChild(a);
    c.appendChild(el("h4", p.name ? "" : "todo", p.name || fallbackName));
    c.appendChild(el("p", "", p.role || p.detail || fallbackDetail));
    return c;
  }
  var team = document.getElementById("team");
  S.team.forEach(function (p) { team.appendChild(person(p, "Name to add", "Role to add")); });

  var mem = document.getElementById("members");
  if (S.members.length) {
    S.members.forEach(function (p) { mem.appendChild(person(p, "", "")); });
  } else {
    mem.hidden = true;
    document.getElementById("members-empty").hidden = false;
  }

  var tl = document.getElementById("timeline");
  S.pastEvents.forEach(function (e) {
    var li = el("li");
    li.appendChild(el("span", "year", e.year));
    var d = el("div");
    d.appendChild(el("h4", "", e.title));
    d.appendChild(el("p", "date", e.date));
    d.appendChild(el("p", "", e.text));
    li.appendChild(d);
    tl.appendChild(li);
  });

  var links = document.getElementById("contact-links");
  function link(label, href, text) {
    var li = el("li");
    li.appendChild(el("span", "", label));
    var a = el("a", "", text);
    a.href = href;
    li.appendChild(a);
    links.appendChild(li);
  }
  link("Email", "mailto:" + S.email, S.email);
  if (S.instagram) link("Instagram", S.instagram, "Follow us on Instagram");
  if (S.linkedin) link("LinkedIn", S.linkedin, "Connect on LinkedIn");

  document.getElementById("year").textContent = new Date().getFullYear();

  var t = document.getElementById("menu"), n = document.getElementById("nav");
  t.addEventListener("click", function () {
    var open = n.classList.toggle("open");
    t.setAttribute("aria-expanded", open);
  });
  n.addEventListener("click", function () {
    n.classList.remove("open");
    t.setAttribute("aria-expanded", false);
  });
})();
