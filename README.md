# SO.curs — Sisteme de Operare

Curs interactiv de **Sisteme de Operare** — Universitatea de Stat din Moldova, Departamentul Informatică.

**Autor:** Isac Jasmina, asistent universitar

Teorie + terminale Linux/Windows pe care le poți „rula” pe loc (exemple simulate, comenzi de copiat).

## Cum deschizi cursul

1. Clonează sau descarcă acest repository: [github.com/JasminaIsac/curs-SO](https://github.com/JasminaIsac/curs-SO)
2. Deschide `index.html` în browser (Chrome, Edge sau Firefox).

Dacă ceva nu se încarcă bine din dublu-click:

```bash
python -m http.server 8080
```

Apoi: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

## Cum folosești platforma

1. Pe pagina principală alegi o lecție **Disponibilă**.
2. În lecție: meniu ☰, căutare (`/`), terminale simulate (Linux în lecția 2, Windows în lecția 3; ambele în lecția 1 unde e cazul).
3. Banda de sus te întoarce la toate lecțiile și la lecția anterioară / următoare.
4. La final: întrebări de autoverificare.

## Lecțiile

| # | Temă | Stare |
|---|---|---|
| 01 | Noțiuni de bază, procese și planificare | disponibilă |
| 02 | Memorie și sisteme de fișiere | în curând |
| 03 | Concurență, securitate, redirectare și rețea | în curând |

Planul detaliat: `plan-curs.md`.

## Structură

```
curs-SO/
  index.html          ← hub (toate lecțiile)
  assets/             ← stil hub + navigare între lecții
  lectii/01-…/        ← lecții interactive
  plan-curs.md
```
