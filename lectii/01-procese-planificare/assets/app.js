/* SO.lab — motor: markdown, terminale Linux/Windows, simulatoare */
(() => {
    "use strict";

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const fold = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch { /* */ } },
    };

    function dedent(text) {
        const lines = text.replace(/^\s*\n/, "").replace(/\s+$/, "").split("\n");
        const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
        const min = indents.length ? Math.min(...indents) : 0;
        return lines.map((l) => l.slice(min)).join("\n");
    }

    function inline(s) {
        return esc(s)
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^*]+)\*/g, "<em>$1</em>")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }

    function splitRow(line) {
        return line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
    }

    function codeBlock(code, lang) {
        const wrap = document.createElement("pre");
        wrap.className = "code-block";
        wrap.innerHTML = `<code>${esc(code)}</code>`;
        return wrap;
    }

    function renderMarkdown(src) {
        const root = document.createElement("div");
        root.className = "prose";
        const lines = dedent(src).split("\n");
        let i = 0, html = "";
        const flush = () => { if (html) { root.insertAdjacentHTML("beforeend", html); html = ""; } };

        while (i < lines.length) {
            const line = lines[i];
            if (!line.trim()) { i++; continue; }

            const fence = line.match(/^```\s*([\w-]*)/);
            if (fence) {
                const buf = [];
                i++;
                while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
                i++;
                flush();
                root.append(codeBlock(buf.join("\n"), fence[1] || "text"));
                continue;
            }

            const h = line.match(/^(#{3,4})\s+(.*)$/);
            if (h) {
                html += h[1].length === 3 ? `<h3>${inline(h[2])}</h3>` : `<h4>${inline(h[2])}</h4>`;
                i++;
                continue;
            }

            if (/^\|/.test(line) && lines[i + 1] && /^\|?\s*:?-{2,}/.test(lines[i + 1])) {
                const head = splitRow(line);
                i += 2;
                const rows = [];
                while (i < lines.length && /^\|/.test(lines[i])) rows.push(splitRow(lines[i++]));
                html += `<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${rows
                    .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
                continue;
            }

            if (/^>/.test(line)) {
                const buf = [];
                while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
                let text = buf.join(" ");
                let kind = "info";
                const k = text.match(/^\[!(TIP|WARN|INFO|NOTE)\]\s*/i);
                if (k) {
                    kind = { tip: "tip", warn: "warn" }[k[1].toLowerCase()] || "info";
                    text = text.slice(k[0].length);
                }
                html += `<div class="callout ${kind}"><div><p>${inline(text)}</p></div></div>`;
                continue;
            }

            const li = line.match(/^(\s*)([-*]|\d+\.)\s+/);
            if (li) {
                const ordered = /\d/.test(li[2]);
                const items = [];
                while (i < lines.length) {
                    const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
                    if (m) { items.push(m[3]); i++; continue; }
                    if (lines[i].trim() && /^\s{2,}/.test(lines[i]) && items.length) {
                        items[items.length - 1] += " " + lines[i].trim();
                        i++;
                        continue;
                    }
                    break;
                }
                const tag = ordered ? "ol" : "ul";
                html += `<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</${tag}>`;
                continue;
            }

            const buf = [];
            while (
                i < lines.length && lines[i].trim() &&
                !/^(#{3,4}\s|```|>|\||\s*([-*]|\d+\.)\s)/.test(lines[i])
            ) buf.push(lines[i++].trim());
            html += `<p>${inline(buf.join(" "))}</p>`;
        }
        flush();
        return root;
    }

    async function copyText(text, btn) {
        try { await navigator.clipboard.writeText(text); }
        catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.append(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
        }
        const old = btn.textContent;
        btn.textContent = "Copiat";
        setTimeout(() => { btn.textContent = old; }, 1200);
    }

    function sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }

    function prefersReduced() {
        return matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    /* ---- Terminal demos ---- */
    function mountTerm(el) {
        const title = el.dataset.title || "Terminal";
        const desc = el.dataset.desc || "";
        const raw = $("script[type='application/json']", el);
        let data = { linux: [], windows: [] };
        try { data = JSON.parse(raw.textContent); } catch { /* */ }
        raw?.remove();

        const osPrefer = store.get("so-lab-os") || "linux";
        el.innerHTML = `
            <div class="term-head">
                <div>
                    <h3>${esc(title)}</h3>
                    ${desc ? `<p>${esc(desc)}</p>` : ""}
                </div>
                <div class="term-tabs" role="tablist">
                    <button type="button" class="linux ${osPrefer === "linux" ? "active" : ""}" data-os="linux" role="tab">Linux</button>
                    <button type="button" class="windows ${osPrefer === "windows" ? "active" : ""}" data-os="windows" role="tab">Windows</button>
                </div>
            </div>
            <div class="term-body">
                <div class="term-pane ${osPrefer === "linux" ? "active" : ""}" data-pane="linux"><pre class="crt" aria-live="polite"></pre></div>
                <div class="term-pane ${osPrefer === "windows" ? "active" : ""}" data-pane="windows"><pre class="crt" aria-live="polite"></pre></div>
            </div>
            <div class="term-actions">
                <button type="button" class="primary" data-act="run">Rulează</button>
                <button type="button" data-act="instant">Arată tot</button>
                <button type="button" data-act="copy">Copiază comenzile</button>
                <button type="button" data-act="clear">Șterge</button>
            </div>`;

        let running = false;
        const prompt = (os) => os === "linux"
            ? `<span class="prompt-linux">student@so:~$</span>`
            : `<span class="prompt-win">PS C:\\Users\\Student&gt;</span>`;

        function sessionText(os) {
            return (data[os] || []).map((s) => s.cmd).join("\n");
        }

        async function play(os, animate) {
            if (running) return;
            running = true;
            const crt = $(`.term-pane[data-pane="${os}"] .crt`, el);
            const steps = data[os] || [];
            crt.innerHTML = "";
            for (const step of steps) {
                crt.innerHTML += `${prompt(os)} <span class="cmd"></span>\n`;
                const cmdEl = crt.querySelectorAll(".cmd");
                const target = cmdEl[cmdEl.length - 1];
                if (animate && !prefersReduced()) {
                    for (const ch of step.cmd) {
                        target.textContent += ch;
                        await sleep(18);
                    }
                } else {
                    target.textContent = step.cmd;
                }
                const out = (step.out || "").replace(/\n$/, "");
                if (out) {
                    crt.innerHTML += `<span class="out">${esc(out)}</span>\n`;
                }
                if (animate && !prefersReduced()) await sleep(220);
            }
            crt.innerHTML += `${prompt(os)} <span class="cursor"></span>`;
            crt.scrollTop = crt.scrollHeight;
            running = false;
        }

        function setOs(os) {
            store.set("so-lab-os", os);
            $$(".term-tabs button", el).forEach((b) => b.classList.toggle("active", b.dataset.os === os));
            $$(".term-pane", el).forEach((p) => p.classList.toggle("active", p.dataset.pane === os));
        }

        $$(".term-tabs button", el).forEach((b) => b.addEventListener("click", () => setOs(b.dataset.os)));
        $("[data-act=run]", el).addEventListener("click", () => {
            const os = $(".term-tabs button.active", el)?.dataset.os || "linux";
            play(os, true);
        });
        $("[data-act=instant]", el).addEventListener("click", () => {
            const os = $(".term-tabs button.active", el)?.dataset.os || "linux";
            play(os, false);
        });
        $("[data-act=copy]", el).addEventListener("click", (e) => {
            const os = $(".term-tabs button.active", el)?.dataset.os || "linux";
            copyText(sessionText(os), e.currentTarget);
        });
        $("[data-act=clear]", el).addEventListener("click", () => {
            $$(".crt", el).forEach((c) => { c.innerHTML = ""; });
        });

        // preview static first line hint
        play(osPrefer, false);
    }

    /* ---- Process state sim ---- */
    function mountStates(el) {
        const order = ["nou", "gata", "rulează", "blocat", "terminat"];
        const transitions = {
            nou: ["gata"],
            gata: ["rulează"],
            "rulează": ["gata", "blocat", "terminat"],
            blocat: ["gata"],
            terminat: [],
        };
        let state = "nou";
        el.innerHTML = `
            <div class="sim-head">
                <h3>${esc(el.dataset.title || "Stările unui proces")}</h3>
                <p>${esc(el.dataset.desc || "Apasă o tranziție validă — ca planificatorul și I/O.")}</p>
            </div>
            <div class="sim-body">
                <div class="states">${order.map((s) => `<div class="state-pill" data-s="${s}">${s}</div>`).join("")}</div>
                <div class="sim-controls" data-btns></div>
                <p class="metric" data-log>Stare: nou</p>
            </div>`;

        function render() {
            $$(".state-pill", el).forEach((p) => p.classList.toggle("active", p.dataset.s === state));
            const box = $("[data-btns]", el);
            const next = transitions[state] || [];
            box.innerHTML = next.length
                ? next.map((n) => `<button type="button" data-to="${n}">→ ${n}</button>`).join("")
                : `<button type="button" data-reset>Repornește (nou)</button>`;
            $("[data-log]", el).textContent = `Stare curentă: ${state}`;
            $$("[data-to]", box).forEach((b) => b.addEventListener("click", () => {
                state = b.dataset.to;
                render();
            }));
            $("[data-reset]", box)?.addEventListener("click", () => { state = "nou"; render(); });
        }
        render();
    }

    /* ---- Round Robin / FCFS sim ---- */
    function mountSched(el) {
        const quantumDefault = Number(el.dataset.quantum || 2);
        let mode = "rr";
        let quantum = quantumDefault;
        let clock = 0;
        let cpu = null;
        let sliceLeft = 0;
        let ready = [
            { name: "P1", burst: 5, left: 5 },
            { name: "P2", burst: 3, left: 3 },
            { name: "P3", burst: 4, left: 4 },
        ];
        let done = [];
        let log = [];

        el.innerHTML = `
            <div class="sim-head">
                <h3>${esc(el.dataset.title || "Planificare")}</h3>
                <p>${esc(el.dataset.desc || "Compară FCFS și Round Robin pe aceleași procese.")}</p>
            </div>
            <div class="sim-body">
                <div class="sim-controls" style="margin-bottom:12px">
                    <button type="button" data-mode="fcfs">FCFS</button>
                    <button type="button" data-mode="rr" class="primary">Round Robin</button>
                    <button type="button" data-step>Pas</button>
                    <button type="button" data-reset>Reset</button>
                </div>
                <p class="metric">CPU</p>
                <div class="queue" data-cpu></div>
                <p class="metric">Coadă ready</p>
                <div class="queue" data-ready></div>
                <p class="metric">Terminate</p>
                <div class="queue" data-done></div>
                <p class="metric" data-info></p>
            </div>`;

        function reset() {
            clock = 0;
            cpu = null;
            sliceLeft = 0;
            ready = [
                { name: "P1", burst: 5, left: 5 },
                { name: "P2", burst: 3, left: 3 },
                { name: "P3", burst: 4, left: 4 },
            ];
            done = [];
            log = [];
            paint();
        }

        function paint() {
            $("[data-cpu]", el).innerHTML = cpu
                ? `<span class="proc cpu">${cpu.name} (${cpu.left})</span>`
                : `<span class="metric">idle</span>`;
            $("[data-ready]", el).innerHTML = ready.length
                ? ready.map((p) => `<span class="proc">${p.name} (${p.left})</span>`).join("")
                : `<span class="metric">—</span>`;
            $("[data-done]", el).innerHTML = done.length
                ? done.map((p) => `<span class="proc done">${p.name}</span>`).join("")
                : `<span class="metric">—</span>`;
            const q = mode === "rr" ? `, quantum=${quantum}` : "";
            $("[data-info]", el).textContent = `Mod: ${mode.toUpperCase()}${q} · timp=${clock} · ${log.slice(-1)[0] || "apasă Pas"}`;
            $$("[data-mode]", el).forEach((b) => {
                b.style.outline = b.dataset.mode === mode ? "2px solid var(--accent)" : "none";
            });
        }

        function step() {
            if (!cpu && ready.length) {
                cpu = ready.shift();
                sliceLeft = mode === "rr" ? quantum : cpu.left;
                log.push(`${cpu.name} → CPU`);
            }
            if (!cpu) { paint(); return; }

            cpu.left -= 1;
            sliceLeft -= 1;
            clock += 1;

            if (cpu.left <= 0) {
                done.push(cpu);
                log.push(`${cpu.name} terminat`);
                cpu = null;
            } else if (mode === "rr" && sliceLeft <= 0) {
                ready.push(cpu);
                log.push(`${cpu.name} preemptat → ready`);
                cpu = null;
            }
            // fill CPU again same tick if free
            if (!cpu && ready.length) {
                cpu = ready.shift();
                sliceLeft = mode === "rr" ? quantum : cpu.left;
                log.push(`${cpu.name} → CPU`);
            }
            paint();
        }

        $("[data-step]", el).addEventListener("click", step);
        $("[data-reset]", el).addEventListener("click", reset);
        $$("[data-mode]", el).forEach((b) => b.addEventListener("click", () => {
            mode = b.dataset.mode;
            reset();
        }));
        paint();
    }

    /* ---- Boot ---- */
    function buildLesson(sec) {
        const num = sec.dataset.num || "";
        const title = sec.dataset.title || "";
        const h2 = document.createElement("h2");
        h2.innerHTML = `<span class="num">${esc(num)}</span>${esc(title)}`;
        sec.prepend(h2);

        for (const md of $$(':scope > script[type="text/markdown"]', sec)) {
            md.replaceWith(renderMarkdown(md.textContent));
        }
        $$(":scope > .term", sec).forEach(mountTerm);
        $$(":scope > .sim[data-kind=states]", sec).forEach(mountStates);
        $$(":scope > .sim[data-kind=sched]", sec).forEach(mountSched);
    }

    function buildToc() {
        const toc = $("#toc");
        const lessons = $$("section.lesson");
        toc.innerHTML = lessons.map((sec) => {
            const id = sec.id;
            const num = sec.dataset.num;
            const title = sec.dataset.title;
            return `<li><a href="#${id}" data-id="${id}"><span style="font-family:var(--mono);color:var(--accent)">${esc(num)}</span> ${esc(title)}</a></li>`;
        }).join("");
        $("#stat-sections").textContent = String(lessons.length);
        $("#stat-demos").textContent = String($$(".term, .sim").length);
        $("#stat-qa").textContent = String($$("details.qa").length);
    }

    function wireChrome() {
        const sidebar = $("#sidebar");
        const backdrop = $("#nav-backdrop");
        const menuBtn = $("#menu");

        function setNav(open) {
            sidebar.classList.toggle("open", open);
            backdrop.classList.toggle("open", open);
            backdrop.setAttribute("aria-hidden", open ? "false" : "true");
            menuBtn?.setAttribute("aria-expanded", open ? "true" : "false");
            menuBtn && (menuBtn.textContent = open ? "✕" : "☰");
        }

        menuBtn?.addEventListener("click", () => setNav(!sidebar.classList.contains("open")));
        backdrop?.addEventListener("click", () => setNav(false));
        sidebar?.addEventListener("click", (e) => {
            if (e.target.closest("a[href^='#']")) setNav(false);
        });

        const themeBtn = $("#theme");
        const apply = (m) => {
            if (m === "auto") document.documentElement.removeAttribute("data-theme");
            else document.documentElement.dataset.theme = m;
            themeBtn.textContent = `Temă: ${m}`;
        };
        apply(store.get("so-lab-theme") || "auto");
        themeBtn.addEventListener("click", () => {
            const cur = store.get("so-lab-theme") || "auto";
            const next = cur === "auto" ? "dark" : cur === "dark" ? "light" : "auto";
            store.set("so-lab-theme", next);
            apply(next);
        });

        const search = $("#search");
        search?.addEventListener("input", () => {
            const q = fold(search.value.trim());
            let n = 0;
            $$("#toc a").forEach((a) => {
                const show = !q || fold(a.textContent).includes(q);
                a.parentElement.hidden = !show;
                if (show) n++;
            });
            $("#toc-empty").hidden = n > 0;
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") setNav(false);
            if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
                e.preventDefault();
                setNav(true);
                search?.focus();
            }
        });

        const toTop = $(".to-top");
        const progress = $(".progress");
        window.addEventListener("scroll", () => {
            const max = document.documentElement.scrollHeight - innerHeight;
            progress.style.width = max > 0 ? `${(scrollY / max) * 100}%` : "0";
            toTop.classList.toggle("show", scrollY > 500);
        }, { passive: true });
        toTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (!en.isIntersecting) return;
                $$("#toc a").forEach((a) => a.classList.toggle("active", a.dataset.id === en.target.id));
            });
        }, { rootMargin: "-40% 0px -50% 0px" });
        $$("section.lesson").forEach((s) => obs.observe(s));
    }

    function boot() {
        $$("section.lesson").forEach(buildLesson);
        buildToc();
        wireChrome();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
