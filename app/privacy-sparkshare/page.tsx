export default function Privacy() {
    return (
      <main className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Einleitung</h2>
          <p>
            Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Diese
            Datenschutzerklärung informiert Sie darüber, welche Daten wir in unserer
            mobilen App erheben, wie wir sie verwenden und welche Rechte Sie in Bezug
            auf Ihre Daten haben.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Verantwortliche Stelle</h2>
          <p>Verantwortlich für die Datenverarbeitung im Rahmen dieser App ist:</p>
          <p>Johann Setzer</p>
          <p>Stockhornstraße 41, 68169 Mannheim</p>
          <p>johannsetzer.dev@gmail.com</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            3. Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <p>
            Unsere App nutzt WebRTC und Nearby Connections, um Dateien, Fotos und
            Videos mit Personen im selben Netzwerk oder in der Nähe zu teilen. Dabei
            werden folgende Daten verarbeitet:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Verbindungsdaten:</strong> Um Geräte zu identifizieren und zu verbinden,
              verwendet die App Netzwerk- oder Bluetooth-Daten.
            </li>
            <li>
              <strong>Dateien, Fotos und Videos:</strong> Nur die vom Nutzer ausgewählten
              Dateien werden geteilt. Die App speichert oder verarbeitet keine Inhalte
              außerhalb des Transfers.
            </li>
            <li>
              <strong>Standortdaten:</strong> Falls erforderlich, um Nearby Connections zu
              ermöglichen (z. B. für Bluetooth-Scanning), kann die App temporär Standortdaten
              verwenden. Diese Daten werden nicht gespeichert oder weitergegeben.
            </li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            4. Rechtsgrundlage der Verarbeitung
          </h2>
          <p>
            Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung) oder auf Basis Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Weitergabe von Daten</h2>
          <p>
            Die App gibt keine Daten an Dritte weiter. Alle Verbindungen erfolgen direkt
            zwischen den Geräten (Peer-to-Peer), ohne dass Dritte darauf zugreifen können.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            6. Speicherdauer und Löschung
          </h2>
          <p>
            Da die App keine Daten speichert, entfällt eine Langzeitspeicherung. Alle
            gesendeten Daten verbleiben ausschließlich auf den beteiligten Geräten.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Ihre Rechte</h2>
          <p>Sie haben folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
          <ul className="list-disc pl-6">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Datensicherheit</h2>
          <p>
            Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten vor
            unbefugtem Zugriff oder Missbrauch zu schützen. Da die Übertragung direkt zwischen
            den Geräten erfolgt, wird keine zentrale Speicherung oder externe Verarbeitung
            vorgenommen.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            9. Änderungen dieser Datenschutzerklärung
          </h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren.
            Die aktuelle Version ist jederzeit innerhalb der App abrufbar.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Kontakt</h2>
          <p>
            Bei Fragen oder zur Geltendmachung Ihrer Rechte können Sie uns unter den
            angegebenen Kontaktdaten erreichen.
          </p>
        </section>
      </main>
    );
  }