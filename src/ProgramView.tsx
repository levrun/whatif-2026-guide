import { useMemo, useState } from 'react'
import { PROGRAM, type ProgramEvent } from './programData'

const DAY_LABELS: Record<ProgramEvent['day'], string> = {
  Thursday: 'Чт 23.07',
  Friday: 'Пт 24.07',
  Saturday: 'Сб 25.07',
  Sunday: 'Вс 26.07',
  Monday: 'Пн 27.07',
}

const DAY_ORDER: ProgramEvent['day'][] = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']

// Наши рекомендации: точное название события (как в гайде) -> почему стоит идти.
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
  'Blindfolded Chocolate Experience': 'шоколад вслепую — сенсорика вместо слов',
}

function timeBadge(t: string): string {
  return t === 'All Day' ? 'Весь день' : t
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

  return (
    <div className="program">
      <p className="program-note">
        Полная программа из официального гайда What Where When (family-издание) —{' '}
        {PROGRAM.length} событий. Номера площадок соответствуют легенде карты.
      </p>

      <div className="day-filter program-days">
        {DAY_ORDER.map((d) => (
          <button
            key={d}
            className={day === d ? 'day-btn active' : 'day-btn'}
            onClick={() => setDay(d)}
          >
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
        <button
          className={onlyPicks ? 'day-btn active' : 'day-btn'}
          onClick={() => setOnlyPicks(!onlyPicks)}
        >
          ⭐ Наши рекомендации
        </button>
      </div>

      <div className="program-list">
        {filtered.length === 0 && (
          <p className="program-empty">Ничего не нашлось — попробуй другой день или сбрось поиск.</p>
        )}
        {filtered.map((e, i) => {
          const pick = PICKS[e.title]
          return (
            <div key={i} className={`prog-event ${pick ? 'prog-pick' : ''}`}>
              <div className="prog-time">{timeBadge(e.time)}</div>
              <div className="prog-body">
                <div className="prog-title-row">
                  <span className="prog-title">
                    {pick && '⭐ '}
                    {e.title}
                  </span>
                </div>
                {pick && <div className="prog-pick-note">💡 {pick}</div>}
                {e.venue && (
                  <div className="prog-venue">
                    📍 {e.venue}
                    {e.mapLabel && <span className="prog-mapnum"> · {e.mapLabel} на карте</span>}
                    {e.mapId && (
                      <button className="map-link prog-maplink" onClick={() => onShowMap(e.mapId!)}>
                        🗺️ на карте
                      </button>
                    )}
                  </div>
                )}
                <div className="prog-desc">{e.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
