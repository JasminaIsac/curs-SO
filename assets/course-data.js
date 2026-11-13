/* Sursa afișată pe hub și în banda lecțiilor.
   Ține sincron cu course.json când schimbi statusul unei teme. */
window.ATELIER_COURSE = {
  brand: "SO.curs",
  author: "Isac Jasmina, asistent universitar",
  institution: "Universitatea de Stat din Moldova · Departamentul Informatică",
  title: "Sisteme de Operare",
  subtitle: "Curs interactiv — procese, memorie, fișiere, concurență și securitate",
  themes: [
    {
      id: "01",
      slug: "01-procese-planificare",
      title: "Noțiuni de bază, procese și planificare",
      blurb: "Ce e un SO, kernel, procese, stări, planificare CPU și comenzi Linux/Windows.",
      status: "ready"
    },
    {
      id: "02",
      slug: "02-memorie-fisiere",
      title: "Memorie și sisteme de fișiere",
      blurb: "Memorie virtuală, directoare, sisteme de fișiere și comenzi de navigare.",
      status: "soon"
    },
    {
      id: "03",
      slug: "03-concurenta-securitate",
      title: "Concurență, securitate, redirectare și rețea",
      blurb: "Deadlock, permisiuni, pipe-uri, rețea de bază și scripting introductiv.",
      status: "soon"
    }
  ]
};
