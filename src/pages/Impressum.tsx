import { Link } from 'react-router-dom'

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <Link to="/" className="text-xs text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 transition-colors mb-8 inline-block">
          ← back
        </Link>

        <h1 className="text-2xl font-bold tracking-tight mb-8">Impressum</h1>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            Toni Blankenburg<br />
            Hoelderlinstraße 15/1<br />
            70174 Stuttgart<br />
            Deutschland
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Kontakt
          </h2>
          <p className="text-sm text-gray-700 dark:text-white/70">
            E-Mail:{' '}
            <a
              href="mailto:impressum@vocly.org "
              className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              impressum@vocly.org 
            </a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)
          </h2>
          <p className="text-sm text-gray-700 dark:text-white/70">
            Toni Blankenburg<br />
            Hoelderlinstraße 15/1<br />
            70174 Stuttgart<br />
            Deutschland
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Urheberrecht
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            © 2026 Toni Blankenburg. Der Quellcode dieser Anwendung steht unter einer Open-Source-Lizenz.
            Die Vokabeldaten sind selbst erstellt und dürfen für nicht-kommerzielle Zwecke frei verwendet werden.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
            Haftungsausschluss
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
            externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </p>
        </section>
      </div>
    </div>
  )
}
