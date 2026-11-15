/* Sursa afișată pe hub și în banda lecțiilor.
   Ține sincron cu course.json când schimbi statusul unei teme. */
window.ATELIER_COURSE = {
  brand: "SO.curs",
  author: "Isac Jasmina, asistent universitar",
  institution: "Universitatea de Stat din Moldova · Departamentul Informatică",
  title: "Sisteme de Operare",
  subtitle: "Curs interactiv — procese, comenzi Linux/Windows și concepte esențiale",
  themes: [
    {
      id: "01",
      slug: "01-procese-planificare",
      title: "Sistem de operare, procese și planificare",
      blurb: "Ce e un SO, procese, stări, PCB, planificare CPU și comenzi pentru procese.",
      status: "ready"
    },
    {
      id: "02",
      slug: "02-comenzi-linux",
      title: "Comenzi Linux: fișiere, directoare și căutare",
      blurb: "pwd, ls, mkdir, cp, mv, rm, cat, find, grep, redirectare — cu terminale simulate.",
      status: "ready"
    },
    {
      id: "03",
      slug: "03-comenzi-windows",
      title: "Comenzi Windows: CMD și PowerShell",
      blurb: "cd, dir, copy, del, findstr, whoami, icacls — terminale simulate Windows.",
      status: "ready"
    },
    {
      id: "04",
      slug: "04-concepte-avansate",
      title: "Memorie, concurență, deadlock și rețea",
      blurb: "Memorie virtuală, FIFO/LRU, race, deadlock, IP/DNS — concepte clare.",
      status: "ready"
    }
  ]
};
