# Projekt: Karteikarten-Lernwebseite

## Kontext für Claude Code
Ich bin blutige/r Anfänger*in im Programmieren. Bitte:
- Erkläre bei jedem Schritt kurz, WAS du tust und WARUM (in einfachen Worten, ohne Fachjargon vorauszusetzen).
- Baue in kleinen, nachvollziehbaren Schritten – nicht alles auf einmal.
- Schlage nach jedem größeren Schritt vor, die Seite lokal zu testen, bevor es weitergeht.
- Wenn du Fachbegriffe verwendest (z. B. "State", "Repository", "Deployment"), erkläre sie kurz in einem Nebensatz.

## Arbeitsweise bei Änderungen

Bei jeder neuen Aufgabe gilt:

1. Lies zuerst diese `CLAUDE.md`.
2. Analysiere den aktuellen Stand des Projekts.
3. Verändere nur Dateien, die für die konkrete Aufgabe notwendig sind.
4. Bestehende funktionierende Features dürfen nicht ohne ausdrücklichen Grund verändert werden.
5. Bei reinen Design-Aufgaben hat die Erhaltung der bestehenden Funktionalität höchste Priorität.
6. Führe nach Änderungen einen kurzen Funktionscheck durch.
7. Erkläre mir anschließend in einfacher Sprache:

   * was du geändert hast,
   * welche Dateien du geändert hast,
   * warum diese Änderungen notwendig waren,
   * was ich selbst testen sollte.

### Keine eigenständige Erweiterung des Projektumfangs

Bitte implementiere nicht automatisch zusätzliche Features, nur weil sie sinnvoll erscheinen.

Du darfst Verbesserungsvorschläge machen, aber setze sie erst um, wenn sie Teil meiner konkreten Aufgabe sind.

## Ziel des Projekts
Eine per Link erreichbare Karteikarten-Lern-Web-App für mich und meine Freunde aus dem Studium – im Stil von Anki/Quizlet: mit Dashboard, Deck-Auswahl, Lernmodus und Statistiken, statt nur einer einzelnen Karten-Ansicht.

## Grundstruktur der App (mehrere Ansichten/Screens)
1. **Dashboard:** Übersicht über alle vorhandenen Decks (Kartenstapel), z. B. als Kacheln mit Titel, Kartenanzahl und Fortschritt.
2. **Deck-Auswahl:** Klick auf ein Deck öffnet den Lernmodus für genau dieses Deck.
3. **Lernmodus:** Die eigentliche Karteikarten-Funktion (siehe Phase 1 unten), aber bezogen auf das gewählte Deck.
4. **Statistik-Ansicht:** Einfache Übersicht, z. B. Erfolgsquote pro Deck, Anzahl gelernter Karten, evtl. Verlauf über mehrere Durchläufe.

Alle vier Ansichten können zunächst innerhalb einer einzigen HTML-Seite umgesetzt werden (Ein- und Ausblenden per JavaScript) – wirkt wie eine Web-App, bleibt aber technisch einfach.

## Tech-Stack (bewusst einfach gehalten)
- **Phase 1–2:** Reines HTML, CSS und JavaScript, ohne Framework, ohne Build-Tools, ohne Backend. Alles läuft im Browser.
- **Speicherung der Karten (Phase 1–2):** lokal im Browser (z. B. als JSON-Datei im Projekt oder im Local Storage) – noch keine echte Datenbank.
- **Phase 3 (später, eigener Meilenstein):** Firebase – konkret **Firebase Authentication** fürs Login und **Firestore** als Datenbank, statt einer selbstgebauten Backend-Lösung. Firebase übernimmt Passwort-Hashing, sichere Tokens etc. bereits, das reduziert das Sicherheitsrisiko gegenüber einer eigenen Lösung. Kostenlose Stufe ("Spark Plan") reicht für unseren Freundeskreis (ca. 10 Personen).
- **Hosting:** Eine kostenlose statische Hosting-Lösung (z. B. GitHub Pages, Netlify oder Vercel), damit ich und meine Freunde die Seite per Link öffnen können, ohne dass ein eigener Server nötig ist. Bitte am Ende von Phase 1 einen Vorschlag machen, wie das Deployment funktioniert.

## Kernfunktionen – Phase 1 (zuerst umsetzen)
1. **Dashboard:** Übersicht der Decks als Kacheln (Titel, Kartenanzahl, Fortschrittsbalken).
2. **Deck anlegen/verwalten:** Einfache Möglichkeit, ein neues Deck zu erstellen und Karten (Frage + Antwort) hinzuzufügen, z. B. über ein Formular oder eine editierbare Liste/Datei.
3. **Karten anzeigen:** Im Lernmodus zeigt eine Karte vorne eine Frage.
4. **Umdrehen:** Klick auf die Karte (oder Button) zeigt die Antwort auf der Rückseite (gerne mit einer kleinen Flip-Animation).
5. **Bewertung:**
   - Grüner Pfeil/Haken = "gewusst" → Karte wandert in die Kategorie "kann ich".
   - Rotes Kreuz = "nicht gewusst" → Karte bleibt im aktuellen Durchlauf und taucht später im selben Durchlauf noch einmal auf.
6. **Wiederholungslogik:** Der Durchlauf endet erst, wenn alle Karten des Decks in der Kategorie "kann ich" gelandet sind. Nicht gewusste Karten werden ans Ende der aktuellen Kartenreihenfolge verschoben und kommen so wieder dran.
7. **Fortschrittsanzeige:** Im Lernmodus sichtbar, wie viele Karten insgesamt, wie viele schon "kann ich", wie viele noch offen sind. Dieser Fortschritt spiegelt sich auch im Dashboard wider.

## Spaßfunktionen & Statistiken – Phase 2 (nach Phase 1)
- Bei richtiger Antwort ploppt ein kleines Bild/GIF auf (z. B. zufällig aus einer kleinen Auswahl).
- Wenn alle Karten eines Decks in "kann ich" sind: eine kleine Abschluss-Animation/Konfetti-Effekt zur Belohnung.
- **Statistik-Ansicht:** Erfolgsquote pro Deck (z. B. Anteil richtig beim ersten Versuch), Anzahl abgeschlossener Durchläufe, ggf. einfacher Verlauf über Zeit. Daten dafür lokal speichern (z. B. Local Storage).

## Zwischenschritt vor Phase 3: Vorgegebenes Standard-Deck
- Bevor Firebase/Login gebaut wird, soll die Seite mindestens ein **fest vorgegebenes Deck** enthalten (Fragen + Antworten), das direkt im Code hinterlegt ist (nicht im Local Storage der Nutzer*innen).
- Dieses Deck ist dadurch für **jede Person automatisch vorhanden**, sobald sie den Link öffnet – unabhängig von Browser/Gerät, auch ganz ohne eigene Eingabe.
- Ich stelle dafür selbst eine Fragen/Antworten-Liste bereit.
- Wichtig zur Abgrenzung: Das macht die Karten nur *lesend* für alle gleich (weil sie im Code stehen). Es ist noch **keine** echte gemeinsame Datenbank – wenn jemand eigene Karten hinzufügt, landen die weiterhin nur lokal im eigenen Browser (siehe Phase 1–2). Damit Freunde selbst Karten/Fächer beitragen können, die dann auch alle anderen sehen, ist weiterhin Phase 3 (Firebase/Firestore) nötig.

## Später – Phase 3 (eigener, separater Anlauf)
- Erstmaliger Einstieg in Datenbanken: Karten werden statt lokal in **Firestore** (Firebase-Datenbank) gespeichert.
- Login-System über **Firebase Authentication**, damit ich und meine Freunde eigene Kartensets hochladen/verwalten können.
- Wichtig: Firestore-Sicherheitsregeln (wer darf welche Daten lesen/schreiben) müssen korrekt gesetzt werden – das bitte explizit erklären und gemeinsam prüfen, das ist die häufigste Fehlerquelle bei Firebase-Projekten.
- (Optional, aus früherer Idee: Accounts für ca. 10 Personen + gemeinsame Ergebnistabelle – erst relevant, wenn Login steht.)

## Design

### Figma Implementation Rules

When implementing a Figma design, visual fidelity is a priority.

The Figma design is the source of truth.

#### Before implementation

1. Use Figma MCP `get_design_context` for the exact frame or component.
2. Inspect the full structure before writing code.
3. Identify:
   - dimensions
   - padding
   - gaps
   - alignment
   - typography
   - colors
   - borders
   - border radius
   - shadows
   - icon dimensions
   - layout relationships
4. Do not estimate values that are available through Figma MCP.

#### Implementation

Match Figma values exactly.

Do not normalize unusual values to common UI values.

For example, never silently convert:
- 18px → 16px
- 22px → 24px
- 14px radius → 12px
- an exact Figma color → a similar existing color

unless explicitly instructed.

Use responsive layout techniques such as Flexbox and Grid instead of reproducing coordinates with absolute positioning.

Do not modify unrelated components.

#### Verification

Implementation is NOT complete after the first coding pass.

After implementing:

1. Retrieve the relevant Figma design context again.
2. Compare the implementation against Figma.
3. Perform a systematic visual audit of:

   - outer margins
   - padding
   - gaps
   - width
   - height
   - horizontal alignment
   - vertical alignment
   - font family
   - font size
   - font weight
   - line height
   - colors
   - borders
   - border radius
   - shadows
   - icon sizes
   - element positions

4. Fix all discrepancies found.

Only then consider the component complete.

### Grundprinzip

Das Design der Website soll sich an von mir bereitgestellten Referenzbildern orientieren.

Wenn ich für eine Aufgabe ein Referenzbild hochlade oder im Projektordner ablege, hat dieses Bild für die visuelle Gestaltung Vorrang vor den allgemein beschriebenen Design-Vorgaben in dieser Datei.

### Umgang mit Referenzbildern

Wenn ich ein Referenzbild vorgebe:

1. Analysiere zuerst das Bild und die bestehende Website.
2. Verändere noch keinen Code.
3. Beschreibe mir kurz und verständlich:

   * welche visuellen Merkmale du erkennst,
   * welche davon auf meiner Website umgesetzt werden können,
   * welche bestehenden Dateien dafür wahrscheinlich geändert werden müssen.
4. Setze das Design anschließend möglichst originalgetreu um.

Achte insbesondere auf:

* Seitenaufteilung
* Abstände und Größenverhältnisse
* Navigation
* Karten/Kacheln
* Rundungen
* Schatten
* Hintergrund
* Farben
* Typografie
* Button-Design
* Icons
* Fortschrittsanzeigen
* Hover-Zustände
* mobile Darstellung

### Wichtig: Design und Funktion trennen

Bei einer reinen Design-Aufgabe darf die bestehende Funktionalität nicht unnötig verändert werden.

Insbesondere:

* keine Lernlogik verändern,
* keine vorhandenen Datenstrukturen umbauen,
* keine Features entfernen,
* keine neue Datenbank einführen,
* kein Framework einführen,
* keine grundlegende Projektstruktur ändern,
* keine neuen Funktionen hinzufügen, außer sie sind für das gewünschte Design zwingend erforderlich.

Wenn eine visuelle Änderung eine funktionale Änderung erfordern würde, erkläre mir das zuerst.

### Umsetzung

Bevorzuge Änderungen an HTML und CSS.

JavaScript nur verändern, wenn es für eine tatsächliche Designfunktion notwendig ist, z. B.:

* Navigation öffnen/schließen,
* Animation,
* Karten-Flip,
* Interaktion eines Design-Elements.

### Responsive Design

Das Design muss sowohl am Computer als auch am Smartphone funktionieren.

Teste insbesondere ungefähr:

* Desktop
* Tablet
* Smartphone

Es muss nicht auf jedem Gerät pixelgenau identisch aussehen, aber Struktur, Lesbarkeit und Bedienbarkeit müssen erhalten bleiben.

### Referenzbild ist Inspiration, keine Funktionsvorgabe

Elemente, die auf dem Referenzbild sichtbar sind, aber funktional nicht zu meiner Lernwebsite gehören, sollen nicht automatisch als neue Features eingebaut werden.

Übernimm in diesem Fall nur deren visuelle Gestaltung, wenn sie sinnvoll übertragbar ist.

### Bestehende Designsprache

Sobald ein Design umgesetzt und von mir akzeptiert wurde, soll dieses als Grundlage für alle späteren Screens dienen.

Neue Seiten und Komponenten sollen sich danach an derselben Designsprache orientieren, damit die gesamte Anwendung einheitlich aussieht.

## Ausdrücklich NICHT jetzt schon machen
- Keine Datenbank, kein Login, keine Nutzerkonten in Phase 1–2.
- Keine komplexen Frameworks (React, Vue, etc.) – das kommt frühestens, wenn Grundlagen sitzen.
- Keine Mehrsprachigkeit, keine komplizierte Nutzerverwaltung.

## Sicherheit & Datenschutz (wichtig!)
Meine Freunde sollen die Seite bedenkenlos besuchen können. Bitte bei jedem Schritt mitdenken:
- **Phase 1–2 (statische Seite ohne Backend):** Das Risiko ist grundsätzlich sehr gering, da keine Server-Logik und keine Nutzerdaten verarbeitet werden. Trotzdem bitte:
  - Nur über eine seriöse, etablierte Hosting-Plattform veröffentlichen (z. B. GitHub Pages, Netlify, Vercel) – diese liefern automatisch HTTPS (verschlüsselte Verbindung) aus.
  - Keine Downloads von ausführbaren Dateien auf der Seite anbieten.
  - Falls externe Bibliotheken/Skripte eingebunden werden (z. B. für die Konfetti-Animation), nur von bekannten, offiziellen Quellen (z. B. offizielles CDN des Projekts) laden, nicht von unbekannten Drittanbietern.
  - Keine Werbe- oder Tracking-Skripte einbauen.
  - Erkläre mir kurz, warum eine gewählte Bibliothek vertrauenswürdig ist, bevor du sie einbindest.
- **Phase 3 (Login & Datenbank über Firebase, später):** Hier steigt das Risiko, weil dann echte Nutzerdaten (Zugangsdaten, evtl. Statistiken pro Person) verarbeitet werden. Firebase Authentication übernimmt Passwort-Hashing und sichere Tokens bereits automatisch – trotzdem bitte unbedingt:
  - Firestore-Sicherheitsregeln sorgfältig setzen, damit jede*r nur auf die eigenen Daten (bzw. gemeinsam vereinbarte Daten) zugreifen kann.
  - Keine Firebase-API-Schlüssel/Zugangsdaten mit Schreibrechten öffentlich im Frontend-Code exponieren, wo es vermeidbar ist; mir erklären, welche Keys im Frontend unbedenklich sind und warum.
  - HTTPS zwingend verwenden (bei Firebase-Hosting standardmäßig der Fall).
  - Mir kurz erklären, welche Sicherheitsmaßnahme du warum einbaust, bevor du sie umsetzt.
  - Mir explizit Bescheid geben, falls eine von mir gewünschte Vereinfachung ein Sicherheitsrisiko darstellen würde.

## Erfolgskriterium für Phase 1
Ich kann die App lokal im Browser öffnen, mindestens ein Deck mit eigenen Karteikarten anlegen, es im Dashboard sehen, in den Lernmodus wechseln, durch einen Lerndurchlauf gehen, gewusste/nicht gewusste Karten markieren, den Fortschritt sowohl im Lernmodus als auch im Dashboard sehen und am Ende feststellen, dass alle Karten des Decks "gekonnt" wurden.
