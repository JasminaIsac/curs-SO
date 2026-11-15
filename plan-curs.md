# Plan de curs: Sisteme de Operare (4 lecții)

Structură practică: lecția 1 — concepte de bază (SO, procese, planificare); lecțiile 2–3 — comenzi folosite zi de zi (Linux, apoi Windows); lecția 4 — concepte mai avansate, explicate clar, fără detalii excesive.

Fiecare lecție include terminale simulate (Linux / Windows) unde e relevant: comandă → semnificație → exemplu.

---

## Lecția 1. Sistem de operare, procese și planificare

**Status:** gata (documentație interactivă)

### Teorie
- Ce este un SO; scurt istoric (apariție și evoluție); SO-uri cunoscute azi
- Componente: kernel, gestiune procese/memorie/fișiere/I/O, shell și GUI
- Clasificare pe scurt: batch, time-sharing, timp real, distribuite, mobile; arhitecturi de kernel (monolitic, microkernel, hibrid)
- Proces: definiție, stări (New, Ready, Running, Waiting, Terminated)
- PCB — pe scurt (ce este, rol la context switch)
- Planificare CPU: de ce e nevoie, criterii; FCFS, SJF, Round Robin, priorități (cu scheme și tabele clasice: Arrival, Burst, ordine, Gantt, Waiting/Turnaround)

### Comenzi (legate de procese)
| Scop | Linux | Windows |
|---|---|---|
| Lista proceselor | `ps`, `top` | `tasklist`, `Get-Process` |
| Pornire | nume comandă, `&` | `Start-Process`, `start` |
| Oprire | `kill`, `kill -9`, `pkill` | `taskkill`, `Stop-Process` |
| Fundal (bonus) | `comanda &`, `jobs`, `fg`/`bg` | `start`, `Start-Process` |

---

## Lecția 2. Comenzi Linux: fișiere, directoare și căutare

**Accent:** puțină teorie, multe comenzi uzuale, fiecare cu terminal simulat.

### Teorie (scurt)
- Cale absolută vs relativă; `~`; fișier vs director
- Linux e *case-sensitive*; `rm` nu folosește coș de reciclare
- Ierarhia de bază: `/`, `/home`, `/etc`, `/var`, `/bin` (orientare, fără aprofundare)

### Comenzi (nucleul lecției)
| Bloc | Comenzi | Ce se explică |
|---|---|---|
| Orientare | `pwd`, `cd`, `cd ..`, `cd ~` | unde ești, cum te muți |
| Listare | `ls`, `ls -l`, `ls -a`, `ls -lh`, `ls -R` | tipuri de afișare |
| Creare | `mkdir`, `mkdir -p`, `touch` | directoare și fișiere goale |
| Copiere / mutare | `cp`, `cp -r`, `mv` | copiere, mutare, redenumire |
| Ștergere | `rm`, `rm -r`, `rmdir` | atenție la date șterse |
| Citire | `cat`, `less`/`more`, `head`, `tail` | conținutul fișierelor |
| Căutare | `find … -name`, `grep`, `grep -n`, `grep -r` | fișiere și text în fișiere |
| Redirectare | `>`, `>>`, `\|` | scriere în fișier, conducte simple |
| Bonus util | `du -sh`, `df -h`, `wc` | spațiu pe disc, numărare linii |
| Identitate & drepturi | `whoami`, `id`, `chmod`, `sudo` | cine ești; `rwx`; setare permisiuni; privilegii admin |

La final: tabel scurt „aceeași operație pe Windows” → punte către lecția 3.

---

## Lecția 3. Comenzi Windows: CMD, PowerShell și echivalente

**Accent:** același tipar ca lecția 2, pe Windows (CMD + PowerShell).

### Teorie (scurt)
- `C:\`, Users, Windows, Program Files — orientare
- Diferența CMD vs PowerShell; Windows e în general *case-insensitive*
- `del` / ștergere vs Coșul de reciclare (GUI)

### Comenzi (nucleul lecției)
| Bloc | CMD / PowerShell | Ce se explică |
|---|---|---|
| Orientare | `cd`, `cd ..`, `Get-Location` | director curent și navigare |
| Listare | `dir`, `dir /a`, `dir /s`, `dir /w`, `Get-ChildItem` | tipuri de afișare |
| Creare | `mkdir`, `type nul >`, `New-Item` | directoare și fișiere |
| Copiere / mutare | `copy`, `xcopy`/`robocopy` (pe scurt), `move`, `ren` | copiere, mutare, redenumire |
| Ștergere | `del`, `rmdir /s`, `Remove-Item` | ștergere fișiere/directoare |
| Citire | `type`, `more`, `Get-Content` | conținutul fișierelor |
| Căutare | `dir /s *.txt`, `findstr`, `Select-String` | fișiere și text |
| Redirectare | `>`, `>>`, `\|` | scriere și conducte |
| Bonus util | `tree`, spațiu pe disc, Task Manager | vizualizare structură / resurse |
| Identitate & drepturi | `whoami`, `icacls`, UAC / Run as admin | utilizator curent; ACL pe scurt; privilegii |

La final: tabel de echivalență Linux ↔ Windows (legătură cu lecția 2).

---

## Lecția 4. Memorie, concurență, deadlock și noțiuni de rețea

**Status:** gata (documentație interactivă)

**Accent:** concepte clare, **fără** adâncime excesivă (fără formule grele, fără algoritmi pe matrice lungi).

### Teorie
1. **Memorie**
   - Ierarhie pe scurt (registre → cache → RAM → disc)
   - Memorie virtuală: spațiu logic mai mare decât RAM; rolul swap-ului
   - Page fault: pagina nu e în RAM; SO o aduce de pe disc
   - Înlocuire pagini: FIFO și LRU — ideea + un exemplu mic fiecare

2. **Concurență**
   - Race condition — exemplu scurt
   - Secțiune critică; excludere mutuală
   - Mutex și semafor — analogie („lacăt” / „contor de locuri”), fără implementare

3. **Deadlock**
   - Cele 4 condiții (Coffman) pe o listă
   - Exemplu simplu (2 procese, 2 resurse)
   - Prevenire vs evitare — la nivel de idee
   - Algoritmul bancherului: „nu alocăm dacă am ajunge într-o stare nesigură” (fără tabele elaborate)

4. **Rețea (nivel SO)**
   - IP, port, DNS — pe scurt
   - TCP vs UDP — câte o frază
   - Comenzi de ilustrare: `ping`, `ip a` / `ipconfig`, `nslookup` (opțional)

5. **Permisiuni (opțional, 1 ecran)**
   - Linux: `rwx`, proprietar/grup/alții
   - Windows: ACL / UAC — doar modelul, nu administrare avansată

### Ce evităm în lecția 4
- Detalii de paginare pe biți, dovezi formale
- Bancherul pas-cu-pas pe matrice mari
- Stack TCP/IP complet, scripting avansat

---

## Observații
- Lecțiile 2 și 3 sunt pentru laborator / uz zilnic; lecția 4 acoperă ideile cerute la examen, pe scurt.
- Dacă studenții nu au Linux: WSL, VirtualBox sau terminal online.
- Documentația interactivă: hub `curs-SO`, lecții în `lectii/`.
