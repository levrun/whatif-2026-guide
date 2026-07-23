import React, { useMemo, useState } from 'react'
import { PROGRAM, type ProgramEvent } from './programData'
import { PROGRAM_RU } from './programRu'
import { GLOSSARY } from './glossary'

const DAY_LABELS: Record<ProgramEvent['day'], string> = {
  Thursday: 'Чт 23.07',
  Friday: 'Пт 24.07',
  Saturday: 'Сб 25.07',
  Sunday: 'Вс 26.07',
  Monday: 'Пн 27.07',
}
const DAY_ORDER: ProgramEvent['day'][] = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']

const PICKS: Record<string, string> = {
  'Kizomba Dance Workshop & Social': 'наш план: парный танец перед сменой Лёши',
  'You Can Polka to That!': 'непарные народные танцы — идеально для нас',
  'Twerkshop!': 'весёлый непарный дэнс-класс',
  'Fusion Partner Dancing': 'уютные парные танцы в носках',
  'Snowcone Dance Party!': 'свободные танцы + снежные конусы',
  'The "Burn" Ceremony & Afterparty': 'ГЛАВНОЕ событие: LED-шоу эффигии + афтепати',
  'Midnight Sharkcuterie': 'ночной пир и танцы сразу после церемонии',
  'Contact Improv': 'ближайшее к экстатику — для Лёши',
  'Tea Monk': 'чай, таро и тихое слушание — для интровертов',
  'Floatie Races in the River!': 'гонки на надувнушках, знакомство через игру',
  'Floatie Races and Games in the River!': 'вторая точка гонок — призы и фризи',
  "Kitten' Around": 'мастерим кошачьи ушки к церемонии',
  'Break a Bear': 'пересобираем плюшевых мишек — парное безумие',
  'Brunch and Beats': 'тосты, мимозы, drag-шоу и танцы',
  "Geoff's Pancake Breakfast": 'воскресные блинчики',
  'Ecstatic Dance': 'экстатик-данс! (четверг — если успеете до заезда)',
  'Sock Puppet Workshop': 'странные носочные куклы — без языкового барьера',
  'Silly Meditation': 'абсурдная медитация — смешно и снимает зажатость',
  'Wigs & Karaoke': 'караоке в париках',
  'Chocolate Ceremonies': 'шоколад вслепую — сенсорика вместо слов',
}

function parseMin(t: string): number {
  const s = t.trim().toLowerCase()
  if (s === 'all day' || s.startsWith('-')) return -1
  const m = s.match(/^(midnight|noon|\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/)
  if (!m) return -1
  const tok = m[1]
  if (tok === 'midnight') return 0
  if (tok === 'noon') return 12 * 60
  const mm = tok.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i)
  if (!mm) return -1
  let h = parseInt(mm[1]); const mn = parseInt(mm[2] || '0'); const ap = (mm[3] || '').toLowerCase()
  if (ap === 'pm' && h !== 12) h += 12
  if (ap === 'am' && h === 12) h = 0
  return h * 60 + mn
}

function getTimeRange(t: string): [number, number] {
  const parts = t.split(/[-–]/)
  if (parts.length < 2) return [parseMin(t), parseMin(t) + 60]
  const s = parseMin(parts[0])
  let e = parseMin(parts[1])
  if (e <= s && e >= 0) e += 12 * 60 // overnight
  return [s, e]
}

function overlaps(a: [number, number], b: [number, number]): boolean {
  if (a[0] < 0 || b[0] < 0) return false
  return a[0] < b[1] && b[0] < a[1]
}

function annotateDesc(text: string): (string | React.ReactElement)[] {
  const parts: (string | React.ReactElement)[] = []
  let remaining = text
  let keyIdx = 0
  while (remaining.length > 0) {
    let earliest = -1
    let matchIdx = -1
    let matchLen = 0
    for (let g = 0; g < GLOSSARY.length; g++) {
      const [term] = GLOSSARY[g]
      const idx = remaining.indexOf(term)
      if (idx >= 0 && (earliest < 0 || idx < earliest)) {
        earliest = idx; matchIdx = g; matchLen = term.length
      }
    }
    if (earliest < 0) { parts.push(remaining); break }
    if (earliest > 0) parts.push(remaining.slice(0, earliest))
    const [, ru] = GLOSSARY[matchIdx]
    parts.push(
      <span key={keyIdx++} className="glossary-word" title={ru}>
        {remaining.slice(earliest, earliest + matchLen)}
      </span>
    )
    remaining = remaining.slice(earliest + matchLen)
  }
  return parts
}

interface Props {
  onShowMap: (id: string) => void
}

export default function ProgramView({ onShowMap }: Props) {
  const [day, setDay] = useState<ProgramEvent['day']>('Friday')
  const [onlyPicks, setOnlyPicks] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROGRAM.filter((e) => {
      if (e.day !== day) return false
      if (onlyPicks && !(e.title in PICKS)) return false
      if (q && !(e.title + ' ' + (e.venue ?? '') + ' ' + e.desc).toLowerCase().includes(q)) return false
      return true
    })
  }, [day, onlyPicks, query])

  // Group events into time slots to show overlaps
  const grouped = useMemo(() => {
    const groups: { events: ProgramEvent[]; overlapCount: number }[] = []
    const ranges = filtered.map((e) => getTimeRange(e.time))
    const visited = new Set<number>()
    for (let i = 0; i < filtered.length; i++) {
      if (visited.has(i)) continue
      const group = [i]
      visited.add(i)
      for (let j = i + 1; j < filtered.length; j++) {
        if (visited.has(j)) continue
        if (overlaps(ranges[i], ranges[j])) { group.push(j); visited.add(j) }
      }
      groups.push({ events: group.map((idx) => filtered[idx]), overlapCount: group.length })
    }
    return groups
  }, [filtered])

  return (
    <div className="program">
      <p className="program-note">
        Полная программа (180 событий). <b>Навёл</b> на название — увидишь русский перевод.{' '}
        <span className="glossary-word" title="подчёркнутые слова — бёрн-термины с переводом">Подчёркнутые слова</span>
        {' '}в описаниях тоже переводятся при наведении.
        Цветная полоска слева объединяет одновременные события.
      </p>

      <div className="day-filter program-days">
        {DAY_ORDER.map((d) => (
          <button key={d} className={day === d ? 'day-btn active' : 'day-btn'} onClick={() => setDay(d)}>
            {DAY_LABELS[d]}
          </button>
        ))}
      </div>

      <div className="program-controls">
        <input
          className="program-search"
          placeholder="Поиск: yoga, dance, food…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={onlyPicks ? 'day-btn active' : 'day-btn'} onClick={() => setOnlyPicks(!onlyPicks)}>
          ⭐ Рекомендации
        </button>
      </div>

      <div className="program-list">
        {filtered.length === 0 && (
          <p className="program-empty">Ничего не нашлось — попробуй другой день или сбрось поиск.</p>
        )}
        {grouped.map((g, gi) => (
          <div key={gi} className={`prog-group ${g.overlapCount > 1 ? 'prog-overlap' : ''}`}>
            {g.overlapCount > 1 && (
              <div className="prog-overlap-bar" title={`${g.overlapCount} одновременных событий — выбирай!`} />
            )}
            <div className="prog-group-events">
              {g.events.map((e, ei) => {
                const pick = PICKS[e.title]
                const ru = PROGRAM_RU[e.title]
                const titleTip = ru ? `🇷🇺 ${ru.ru}${ru.story ? '\n\n📖 ' + ru.story : ''}` : undefined
                return (
                  <div key={`${gi}-${ei}`} className={`prog-event ${pick ? 'prog-pick' : ''}`}>
                    <div className="prog-time">{e.time === 'All Day' ? 'Весь день' : e.time}</div>
                    <div className="prog-body">
                      <div className="prog-title-row">
                        <span className="prog-title" title={titleTip}>
                          {pick && '⭐ '}
                          {e.title}
                          {ru && <span className="badge badge-ru">🇷🇺</span>}
                        </span>
                      </div>
                      {pick && <div className="prog-pick-note">💡 {pick}</div>}
                      {e.venue && (
                        <div className="prog-venue">
                          📍 {e.venue}
                          {e.mapLabel && <span className="prog-mapnum"> · {e.mapLabel}</span>}
                          {e.mapId && (
                            <button className="map-link prog-maplink" onClick={() => onShowMap(e.mapId!)}>
                              🗺️
                            </button>
                          )}
                        </div>
                      )}
                      <div className="prog-desc">{annotateDesc(e.desc)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
