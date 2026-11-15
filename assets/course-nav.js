(() => {
    "use strict";

    const script = document.currentScript;
    // assets/course-nav.js → rădăcina cursului e ../
    const courseRoot = new URL("../", script?.src || location.href);
    const dataJs = new URL("course-data.js", script?.src || courseRoot);
    const dataJson = new URL("course.json", script?.src || courseRoot);

    const path = (location.pathname + " " + location.href).replace(/\\/g, "/");
    const match = path.match(/lectii\/([^/]+)\//);
    const slug = match ? match[1] : null;
    if (!slug) return;

    function esc(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function escAttr(s) {
        return esc(s).replace(/"/g, "&quot;");
    }

    function paintThemes(themes, currentSlug) {
        const toc = document.getElementById("toc");
        if (!toc) return;

        toc.innerHTML = themes.map((t) => {
            const active = t.slug === currentSlug ? " active" : "";
            if (t.status !== "ready") {
                return `<li><span class="toc-soon" title="În curând"><span class="toc-id">${esc(t.id)}</span> ${esc(t.title)} <em>în curând</em></span></li>`;
            }
            const href = new URL("lectii/" + t.slug + "/index.html", courseRoot).href;
            return `<li><a class="${active.trim()}" href="${escAttr(href)}" data-slug="${escAttr(t.slug)}"><span class="toc-id">${esc(t.id)}</span> ${esc(t.title)}</a></li>`;
        }).join("");
    }

    function paint(data) {
        const themes = data.themes || [];
        if (!themes.some((t) => t.slug === slug)) return;
        document.querySelector(".course-strip")?.remove();
        paintThemes(themes, slug);
    }

    function start() {
        document.querySelector(".course-strip")?.remove();
        if (window.ATELIER_COURSE) {
            paint(window.ATELIER_COURSE);
            return;
        }
        const dataScript = document.createElement("script");
        dataScript.src = dataJs.href;
        dataScript.onload = () => paint(window.ATELIER_COURSE || { themes: [] });
        dataScript.onerror = () => {
            fetch(dataJson.href)
                .then((r) => r.json())
                .then(paint)
                .catch(() => {});
        };
        document.head.append(dataScript);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
})();
