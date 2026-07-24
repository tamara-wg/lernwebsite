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
        { id: 1, frage: "Was ist die Hauptstadt von Frankreich?", antwort: "Paris", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
        { id: 2, frage: "Was ist die Hauptstadt von Italien?", antwort: "Rom", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
        { id: 3, frage: "Was ist die Hauptstadt von Spanien?", antwort: "Madrid", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
        { id: 4, frage: "Was ist die Hauptstadt von Portugal?", antwort: "Lissabon", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
        { id: 5, frage: "Was ist die Hauptstadt von Griechenland?", antwort: "Athen", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null }
      ]
    }
  ];
}

// Stellt sicher, dass jede Karte alle Lernfelder besitzt, auch wenn sie
// aus einer älteren Version gespeichert wurde, die diese Felder noch nicht kannte.
// Für "istFehlerkarte" übernehmen wir dabei sinnvoll den bisherigen Fehlerstand
// (schon mal falsch beantwortete Karten gelten direkt als Fehlerkarte).
function ergaenzeLernfelder(decks) {
  decks.forEach((deck) => {
    deck.karten.forEach((karte) => {
      if (typeof karte.falschAnzahl !== "number") karte.falschAnzahl = 0;
      if (typeof karte.richtigAnzahl !== "number") karte.richtigAnzahl = 0;
      if (typeof karte.istFehlerkarte !== "boolean") karte.istFehlerkarte = karte.falschAnzahl >= 1;
      if (typeof karte.zuletztGelernt === "undefined") karte.zuletztGelernt = null;
    });
  });
  return decks;
}

// Lädt die Decks aus dem Local Storage. Falls es noch die alte, einfache
// Speicherform (ein einzelnes Deck ohne "gekonnt"-Status) gibt, wird sie
// einmalig in das neue Format überführt.
function ladeDecks() {
  const gespeichert = localStorage.getItem(SPEICHER_SCHLUESSEL);
  if (gespeichert) {
    return ergaenzeLernfelder(JSON.parse(gespeichert));
  }

  const altesDeck = localStorage.getItem(ALTER_SPEICHER_SCHLUESSEL);
  if (altesDeck) {
    const karten = JSON.parse(altesDeck).map((k) => ({
      ...k,
      gekonnt: false,
      falschAnzahl: 0,
      richtigAnzahl: 0,
      istFehlerkarte: false,
      zuletztGelernt: null
    }));
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

let aktuellerLernModus = "normal"; // "normal" = alle Karten, "fehlerkarten" = nur aktuelle Fehlerkarten
let sessionRichtigKlicks = 0; // Zählt "Gewusst"-Klicks im aktuellen Durchlauf (für die Statistik am Ende)
let sessionFalschKlicks = 0;  // Zählt "Nicht gewusst"-Klicks im aktuellen Durchlauf
let sessionFehlerkartenGesamt = 0; // Wie viele Fehlerkarten es beim Start dieses Fehlerkarten-Durchlaufs waren

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
const modusHinweis = document.getElementById("modus-hinweis");

const progressText = document.getElementById("progress-text");
const progressDetails = document.getElementById("progress-details");
const progressFill = document.getElementById("progress-fill");

const lernBereich = document.querySelector(".card");
const hinweis = document.querySelector(".hint");
const buttonsBereich = document.querySelector(".buttons");
const fertigNachricht = document.getElementById("fertig-nachricht");
const fertigTitel = document.getElementById("fertig-titel");
const fertigStatistik = document.getElementById("fertig-statistik");
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
    const fehlerkartenAnzahl = deck.karten.filter((k) => k.istFehlerkarte).length;
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

    const aktionen = document.createElement("div");
    aktionen.className = "deck-aktionen";

    const btnLernen = document.createElement("button");
    btnLernen.className = "btn-deck-lernen";
    btnLernen.textContent = "Lernen";
    btnLernen.addEventListener("click", () => oeffneDeck(deck.id, "normal"));

    const btnFehlerkarten = document.createElement("button");
    btnFehlerkarten.className = "btn-deck-fehlerkarten";
    btnFehlerkarten.textContent = `Fehlerkarten · ${fehlerkartenAnzahl}`;
    btnFehlerkarten.addEventListener("click", () => oeffneDeck(deck.id, "fehlerkarten"));

    aktionen.appendChild(btnLernen);
    aktionen.appendChild(btnFehlerkarten);

    zeile.appendChild(icon);
    zeile.appendChild(info);
    zeile.appendChild(aktionen);

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

// Gibt alle aktuellen Fehlerkarten eines Decks zurück
function fehlerkartenDesDecks(deck) {
  return deck.karten.filter((k) => k.istFehlerkarte);
}

// Wechselt von der Dashboard-Ansicht in den Lernmodus für ein bestimmtes Deck.
// modus ist entweder "normal" (alle noch nicht gekonnten Karten) oder
// "fehlerkarten" (nur die aktuellen Fehlerkarten dieses Decks).
function oeffneDeck(deckId, modus) {
  aktuellesDeckId = deckId;
  aktuellerLernModus = modus;
  const deck = aktuellesDeck();

  sessionRichtigKlicks = 0;
  sessionFalschKlicks = 0;

  deckTitelAnzeige.textContent = deck.titel;

  if (modus === "fehlerkarten") {
    queue = fehlerkartenDesDecks(deck);
    sessionFehlerkartenGesamt = queue.length;
    modusHinweis.classList.remove("hidden");
  } else {
    queue = deck.karten.filter((k) => !k.gekonnt);
    modusHinweis.classList.add("hidden");
  }

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
    anzeigeFertigStatistik();
  } else if (zustand === "leer") {
    keineKartenNachricht.classList.remove("hidden");
  }
}

// Zeigt nach einem abgeschlossenen Durchlauf (oder beim Öffnen eines leeren
// Fehlerkarten-Decks) die passende Erfolgsmeldung + Statistik zu diesem Durchlauf.
function anzeigeFertigStatistik() {
  if (aktuellerLernModus === "fehlerkarten") {
    fertigTitel.textContent = "🎉 Keine Fehlerkarten mehr! Du hast aktuell alle schwierigen Karten gemeistert.";
    btnNeustart.classList.add("hidden"); // "Nochmal von vorne" ergibt hier keinen Sinn
  } else {
    fertigTitel.textContent = "🎉 Geschafft! Du kannst alle Karten dieses Decks.";
    btnNeustart.classList.remove("hidden");
  }

  const gesamtKlicks = sessionRichtigKlicks + sessionFalschKlicks;
  if (gesamtKlicks === 0) {
    fertigStatistik.textContent = "";
    return;
  }

  const prozentRichtig = Math.round((sessionRichtigKlicks / gesamtKlicks) * 100);
  const prozentFalsch = 100 - prozentRichtig;
  fertigStatistik.textContent = `In diesem Durchlauf: ${prozentRichtig} % richtig, ${prozentFalsch} % falsch (${gesamtKlicks} Bewertungen)`;
}

// Zeigt die aktuell erste Karte der Warteschlange an
function zeigeAktuelleKarte() {
  cardInner.classList.remove("flipped");
  const aktuelleKarte = queue[0];
  fragetext.textContent = aktuelleKarte.frage;
  antwortText.textContent = aktuelleKarte.antwort;
}

// Aktualisiert Text und Balken der Fortschrittsanzeige im Lernmodus.
// Im Fehlerkarten-Modus zeigen wir statt "Karte X von Y" den einfachen
// Hinweis "Noch X Fehlerkarten", wie gewünscht.
function aktualisiereFortschritt() {
  const deck = aktuellesDeck();

  if (aktuellerLernModus === "fehlerkarten") {
    const nochOffen = queue.length;
    const prozent =
      sessionFehlerkartenGesamt === 0
        ? 100
        : Math.round(((sessionFehlerkartenGesamt - nochOffen) / sessionFehlerkartenGesamt) * 100);

    progressText.textContent = `Noch ${nochOffen} Fehlerkarte${nochOffen === 1 ? "" : "n"}`;
    progressDetails.textContent = "";
    progressFill.style.width = prozent + "%";
    return;
  }

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

// "Gewusst": correctCount hoch, Karte verlässt die Warteschlange, gilt als gekonnt.
// Nur im Fehlerkarten-Modus wird sie damit auch aus dem Fehlerkarten-Deck entfernt -
// im normalen Modus bleibt eine bestehende Fehlerkarten-Markierung bestehen.
btnGewusst.addEventListener("click", () => {
  const karte = queue.shift();
  karte.gekonnt = true;
  karte.richtigAnzahl = (karte.richtigAnzahl || 0) + 1;
  karte.zuletztGelernt = new Date().toISOString();

  if (aktuellerLernModus === "fehlerkarten") {
    karte.istFehlerkarte = false;
  }

  sessionRichtigKlicks++;
  speichereDecks();
  wennFertigOderNaechsteKarte();
});

// "Nicht gewusst": wrongCount hoch, Karte wird/bleibt Fehlerkarte und wandert
// ans Ende der Warteschlange (kommt im selben Durchlauf wieder dran).
btnNichtGewusst.addEventListener("click", () => {
  const karte = queue.shift();
  karte.falschAnzahl = (karte.falschAnzahl || 0) + 1;
  karte.istFehlerkarte = true;
  karte.zuletztGelernt = new Date().toISOString();

  sessionFalschKlicks++;
  queue.push(karte);
  speichereDecks();
  wennFertigOderNaechsteKarte();
});

// "Nochmal von vorne" (nur im normalen Modus sichtbar): ganzes Deck zurücksetzen
btnNeustart.addEventListener("click", () => {
  const deck = aktuellesDeck();
  deck.karten.forEach((k) => (k.gekonnt = false));
  speichereDecks();
  queue = [...deck.karten];

  sessionRichtigKlicks = 0;
  sessionFalschKlicks = 0;
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
    gekonnt: false,
    falschAnzahl: 0,
    richtigAnzahl: 0,
    istFehlerkarte: false,
    zuletztGelernt: null
  };

  if (neueKarte.frage === "" || neueKarte.antwort === "") return;

  const deck = aktuellesDeck();
  deck.karten.push(neueKarte);
  speichereDecks();

  // Eine neue Karte ist noch nie falsch beantwortet worden, gehört also nur in
  // den normalen Durchlauf, nicht automatisch in einen laufenden Fehlerkarten-Durchlauf.
  if (aktuellerLernModus === "normal") {
    queue.push(neueKarte);
  }
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
