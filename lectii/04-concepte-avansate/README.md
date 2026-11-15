# Lecția 4 — Memorie, concurență, deadlock și rețea (SO.lab)

Documentație interactivă: concepte clare, fără formule grele sau matrici lungi.

## Conținut
- Memorie: ierarhie, virtuală, page fault, FIFO / LRU (exemple mici)
- Concurență: race condition, secțiune critică, mutex / semafor
- Deadlock: Coffman, exemplu 2×2, prevenire vs evitare, bancherul (idee)
- Rețea: IP, port, DNS, TCP/UDP + terminal `ping` / `ipconfig` / `nslookup`
- Permisiuni: recapit Linux ↔ Windows
- Rezumat, greșeli frecvente, Q&A

## Build
```powershell
.\build.ps1
```
Asamblează `index.html` din `src/template.html` + `src/parts/part*.html`.
