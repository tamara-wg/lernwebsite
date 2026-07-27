// ---- Speicherung ----
// Local Storage merkt sich Daten im Browser, auch nach dem Schließen der Seite.
// WICHTIG: Das ist nur auf DIESEM Gerät/Browser sichtbar, nicht für andere Personen
// (dafür bräuchten wir später eine echte Datenbank, siehe Phase 3 in der CLAUDE.md).
const SPEICHER_SCHLUESSEL = "karteikarten-decks";
const ALTER_SPEICHER_SCHLUESSEL = "karteikarten-deck"; // aus der Vorgänger-Version (nur ein Deck)

// Vorgegebene Karten für das VWL-Deck, Unterthema "Wissenschaft".
// Eigene Funktion (statt fest im Deck verdrahtet), damit sie sowohl beim
// allerersten Aufruf als auch bei der Migration bestehender Local-Storage-
// Daten (siehe ergaenzeVwlStandardkarten) verwendet werden kann.
function erzeugeVwlWissenschaftKarten() {
  return [
    { id: 1, unterthema: "Wissenschaft", frage: "Was versteht man unter Wissenschaft?", antwort: "Die systematische und damit nicht planlose bzw. willkürliche Erforschung eines bestimmten, abgegrenzten Stoff- bzw. Wissensgebietes mithilfe geeigneter Forschungsmethoden.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 2, unterthema: "Wissenschaft", frage: "Was bezeichnet das Erkenntnisobjekt einer Wissenschaft?", antwort: "Das bestimmte, abgegrenzte Stoff- bzw. Wissensgebiet, das untersucht wird.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 3, unterthema: "Wissenschaft", frage: "Was sind wesentliche Kennzeichen einer Wissenschaft?", antwort: "Ein abgegrenztes Erkenntnisobjekt, eigene Forschungsmethoden und eine spezifische Terminologie.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 4, unterthema: "Wissenschaft", frage: "In welche zwei großen Bereiche lassen sich Wissenschaften einteilen?", antwort: "In Formalwissenschaften und Realwissenschaften.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 5, unterthema: "Wissenschaft", frage: "Was sind Formalwissenschaften + Beispiele?", antwort: "Wissenschaften, die konsistente, in sich widerspruchsfreie Systeme von Aussagen und Verfahrensregeln behandeln, z. B. Logik und Mathematik.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 6, unterthema: "Wissenschaft", frage: "Was sind Realwissenschaften + Beispiele?", antwort: "Wissenschaften, die sich mit Aussagen über die Realität befassen, z. B. Psychologie und Physik.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 7, unterthema: "Wissenschaft", frage: "Womit beschäftigen sich Natur- und Geisteswissenschaften + Beispiele?", antwort: "Natur: Erscheinungen bzw. Erklärungen außerhalb des Menschen, z. B. Physik, Chemie, Geologie; Geistes: Mit Phänomenen des menschlichen Geistes, z. B. Philosophie, Sprachwissenschaft.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 8, unterthema: "Wissenschaft", frage: "Zu welcher Wissenschaftsart gehören die Wirtschaftswissenschaften + Erkenntnisobjekt?", antwort: "Realwissenschaften, und dort zu den Sozialwissenschaften. Erkenntnisobjekt: Sämtliche Erscheinungen des Wirtschaftslebens.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null }
  ];
}

// Vorgegebene Start-Decks, falls noch gar nichts gespeichert ist.
function erzeugeStandardDecks() {
  return [
    {
      id: 1,
      titel: "VWL",
      statistik: { durchlaeufeAbgeschlossen: 0, verlauf: [] },
      karten: erzeugeVwlWissenschaftKarten()
    }
  ];
}

// Entfernt das alte Test-Deck "Hauptstädte" auch aus bereits gespeicherten
// Daten (falls es aus einer früheren Version noch im Local Storage steckt).
function entferneHauptstaedteDeck(decks) {
  return decks.filter((deck) => deck.titel !== "Hauptstädte");
}

// Trägt die vorgegebenen VWL-Karten nach, falls das VWL-Deck aus einer
// früheren Version bereits existiert, aber noch keine Karten hat.
function ergaenzeVwlStandardkarten(decks) {
  const vwlDeck = decks.find((d) => d.titel === "VWL");
  if (vwlDeck && vwlDeck.karten.length === 0) {
    vwlDeck.karten = erzeugeVwlWissenschaftKarten();
  }
  return decks;
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
      if (typeof karte.unterthema === "undefined") karte.unterthema = null;
    });
  });
  return decks;
}

// Stellt sicher, dass jedes Deck ein "statistik"-Feld besitzt, auch wenn es
// aus einer älteren Version gespeichert wurde, die das noch nicht kannte.
function ergaenzeDeckStatistik(decks) {
  decks.forEach((deck) => {
    if (!deck.statistik) {
      deck.statistik = { durchlaeufeAbgeschlossen: 0, verlauf: [] };
    }
  });
  return decks;
}

// Die fünf Fach-Kategorien, die im "Kategorien"-Feld im Lernmodus als
// Buttons erscheinen. Fragen/Antworten kommen später dazu - bis dahin
// legen wir die Decks schon mal leer an, damit die Buttons funktionieren.
const STANDARD_KATEGORIEN = ["VWL", "Recht", "FiBu", "Statistik", "Kosten"];

// Ergänzt fehlende Kategorie-Decks (auch bei bereits vorhandenem Local
// Storage, damit die neuen Buttons nicht ins Leere führen).
function ergaenzeStandardKategorien(decks) {
  STANDARD_KATEGORIEN.forEach((titel, index) => {
    if (!decks.some((d) => d.titel === titel)) {
      decks.push({
        id: Date.now() + index,
        titel,
        statistik: { durchlaeufeAbgeschlossen: 0, verlauf: [] },
        karten: []
      });
    }
  });
  return decks;
}

// Lädt die Decks aus dem Local Storage. Falls es noch die alte, einfache
// Speicherform (ein einzelnes Deck ohne "gekonnt"-Status) gibt, wird sie
// einmalig in das neue Format überführt.
function ladeDecks() {
  const gespeichert = localStorage.getItem(SPEICHER_SCHLUESSEL);
  if (gespeichert) {
    const decks = entferneHauptstaedteDeck(JSON.parse(gespeichert));
    return ergaenzeStandardKategorien(ergaenzeVwlStandardkarten(ergaenzeDeckStatistik(ergaenzeLernfelder(decks))));
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
    return ergaenzeStandardKategorien([{ id: 1, titel: "Hauptstädte", statistik: { durchlaeufeAbgeschlossen: 0, verlauf: [] }, karten }]);
  }

  return ergaenzeStandardKategorien(erzeugeStandardDecks());
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

// Für den Fortschritts-Ring DIESER Session (rechts im Lernmodus, siehe Referenzbild):
// anders als der Gesamt-Fortschritt im Dashboard bezieht sich das rein auf den
// aktuell laufenden Durchlauf. Eine Karte ist "offen" (grau), bis sie in diesem
// Durchlauf zum ersten Mal bewertet wurde; "muss ich üben" (rot), solange sie in
// diesem Durchlauf schon mal falsch war und noch nicht richtig beantwortet wurde;
// "kann ich" (grün), sobald sie in diesem Durchlauf richtig beantwortet wurde -
// auch wenn sie vorher schon mal rot war.
let sessionGekonntIds = new Set();
let sessionFalschIds = new Set();
let sessionGesamt = 0;

function aktuellesDeck() {
  return decks.find((d) => d.id === aktuellesDeckId);
}

// ---- HTML-Elemente holen ----
const viewDashboard = document.getElementById("view-dashboard");
const viewLernmodus = document.getElementById("view-lernmodus");
const viewStatistik = document.getElementById("view-statistik");

const navHome = document.getElementById("nav-home");
const navLernen = document.getElementById("nav-lernen");
const navFortschritt = document.getElementById("nav-fortschritt");

const btnStatistikZurueck = document.getElementById("btn-statistik-zurueck");
const statistikListe = document.getElementById("statistik-liste");

const deckListe = document.getElementById("deck-liste");
const klausurenListe = document.getElementById("klausuren-liste");

const deckTitelAnzeige = document.getElementById("deck-titel-anzeige");
const themenListe = document.getElementById("themen-liste");

const card = document.getElementById("card");
const cardInner = document.getElementById("card-inner");
const fragetext = document.getElementById("frage-text");
const antwortText = document.getElementById("antwort-text");

const btnGewusst = document.getElementById("btn-gewusst");
const btnNichtGewusst = document.getElementById("btn-nicht-gewusst");
const btnNeustart = document.getElementById("btn-neustart");
const modusHinweis = document.getElementById("modus-hinweis");

const progressText = document.getElementById("progress-text");
const progressProzent = document.getElementById("progress-prozent");
const progressFill = document.getElementById("progress-fill");

const lernBereich = document.querySelector(".card");
const hinweis = document.querySelector(".hint");
const buttonsBereich = document.querySelector(".buttons");
const fertigNachricht = document.getElementById("fertig-nachricht");
const fertigTitel = document.getElementById("fertig-titel");
const fertigStatistik = document.getElementById("fertig-statistik");
const keineKartenNachricht = document.getElementById("keine-karten-nachricht");

// ============================================================
// GLOBALE NAVIGATION (Kopfleiste, auf allen Ansichten gleich)
// ============================================================

// Markiert den passenden Nav-Punkt als "aktiv" (türkise Pille, siehe CSS)
function setzeAktivenNavPunkt(punkt) {
  [navHome, navLernen, navFortschritt].forEach((btn) => btn.classList.remove("aktiv"));
  if (punkt === "home") navHome.classList.add("aktiv");
  else if (punkt === "lernen") navLernen.classList.add("aktiv");
  else if (punkt === "fortschritt") navFortschritt.classList.add("aktiv");
}

// Wechselt zur Dashboard-Ansicht, egal von welcher Ansicht aus man kommt.
// Das zuletzt geöffnete Deck (aktuellesDeckId) wird bewusst NICHT zurückgesetzt,
// damit man über den "Lernen"-Nav-Punkt genau dort weitermachen kann, wo man
// aufgehört hat (siehe navLernen weiter unten).
function zeigeDashboard() {
  viewLernmodus.classList.add("hidden");
  viewStatistik.classList.add("hidden");
  viewDashboard.classList.remove("hidden");
  renderDashboard();
  renderKlausuren();
  setzeAktivenNavPunkt("home");
}

navHome.addEventListener("click", zeigeDashboard);

// "Lernen": zeigt die zuletzt geöffnete Session wieder an, falls gerade eine
// läuft. Ist gerade kein Deck geöffnet, gibt es nichts zu zeigen -> Dashboard.
navLernen.addEventListener("click", () => {
  if (aktuellesDeckId === null) {
    zeigeDashboard();
    return;
  }
  viewDashboard.classList.add("hidden");
  viewStatistik.classList.add("hidden");
  viewLernmodus.classList.remove("hidden");
  setzeAktivenNavPunkt("lernen");
});

// "Fortschritt": zeigt vorerst die bestehende Statistik-Seite (die eigene
// "Fortschritt"-Seite aus dem Referenzbild bauen wir später). Sowohl der
// Nav-Punkt oben als auch der "Fortschritt anzeigen"-Button im Lernmodus
// führen beide hierher.
function zeigeFortschritt() {
  renderStatistik();
  viewDashboard.classList.add("hidden");
  viewLernmodus.classList.add("hidden");
  viewStatistik.classList.remove("hidden");
  setzeAktivenNavPunkt("fortschritt");
}

navFortschritt.addEventListener("click", zeigeFortschritt);

const btnFortschrittAnzeigen = document.getElementById("btn-fortschritt-anzeigen");
btnFortschrittAnzeigen.addEventListener("click", zeigeFortschritt);

// Gleicher Button, nur auf der Home-Seite (führt ebenfalls zur Fortschritt/Statistik-Ansicht)
const btnFortschrittAnzeigenHome = document.getElementById("btn-fortschritt-anzeigen-home");
btnFortschrittAnzeigenHome.addEventListener("click", zeigeFortschritt);

btnStatistikZurueck.addEventListener("click", zeigeDashboard);

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

// Reihenfolge + Icon-Bilder der Deck-Zeilen auf der Home-Seite, 1:1 aus Figma.
// Jedes Icon hat dort ein eigenes Seitenverhältnis (Breite/Höhe kommen direkt
// aus den Figma-Maßen), deshalb hier pro Deck statt einheitlich hinterlegt.
const STARTSEITE_DECK_REIHENFOLGE = ["VWL", "Kosten", "Recht", "Statistik", "FiBu"];
const DECK_ICON_BILDER = {
  VWL: { src: "images/Icon VWL 1.png", breite: 55, hoehe: 47 },
  Kosten: { src: "images/Icon Kosten 1.png", breite: 63, hoehe: 46 },
  Recht: { src: "images/Icon Recht 1.png", breite: 64, hoehe: 48 },
  Statistik: { src: "images/Icon Statistik 1.png", breite: 63, hoehe: 49 },
  FiBu: { src: "images/Icon FiBu 1.png", breite: 65, hoehe: 51 }
};

// ============================================================
// "NÄCHSTE KLAUSUREN" (Home-Seite)
// ============================================================

// Feste Klausur-Termine, fest im Code hinterlegt (wie das Standard-Deck).
// Monat ist 0-indiziert in JavaScript, 8 = September.
const KLAUSUREN = [
  { fach: "Kosten", datum: new Date(2026, 8, 8) },
  { fach: "FiBu", datum: new Date(2026, 8, 11) },
  { fach: "VWL", datum: new Date(2026, 8, 15) },
  { fach: "Recht", datum: new Date(2026, 8, 17) },
  { fach: "Statistik", datum: new Date(2026, 8, 21) }
];

// Anzahl volle Kalendertage zwischen heute und einem Datum (0 = heute).
// Uhrzeiten werden dafür auf Mitternacht gesetzt, damit nur die Kalender-
// tage zählen, nicht die genaue Uhrzeit.
function tageBisDatum(datum) {
  const heute = new Date();
  heute.setHours(0, 0, 0, 0);
  const ziel = new Date(datum);
  ziel.setHours(0, 0, 0, 0);
  return Math.round((ziel - heute) / (1000 * 60 * 60 * 24));
}

// Baut die "Nächste Klausuren"-Liste auf: die bis zu zwei zeitlich
// nächsten, noch nicht vergangenen Klausuren (heute zählt noch, "0 Tage").
function renderKlausuren() {
  klausurenListe.innerHTML = "";

  const naechste = KLAUSUREN
    .map((k) => ({ ...k, tage: tageBisDatum(k.datum) }))
    .filter((k) => k.tage >= 0)
    .sort((a, b) => a.tage - b.tage)
    .slice(0, 2);

  if (naechste.length === 0) {
    const hinweis = document.createElement("p");
    hinweis.className = "klausuren-leer";
    hinweis.textContent = "Keine weiteren Klausuren";
    klausurenListe.appendChild(hinweis);
    return;
  }

  naechste.forEach((klausur) => {
    const zeile = document.createElement("li");
    zeile.className = "klausur-zeile";

    const icon = document.createElement("img");
    icon.src = "images/Icon kalender 1.png";
    icon.alt = "";
    icon.className = "klausur-icon";

    const info = document.createElement("div");
    info.className = "klausur-info";

    const name = document.createElement("p");
    name.className = "klausur-name";
    name.textContent = klausur.fach;

    const datum = document.createElement("p");
    datum.className = "klausur-datum";
    datum.textContent = klausur.datum.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    info.appendChild(name);
    info.appendChild(datum);

    const trenner = document.createElement("span");
    trenner.className = "klausur-trenner";
    trenner.setAttribute("aria-hidden", "true");

    const tage = document.createElement("div");
    tage.className = "klausur-tage";

    const tageZahl = document.createElement("span");
    tageZahl.className = "klausur-tage-zahl";
    tageZahl.textContent = klausur.tage;

    const tageLabel = document.createElement("span");
    tageLabel.className = "klausur-tage-label";
    tageLabel.textContent = "Tage";

    tage.appendChild(tageZahl);
    tage.appendChild(tageLabel);

    zeile.appendChild(icon);
    zeile.appendChild(info);
    zeile.appendChild(trenner);
    zeile.appendChild(tage);

    klausurenListe.appendChild(zeile);
  });
}

// Baut die Deck-Liste sowie den Gesamt-Fortschritt neu auf
// (z. B. nach dem Öffnen/Verlassen eines Decks oder Änderungen am Fortschritt)
function renderDashboard() {
  deckListe.innerHTML = "";

  // Nur die fünf Fach-Decks, in der Reihenfolge aus Figma - eventuelle
  // andere Decks tauchen hier bewusst nicht auf.
  const sichtbareDecks = STARTSEITE_DECK_REIHENFOLGE
    .map((titel) => decks.find((d) => d.titel === titel))
    .filter((deck) => deck !== undefined);

  sichtbareDecks.forEach((deck) => {
    const gesamt = deck.karten.length;

    const zeile = document.createElement("div");
    zeile.className = "deck-zeile dashboard-zeile";

    const iconDaten = DECK_ICON_BILDER[deck.titel];
    const icon = document.createElement("img");
    icon.className = "deck-icon-bild";
    icon.src = iconDaten.src;
    icon.style.width = iconDaten.breite + "px";
    icon.style.height = iconDaten.hoehe + "px";
    icon.alt = "";

    const info = document.createElement("div");
    info.className = "deck-info";

    const titel = document.createElement("h3");
    titel.textContent = deck.titel;

    const details = document.createElement("p");
    details.textContent = `${gesamt} Karte${gesamt === 1 ? "" : "n"}`;

    info.appendChild(titel);
    info.appendChild(details);

    const aktionen = document.createElement("div");
    aktionen.className = "deck-aktionen";

    const btnLernen = document.createElement("button");
    btnLernen.className = "btn-deck-lernen";
    btnLernen.textContent = "Lernen";
    btnLernen.addEventListener("click", () => oeffneDeck(deck.id, "normal"));

    // Die Anzahl ("Fehlerkarten · 3") zeigen wir hier bewusst nicht mehr an -
    // das kommt später auf die noch zu bauende "Kategorien"-Seite. Der Button
    // selbst (und damit der Fehlerkarten-Modus) bleibt voll funktionsfähig.
    const btnFehlerkarten = document.createElement("button");
    btnFehlerkarten.className = "btn-deck-fehlerkarten";
    btnFehlerkarten.textContent = "Fehlerkarten";
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
//
// Jede Karte wird für den Ring genau EINER der drei Kategorien zugeordnet
// (nie überlappend, damit die Prozente im Ring immer 100 % ergeben):
//   1. "Offen"        = noch nie gelernt (zuletztGelernt ist null)
//   2. "Muss ich üben" = aktuell eine Fehlerkarte (auch wenn sie zwischendurch
//                        schon mal im normalen Modus als "gekonnt" markiert wurde -
//                        sie gilt erst als gemeistert, wenn sie auch im
//                        Fehlerkarten-Durchlauf richtig beantwortet wurde)
//   3. "Kann ich"     = gelernt, aktuell keine Fehlerkarte
function aktualisiereGesamtFortschritt() {
  let gesamtAlleDecks = 0;
  let gekonntAlleDecks = 0;
  let uebenAlleDecks = 0;
  let offenAlleDecks = 0;

  decks.forEach((deck) => {
    deck.karten.forEach((karte) => {
      gesamtAlleDecks++;
      if (karte.zuletztGelernt === null) {
        offenAlleDecks++;
      } else if (karte.istFehlerkarte) {
        uebenAlleDecks++;
      } else if (karte.gekonnt) {
        gekonntAlleDecks++;
      }
    });
  });

  const prozent = gesamtAlleDecks === 0 ? 0 : Math.round((gekonntAlleDecks / gesamtAlleDecks) * 100);

  document.getElementById("fortschritt-prozent").textContent = prozent + "%";
  document.getElementById("stat-kannich").textContent = gekonntAlleDecks;
  document.getElementById("stat-uebem").textContent = uebenAlleDecks;
  document.getElementById("stat-offen").textContent = offenAlleDecks;

  // Ring als drei aneinandergereihte Kreisabschnitte - selbes Farbschema
  // wie der Session-Fortschritt-Ring im Lernmodus (siehe .punkt-kannich/-uebem/-offen).
  const ring = document.getElementById("fortschritt-ring");
  const gekonntGrad = gesamtAlleDecks === 0 ? 0 : (gekonntAlleDecks / gesamtAlleDecks) * 360;
  const uebenGrad = gesamtAlleDecks === 0 ? 0 : (uebenAlleDecks / gesamtAlleDecks) * 360;
  const uebenEnde = gekonntGrad + uebenGrad;
  ring.style.background = `conic-gradient(#0da1a7 ${gekonntGrad}deg, #f99593 ${gekonntGrad}deg ${uebenEnde}deg, #e8e8ed ${uebenEnde}deg)`;
}

// "Neues Deck erstellen" gibt es auf der Home-Seite vorerst nicht mehr -
// das kommt erst zurück, sobald es einen Login gibt (siehe CLAUDE.md Phase 3).

// ============================================================
// ANSICHT 3: STATISTIK
// ============================================================

// Baut die Statistik-Liste neu auf: pro Deck die Erfolgsquote (wie viele
// Karten aktuell "kann ich" sind), die Anzahl abgeschlossener Durchläufe
// und - falls vorhanden - einen kleinen Verlauf der letzten Durchläufe.
function renderStatistik() {
  statistikListe.innerHTML = "";

  const sichtbareDecks = decks;

  if (sichtbareDecks.length === 0) {
    statistikListe.innerHTML = "<p>Noch keine Decks vorhanden.</p>";
    return;
  }

  sichtbareDecks.forEach((deck, index) => {
    const gesamt = deck.karten.length;
    const gekonnt = deck.karten.filter((k) => k.gekonnt).length;
    const erfolgsquote = gesamt === 0 ? 0 : Math.round((gekonnt / gesamt) * 100);
    const optik = DECK_OPTIK[index % DECK_OPTIK.length];

    const zeile = document.createElement("div");
    zeile.className = "deck-zeile statistik-zeile";

    const icon = document.createElement("div");
    icon.className = "deck-icon";
    icon.style.backgroundColor = optik.farbe;
    icon.textContent = optik.icon;

    const info = document.createElement("div");
    info.className = "deck-info";

    const titel = document.createElement("h3");
    titel.textContent = deck.titel;

    const details = document.createElement("p");
    details.textContent = `Kann ich: ${gekonnt}/${gesamt} (${erfolgsquote} %) · Abgeschlossene Durchläufe: ${deck.statistik.durchlaeufeAbgeschlossen}`;

    info.appendChild(titel);
    info.appendChild(details);

    if (deck.statistik.verlauf.length > 0) {
      const verlaufText = deck.statistik.verlauf
        .slice()
        .reverse()
        .map((eintrag) => {
          const datumText = new Date(eintrag.datum).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
          return `${datumText}: ${eintrag.prozentRichtig} %`;
        })
        .join(" · ");

      const verlaufAbsatz = document.createElement("p");
      verlaufAbsatz.className = "statistik-verlauf";
      verlaufAbsatz.textContent = `Verlauf: ${verlaufText}`;
      info.appendChild(verlaufAbsatz);
    }

    zeile.appendChild(icon);
    zeile.appendChild(info);
    statistikListe.appendChild(zeile);
  });
}

// ============================================================
// ANSICHT 2: LERNMODUS
// ============================================================

// Gibt alle aktuellen Fehlerkarten eines Decks zurück
function fehlerkartenDesDecks(deck) {
  return deck.karten.filter((k) => k.istFehlerkarte);
}

// Mischt ein Array zufällig (Fisher-Yates-Shuffle) und gibt eine NEUE Liste
// zurück - das Original-Array (z. B. deck.karten) bleibt unverändert, nur
// die Reihenfolge des jeweiligen Lern-Durchlaufs wird zufällig bestimmt.
function gemischt(liste) {
  const kopie = [...liste];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

// Hintergrundfarben der fünf Kategorie-Buttons, in der vorgegebenen Reihenfolge
const KATEGORIEN_FARBEN = ["#eaf4fc", "#f1edfc", "#e9f5ee", "#fef5dd", "#fdebe2"];

// Baut die Kategorien-Liste in der rechten Spalte des Lernmodus neu auf:
// fünf feste Fach-Buttons (führen in deren normalen Lernmodus), das
// aktuell geöffnete Deck wird optisch hervorgehoben.
function renderThemenListe() {
  themenListe.innerHTML = "";

  STANDARD_KATEGORIEN.forEach((titel, index) => {
    const deck = decks.find((d) => d.titel === titel);
    if (!deck) return;

    const gesamt = deck.karten.length;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-kategorie";
    if (deck.id === aktuellesDeckId) btn.classList.add("aktiv");
    btn.style.backgroundColor = KATEGORIEN_FARBEN[index % KATEGORIEN_FARBEN.length];
    btn.addEventListener("click", () => oeffneDeck(deck.id, "normal"));

    const titelSpan = document.createElement("span");
    titelSpan.className = "btn-kategorie-titel";
    titelSpan.textContent = titel;

    const rechts = document.createElement("span");
    rechts.className = "btn-kategorie-rechts";

    const anzahlSpan = document.createElement("span");
    anzahlSpan.textContent = gesamt;

    const pfeilSpan = document.createElement("span");
    pfeilSpan.className = "btn-kategorie-pfeil";
    pfeilSpan.textContent = "→";

    rechts.appendChild(anzahlSpan);
    rechts.appendChild(pfeilSpan);

    btn.appendChild(titelSpan);
    btn.appendChild(rechts);
    themenListe.appendChild(btn);
  });
}

// Wechselt von der Dashboard-Ansicht in den Lernmodus für ein bestimmtes Deck.
// modus ist entweder "normal" (alle noch nicht gekonnten Karten) oder
// "fehlerkarten" (nur die aktuellen Fehlerkarten dieses Decks).
function oeffneDeck(deckId, modus) {
  // Ist genau diese Session (selbes Deck, selber Modus) schon offen UND noch
  // nicht fertig (Warteschlange nicht leer), wird sie fortgesetzt statt neu
  // gestartet - sonst würde z. B. ein Abstecher zum Dashboard und zurück den
  // Session-Fortschritts-Ring auf 0 zurücksetzen, obwohl man mitten in
  // derselben Lern-Session ist. Ist die Session bereits fertig, soll ein
  // erneuter Klick dagegen ganz normal neu aufbauen (z. B. damit ein frisch
  // gestarteter Fehlerkarten-Durchlauf auch neu markierte Fehlerkarten zeigt).
  const istGleicheSession = deckId === aktuellesDeckId && modus === aktuellerLernModus && queue.length > 0;

  aktuellesDeckId = deckId;
  aktuellerLernModus = modus;
  const deck = aktuellesDeck();

  deckTitelAnzeige.textContent = deck.titel;
  modusHinweis.classList.toggle("hidden", modus !== "fehlerkarten");

  if (!istGleicheSession) {
    sessionRichtigKlicks = 0;
    sessionFalschKlicks = 0;
    sessionGekonntIds = new Set();
    sessionFalschIds = new Set();

    if (modus === "fehlerkarten") {
      queue = gemischt(fehlerkartenDesDecks(deck));
      sessionFehlerkartenGesamt = queue.length;
    } else {
      queue = gemischt(deck.karten.filter((k) => !k.gekonnt));
    }

    sessionGesamt = queue.length;
  }

  renderThemenListe();
  starteAnzeige();

  viewDashboard.classList.add("hidden");
  viewStatistik.classList.add("hidden");
  viewLernmodus.classList.remove("hidden");
  setzeAktivenNavPunkt("lernen");
}

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
    fertigTitel.textContent = "🎉 Geschafft! Du hast alle Karten dieser Session gelernt.";
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

  // Statt eines festen Hinweistextes zeigen wir hier das Unterthema der
  // Karte an (z. B. "Wissenschaft"). Hat eine Karte kein Unterthema,
  // blenden wir die Zeile aus.
  if (aktuelleKarte.unterthema) {
    hinweis.textContent = aktuelleKarte.unterthema;
    hinweis.classList.remove("hidden");
  } else {
    hinweis.classList.add("hidden");
  }
}

// Aktualisiert den Fortschritts-Ring DIESER Session rechts im Lernmodus
// (siehe Kommentar bei den Session-Variablen oben für die Kategorien-Logik).
function aktualisiereSessionFortschritt() {
  const gekonnt = sessionGekonntIds.size;
  const ueben = sessionFalschIds.size;
  const offen = Math.max(sessionGesamt - gekonnt - ueben, 0);

  const prozent = sessionGesamt === 0 ? 0 : Math.round((gekonnt / sessionGesamt) * 100);

  document.getElementById("session-prozent").textContent = prozent + "%";
  document.getElementById("session-kannich").textContent = gekonnt;
  document.getElementById("session-uebem").textContent = ueben;
  document.getElementById("session-offen").textContent = offen;

  const ring = document.getElementById("session-ring");
  const gekonntGrad = sessionGesamt === 0 ? 0 : (gekonnt / sessionGesamt) * 360;
  const uebenGrad = sessionGesamt === 0 ? 0 : (ueben / sessionGesamt) * 360;
  const uebenEnde = gekonntGrad + uebenGrad;
  // Eigenes Farbschema für diesen Ring (siehe .punkt-kannich/-uebem/-offen in style.css)
  ring.style.background = `conic-gradient(#0da1a7 ${gekonntGrad}deg, #f99593 ${gekonntGrad}deg ${uebenEnde}deg, #e8e8ed ${uebenEnde}deg)`;
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
    progressProzent.textContent = prozent + "%";
    progressFill.style.width = prozent + "%";
    aktualisiereSessionFortschritt();
    return;
  }

  const gesamt = deck.karten.length;
  const gekonnt = deck.karten.filter((k) => k.gekonnt).length;
  const prozent = gesamt === 0 ? 0 : Math.round((gekonnt / gesamt) * 100);

  progressText.textContent = `Karte ${Math.min(gekonnt + 1, gesamt)} von ${gesamt}`;
  progressProzent.textContent = prozent + "%";
  progressFill.style.width = prozent + "%";
  aktualisiereSessionFortschritt();
}

// Legt anhand der aktuellen Kartenliste fest, was angezeigt wird
function starteAnzeige() {
  const deck = aktuellesDeck();
  if (deck.karten.length === 0) {
    zeigeZustand("leer");
  } else if (queue.length === 0) {
    zeigeZustand("fertig");
  } else {
    zeigeZustand("lernen");
    zeigeAktuelleKarte();
  }
  aktualisiereFortschritt();
}

// Merkt sich einen abgeschlossenen normalen Durchlauf dauerhaft (für die
// Statistik-Ansicht): Anzahl der Durchläufe hoch, Erfolgsquote in den Verlauf.
// Nur normale Durchläufe zählen (kein Fehlerkarten-Durchlauf) und nur, wenn
// währenddessen wirklich etwas bewertet wurde (nicht bei einem schon leeren
// oder bereits komplett gekonnten Deck).
function speichereDurchlaufErgebnis() {
  const gesamtKlicks = sessionRichtigKlicks + sessionFalschKlicks;
  if (gesamtKlicks === 0) return;

  const deck = aktuellesDeck();
  const prozentRichtig = Math.round((sessionRichtigKlicks / gesamtKlicks) * 100);

  deck.statistik.durchlaeufeAbgeschlossen++;
  deck.statistik.verlauf.push({ datum: new Date().toISOString(), prozentRichtig });

  // Nur die letzten 10 Durchläufe merken - das reicht für einen einfachen Verlauf.
  if (deck.statistik.verlauf.length > 10) {
    deck.statistik.verlauf.shift();
  }

  speichereDecks();
}

// Prüft nach jeder Bewertung, ob der Durchlauf zu Ende ist,
// und zeigt sonst die nächste Karte + aktualisierten Fortschritt
function wennFertigOderNaechsteKarte() {
  if (queue.length === 0) {
    if (aktuellerLernModus === "normal") {
      speichereDurchlaufErgebnis();
    }
    zeigeZustand("fertig");
  } else {
    zeigeZustand("lernen");
    zeigeAktuelleKarte();
  }
  aktualisiereFortschritt();
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
  // War die Karte in diesem Durchlauf schon mal "nicht gewusst", gilt sie
  // trotz der jetzt richtigen Antwort noch nicht als gemeistert - sie bleibt
  // Fehlerkarte und taucht im nächsten Fehlerkarten-Durchlauf wieder auf.
  const warInDieserSessionSchonFalsch = sessionFalschIds.has(karte.id);
  karte.gekonnt = true;
  karte.richtigAnzahl = (karte.richtigAnzahl || 0) + 1;
  karte.zuletztGelernt = new Date().toISOString();

  if (aktuellerLernModus === "fehlerkarten" && !warInDieserSessionSchonFalsch) {
    karte.istFehlerkarte = false;
  }

  sessionRichtigKlicks++;
  sessionGekonntIds.add(karte.id);
  sessionFalschIds.delete(karte.id);
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
  sessionFalschIds.add(karte.id);
  queue.push(karte);
  speichereDecks();
  wennFertigOderNaechsteKarte();
});

// "Nochmal von vorne" (nur im normalen Modus sichtbar): ganzes Deck zurücksetzen
btnNeustart.addEventListener("click", () => {
  const deck = aktuellesDeck();
  deck.karten.forEach((k) => (k.gekonnt = false));
  speichereDecks();
  queue = gemischt(deck.karten);

  sessionRichtigKlicks = 0;
  sessionFalschKlicks = 0;
  sessionGekonntIds = new Set();
  sessionFalschIds = new Set();
  sessionGesamt = queue.length;
  starteAnzeige();
});

// ---- Start: Dashboard anzeigen ----
renderDashboard();
renderKlausuren();
