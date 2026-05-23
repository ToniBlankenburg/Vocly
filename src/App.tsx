import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

type Level = 'A1' | 'A2' | 'B1'
type VocabEntry = { de: string; es: string }
type Word = { de: string; es: string; category: string; level: Level }
type Direction = 'de→es' | 'es→de'

const LEVELS: Level[] = ['A1', 'A2', 'B1']
const LEVEL_UP_AT = 7

function categoryFromPath(path: string): string {
  return path.split('/').pop()!.replace('.json', '')
}

function flattenEager(
  modules: Record<string, { default: VocabEntry[] }>,
  level: Level
): Word[] {
  return Object.entries(modules).flatMap(([path, mod]) =>
    mod.default.map(e => ({ ...e, category: categoryFromPath(path), level }))
  )
}

function flattenLazy(
  modules: Record<string, () => Promise<{ default: VocabEntry[] }>>,
  level: Level
): Promise<Word[]> {
  return Promise.all(
    Object.entries(modules).map(([path, fn]) =>
      fn().then(mod => mod.default.map(e => ({ ...e, category: categoryFromPath(path), level })))
    )
  ).then(arrays => arrays.flat())
}

const a1Modules = import.meta.glob<{ default: VocabEntry[] }>('./data/de-es/a1/*.json', { eager: true })
const a2Modules = import.meta.glob<{ default: VocabEntry[] }>('./data/de-es/a2/*.json')
const b1Modules = import.meta.glob<{ default: VocabEntry[] }>('./data/de-es/b1/*.json')

const a1Data = flattenEager(a1Modules, 'A1')

const VOCAB_LOADERS: Partial<Record<Level, () => Promise<Word[]>>> = {
  A2: () => flattenLazy(a2Modules, 'A2'),
  B1: () => flattenLazy(b1Modules, 'B1'),
}

const CATEGORY_ICONS: Record<string, string> = {
  food: '🍽️', family: '👨‍👩‍👧', color: '🎨', verb: '⚡',
  number: '🔢', animal: '🐾', time: '🕐', weather: '🌤️',
  body: '💪', place: '📍', adjective: '✨', abstract: '💭',
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
  const [level, setLevel]           = useState<Level>('A1')
  const [words, setWords]           = useState<Word[]>(a1Data as Word[])
  const [q, setQ]                   = useState(() => buildQuestion(a1Data as Word[]))
  const [selected, setSel]          = useState<string | null>(null)
  const [correct, setCorr]          = useState(0)
  const [total, setTotal]           = useState(0)
  const [streak, setStreak]         = useState(0)
  const [cardKey, setKey]           = useState(0)
  const [dark, setDark]             = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [correctAtLevel, setCorrAt] = useState(0)
  const [levelingUp, setLevelingUp] = useState(false)
  const [complete, setComplete]     = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const advance = useCallback(() => {
    setQ(buildQuestion(words))
    setSel(null)
    setKey(k => k + 1)
  }, [words])

  const handleLevelUp = useCallback(() => {
    const nextIdx = LEVELS.indexOf(level) + 1
    if (nextIdx < LEVELS.length) {
      const next = LEVELS[nextIdx]
      VOCAB_LOADERS[next]!().then(nextWords => {
        setWords(nextWords)
        setLevel(next)
        setCorrAt(0)
        setLevelingUp(false)
        setQ(buildQuestion(nextWords))
        setSel(null)
        setKey(k => k + 1)
      })
    } else {
      setLevelingUp(false)
      setComplete(true)
    }
  }, [level])

  // auto-advance the level-up screen after 2.5s
  useEffect(() => {
    if (!levelingUp) return
    const t = setTimeout(handleLevelUp, 2500)
    return () => clearTimeout(t)
  }, [levelingUp, handleLevelUp])

  const restart = useCallback(() => {
    const w = a1Data as Word[]
    setWords(w)
    setLevel('A1')
    setCorrAt(0)
    setCorr(0)
    setTotal(0)
    setStreak(0)
    setComplete(false)
    setLevelingUp(false)
    setQ(buildQuestion(w))
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
    if (isCorrect) {
      const next = correctAtLevel + 1
      setCorrAt(next)
      if (next >= LEVEL_UP_AT) {
        setTimeout(() => setLevelingUp(true), 850)
        return
      }
    }
    setTimeout(advance, 850)
  }, [selected, q.answer, advance, correctAtLevel])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (levelingUp || complete) return
      const idx = ['1', '2', '3', '4'].indexOf(e.key)
      if (idx !== -1 && q.options[idx]) pick(q.options[idx])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [pick, q.options, levelingUp, complete])

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
  const progress = Math.min((correctAtLevel / LEVEL_UP_AT) * 100, 100)
  const isLastLevel = LEVELS.indexOf(level) === LEVELS.length - 1

  return (
    <>
    <Analytics />
    <Routes>
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/" element={
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4 py-8 select-none">

      {/* top bar */}
      <div className="w-full max-w-sm flex items-center justify-between mb-3 text-sm">
        <span className="text-gray-400 dark:text-white/30 font-mono tracking-tight font-bold">
          {level}
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

      {/* level progress bar */}
      {!complete && (
        <div className="w-full max-w-sm mb-5">
          <div className="h-[3px] bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] font-mono text-gray-300 dark:text-white/20">
            <span>{correctAtLevel}/{LEVEL_UP_AT}</span>
            <span>{isLastLevel ? 'final level' : `→ ${LEVELS[LEVELS.indexOf(level) + 1]}`}</span>
          </div>
        </div>
      )}

      {/* card */}
      {complete ? (
        <div
          key="complete"
          className="w-full max-w-sm rounded-3xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] p-8 mb-5 text-center shadow-2xl"
          style={{ animation: 'fadeUp 0.18s ease-out' }}
        >
          <p className="text-5xl mb-4">🏆</p>
          <p className="text-2xl font-bold tracking-tight mb-2">All done!</p>
          <p className="text-gray-400 dark:text-white/40 text-sm mb-6">
            You've completed A1 through B1
          </p>
          <button
            onClick={restart}
            className="bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-3 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/15 transition-colors"
          >
            Start over
          </button>
        </div>
      ) : levelingUp ? (
        <div
          key="levelup"
          className="w-full max-w-sm rounded-3xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] p-8 mb-5 text-center shadow-2xl cursor-pointer"
          style={{ animation: 'fadeUp 0.18s ease-out' }}
          onClick={handleLevelUp}
        >
          <p className="text-5xl mb-4">🎉</p>
          <p className="text-2xl font-bold tracking-tight mb-2">Level up!</p>
          <p className="text-gray-400 dark:text-white/40 text-sm">
            {level} mastered — starting {LEVELS[LEVELS.indexOf(level) + 1]}
          </p>
        </div>
      ) : (
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
      )}

      {/* options */}
      {!levelingUp && !complete && (
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
      )}

      {!levelingUp && !complete && (
        <p className="mt-8 text-gray-300 dark:text-white/10 text-xs">press 1–4 or tap</p>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <footer className="mt-10 flex gap-4 text-[10px] text-gray-300 dark:text-white/15 font-mono">
        <Link to="/impressum" className="hover:text-gray-500 dark:hover:text-white/40 transition-colors">Impressum</Link>
        <Link to="/datenschutz" className="hover:text-gray-500 dark:hover:text-white/40 transition-colors">Datenschutz</Link>
      </footer>
    </div>
      } />
    </Routes>
    </>
  )
}
