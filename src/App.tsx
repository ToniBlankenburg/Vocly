import { useState, useCallback, useEffect } from 'react'
import vocab from './data/vocab.json'

type Word = { de: string; es: string; category: string }
type Direction = 'de→es' | 'es→de'

const WORDS = vocab as Word[]

const CATEGORY_ICONS: Record<string, string> = {
  food: '🍽️', family: '👨‍👩‍👧', color: '🎨', verb: '⚡',
  number: '🔢', animal: '🐾', time: '🕐', weather: '🌤️',
}

function buildQuestion(words: Word[]) {
  const word = words[Math.floor(Math.random() * words.length)]
  const dir: Direction = Math.random() > 0.5 ? 'de→es' : 'es→de'
  const fromLang = dir === 'de→es' ? 'de' : 'es'
  const toLang   = dir === 'de→es' ? 'es' : 'de'

  const question = word[fromLang]
  const answer   = word[toLang]

  const sameCategory = words.filter(
    w => w.category === word.category && w[toLang] !== answer
  )
  const fallback = words.filter(w => w[toLang] !== answer)
  const pool = sameCategory.length >= 3 ? sameCategory : fallback

  const distractors: string[] = []
  const seen = new Set([answer])
  for (const w of [...pool].sort(() => Math.random() - 0.5)) {
    if (!seen.has(w[toLang])) {
      distractors.push(w[toLang])
      seen.add(w[toLang])
      if (distractors.length === 3) break
    }
  }

  return {
    question,
    answer,
    options: [answer, ...distractors].sort(() => Math.random() - 0.5),
    dir,
    category: word.category,
  }
}

type OptionState = 'idle' | 'correct' | 'wrong' | 'dimmed'

export default function App() {
  const [q, setQ]           = useState(() => buildQuestion(WORDS))
  const [selected, setSel]  = useState<string | null>(null)
  const [correct, setCorr]  = useState(0)
  const [total, setTotal]   = useState(0)
  const [streak, setStreak] = useState(0)
  const [cardKey, setKey]   = useState(0)
  const [dark, setDark]     = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const advance = useCallback(() => {
    setQ(buildQuestion(WORDS))
    setSel(null)
    setKey(k => k + 1)
  }, [])

  const pick = useCallback((opt: string) => {
    if (selected !== null) return
    setSel(opt)
    const isCorrect = opt === q.answer
    setCorr(c => c + (isCorrect ? 1 : 0))
    setTotal(t => t + 1)
    setStreak(s => (isCorrect ? s + 1 : 0))
    setTimeout(advance, 850)
  }, [selected, q.answer, advance])

  // keyboard support: 1–4
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = ['1', '2', '3', '4'].indexOf(e.key)
      if (idx !== -1 && q.options[idx]) pick(q.options[idx])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [pick, q.options])

  function stateFor(opt: string): OptionState {
    if (selected === null) return 'idle'
    if (opt === q.answer)  return 'correct'
    if (opt === selected)  return 'wrong'
    return 'dimmed'
  }

  const optionStyles: Record<OptionState, string> = {
    idle:    'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200 active:scale-95 cursor-pointer dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10',
    correct: 'bg-emerald-500/20 border-emerald-400 text-emerald-700 dark:text-emerald-300 scale-[1.03]',
    wrong:   'bg-red-500/20 border-red-400 text-red-700 dark:text-red-300',
    dimmed:  'bg-gray-50 border-gray-100 text-gray-300 dark:bg-white/[0.02] dark:border-white/5 dark:text-white/20',
  }

  const fromFlag = q.dir === 'de→es' ? '🇩🇪' : '🇪🇸'
  const toFlag   = q.dir === 'de→es' ? '🇪🇸' : '🇩🇪'
  const icon     = CATEGORY_ICONS[q.category] ?? '📚'
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4 py-8 select-none">

      {/* top bar */}
      <div className="w-full max-w-sm flex items-center justify-between mb-6 text-sm">
        <span className="text-gray-400 dark:text-white/30 font-mono tracking-tight">
          {accuracy !== null ? `${accuracy}%` : 'vocly'}
        </span>
        <span className="text-gray-400 dark:text-white/20 font-mono text-xs">
          {correct}/{total}
        </span>
        <div className="w-16 text-right flex items-center justify-end gap-2">
          {streak >= 3 && (
            <span className="text-orange-400 font-bold tabular-nums animate-pulse">
              🔥 {streak}
            </span>
          )}
          <button
            onClick={() => setDark(d => !d)}
            className="text-base leading-none opacity-40 hover:opacity-70 transition-opacity"
            aria-label="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* card */}
      <div
        key={cardKey}
        className="w-full max-w-sm rounded-3xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-sm p-8 mb-5 shadow-2xl"
        style={{ animation: 'fadeUp 0.18s ease-out' }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">{fromFlag}</span>
          <span className="text-gray-300 dark:text-white/20 text-xs mx-1">→</span>
          <span className="text-lg">{toFlag}</span>
          <span className="ml-auto text-xs text-gray-400 dark:text-white/25 font-medium tracking-widest uppercase">
            {icon} {q.category}
          </span>
        </div>

        <p className="text-4xl font-bold tracking-tight leading-tight min-h-[3rem] flex items-center">
          {q.question}
        </p>

        <p className="mt-3 text-gray-400 dark:text-white/25 text-xs font-medium">
          {q.dir === 'de→es' ? 'translate to Spanish' : 'translate to German'}
        </p>
      </div>

      {/* options */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-2.5">
        {q.options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => pick(opt)}
            className={`${optionStyles[stateFor(opt)]} border rounded-2xl px-4 py-4 text-sm font-medium transition-all duration-150 text-left relative`}
          >
            <span className="absolute top-2 right-3 text-[10px] text-gray-300 dark:text-white/15 font-mono">{i + 1}</span>
            {opt}
          </button>
        ))}
      </div>

      <p className="mt-8 text-gray-300 dark:text-white/10 text-xs">press 1–4 or tap</p>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
