// ---- Speicherung ----
// Local Storage merkt sich Daten im Browser, auch nach dem Schließen der Seite.
// WICHTIG: Das ist nur auf DIESEM Gerät/Browser sichtbar, nicht für andere Personen
// (dafür bräuchten wir später eine echte Datenbank, siehe Phase 3 in der CLAUDE.md).
const SPEICHER_SCHLUESSEL = "karteikarten-decks";
const ALTER_SPEICHER_SCHLUESSEL = "karteikarten-deck"; // aus der Vorgänger-Version (nur ein Deck)

// Vorgegebenes Start-Deck, falls noch gar nichts gespeichert ist.
// Wird später durch dein eigenes Fragen/Antworten-Deck ersetzt bzw. ergänzt.
function erzeugeStandardDecks() {
  return [
    {
      id: 1,
      titel: "Hauptstädte",
      karten: [
        { id: 1, frage: "Was ist die Hauptstadt von Frankreich?", antwort: "Paris", gekonnt: false },
        { id: 2, frage: "Was ist die Hauptstadt von Italien?", antwort: "Rom", gekonnt: false },
        { id: 3, frage: "Was ist die Hauptstadt von Spanien?", antwort: "Madrid", gekonnt: false },
        { id: 4, frage: "Was ist die Hauptstadt von Portugal?", antwort: "Lissabon", gekonnt: false },
        { id: 5, frage: "Was ist die Hauptstadt von Griechenland?", antwort: "Athen", gekonnt: false }
      ]
    }
  ];
}

// Lädt die Decks aus dem Local Storage. Falls es noch die alte, einfache
// Speicherform (ein einzelnes Deck ohne "gekonnt"-Status) gibt, wird sie
// einmalig in das neue Format überführt.
function ladeDecks() {
  const gespeichert = localStorage.getItem(SPEICHER_SCHLUESSEL);
  if (gespeichert) {
    return JSON.parse(gespeichert);
  }

  const altesDeck = localStorage.getItem(ALTER_SPEICHER_SCHLUESSEL);
  if (altesDeck) {
    const karten = JSON.parse(altesDeck).map((k) => ({ ...k, gekonnt: false }));
    localStorage.removeItem(ALTER_SPEICHER_SCHLUESSEL);
    return [{ id: 1, titel: "Hauptstädte", karten }];
  }

  return erzeugeStandardDecks();
}

function speichereDecks() {
  localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(decks));
}

// ---- Zustand der App ----
let decks = ladeDecks();
let aktuellesDeckId = null; // welches Deck ist gerade im Lernmodus geöffnet
let queue = [];              // Warteschlange (noch nicht "gekonnte" Karten) für den aktuellen Durchlauf

function aktuellesDeck() {
  return decks.find((d) => d.id === aktuellesDeckId);
}

// ---- HTML-Elemente holen ----
const viewDashboard = document.getElementById("view-dashboard");
const viewLernmodus = document.getElementById("view-lernmodus");

const deckListe = document.getElementById("deck-liste");
const btnToggleNeuesDeck = document.getElementById("btn-toggle-neues-deck");
const deckForm = document.getElementById("deck-form");
const inputDeckTitel = document.getElementById("input-deck-titel");

const btnZurueck = document.getElementById("btn-zurueck");
const btnDeckLoeschen = document.getElementById("btn-deck-loeschen");
const deckTitelAnzeige = document.getElementById("deck-titel-anzeige");

const card = document.getElementById("card");
const cardInner = document.getElementById("card-inner");
const fragetext = document.getElementById("frage-text");
const antwortText = document.getElementById("antwort-text");

const btnGewusst = document.getElementById("btn-gewusst");
const btnNichtGewusst = document.getElementById("btn-nicht-gewusst");
const btnNeustart = document.getElementById("btn-neustart");

const progressText = document.getElementById("progress-text");
const progressDetails = document.getElementById("progress-details");
const progressFill = document.getElementById("progress-fill");

const lernBereich = document.querySelector(".card");
const hinweis = document.querySelector(".hint");
const buttonsBereich = document.querySelector(".buttons");
const fertigNachricht = document.getElementById("fertig-nachricht");
const keineKartenNachricht = document.getElementById("keine-karten-nachricht");

const btnToggleVerwaltung = document.getElementById("btn-toggle-verwaltung");
const verwaltungInhalt = document.getElementById("verwaltung-inhalt");
const karteForm = document.getElementById("karte-form");
const inputFrage = document.getElementById("input-frage");
const inputAntwort = document.getElementById("input-antwort");
const kartenListe = document.getElementById("karten-liste");
const anzahlKartenSpan = document.getElementById("anzahl-karten");

// ============================================================
// ANSICHT 1: DASHBOARD
// ============================================================

// Rein optische Icon-/Farb-Kombinationen für die Deck-Zeilen (reihum vergeben).
// Das ist nur Design - hat keinen Einfluss auf die gespeicherten Deck-Daten.
const DECK_OPTIK = [
  { icon: "📘", farbe: "#e6f0fb" },
  { icon: "📗", farbe: "#eae6fb" },
  { icon: "📙", farbe: "#e2f6ec" },
  { icon: "📕", farbe: "#fdf1d9" },
  { icon: "📓", farbe: "#fde3ea" }
];

// Baut die Deck-Liste sowie den Gesamt-Fortschritt neu auf
// (z. B. nach dem Öffnen/Verlassen eines Decks oder Änderungen am Fortschritt)
function renderDashboard() {
  deckListe.innerHTML = "";

  decks.forEach((deck, index) => {
    const gesamt = deck.karten.length;
    const gekonnt = deck.karten.filter((k) => k.gekonnt).length;
    const optik = DECK_OPTIK[index % DECK_OPTIK.length];

    const zeile = document.createElement("div");
    zeile.className = "deck-zeile";

    const icon = document.createElement("div");
    icon.className = "deck-icon";
    icon.style.backgroundColor = optik.farbe;
    icon.textContent = optik.icon;

    const info = document.createElement("div");
    info.className = "deck-info";

    const titel = document.createElement("h3");
    titel.textContent = deck.titel;

    const details = document.createElement("p");
    details.textContent = `${gesamt} Karte${gesamt === 1 ? "" : "n"} · ${gekonnt}/${gesamt} gekonnt`;

    info.appendChild(titel);
    info.appendChild(details);

    const pfeil = document.createElement("span");
    pfeil.className = "deck-pfeil";
    pfeil.textContent = "›";

    zeile.appendChild(icon);
    zeile.appendChild(info);
    zeile.appendChild(pfeil);

    zeile.addEventListener("click", () => oeffneDeck(deck.id));
    deckListe.appendChild(zeile);
  });

  aktualisiereGesamtFortschritt();
}

// Berechnet den Fortschritt über ALLE Decks hinweg und zeigt ihn im Ring
// plus der kleinen Liste daneben an (rein darstellend, verändert keine Daten).
function aktualisiereGesamtFortschritt() {
  let gesamtAlleDecks = 0;
  let gekonntAlleDecks = 0;

  decks.forEach((deck) => {
    gesamtAlleDecks += deck.karten.length;
    gekonntAlleDecks += deck.karten.filter((k) => k.gekonnt).length;
  });

  const uebenAlleDecks = gesamtAlleDecks - gekonntAlleDecks;
  const prozent = gesamtAlleDecks === 0 ? 0 : Math.round((gekonntAlleDecks / gesamtAlleDecks) * 100);

  document.getElementById("fortschritt-prozent").textContent = prozent + "%";
  document.getElementById("stat-kannich").textContent = gekonntAlleDecks;
  document.getElementById("stat-uebem").textContent = uebenAlleDecks;
  document.getElementById("stat-gesamt").textContent = gesamtAlleDecks;

  const ring = document.getElementById("fortschritt-ring");
  const winkel = (prozent / 100) * 360;
  ring.style.background = `conic-gradient(var(--farbe-primaer) ${winkel}deg, var(--farbe-primaer-hell) ${winkel}deg)`;
}

// Auf-/Zuklappen des "Neues Deck erstellen"-Formulars
btnToggleNeuesDeck.addEventListener("click", () => {
  deckForm.classList.toggle("hidden");
});

// Neues Deck anlegen
deckForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titel = inputDeckTitel.value.trim();
  if (titel === "") return;

  const neuesDeck = { id: Date.now(), titel, karten: [] };
  decks.push(neuesDeck);
  speichereDecks();
  renderDashboard();

  deckForm.reset();
  deckForm.classList.add("hidden");
});

// ============================================================
// ANSICHT 2: LERNMODUS
// ============================================================

// Wechselt von der Dashboard-Ansicht in den Lernmodus für ein bestimmtes Deck
function oeffneDeck(deckId) {
  aktuellesDeckId = deckId;
  const deck = aktuellesDeck();

  deckTitelAnzeige.textContent = deck.titel;
  queue = deck.karten.filter((k) => !k.gekonnt);

  renderKartenListe();
  starteAnzeige();

  viewDashboard.classList.add("hidden");
  viewLernmodus.classList.remove("hidden");
}

// Zurück zum Dashboard (Fortschritt dort ist inzwischen aktuell, da wir immer sofort speichern)
btnZurueck.addEventListener("click", () => {
  viewLernmodus.classList.add("hidden");
  viewDashboard.classList.remove("hidden");
  aktuellesDeckId = null;
  renderDashboard();
});

// Aktuelles Deck löschen (mit Rückfrage, da nicht rückgängig machbar)
btnDeckLoeschen.addEventListener("click", () => {
  const deck = aktuellesDeck();
  const bestaetigt = confirm(`Deck "${deck.titel}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`);
  if (!bestaetigt) return;

  decks = decks.filter((d) => d.id !== aktuellesDeckId);
  speichereDecks();

  viewLernmodus.classList.add("hidden");
  viewDashboard.classList.remove("hidden");
  aktuellesDeckId = null;
  renderDashboard();
});

// ---- Lernmodus: Anzeige-Zustände ----

// Blendet je nach Zustand die passenden Bereiche ein/aus
function zeigeZustand(zustand) {
  lernBereich.classList.add("hidden");
  hinweis.classList.add("hidden");
  buttonsBereich.classList.add("hidden");
  fertigNachricht.classList.add("hidden");
  keineKartenNachricht.classList.add("hidden");

  if (zustand === "lernen") {
    lernBereich.classList.remove("hidden");
    hinweis.classList.remove("hidden");
    buttonsBereich.classList.remove("hidden");
  } else if (zustand === "fertig") {
    fertigNachricht.classList.remove("hidden");
  } else if (zustand === "leer") {
    keineKartenNachricht.classList.remove("hidden");
  }
}

// Zeigt die aktuell erste Karte der Warteschlange an
function zeigeAktuelleKarte() {
  cardInner.classList.remove("flipped");
  const aktuelleKarte = queue[0];
  fragetext.textContent = aktuelleKarte.frage;
  antwortText.textContent = aktuelleKarte.antwort;
}

// Aktualisiert Text und Balken der Fortschrittsanzeige im Lernmodus
function aktualisiereFortschritt() {
  const deck = aktuellesDeck();
  const gesamt = deck.karten.length;
  const gekonnt = deck.karten.filter((k) => k.gekonnt).length;
  const nochOffen = queue.length;
  const prozent = gesamt === 0 ? 0 : Math.round((gekonnt / gesamt) * 100);

  progressText.textContent = `Karte ${Math.min(gekonnt + 1, gesamt)} von ${gesamt}`;
  progressDetails.textContent = `Kann ich: ${gekonnt} | Noch offen: ${nochOffen}`;
  progressFill.style.width = prozent + "%";
}

// Legt anhand der aktuellen Kartenliste fest, was angezeigt wird
function starteAnzeige() {
  const deck = aktuellesDeck();
  if (deck.karten.length === 0) {
    zeigeZustand("leer");
  } else if (queue.length === 0) {
    zeigeZustand("fertig");
  } else {
    zeigeAktuelleKarte();
    zeigeZustand("lernen");
  }
  aktualisiereFortschritt();
}

// Prüft nach jeder Bewertung, ob der Durchlauf zu Ende ist,
// und zeigt sonst die nächste Karte + aktualisierten Fortschritt
function wennFertigOderNaechsteKarte() {
  if (queue.length === 0) {
    zeigeZustand("fertig");
  } else {
    zeigeAktuelleKarte();
    zeigeZustand("lernen");
  }
  aktualisiereFortschritt();
  renderKartenListe(); // Karten-Liste im Verwaltungsbereich kann sich mitändern (z. B. Anzahl)
}

// Klick auf die Karte dreht sie um
card.addEventListener("click", () => {
  cardInner.classList.toggle("flipped");
});

// "Gewusst": Karte wird dauerhaft als gekonnt markiert und verlässt die Warteschlange
btnGewusst.addEventListener("click", () => {
  const karte = queue.shift();
  karte.gekonnt = true;
  speichereDecks();
  wennFertigOderNaechsteKarte();
});

// "Nicht gewusst": Karte wandert ans Ende der Warteschlange (bleibt "nicht gekonnt")
btnNichtGewusst.addEventListener("click", () => {
  const karte = queue.shift();
  queue.push(karte);
  wennFertigOderNaechsteKarte();
});

// "Nochmal von vorne": alle Karten dieses Decks wieder auf "nicht gekonnt" setzen
btnNeustart.addEventListener("click", () => {
  const deck = aktuellesDeck();
  deck.karten.forEach((k) => (k.gekonnt = false));
  speichereDecks();
  queue = [...deck.karten];
  starteAnzeige();
});

// ============================================================
// KARTENVERWALTUNG (innerhalb des aktuell geöffneten Decks)
// ============================================================

btnToggleVerwaltung.addEventListener("click", () => {
  verwaltungInhalt.classList.toggle("hidden");
});

// Baut die Liste der vorhandenen Karten im Verwaltungsbereich neu auf
function renderKartenListe() {
  const deck = aktuellesDeck();
  kartenListe.innerHTML = "";
  anzahlKartenSpan.textContent = deck.karten.length;

  deck.karten.forEach((karte) => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.className = "karte-text";
    textSpan.textContent = `${karte.frage} → ${karte.antwort}`;

    const loeschButton = document.createElement("button");
    loeschButton.className = "btn-delete";
    loeschButton.textContent = "✗ Löschen";
    loeschButton.addEventListener("click", () => loescheKarte(karte.id));

    li.appendChild(textSpan);
    li.appendChild(loeschButton);
    kartenListe.appendChild(li);
  });
}

// Neue Karte über das Formular hinzufügen
karteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const neueKarte = {
    id: Date.now(),
    frage: inputFrage.value.trim(),
    antwort: inputAntwort.value.trim(),
    gekonnt: false
  };

  if (neueKarte.frage === "" || neueKarte.antwort === "") return;

  const deck = aktuellesDeck();
  deck.karten.push(neueKarte);
  speichereDecks();

  queue.push(neueKarte);
  wennFertigOderNaechsteKarte();

  karteForm.reset();
  inputFrage.focus();
});

// Karte löschen (per ID)
function loescheKarte(id) {
  const deck = aktuellesDeck();
  deck.karten = deck.karten.filter((k) => k.id !== id);
  queue = queue.filter((k) => k.id !== id);

  speichereDecks();
  renderKartenListe();
  starteAnzeige();
}

// ---- Start: Dashboard anzeigen ----
renderDashboard();
