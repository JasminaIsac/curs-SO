# Plan de curs: Sisteme de Operare (3 lecții × 90 min)

Fiecare lecție are o parte de teorie (~55 min) și una de comenzi demonstrate live (~35 min), cu perechea Linux/Windows alături, ca studenții să vadă că aceleași concepte apar în ambele sisteme.

---

## Lecția 1. Noțiuni de bază, procese și planificare

### Teorie
- Ce este un SO: gestionar de resurse (procesor, memorie, dispozitive, fișiere) și interfață între utilizator, aplicații și hardware
- Evoluție și tipuri: batch, time-sharing, timp real, distribuite, mobile
- Nucleu (kernel), spațiu utilizator vs spațiu kernel, apeluri de sistem, shell vs interfață grafică
- Arhitecturi: monolitică, microkernel, hibridă (exemple: Linux, Windows NT)
- Proces: definiție, stări (nou, gata, rulează, blocat, terminat), PCB, comutarea contextului, diferența proces/fir de execuție
- Planificarea procesorului: FCFS, SJF, Round Robin, priorități; criterii (timp de așteptare, timp de răspuns)

### Comenzi

| Scop | Linux | Windows (CMD/PowerShell) |
|---|---|---|
| Informații despre sistem | `uname -a`, `hostname` | `ver`, `systeminfo`, `hostname` |
| Utilizatorul curent | `whoami` | `whoami` |
| Ajutor | `man ls`, `ls --help` | `help dir`, `dir /?` |
| Lista proceselor | `ps aux`, `top`, `htop` | `tasklist`, `Get-Process` |
| Oprirea unui proces | `kill PID`, `kill -9 PID`, `pkill nume` | `taskkill /PID 1234 /F`, `Stop-Process` |
| Rulare în fundal | `comanda &`, `jobs`, `bg`, `fg` | `start comanda` |

Se explică semnificația fiecărei coloane din `ps`/`tasklist` (PID, utilizare CPU, memorie) și diferența dintre `kill` (semnal SIGTERM) și `kill -9` (SIGKILL).

---

## Lecția 2. Memorie și sisteme de fișiere

### Teorie
- Ierarhia memoriei (registre, cache, RAM, disc); adrese logice și fizice
- Alocare, fragmentare internă și externă
- Paginare și segmentare; tabela de pagini
- Memoria virtuală: swap, page fault, algoritmi de înlocuire a paginilor (FIFO, LRU)
- Fișier: atribute, operații, tipuri; structura directoarelor (arbore), căi absolute și relative
- Sisteme de fișiere: FAT32, exFAT, NTFS, ext4; inode, metode de alocare, jurnalizare
- Organizarea ierarhiei de directoare: Linux (`/`, `/home`, `/etc`, `/var`, `/bin`) vs Windows (`C:\`, `Users`, `Windows`, `Program Files`)

### Comenzi

| Scop | Linux | Windows |
|---|---|---|
| Director curent | `pwd` | `cd` (fără argumente), `Get-Location` |
| Navigare | `cd /home`, `cd ..`, `cd ~` | `cd C:\Users`, `cd ..` |
| Listare | `ls -l`, `ls -a`, `ls -lh` | `dir`, `dir /a`, `Get-ChildItem` |
| Creare director | `mkdir proiect` | `mkdir proiect` |
| Creare fișier | `touch a.txt` | `type nul > a.txt`, `New-Item` |
| Copiere | `cp a.txt b.txt`, `cp -r d1 d2` | `copy a.txt b.txt`, `xcopy /s` |
| Mutare/redenumire | `mv a.txt b.txt` | `move a.txt b.txt`, `ren` |
| Ștergere | `rm a.txt`, `rm -r dir`, `rmdir` | `del a.txt`, `rmdir /s dir` |
| Afișare conținut | `cat`, `less`, `head`, `tail` | `type`, `more` |
| Căutare | `find / -name "*.txt"`, `grep text fisier` | `dir /s *.txt`, `findstr text fisier` |
| Memorie | `free -h` | `systeminfo`, Task Manager |
| Spațiu pe disc | `df -h`, `du -sh dir` | `fsutil volume diskfree C:` |
| Discuri și partiții | `lsblk`, `mount` | `diskpart`, `chkdsk` |

Se atrage atenția asupra pericolelor: `rm -rf` nu are coș de reciclare, iar Linux face diferența între majuscule și minuscule, spre deosebire de Windows.

---

## Lecția 3. Concurență, securitate, redirectare și rețea

### Teorie
- Concurență: condiție de cursă (race condition), secțiune critică, excludere mutuală, semafoare și mutex
- Interblocare (deadlock): cele 4 condiții Coffman, prevenire și evitare (algoritmul bancherului, la nivel de idee)
- Utilizatori și grupuri, autentificare, principiul privilegiului minim
- Permisiuni: modelul Linux (proprietar/grup/alții, `rwx`, notația octală) vs modelul Windows (ACL, UAC)
- Intrare/ieșire standard (stdin, stdout, stderr), redirectare și conducte (pipe)
- Noțiuni de rețea pe care le oferă SO (stiva TCP/IP, adresă IP, port, DNS)
- Introducere în scripting: Bash și Batch/PowerShell

### Comenzi

| Scop | Linux | Windows |
|---|---|---|
| Permisiuni | `ls -l`, `chmod 755 f`, `chmod u+x f` | `icacls fisier` |
| Proprietar | `chown user:grup f` | `icacls`, `takeown` |
| Rulare ca administrator | `sudo comanda`, `su` | „Run as administrator", `runas` |
| Utilizatori | `useradd`, `passwd`, `id`, `groups` | `net user`, `net localgroup` |
| Redirectare | `ls > lista.txt`, `>>`, `2>` | `dir > lista.txt`, `>>`, `2>` |
| Conducte | `ps aux \| grep firefox` | `tasklist \| findstr firefox` |
| Configurare rețea | `ip a`, `ifconfig` | `ipconfig /all` |
| Testare conexiune | `ping`, `traceroute` | `ping`, `tracert` |
| DNS, conexiuni | `nslookup`, `ss -tuln`, `netstat` | `nslookup`, `netstat -an` |
| Script simplu | `#!/bin/bash`, `echo`, `chmod +x`, `./script.sh` | fișier `.bat` sau `.ps1`, `echo`, `pause` |

Se explică în detaliu citirea lui `ls -l` (de exemplu `-rwxr-xr--`) și calculul permisiunii 755. Lecția se poate încheia cu un script scurt, același în Bash și în Batch (afișarea datei, a utilizatorului și a spațiului liber).

---

## Observații
- Lecția 3 este cea mai încărcată. Dacă ai nevoie de timp, poți trata rețeaua doar la nivel de comenzi (`ping`, `ipconfig`/`ip a`) și lăsa scriptingul pentru laborator.
- Dacă studenții nu au Linux instalat, pot folosi WSL, o mașină virtuală (VirtualBox) sau terminale online.
