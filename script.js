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

// Vorgegebene Karten für das Recht-Deck, Unterthema "Das Rechtssystem".
// Gleiches Prinzip wie erzeugeVwlWissenschaftKarten (siehe ergaenzeRechtStandardkarten).
function erzeugeRechtRechtssystemKarten() {
  return [
    { id: 101, unterthema: "Das Rechtssystem", frage: "Welche drei Staatsgewalten gibt es und welche Aufgaben haben sie?", antwort: "Die Legislative beschließt Gesetze, die Exekutive führt Gesetze aus und die Judikative spricht Recht. Als „vierte Gewalt“ werden häufig Presse und Medien bezeichnet, da sie staatliches Handeln kontrollieren und Missstände aufzeigen.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 102, unterthema: "Das Rechtssystem", frage: "Wie läuft ein Gesetzgebungsverfahren auf Bundesebene grundsätzlich ab?", antwort: "Gesetzesvorschläge können vom Bundesrat, der Bundesregierung oder mindestens 5 % der Bundestagsmitglieder eingebracht werden. Der Bundestag berät den Entwurf in drei Lesungen. Danach wird der Bundesrat beteiligt. Abschließend prüft und unterzeichnet der Bundespräsident das Gesetz.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 103, unterthema: "Das Rechtssystem", frage: "Was ist der Unterschied zwischen Zustimmungs- und Einspruchsgesetzen?", antwort: "Bei einem Zustimmungsgesetz muss der Bundesrat zustimmen, damit das Gesetz wirksam wird. Bei einem Einspruchsgesetz kann der Bundesrat Einspruch einlegen, der Bundestag kann diesen Einspruch jedoch überstimmen.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 104, unterthema: "Das Rechtssystem", frage: "Wie unterscheiden sich Recht, Gerechtigkeit und Moral?", antwort: "Recht besteht aus verbindlichen und objektiv geltenden Regeln. Gerechtigkeit ist die subjektive Vorstellung davon, was angemessen oder fair ist. Moral umfasst subjektive Vorstellungen darüber, was richtig oder falsch ist, und kann sich gesellschaftlich verändern.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 105, unterthema: "Das Rechtssystem", frage: "Welcher grundlegende Beweisgrundsatz gilt in der Justiz?", antwort: "Wer etwas verlangt oder sich auf eine für ihn günstige Tatsache beruft, muss diese grundsätzlich beweisen.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 106, unterthema: "Das Rechtssystem", frage: "Welche Beteiligten gibt es typischerweise im Zivil- und Strafrecht?", antwort: "Im Zivilrecht stehen sich Kläger und Beklagter vor einem Richter gegenüber. Im Strafrecht erhebt die Staatsanwaltschaft Anklage gegen den Angeklagten.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 107, unterthema: "Das Rechtssystem", frage: "Was ist materielles Recht?", antwort: "„Recht haben“, „Inhalt des Rechts“ an sich, also die Rechtsvorschriften, die die Entstehung, Veränderung oder den Untergang von Rechten regeln. Habe ich Recht oder habe ich nicht Recht?", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 108, unterthema: "Das Rechtssystem", frage: "Was ist Prozessrecht?", antwort: "„Recht bekommen“, Prozessrecht regelt den Ablauf gerichtlicher Verfahren und die Feststellung des tatsächlichen Sachverhalts. Es beantwortet die Frage: „Wie bekomme ich Recht?“ Beispiele sind ZPO, StPO und ArbGG.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 109, unterthema: "Das Rechtssystem", frage: "Warum bedeutet „Recht haben“ nicht automatisch „Recht bekommen“?", antwort: "Ein Anspruch oder eine Strafbarkeit kann materiell bestehen, muss aber im Verfahren bewiesen werden. Fehlen die erforderlichen Beweise, kann das Recht trotz bestehender Vermutung nicht durchgesetzt werden.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 110, unterthema: "Das Rechtssystem", frage: "Was ist der Unterschied zwischen Erkenntnis- und Vollstreckungsverfahren?", antwort: "Im Erkenntnisverfahren wird festgestellt, ob ein Anspruch oder eine Strafbarkeit besteht. Im Vollstreckungsverfahren wird die Entscheidung tatsächlich durchgesetzt, etwa durch einen Gerichtsvollzieher oder durch den Vollzug einer Strafe.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 111, unterthema: "Das Rechtssystem", frage: "Was ist der Unterschied zwischen objektivem und subjektivem Recht?", antwort: "Das objektive Recht ist die Gesamtheit aller Rechtsvorschriften (Rechtsordnung). Das subjektive Recht ist die konkrete Rechtsposition eines Einzelnen (absolute + relative Rechte).", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 112, unterthema: "Das Rechtssystem", frage: "Was ist der Unterschied zwischen absoluten und relativen Rechten?", antwort: "Absolute Rechte wirken gegenüber allen Personen, etwa das Eigentumsrecht. Relative Rechte bestehen nur zwischen bestimmten Personen, zum Beispiel eine Forderung aus einem Vertrag.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 113, unterthema: "Das Rechtssystem", frage: "Wie unterscheiden sich Zivilrecht, Strafrecht und öffentliches Recht?", antwort: "Das Zivilrecht regelt Rechtsverhältnisse zwischen Bürgern, etwa Verträge. Das Strafrecht regelt strafbare Handlungen wie Betrug oder Körperverletzung. Das öffentliche Recht regelt Rechtsverhältnisse zwischen Bürger und Staat, etwa Baugenehmigungen.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 114, unterthema: "Das Rechtssystem", frage: "Was ist die Normenhierarchie?", antwort: "Die Normenhierarchie ordnet Rechtsnormen nach ihrem Rang. Bei einem Widerspruch gilt grundsätzlich die höherrangige Regelung vor der niedrigerrangigen (vgl. Gesetzespyramide).", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 115, unterthema: "Das Rechtssystem", frage: "Welche wichtigen Ebenen umfasst die Normenhierarchie?", antwort: "Von oben nach unten: Menschwürde steht über allem; Kern des Grundgesetzes; Europarecht; Verfassungsrecht; Völkerrecht; Gesetze; Gewohnheitsrecht; Rechtsverordnungen; Satzungen durch …; Tarifvertragsrecht; Betriebsvereinbarungen", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 116, unterthema: "Das Rechtssystem", frage: "Was sind Körperschaften, Anstalten und Stiftungen?", antwort: "Juristische Personen des öffentlichen Rechts: Körperschaften sind mitgliedschaftlich organisiert, etwa IHK oder Universität. Anstalten haben Benutzer statt Mitglieder, etwa Rundfunkanstalten. Stiftungen des öffentlichen Rechts nehmen öffentliche Aufgaben wahr und besitzen abgeleitete Hoheitsgewalt.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 117, unterthema: "Das Rechtssystem", frage: "Welche Bedeutung haben Urteile für andere Fälle?", antwort: "Ein Urteil ist unmittelbar für die Parteien des konkreten Verfahrens verbindlich. Es gilt nicht automatisch allgemein wie ein Gesetz, kann aber späteren Gerichten als Orientierung dienen.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 118, unterthema: "Das Rechtssystem", frage: "Wie unterscheiden sich Gutachtenstil und Urteilsstil?", antwort: "Beim Gutachtenstil wird die Rechtsfrage schrittweise geprüft: Frage beziehungsweise Obersatz, Voraussetzungen, Anwendung auf den Sachverhalt und Ergebnis. Beim Urteilsstil wird zuerst das Ergebnis genannt und anschließend begründet.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 119, unterthema: "Das Rechtssystem", frage: "Welche Reihenfolge gilt bei den Mängelrechten eines Käufers?", antwort: "Bei einem Sachmangel muss der Käufer grundsätzlich zunächst Nacherfüllung nach §§ 437 Nr. 1, 439 BGB verlangen. Erst wenn die Nacherfüllung scheitert oder entbehrlich ist, kommen weitere Rechte wie Rücktritt, Minderung oder Schadensersatz in Betracht.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null }
  ];
}

// Vorgegebene Karten für das Kosten-Deck, Unterthema "Theoretische Grundlagen".
// Gleiches Prinzip wie erzeugeVwlWissenschaftKarten (siehe ergaenzeKostenStandardkarten).
// Mehrteilige Antworten enthalten echte Zeilenumbrüche ("\n") - die Karten-
// Rückseite behält diese Umbrüche bei (siehe "white-space: pre-line" bei .text
// in style.css), damit z. B. "E: ..." und "I: ..." sauber untereinander stehen.
function erzeugeKostenTheoretischeGrundlagenKarten() {
  return [
    { id: 201, unterthema: "Theoretische Grundlagen", frage: "Woraus setzt sich das externe und woraus das interne Rechnungswesen zusammen?", antwort: "E: Bilanz + GuV\nI: Finanzrechnungen, Kosten-/Leistungsrechnung, Kapitalflussrechnung", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 202, unterthema: "Theoretische Grundlagen", frage: "Merkmale Strategisches Controlling?", antwort: "Zeithorizont: langfristig\nPlanungsstufe: strategische Planung\nDimension: Unternehmen: Stärken/Schwächen; Umwelt: Chancen/Risiken\nZielinhalte: Existenzsicherung\nZielgröße: Qualitativ: Erfolgspotenzial", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 203, unterthema: "Theoretische Grundlagen", frage: "Merkmale Operatives Controlling?", antwort: "Zielhorizont: kurz-/mittelfristig\nPlanungsstufe: taktische und operative Planung, Budgetierung\nDimension: Ertrag/Aufwand; Leistungen/Kosten\nZielinhalte: Rentabilität, Liquidität\nZielgröße: Quantitativ: Gewinn, Umsatz, Kosten", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 204, unterthema: "Theoretische Grundlagen", frage: "Wie wird „Investition“ definiert?", antwort: "Allgemein: der zielgerichtet (heutige) Einsatz knapper finanzieller Mittel zur Beschaffung von Produktionsfaktoren, der der künftigen Erwirtschaftung von Erträgen dienen.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 205, unterthema: "Theoretische Grundlagen", frage: "Unterschied Bilanzorientierter/Zahlungsorientierter Investitionsbegriff", antwort: "B: Investition ist die Beschaffung von Anlagevermögen\nZ: Investition wird durch Zahlungsstrom beschrieben, beginnt mit einer Auszahlung, auf welche später Einzahlungen folgen", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 206, unterthema: "Theoretische Grundlagen", frage: "Was wird unter „Finanzierung“ verstanden?", antwort: "Finanzierung beinhaltet alle gegenwärtigen und zukünftigen Maßnahmen, damit das Unternehmen stets über alle erforderlichen Zahlungsmittel verfügt (benötigt für: laufende Leistungsprozesse, Investitionen, Tilgung, Liquiditätsreserven und Gewinnausschüttung).", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 207, unterthema: "Theoretische Grundlagen", frage: "Unterschied Bilanzorientierter/Zahlungsorientierter Finanzierungsbegriff?", antwort: "B: Finanzierung ist die Bereitstellung von Kapital\nZ: Finanzierung wird durch Zahlungsstrom beschrieben, beginnt mit einer Einzahlung auf welche später Auszahlungen folgen", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 208, unterthema: "Theoretische Grundlagen", frage: "Zusammenhang zwischen Finanzierung und Investitionen?", antwort: "Investition beginnt mit einer Auszahlung, welche eine Finanzierung benötigt (Beschaffung bzw. Verfügbarkeit von Zahlungsmittel). Finanzierung beginnt mit einer Einzahlung und zieht i.d.R. Auszahlungen (Zins/Tilgung) nach sich.", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 209, unterthema: "Theoretische Grundlagen", frage: "In welche zwei Verfahren lässt sich die Investitionsrechnung gliedern?", antwort: "Statische und Dynamische Verfahren", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 210, unterthema: "Theoretische Grundlagen", frage: "Welche statischen Verfahren der Investitionsrechnung gibt es?", antwort: "Kostenvergleichsrechnung, Gewinnvergleichsrechnung, Rentabilitätsrechnung und Amortisationsrechnung", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null },
    { id: 211, unterthema: "Theoretische Grundlagen", frage: "Welche dynamischen Verfahren der Investitionsrechnung gibt es?", antwort: "Kapitalwert und Interner Zins", gekonnt: false, falschAnzahl: 0, richtigAnzahl: 0, istFehlerkarte: false, zuletztGelernt: null }
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

// Trägt die vorgegebenen Recht-Karten nach, falls das Recht-Deck (über
// STANDARD_KATEGORIEN) bereits existiert, aber noch keine Karten hat.
function ergaenzeRechtStandardkarten(decks) {
  const rechtDeck = decks.find((d) => d.titel === "Recht");
  if (rechtDeck && rechtDeck.karten.length === 0) {
    rechtDeck.karten = erzeugeRechtRechtssystemKarten();
  }
  return decks;
}

// Trägt die vorgegebenen Kosten-Karten nach, falls das Kosten-Deck (über
// STANDARD_KATEGORIEN) bereits existiert, aber noch keine Karten hat.
function ergaenzeKostenStandardkarten(decks) {
  const kostenDeck = decks.find((d) => d.titel === "Kosten");
  if (kostenDeck && kostenDeck.karten.length === 0) {
    kostenDeck.karten = erzeugeKostenTheoretischeGrundlagenKarten();
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
      // Merkt sich, ob die Karte beim ERSTEN Versuch ihres letzten "echten"
      // Lern-Durchlaufs (Themen/Zufall/Gesamt, siehe sessionErstversuchErledigtIds)
      // gewusst wurde - für die Themen-Fortschrittsanzeige im Themenauswahl-Pop-up.
      // null = noch nie in einem Durchlauf versucht.
      if (typeof karte.zuletztAufAnhiebGewusst === "undefined") karte.zuletztAufAnhiebGewusst = null;
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

// Stellt sicher, dass jedes Deck eine Liste "zufallGezogeneIds" besitzt -
// merkt sich dauerhaft, welche Karten in der aktuellen "Zufalls-Runde"
// (siehe ziehtZufallskarten) schon dran waren, auch über einen Neustart des
// Browsers hinweg.
function ergaenzeZufallVerlauf(decks) {
  decks.forEach((deck) => {
    if (!Array.isArray(deck.zufallGezogeneIds)) {
      deck.zufallGezogeneIds = [];
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
    return ergaenzeZufallVerlauf(
      ergaenzeKostenStandardkarten(
        ergaenzeRechtStandardkarten(
          ergaenzeStandardKategorien(ergaenzeVwlStandardkarten(ergaenzeDeckStatistik(ergaenzeLernfelder(decks))))
        )
      )
    );
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
    return ergaenzeZufallVerlauf(
      ergaenzeKostenStandardkarten(
        ergaenzeRechtStandardkarten(
          ergaenzeStandardKategorien([{ id: 1, titel: "Hauptstädte", statistik: { durchlaeufeAbgeschlossen: 0, verlauf: [] }, karten }])
        )
      )
    );
  }

  return ergaenzeZufallVerlauf(
    ergaenzeKostenStandardkarten(ergaenzeRechtStandardkarten(ergaenzeStandardKategorien(erzeugeStandardDecks())))
  );
}

function speichereDecks() {
  localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(decks));
}

// ---- Zustand der App ----
let decks = ladeDecks();
let aktuellesDeckId = null; // welches Deck ist gerade im Lernmodus geöffnet
let queue = [];              // Warteschlange (noch nicht "gekonnte" Karten) für den aktuellen Durchlauf

let aktuellerLernModus = "normal"; // "normal" = alle Karten, "fehlerkarten" = nur aktuelle Fehlerkarten, "thema" = nur ein Unterthema
let aktuellesThema = null; // nur relevant bei aktuellerLernModus === "thema" (null = Gruppe "Sonstiges")
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

// Merkt sich, für welche Karten in DIESER Session bereits der erste Versuch
// verbucht wurde (siehe karte.zuletztAufAnhiebGewusst) - weitere Versuche
// derselben Karte im selben Durchlauf (nach einem "Nicht gewusst") zählen
// dafür bewusst nicht mehr mit, nur der allererste.
let sessionErstversuchErledigtIds = new Set();

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

const kalenderMonatLabel = document.getElementById("kalender-monat-label");
const kalenderGrid = document.getElementById("kalender-grid");
const kalenderListe = document.getElementById("kalender-liste");
const btnKalenderZurueck = document.getElementById("btn-kalender-zurueck");
const btnKalenderVor = document.getElementById("btn-kalender-vor");

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
const btnFertigZurueck = document.getElementById("btn-fertig-zurueck");
const btnLernmodusVerlassen = document.getElementById("btn-lernmodus-verlassen");
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
  viewDeckauswahl.classList.add("hidden");
  viewLernmodus.classList.add("hidden");
  viewStatistik.classList.add("hidden");
  themenauswahlOverlay.classList.add("hidden");
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
  viewDeckauswahl.classList.add("hidden");
  viewStatistik.classList.add("hidden");
  themenauswahlOverlay.classList.add("hidden");
  viewLernmodus.classList.remove("hidden");
  setzeAktivenNavPunkt("lernen");
});

// "Fortschritt": zeigt vorerst die bestehende Statistik-Seite (die eigene
// "Fortschritt"-Seite aus dem Referenzbild bauen wir später). Sowohl der
// Nav-Punkt oben als auch der "Fortschritt anzeigen"-Button im Lernmodus
// führen beide hierher.
function zeigeFortschritt() {
  renderStatistik();
  renderKalender();
  viewDashboard.classList.add("hidden");
  viewDeckauswahl.classList.add("hidden");
  viewLernmodus.classList.add("hidden");
  themenauswahlOverlay.classList.add("hidden");
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
// ANSICHT: DECK-AUSWAHL (Zwischenseite, erreichbar über den "Lernen"-
// Button pro Deck auf der Home-Seite - NICHT über den "Lernen"-Nav-Punkt
// oben, der behält sein eigenes Verhalten, siehe navLernen weiter unten)
// ============================================================

// Hintergrund- und Akzentfarbe je Fach, exakt aus Figma (Frame "Desktop - 3").
const DECKAUSWAHL_OPTIK = {
  VWL: { hintergrund: "#F1F9F9", akzent: "#06b5be" },
  Recht: { hintergrund: "#F7F2FC", akzent: "#9159fe" },
  Statistik: { hintergrund: "#FEF8EF", akzent: "#feb71b" },
  FiBu: { hintergrund: "#F3F7FE", akzent: "#0f8afc" },
  Kosten: { hintergrund: "#FDF2F5", akzent: "#fe7b6f" }
};

// Icon-Bilder für die Deck-Auswahl-Seite - eigene, größere Bilddateien aus
// Figma ("... Lernen 1"), nicht die kleineren Icons von der Home-Seite.
const DECKAUSWAHL_ICON_BILDER = {
  VWL: { src: "images/VWL Lernen.png", breite: 112, hoehe: 120 },
  Recht: { src: "images/Recht Lernen.png", breite: 112, hoehe: 120 },
  Statistik: { src: "images/Statistik Lernen.png", breite: 112, hoehe: 123 },
  FiBu: { src: "images/FiBu Lernen.png", breite: 112, hoehe: 120 },
  Kosten: { src: "images/Kosten Lernen.png", breite: 118, hoehe: 129 }
};

// Eigene Reihenfolge für diese Seite, 1:1 aus Figma ("Desktop - 3") - dort
// weicht die Reihenfolge bewusst von der Home-Seite (STARTSEITE_DECK_REIHENFOLGE) ab.
const DECKAUSWAHL_REIHENFOLGE = ["VWL", "Recht", "Statistik", "FiBu", "Kosten"];

// Feste Reihenfolge der Unterthemen je Deck, unabhängig von der Reihenfolge
// der Karten in den Deck-Daten - hier direkt von Hand gepflegt. Decks ohne
// eigenen Eintrag (oder mit Themen, die hier fehlen) zeigen die restlichen
// Themen einfach danach an, siehe themenDesDecks().
const THEMEN_REIHENFOLGE = {
  VWL: ["Wissenschaft"],
  Recht: ["Das Rechtssystem"],
  Kosten: ["Theoretische Grundlagen"]
};

// Ermittelt die im Deck tatsächlich vorkommenden Unterthemen (inkl. Karten
// ohne Unterthema als Gruppe "Sonstiges") und bringt sie in die oben
// vorgegebene Reihenfolge. "Sonstiges" (thema: null) steht dabei immer ganz
// am Ende, unabhängig von THEMEN_REIHENFOLGE.
function themenDesDecks(deck) {
  const vorhandeneThemen = new Set();
  let hatKartenOhneThema = false;

  deck.karten.forEach((karte) => {
    if (karte.unterthema) {
      vorhandeneThemen.add(karte.unterthema);
    } else {
      hatKartenOhneThema = true;
    }
  });

  const vorgegebeneReihenfolge = THEMEN_REIHENFOLGE[deck.titel] || [];
  const geordnete = vorgegebeneReihenfolge.filter((thema) => vorhandeneThemen.has(thema));
  const uebrige = [...vorhandeneThemen].filter((thema) => !vorgegebeneReihenfolge.includes(thema));

  const gruppen = [...geordnete, ...uebrige].map((thema) => ({
    thema,
    anzahl: deck.karten.filter((karte) => karte.unterthema === thema).length
  }));

  if (hatKartenOhneThema) {
    gruppen.push({
      thema: null,
      anzahl: deck.karten.filter((karte) => !karte.unterthema).length
    });
  }

  return gruppen;
}

// Wie viel Prozent der Karten eines Themas zuletzt beim ersten Versuch
// gewusst wurden (siehe karte.zuletztAufAnhiebGewusst) - für die
// Fortschrittsanzeige je Themen-Balken im Themenauswahl-Pop-up.
function themaFortschrittProzent(deck, thema) {
  const karten = deck.karten.filter((karte) => (thema === null ? !karte.unterthema : karte.unterthema === thema));
  if (karten.length === 0) return 0;
  const aufAnhiebGewusst = karten.filter((karte) => karte.zuletztAufAnhiebGewusst === true).length;
  return Math.round((aufAnhiebGewusst / karten.length) * 100);
}

// Gleiche Logik wie themaFortschrittProzent, nur über das GANZE Deck
// gerechnet (für das Kreisdiagramm im Statistik-Platzhalter jeder Fach-Karte).
function deckFortschrittProzent(deck) {
  if (deck.karten.length === 0) return 0;
  const aufAnhiebGewusst = deck.karten.filter((karte) => karte.zuletztAufAnhiebGewusst === true).length;
  return Math.round((aufAnhiebGewusst / deck.karten.length) * 100);
}

const viewDeckauswahl = document.getElementById("view-deckauswahl");
const deckauswahlKarten = document.getElementById("deckauswahl-karten");

// Wechselt zur Deck-Auswahl-Seite (Zwischenschritt zwischen Home und Lernmodus).
function zeigeDeckauswahl() {
  viewDashboard.classList.add("hidden");
  viewLernmodus.classList.add("hidden");
  viewStatistik.classList.add("hidden");
  viewDeckauswahl.classList.remove("hidden");
  renderDeckauswahl();
  setzeAktivenNavPunkt("lernen");
}

// Baut die 5 Fach-Karten mit den 3 Auswahl-Buttons (Themen/Zufall/Gesamt)
// neu auf. Die Buttons haben hier bewusst noch keine Funktion - das ist
// erstmal nur der Design-Baustein, die Logik kommt in einem eigenen Schritt.
function renderDeckauswahl() {
  deckauswahlKarten.innerHTML = "";

  const sichtbareDecks = DECKAUSWAHL_REIHENFOLGE
    .map((titel) => decks.find((d) => d.titel === titel))
    .filter((deck) => deck !== undefined);

  sichtbareDecks.forEach((deck) => {
    const optik = DECKAUSWAHL_OPTIK[deck.titel];
    const iconDaten = DECKAUSWAHL_ICON_BILDER[deck.titel];
    const gesamt = deck.karten.length;

    const karte = document.createElement("div");
    karte.className = "fach-karte";
    karte.style.backgroundColor = optik.hintergrund;

    const icon = document.createElement("img");
    icon.className = "fach-icon-bild";
    icon.src = iconDaten.src;
    icon.style.width = iconDaten.breite + "px";
    icon.style.height = iconDaten.hoehe + "px";
    icon.alt = "";

    const name = document.createElement("h3");
    name.className = "fach-name";
    name.textContent = deck.titel;

    const anzahl = document.createElement("p");
    anzahl.className = "fach-anzahl";
    anzahl.textContent = `${gesamt} Karte${gesamt === 1 ? "" : "n"}`;

    const aktionen = document.createElement("div");
    aktionen.className = "fach-aktionen";

    ["Themen", "Zufall", "Gesamt"].forEach((beschriftung) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-fach-aktion";
      btn.style.color = optik.akzent;
      btn.textContent = beschriftung;

      if (beschriftung === "Gesamt") {
        btn.addEventListener("click", () => oeffneDeck(deck.id, "normal"));
      } else if (beschriftung === "Themen") {
        btn.addEventListener("click", () => oeffneThemenauswahl(deck.id));
      } else if (beschriftung === "Zufall") {
        btn.addEventListener("click", () => oeffneDeck(deck.id, "zufall"));
      }

      aktionen.appendChild(btn);
    });

    // Kreisdiagramm "Gelernt" (Deck-Akzentfarbe) / "Offen" (grau, wie beim
    // Gesamt-Fortschritt auf der Home-Seite) - gleiche Logik wie die
    // Themen-Fortschrittsanzeige im Pop-up, nur über das ganze Deck gerechnet.
    const statistikPlatzhalter = document.createElement("div");
    statistikPlatzhalter.className = "fach-statistik-platzhalter";

    const deckProzent = deckFortschrittProzent(deck);
    const deckProzentGrad = (deckProzent / 100) * 360;

    const fortschrittRing = document.createElement("div");
    fortschrittRing.className = "fach-fortschritt-ring";
    fortschrittRing.style.background = `conic-gradient(${optik.akzent} 0deg ${deckProzentGrad}deg, #e8e8ed ${deckProzentGrad}deg 360deg)`;

    const fortschrittProzentText = document.createElement("span");
    fortschrittProzentText.className = "fach-fortschritt-prozent";
    fortschrittProzentText.textContent = deckProzent + "%";

    fortschrittRing.appendChild(fortschrittProzentText);
    statistikPlatzhalter.appendChild(fortschrittRing);

    karte.appendChild(icon);
    karte.appendChild(name);
    karte.appendChild(anzahl);
    karte.appendChild(aktionen);
    karte.appendChild(statistikPlatzhalter);

    deckauswahlKarten.appendChild(karte);
  });
}

// ---- Themenauswahl-Pop-up ----

const themenauswahlOverlay = document.getElementById("themenauswahl-overlay");
const themenauswahlListe = document.getElementById("themenauswahl-liste");
const btnThemenauswahlSchliessen = document.getElementById("btn-themenauswahl-schliessen");

let deckIdFuerThemenauswahl = null; // welches Deck gerade im Themen-Pop-up angezeigt wird

function oeffneThemenauswahl(deckId) {
  deckIdFuerThemenauswahl = deckId;
  renderThemenauswahlListe();
  themenauswahlOverlay.classList.remove("hidden");
}

function schliesseThemenauswahl() {
  themenauswahlOverlay.classList.add("hidden");
  deckIdFuerThemenauswahl = null;
}

btnThemenauswahlSchliessen.addEventListener("click", schliesseThemenauswahl);

// Baut die Themen-Liste im Pop-up neu auf: ein Balken pro Unterthema
// (+ "Sonstiges", falls vorhanden) mit Kartenanzahl und "Starten"-Button.
function renderThemenauswahlListe() {
  themenauswahlListe.innerHTML = "";

  const deck = decks.find((d) => d.id === deckIdFuerThemenauswahl);
  const gruppen = themenDesDecks(deck);

  if (gruppen.length === 0) {
    const hinweis = document.createElement("p");
    hinweis.className = "themenauswahl-leer";
    hinweis.textContent = "Noch keine Themen vorhanden.";
    themenauswahlListe.appendChild(hinweis);
    return;
  }

  gruppen.forEach((gruppe) => {
    const balken = document.createElement("div");
    balken.className = "thema-balken";

    const info = document.createElement("div");
    info.className = "thema-balken-info";

    const titel = document.createElement("h4");
    titel.textContent = gruppe.thema === null ? "Sonstiges" : gruppe.thema;

    const anzahl = document.createElement("p");
    anzahl.textContent = `${gruppe.anzahl} Karte${gruppe.anzahl === 1 ? "" : "n"}`;

    info.appendChild(titel);
    info.appendChild(anzahl);

    // Fortschrittsanzeige: wie viel Prozent der Karten dieses Themas zuletzt
    // beim ersten Versuch gewusst wurden (siehe themaFortschrittProzent).
    const prozent = themaFortschrittProzent(deck, gruppe.thema);

    const fortschritt = document.createElement("div");
    fortschritt.className = "thema-balken-fortschritt";

    const leiste = document.createElement("div");
    leiste.className = "thema-balken-leiste";

    const leisteFill = document.createElement("div");
    leisteFill.className = "thema-balken-leiste-fill";
    leisteFill.style.width = prozent + "%";
    leiste.appendChild(leisteFill);

    const prozentText = document.createElement("span");
    prozentText.className = "thema-balken-prozent";
    prozentText.textContent = prozent + "%";

    fortschritt.appendChild(leiste);
    fortschritt.appendChild(prozentText);

    // Gleiches Design wie der "Lernen"-Button bei den Decks auf der Home-Seite.
    const btnStarten = document.createElement("button");
    btnStarten.type = "button";
    btnStarten.className = "btn-deck-lernen";
    btnStarten.textContent = "Starten";
    btnStarten.addEventListener("click", () => {
      schliesseThemenauswahl();
      oeffneDeck(deck.id, "thema", gruppe.thema);
    });

    balken.appendChild(info);
    balken.appendChild(fortschritt);
    balken.appendChild(btnStarten);
    themenauswahlListe.appendChild(balken);
  });
}

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

    // Führt bewusst NICHT direkt in den Lernmodus, sondern zur Deck-Auswahl-
    // Seite (zeigt alle Fächer nochmal, mit Themen/Zufall/Gesamt-Auswahl).
    // Welches Deck hier angeklickt wurde, spielt dafür keine Rolle - die
    // Seite zeigt ohnehin immer alle Fächer.
    const btnLernen = document.createElement("button");
    btnLernen.className = "btn-deck-lernen";
    btnLernen.textContent = "Lernen";
    btnLernen.addEventListener("click", () => zeigeDeckauswahl());

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
// KALENDER (Fortschritt-Seite, unterhalb der Statistik)
// Zeigt die gleichen Klausur-Termine (KLAUSUREN, siehe oben) als
// Monatsüberblick statt nur als Liste.
// ============================================================

const MONATSNAMEN = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

// Angezeigter Monat startet beim heutigen echten Datum (nicht fest im
// Code verankert), man kann über die Pfeile-Buttons weiter/zurück blättern.
let kalenderJahr = new Date().getFullYear();
let kalenderMonat = new Date().getMonth();

function istGleicherTag(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function klausurAmTag(datum) {
  return KLAUSUREN.find((k) => istGleicherTag(k.datum, datum));
}

function renderKalender() {
  const heute = new Date();
  kalenderMonatLabel.textContent = `${MONATSNAMEN[kalenderMonat]} ${kalenderJahr}`;
  kalenderGrid.innerHTML = "";

  const ersterTag = new Date(kalenderJahr, kalenderMonat, 1);
  // Woche soll mit Montag beginnen, JS liefert sonst Sonntag = 0.
  const startOffset = (ersterTag.getDay() + 6) % 7;
  const start = new Date(kalenderJahr, kalenderMonat, 1 - startOffset);

  for (let i = 0; i < 42; i++) {
    const tagDatum = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);

    const zelle = document.createElement("div");
    zelle.className = "kalender-tag";

    if (tagDatum.getMonth() !== kalenderMonat) {
      zelle.classList.add("andere-monat");
    }
    if (istGleicherTag(tagDatum, heute)) {
      zelle.classList.add("heute");
    }
    const klausur = klausurAmTag(tagDatum);
    if (klausur) {
      zelle.classList.add("klausur");
      zelle.title = klausur.fach;
    }

    const zahl = document.createElement("span");
    zahl.className = "kalender-tag-zahl";
    zahl.textContent = tagDatum.getDate();

    const punkt = document.createElement("span");
    punkt.className = "kalender-tag-punkt";

    zelle.appendChild(zahl);
    zelle.appendChild(punkt);
    kalenderGrid.appendChild(zelle);
  }

  kalenderListe.innerHTML = "";
  const klausurenDiesenMonat = KLAUSUREN.filter(
    (k) => k.datum.getFullYear() === kalenderJahr && k.datum.getMonth() === kalenderMonat
  );

  if (klausurenDiesenMonat.length === 0) {
    const hinweis = document.createElement("p");
    hinweis.className = "klausuren-leer";
    hinweis.textContent = "Keine Klausuren in diesem Monat";
    kalenderListe.appendChild(hinweis);
    return;
  }

  klausurenDiesenMonat.forEach((k) => {
    const zeile = document.createElement("div");
    zeile.className = "kalender-liste-eintrag";

    const datum = document.createElement("span");
    datum.className = "kalender-liste-datum";
    datum.textContent = k.datum.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });

    const fach = document.createElement("span");
    fach.textContent = k.fach;

    zeile.appendChild(datum);
    zeile.appendChild(fach);
    kalenderListe.appendChild(zeile);
  });
}

btnKalenderZurueck.addEventListener("click", () => {
  kalenderMonat--;
  if (kalenderMonat < 0) { kalenderMonat = 11; kalenderJahr--; }
  renderKalender();
});

btnKalenderVor.addEventListener("click", () => {
  kalenderMonat++;
  if (kalenderMonat > 11) { kalenderMonat = 0; kalenderJahr++; }
  renderKalender();
});

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

// Anzahl Karten pro "Zufall"-Runde
const ZUFALLSRUNDE_ANZAHL = 15;

// Zieht bis zu 15 zufällige Karten aus dem GESAMTEN Deck (über alle Themen
// hinweg), unabhängig vom "gekonnt"-Status. Merkt sich dauerhaft (Local
// Storage, siehe deck.zufallGezogeneIds), welche Karten in der aktuellen
// Runde schon dran waren, damit sie erst wiederkommen, wenn wirklich alle
// Karten des Decks einmal an der Reihe waren - danach beginnt die Runde
// automatisch wieder von vorne. Reicht der Rest einer Runde nicht für 15
// Karten, wird mit zufälligen Karten aus dem gesamten Deck aufgefüllt
// (auch mit Karten, die in der vorherigen Runde schon dran waren) - und die
// nächste Runde startet dann wieder komplett neu.
function ziehtZufallskarten(deck) {
  const alleIds = deck.karten.map((k) => k.id);

  // Vorsichtshalber nur noch existierende IDs berücksichtigen, falls sich
  // die Karten des Decks seit der letzten Runde geändert haben sollten.
  let bereitsGezogen = (deck.zufallGezogeneIds || []).filter((id) => alleIds.includes(id));
  let nochNichtGezogen = deck.karten.filter((k) => !bereitsGezogen.includes(k.id));

  if (nochNichtGezogen.length === 0 && deck.karten.length > 0) {
    bereitsGezogen = [];
    nochNichtGezogen = deck.karten.slice();
  }

  let ausgewaehlt;
  let rundeIstJetztKomplett = false;

  if (nochNichtGezogen.length >= ZUFALLSRUNDE_ANZAHL) {
    ausgewaehlt = gemischt(nochNichtGezogen).slice(0, ZUFALLSRUNDE_ANZAHL);
  } else {
    const rest = nochNichtGezogen;
    const fehlendeAnzahl = ZUFALLSRUNDE_ANZAHL - rest.length;
    const auffuellPool = gemischt(deck.karten.filter((k) => !rest.includes(k)));
    const auffuellKarten = auffuellPool.slice(0, fehlendeAnzahl);
    ausgewaehlt = gemischt([...rest, ...auffuellKarten]);
    rundeIstJetztKomplett = true;
  }

  deck.zufallGezogeneIds = rundeIstJetztKomplett ? [] : [...bereitsGezogen, ...ausgewaehlt.map((k) => k.id)];
  speichereDecks();

  return ausgewaehlt;
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
// modus ist "normal" (alle noch nicht gekonnten Karten), "fehlerkarten" (nur
// die aktuellen Fehlerkarten dieses Decks) oder "thema" (nur Karten eines
// Unterthemas, unabhängig vom gekonnt-Status - siehe thema-Parameter,
// null steht dabei für die Gruppe "Sonstiges").
function oeffneDeck(deckId, modus, thema = null) {
  // Ist genau diese Session (selbes Deck, selber Modus, bei "thema" auch
  // selbes Thema) schon offen UND noch nicht fertig (Warteschlange nicht
  // leer), wird sie fortgesetzt statt neu gestartet - sonst würde z. B. ein
  // Abstecher zum Dashboard und zurück den Session-Fortschritts-Ring auf 0
  // zurücksetzen, obwohl man mitten in derselben Lern-Session ist. Ist die
  // Session bereits fertig, soll ein erneuter Klick dagegen ganz normal neu
  // aufbauen (z. B. damit ein frisch gestarteter Fehlerkarten-Durchlauf auch
  // neu markierte Fehlerkarten zeigt).
  const istGleicheSession =
    deckId === aktuellesDeckId &&
    modus === aktuellerLernModus &&
    (modus !== "thema" || thema === aktuellesThema) &&
    queue.length > 0;

  aktuellesDeckId = deckId;
  aktuellerLernModus = modus;
  aktuellesThema = modus === "thema" ? thema : null;
  const deck = aktuellesDeck();

  deckTitelAnzeige.textContent =
    modus === "thema" ? `${deck.titel} · ${thema === null ? "Sonstiges" : thema}` :
    modus === "zufall" ? `${deck.titel} · Zufall` :
    deck.titel;
  modusHinweis.classList.toggle("hidden", modus !== "fehlerkarten");

  if (!istGleicheSession) {
    sessionRichtigKlicks = 0;
    sessionFalschKlicks = 0;
    sessionGekonntIds = new Set();
    sessionFalschIds = new Set();
    sessionErstversuchErledigtIds = new Set();

    if (modus === "fehlerkarten") {
      queue = gemischt(fehlerkartenDesDecks(deck));
      sessionFehlerkartenGesamt = queue.length;
    } else if (modus === "thema") {
      queue = gemischt(deck.karten.filter((k) => (thema === null ? !k.unterthema : k.unterthema === thema)));
    } else if (modus === "zufall") {
      queue = ziehtZufallskarten(deck);
    } else {
      queue = gemischt(deck.karten.filter((k) => !k.gekonnt));
    }

    sessionGesamt = queue.length;
  }

  renderThemenListe();
  starteAnzeige();

  viewDashboard.classList.add("hidden");
  viewDeckauswahl.classList.add("hidden");
  viewStatistik.classList.add("hidden");
  themenauswahlOverlay.classList.add("hidden");
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
  } else if (aktuellerLernModus === "thema") {
    fertigTitel.textContent = "🎉 Geschafft! Du kannst alle Karten dieses Themas.";
  } else if (aktuellerLernModus === "zufall") {
    fertigTitel.textContent = "🎉 Geschafft! Du hast diese Zufalls-Runde gelernt.";
  } else {
    fertigTitel.textContent = "🎉 Geschafft! Du kannst alle Karten dieses Decks.";
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

  // Themen- und Zufall-Modus ignorieren bewusst den deck-weiten "gekonnt"-
  // Status (jeder Durchlauf zeigt eine eigene, fest gezogene Kartenmenge) -
  // der Fortschritt bezieht sich deshalb auf diese Session, nicht auf das
  // ganze Deck.
  if (aktuellerLernModus === "thema" || aktuellerLernModus === "zufall") {
    const gekonntInSession = sessionGekonntIds.size;
    const prozent = sessionGesamt === 0 ? 100 : Math.round((gekonntInSession / sessionGesamt) * 100);

    progressText.textContent = `Karte ${Math.min(gekonntInSession + 1, sessionGesamt)} von ${sessionGesamt}`;
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

  // Für die Themen-Fortschrittsanzeige: nur der ALLERERSTE Versuch dieser
  // Karte in diesem Durchlauf zählt, und Fehlerkarten-Durchläufe zählen
  // dafür bewusst gar nicht (siehe Kommentar bei sessionErstversuchErledigtIds).
  if (aktuellerLernModus !== "fehlerkarten" && !sessionErstversuchErledigtIds.has(karte.id)) {
    karte.zuletztAufAnhiebGewusst = true;
    sessionErstversuchErledigtIds.add(karte.id);
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

  if (aktuellerLernModus !== "fehlerkarten" && !sessionErstversuchErledigtIds.has(karte.id)) {
    karte.zuletztAufAnhiebGewusst = false;
    sessionErstversuchErledigtIds.add(karte.id);
  }

  sessionFalschKlicks++;
  sessionFalschIds.add(karte.id);
  queue.push(karte);
  speichereDecks();
  wennFertigOderNaechsteKarte();
});

// "Nochmal": im normalen Modus (Gesamt) wird wie bisher das GANZE Deck
// zurückgesetzt (alle Karten wieder "nicht gekonnt"). In den anderen Modi
// ist die Warteschlange an dieser Stelle immer leer (Durchlauf fertig) - ein
// erneuter oeffneDeck-Aufruf baut deshalb automatisch eine frische Runde auf:
// Fehlerkarten wird neu aus dem aktuellen istFehlerkarte-Stand berechnet (eine
// inzwischen "reparierte" Karte taucht also folgerichtig nicht mehr auf),
// Themen holt dasselbe Thema erneut, Zufall zieht die nächste 15er-Runde.
btnNeustart.addEventListener("click", () => {
  if (aktuellerLernModus === "normal") {
    const deck = aktuellesDeck();
    deck.karten.forEach((k) => (k.gekonnt = false));
    speichereDecks();
    queue = gemischt(deck.karten);

    sessionRichtigKlicks = 0;
    sessionFalschKlicks = 0;
    sessionGekonntIds = new Set();
    sessionFalschIds = new Set();
    sessionErstversuchErledigtIds = new Set();
    sessionGesamt = queue.length;
    starteAnzeige();
  } else {
    oeffneDeck(aktuellesDeckId, aktuellerLernModus, aktuellesThema);
  }
});

// "Zurück": bei Themen/Zufall/Gesamt zur Deck-Auswahl-Seite (wo man auch
// hergekommen ist), beim Fehlerkarten-Durchlauf zur Home-Seite (der dortige
// "Fehlerkarten"-Button führt ja direkt hierher, ohne über die
// Deck-Auswahl-Seite zu laufen). Gilt gleichermaßen für den "Zurück"-Button
// nach Durchlauf-Ende wie für das "✕" oben über der Lernkarte (jederzeit
// während einer Session nutzbar) - beide verlassen den Lernmodus auf die
// gleiche Art.
function verlasseLernmodus() {
  if (aktuellerLernModus === "fehlerkarten") {
    zeigeDashboard();
  } else {
    zeigeDeckauswahl();
  }
}

btnFertigZurueck.addEventListener("click", verlasseLernmodus);
btnLernmodusVerlassen.addEventListener("click", verlasseLernmodus);

// ---- Start: Dashboard anzeigen ----
renderDashboard();
renderKlausuren();
