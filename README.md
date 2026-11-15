# SO.curs — Sisteme de Operare

Curs interactiv de **Sisteme de Operare** — Universitatea de Stat din Moldova, Departamentul Informatică.

**Autor:** Isac Jasmina, asistent universitar

Teorie + terminale simulate (Linux, CMD, PowerShell) pe care le poți „rula” pe loc — comenzi de copiat și exersat pe mașina ta.

**Repository:** [github.com/JasminaIsac/curs-SO](https://github.com/JasminaIsac/curs-SO)

## Cum deschizi cursul

1. Clonează sau descarcă repository-ul.
2. Deschide `index.html` în browser (Chrome, Edge sau Firefox).

Dacă ceva nu se încarcă bine din dublu-click:

```bash
python -m http.server 8080
```

Apoi: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

## Cum folosești platforma

1. Pe hub alegi o lecție **Disponibilă**.
2. În lecție: meniu **☰** = lista temelor cursului; tasta `/` = căutare temă.
3. Terminale simulate: **Rulează** / **Arată tot** / **Copiază comenzile**.
4. La final: întrebări de autoverificare.

## Lecțiile (toate disponibile)

| # | Temă | Ce conține |
|---|---|---|
| 01 | Sistem de operare, procese și planificare | SO, stări, PCB, FCFS/SJF/RR/priorități (scheme), comenzi procese Linux/Windows |
| 02 | Comenzi Linux | `pwd`, `ls`, `mkdir`, `cp`/`mv`/`rm`, `cat`, `find`/`grep`, redirectare, `whoami`/`chmod`/`sudo`, `uname` |
| 03 | Comenzi Windows | Aceleași idei pe **CMD** și **PowerShell** (tab-uri separate), plus `whoami`/`ver`/`systeminfo`/`icacls` |
| 04 | Memorie, concurență, deadlock și rețea | Memorie virtuală, FIFO/LRU, race, mutex/semafor, Coffman, bancherul (idee), IP/DNS/`ping` |

Planul detaliat: [`plan-curs.md`](plan-curs.md).

## Structură

```
curs-SO/
  index.html                 ← hub (toate lecțiile)
  plan-curs.md               ← planul de curs
  assets/                    ← hub + course-data + navigare teme
  lectii/
    01-procese-planificare/
    02-comenzi-linux/
    03-comenzi-windows/
    04-concepte-avansate/
```

Fiecare lecție: `index.html` (pagina), `assets/` (stil + motor), `src/` (template + parts). Regenerare:

```powershell
.\build.ps1
```

(din folderul lecției respective)

## Observații

- Ieșirile din terminale sunt **simulate** — pe PC-ul tău pot arăta ușor diferit.
- Pentru Linux fără instalare locală: WSL, VM sau terminal online.
- Statusul lecțiilor e ținut în `assets/course-data.js` și `assets/course.json` (ține-le sincronizate).
