/*
 * Reads a BibTeX file and renders the publication list.
 * Used by _pages/publications.html. You don't need to edit this file:
 * just replace files/publications.bib.
 */
(function () {
  "use strict";

  var SECTIONS = [
    { title: "Journal Articles", types: ["article"] },
    { title: "Conference Papers", types: ["inproceedings", "conference", "proceedings"] },
    { title: "Books and Book Chapters", types: ["book", "incollection", "inbook"] },
    { title: "Other", types: null } // everything else
  ];
  var HIGHLIGHT = /\bCosta\b/; // names containing this word appear in bold
  var HIGHLIGHT_FIRST = /\bLuciano\b/;

  // ---------- BibTeX parsing ----------
  function parseBib(text) {
    var entries = [];
    var re = /@(\w+)\s*\{\s*([^,\s]*)\s*,/g;
    var m;
    while ((m = re.exec(text)) !== null) {
      var type = m[1].toLowerCase();
      if (type === "comment" || type === "string" || type === "preamble") continue;
      var pos = re.lastIndex;
      var fields = {};
      while (pos < text.length) {
        // skip whitespace and commas
        while (pos < text.length && /[\s,]/.test(text[pos])) pos++;
        if (text[pos] === "}" || text[pos] === "@" || pos >= text.length) break;
        var nameMatch = /^([\w\-:]+)\s*=\s*/.exec(text.slice(pos, pos + 200));
        if (!nameMatch) { // malformed: jump to next line
          var nl = text.indexOf("\n", pos);
          if (nl < 0) break;
          pos = nl + 1;
          continue;
        }
        pos += nameMatch[0].length;
        var value = "";
        var c = text[pos];
        if (c === "{") {
          var depth = 0, start = pos;
          for (; pos < text.length; pos++) {
            if (text[pos] === "{") depth++;
            else if (text[pos] === "}") { depth--; if (depth === 0) break; }
          }
          value = text.slice(start + 1, pos);
          pos++;
        } else if (c === '"') {
          var start2 = ++pos;
          while (pos < text.length && text[pos] !== '"') pos++;
          value = text.slice(start2, pos);
          pos++;
        } else {
          var bare = /^[^,}\n]*/.exec(text.slice(pos))[0];
          value = bare.trim();
          pos += bare.length;
        }
        fields[nameMatch[1].toLowerCase()] = value;
      }
      re.lastIndex = pos;
      entries.push({ type: type, key: m[2], fields: fields });
    }
    return entries;
  }

  // ---------- LaTeX -> text ----------
  var ACCENTS = { "`": "̀", "'": "́", "^": "̂", "~": "̃", '"': "̈", "=": "̄", ".": "̇", "c": "̧" };

  function latexToText(s) {
    if (!s) return "";
    s = s.replace(/\\([`'^~"=.])\s*\{?\s*(\\i|[A-Za-z])\s*\}?/g, function (_, acc, ch) {
      return (ch === "\\i" ? "i" : ch) + ACCENTS[acc];
    });
    s = s.replace(/\\c\s*\{?\s*([A-Za-z])\s*\}?/g, function (_, ch) { return ch + ACCENTS.c; });
    s = s.replace(/\\(textit|textbf|emph|textsc|textrm|mathrm)\s*\{([^{}]*)\}/g, "$2");
    s = s.replace(/\\&/g, "&").replace(/\\%/g, "%").replace(/\\_/g, "_");
    s = s.replace(/\\ss\b/g, "ß").replace(/\\o\b/g, "ø").replace(/\\i\b/g, "ı");
    s = s.replace(/---/g, "—").replace(/--/g, "–").replace(/~/g, " ");
    s = s.replace(/\$/g, "").replace(/[{}]/g, "").replace(/\s+/g, " ").trim();
    return s.normalize ? s.normalize("NFC") : s;
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function splitAuthors(raw) {
    var parts = [], depth = 0, last = 0;
    for (var i = 0; i < raw.length; i++) {
      var ch = raw[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      else if (depth === 0 && /\s/.test(ch) && /^\s+and\s+/i.test(raw.slice(i))) {
        parts.push(raw.slice(last, i));
        i += /^\s+and\s+/i.exec(raw.slice(i))[0].length - 1;
        last = i + 1;
      }
    }
    parts.push(raw.slice(last));
    return parts.map(function (p) {
      var name = latexToText(p);
      var comma = name.indexOf(",");
      if (comma >= 0) name = name.slice(comma + 1).trim() + " " + name.slice(0, comma).trim();
      var html = escapeHtml(name);
      if (HIGHLIGHT.test(name) && HIGHLIGHT_FIRST.test(name)) html = "<strong>" + html + "</strong>";
      return html;
    }).filter(function (n) { return n.length > 0; });
  }

  function joinAuthors(list) {
    if (list.length <= 1) return list.join("");
    return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
  }

  // ---------- Rendering ----------
  function formatEntry(e) {
    var f = e.fields;
    var out = [];
    if (f.author) out.push(joinAuthors(splitAuthors(f.author)) + ".");
    var title = latexToText(f.title);
    var doi = (f.doi || "").replace(/^\s*https?:\/\/(dx\.)?doi\.org\//i, "").trim();
    var link = doi ? "https://doi.org/" + doi : (f.url || "").trim();
    if (title) {
      var t = escapeHtml(title);
      out.push(link ? '<a href="' + escapeHtml(link) + '">' + t + "</a>." : t + ".");
    }
    var venue = latexToText(f.journal || f.booktitle || f.publisher || f.school || f.howpublished || "");
    var details = [];
    if (venue) details.push("<em>" + escapeHtml(venue) + "</em>");
    var vol = latexToText(f.volume);
    var num = latexToText(f.number);
    if (vol) details.push(escapeHtml(vol) + (num ? "(" + escapeHtml(num) + ")" : ""));
    var pages = latexToText(f.pages);
    if (pages) details.push(escapeHtml(pages));
    if (f.year) details.push(escapeHtml(latexToText(f.year)));
    if (details.length) out.push(details.join(", ") + ".");
    if (f.note) out.push("<em>" + escapeHtml(latexToText(f.note)) + "</em>.");
    if (doi) out.push('<small>DOI: <a href="https://doi.org/' + escapeHtml(doi) + '">' + escapeHtml(doi) + "</a></small>");
    return out.join(" ");
  }

  function yearOf(e) {
    var y = parseInt(latexToText(e.fields.year), 10);
    return isNaN(y) ? 0 : y;
  }

  function render(container, entries) {
    var used = {};
    var html = "";
    var total = 0;
    SECTIONS.forEach(function (sec) {
      var list = entries.filter(function (e, i) {
        if (used[i]) return false;
        var match = sec.types === null || sec.types.indexOf(e.type) >= 0;
        if (match) used[i] = true;
        return match;
      });
      if (!list.length) return;
      // stable sort: newest first, keeping file order within a year
      list = list.map(function (e, i) { return { e: e, i: i }; })
        .sort(function (a, b) { return yearOf(b.e) - yearOf(a.e) || a.i - b.i; })
        .map(function (x) { return x.e; });
      html += "<h2>" + sec.title + "</h2><ol reversed>";
      list.forEach(function (e) { html += '<li style="margin-bottom: 0.8em;">' + formatEntry(e) + "</li>"; });
      html += "</ol>";
      total += list.length;
    });
    container.innerHTML = total ? html : "<p>No publications found in the .bib file.</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("bib-publications");
    if (!container) return;
    fetch(container.getAttribute("data-bib"), { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (text) { render(container, parseBib(text)); })
      .catch(function () { container.innerHTML = "<p>Could not load the publication list.</p>"; });
  });
})();
