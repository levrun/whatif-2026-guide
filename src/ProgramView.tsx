import React, { useMemo, useState } from 'react'
import { PROGRAM, type ProgramEvent } from './programData'
import { PROGRAM_RU } from './programRu'
import { GLOSSARY } from './glossary'
import { autoTag, TAG_META, type Tag } from './tags'

// Tap-friendly tooltip: своё окошко вместо нативного title (который не работает на тач-экранах)
interface PopupState {
  text: string
  x: number
  y: number
  above: boolean
}

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

// Наше время: Пт с 15:00 (приезд), но Gate Crew 20:00-23:30 = занят.
// Сб — весь день свободен. Вс — свободен, но Temple 20:00-23:00 = занят.
function isOurTime(e: ProgramEvent): boolean {
  const [start] = getTimeRange(e.time)
  if (start < 0) return true // All Day — показываем
  if (e.day === 'Thursday') return false // ещё не приехали
  if (e.day === 'Monday') return false // уезжаем
  if (e.day === 'Friday') {
    if (start < 15 * 60) return false // до 15:00 — в дороге
    if (start >= 20 * 60 && start < 23.5 * 60) return false // Gate Crew
  }
  if (e.day === 'Sunday') {
    if (start >= 20 * 60 && start < 23 * 60) return false // Temple Guardians
  }
  return true
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
  if (e <= s && e >= 0) e += 12 * 60
  return [s, e]
}

function overlaps(a: [number, number], b: [number, number]): boolean {
  if (a[0] < 0 || b[0] < 0) return false
  return a[0] < b[1] && b[0] < a[1]
}

function annotateDesc(
  text: string,
  showPopup: (text: string, ev: React.MouseEvent) => void,
): (string | React.ReactElement)[] {
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
    const word = remaining.slice(earliest, earliest + matchLen)
    parts.push(
      <span
        key={keyIdx++}
        className="glossary-word"
        onClick={(ev) => { ev.stopPropagation(); showPopup(`${word} — ${ru}`, ev) }}
        onMouseEnter={(ev) => showPopup(`${word} — ${ru}`, ev)}
        onMouseLeave={() => showPopup('', undefined as unknown as React.MouseEvent)}
      >
        {word}
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
  const [onlyOurTime, setOnlyOurTime] = useState(false)
  const [activeTags, setActiveTags] = useState<Tag[]>([])
  const [query, setQuery] = useState('')
  const [popup, setPopup] = useState<PopupState | null>(null)

  const showPopup = (text: string, ev?: React.MouseEvent) => {
    if (!text || !ev) { setPopup(null); return }
    const rect = (ev.target as HTMLElement).getBoundingClientRect()
    const above = rect.bottom > window.innerHeight - 200
    setPopup({
      text,
      x: Math.max(8, Math.min(rect.left, window.innerWidth - 300)),
      y: above ? rect.top + window.scrollY - 6 : rect.bottom + window.scrollY + 6,
      above,
    })
  }

  const toggleTag = (t: Tag) => {
    setActiveTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])
  }

  // Pre-compute tags for all events
  const eventTags = useMemo(() => PROGRAM.map((e) => autoTag(e.title, e.desc)), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROGRAM.map((e, i) => ({ e, i })).filter(({ e, i }) => {
      if (e.day !== day) return false
      if (onlyPicks && !(e.title in PICKS)) return false
      if (onlyOurTime && !isOurTime(e)) return false
      if (activeTags.length > 0 && !activeTags.some((t) => eventTags[i].includes(t))) return false
      if (q) {
        const ru = PROGRAM_RU[e.title]
        const ruText = ru ? ru.ru + ' ' + (ru.story || '') : ''
        const hay = (e.title + ' ' + (e.venue ?? '') + ' ' + e.desc + ' ' + ruText).toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [day, onlyPicks, onlyOurTime, activeTags, query, eventTags])

  // Group by time overlap
  const grouped = useMemo(() => {
    const groups: { items: typeof filtered; overlapCount: number }[] = []
    const ranges = filtered.map(({ e }) => getTimeRange(e.time))
    const visited = new Set<number>()
    for (let i = 0; i < filtered.length; i++) {
      if (visited.has(i)) continue
      const group = [i]
      visited.add(i)
      for (let j = i + 1; j < filtered.length; j++) {
        if (visited.has(j)) continue
        if (overlaps(ranges[i], ranges[j])) { group.push(j); visited.add(j) }
      }
      groups.push({ items: group.map((idx) => filtered[idx]), overlapCount: group.length })
    }
    return groups
  }, [filtered])

  return (
    <div className="program">
      <p className="program-note">
        180 событий. Тапни (или наведи мышь) на заголовок — русский перевод; на подчёркнутое слово — перевод термина.
        Оранжевая полоска слева = одновременные события.
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
          placeholder="Поиск: yoga, dance, танцы, еда…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="program-tags">
        <button className={onlyOurTime ? 'tag-btn tag-active' : 'tag-btn'} onClick={() => setOnlyOurTime(!onlyOurTime)}>
          🕐 Наше время
        </button>
        <button className={onlyPicks ? 'tag-btn tag-active' : 'tag-btn'} onClick={() => setOnlyPicks(!onlyPicks)}>
          ⭐ Рекомендации
        </button>
        {(Object.keys(TAG_META) as Tag[]).map((t) => (
          <button
            key={t}
            className={activeTags.includes(t) ? 'tag-btn tag-active' : 'tag-btn'}
            onClick={() => toggleTag(t)}
          >
            {TAG_META[t].emoji} {TAG_META[t].label}
          </button>
        ))}
      </div>

      <div className="program-list">
        {filtered.length === 0 && (
          <p className="program-empty">Ничего не нашлось — попробуй другой день или сбрось фильтры.</p>
        )}
        {grouped.map((g, gi) => (
          <div key={gi} className={`prog-group ${g.overlapCount > 1 ? 'prog-overlap' : ''}`}>
            {g.overlapCount > 1 && (
              <div className="prog-overlap-bar" title={`${g.overlapCount} одновременных — выбирай!`} />
            )}
            <div className="prog-group-events">
              {g.items.map(({ e, i: globalIdx }, ei) => {
                const pick = PICKS[e.title]
                const ru = PROGRAM_RU[e.title]
                const tags = eventTags[globalIdx]
                const titleTip = ru ? `🇷🇺 ${ru.ru}${ru.story ? '\n\n📖 ' + ru.story : ''}` : undefined
                return (
                  <div key={`${gi}-${ei}`} className={`prog-event ${pick ? 'prog-pick' : ''}`}>
                    <div className="prog-time">{e.time === 'All Day' ? 'Весь день' : e.time}</div>
                    <div className="prog-body">
                      <div className="prog-title-row">
                        <span
                          className={ru ? 'prog-title prog-title-ru' : 'prog-title'}
                          onClick={(ev) => {
                            if (!titleTip) return
                            ev.stopPropagation()
                            showPopup(popup?.text === titleTip ? '' : titleTip, ev)
                          }}
                          onMouseEnter={(ev) => titleTip && showPopup(titleTip, ev)}
                          onMouseLeave={() => setPopup(null)}
                        >
                          {pick && '⭐ '}
                          {e.title}
                          {ru && <span className="badge badge-ru">🇷🇺</span>}
                        </span>
                      </div>
                      {pick && <div className="prog-pick-note">💡 {pick}</div>}
                      {tags.length > 0 && (
                        <div className="prog-tags-row">
                          {tags.map((t) => (
                            <span key={t} className="prog-tag">{TAG_META[t].emoji}</span>
                          ))}
                        </div>
                      )}
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
                      <div className="prog-desc">{annotateDesc(e.desc, showPopup)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {popup && (
        <div
          className={popup.above ? 'tooltip-popup tooltip-popup-above' : 'tooltip-popup'}
          style={{ left: popup.x, top: popup.y }}
          onClick={() => setPopup(null)}
        >
          {popup.text}
        </div>
      )}
      {popup && <div className="tooltip-backdrop" onClick={() => setPopup(null)} />}
    </div>
  )
}
