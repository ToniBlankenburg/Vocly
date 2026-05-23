import { Link } from 'react-router-dom'

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <Link to="/" className="text-xs text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 transition-colors mb-8 inline-block">
          ← back
        </Link>

        <h1 className="text-2xl font-bold tracking-tight mb-2">Datenschutzerklärung</h1>
        <p className="text-xs text-gray-400 dark:text-white/30 font-mono mb-8">gemäß Art. 13 DSGVO</p>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Verantwortlicher
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            Toni Blankenburg<br />
            Hoelderlinstraße 15/1<br />
            70174 Stuttgart<br />
            Deutschland<br />
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Welche Daten werden verarbeitet?
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            Diese Anwendung setzt keine Cookies und erfordert keine Registrierung. Es werden
            keine personenbezogenen Daten durch die Anwendung selbst lokal gespeichert.
          </p>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70 mt-3">
            Beim Aufruf der Website werden durch den Hosting-Anbieter technisch notwendige
            Verbindungsdaten (insbesondere IP-Adresse, Zeitpunkt des Abrufs, aufgerufene URL)
            serverseitig protokolliert. Diese Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Vercel Analytics
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            Diese Website verwendet Vercel Analytics, einen datenschutzfreundlichen
            Analysedienst der Vercel Inc. Der Dienst erhebt anonymisierte Nutzungsstatistiken
            (aufgerufene Seiten, Referrer, Browser, Betriebssystem, Gerätetyp sowie Land/Stadt,
            abgeleitet aus der IP-Adresse). IP-Adressen werden dabei nicht dauerhaft gespeichert.
            Es werden keine Cookies gesetzt und keine geräteübergreifende Verfolgung vorgenommen.
          </p>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70 mt-3">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
            Verbesserung und dem sicheren Betrieb des Angebots). Die Daten werden auf Servern der
            Vercel Inc. in den USA verarbeitet; die Übermittlung erfolgt auf Grundlage von
            Standardvertragsklauseln gemäß Art. 46 DSGVO. Weitere Informationen entnehmen Sie der{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Datenschutzerklärung von Vercel
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Hosting
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            Diese Website wird gehostet von:
          </p>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70 mt-2">
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723, USA
          </p>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70 mt-3">
            Vercel verarbeitet Zugriffsdaten (u. a. IP-Adressen) im Rahmen der Bereitstellung des
            Dienstes. Details entnehmen Sie der{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Datenschutzerklärung von Vercel
            </a>
            . Eine Übermittlung in die USA erfolgt auf Grundlage von Standardvertragsklauseln
            gemäß Art. 46 DSGVO.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Ihre Rechte
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
            Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
            Widerspruch (Art. 21 DSGVO). Zur Ausübung Ihrer Rechte wenden Sie sich an die oben
            genannte Kontaktadresse.
          </p>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70 mt-3">
            Darüber hinaus haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
            beschweren, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Stand
          </h2>
          <p className="text-sm text-gray-700 dark:text-white/70">Mai 2025</p>
        </section>
      </div>
    </div>
  )
}
