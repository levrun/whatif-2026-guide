import { useState } from 'react'
import { DAYS, GUIDES, type DayEvent } from './data'
import MapView from './MapView'
import ProgramView from './ProgramView'

const KIND_META: Record<DayEvent['kind'], { label: string; className: string }> = {
  shift: { label: 'Смена', className: 'badge badge-shift' },
  main: { label: 'Главное событие', className: 'badge badge-main' },
  event: { label: 'Событие', className: 'badge badge-event' },
  food: { label: 'Еда', className: 'badge badge-food' },
  info: { label: 'Инфо', className: 'badge badge-info' },
  dance: { label: 'Танцы', className: 'badge badge-dance' },
}

function EventCard({ ev, onShowMap }: { ev: DayEvent; onShowMap: (id: string) => void }) {
  const meta = KIND_META[ev.kind]
  return (
    <div className={`event ${ev.kind === 'shift' ? 'event-shift' : ''} ${ev.kind === 'main' ? 'event-main' : ''} ${ev.kind === 'dance' ? 'event-dance' : ''}`}>
      {ev.image ? (
        <img
          className="event-thumb"
          src={`${import.meta.env.BASE_URL}${ev.image}`}
          alt=""
          loading="lazy"
        />
      ) : (
        <div className="event-thumb event-thumb-empty" aria-hidden="true">
          {ev.kind === 'shift' ? '🎫' : '🏕️'}
        </div>
      )}
      <div className="event-time">{ev.time}</div>
      <div className="event-body">
        <div className="event-title-row">
          <span className="event-title">{ev.title}</span>
          <span className={meta.className}>{meta.label}</span>
          {ev.booked && <span className="badge badge-booked">✓ забронировано</span>}
        </div>
        {ev.place && <div className="event-place">📍 {ev.place}</div>}
        <div className="event-desc">{ev.description}</div>
        {ev.mapId && (
          <button className="map-link" onClick={() => onShowMap(ev.mapId!)}>
            🗺️ Показать на карте
          </button>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [activeDay, setActiveDay] = useState<string>('all')
  const [tab, setTab] = useState<'schedule' | 'program' | 'map'>('schedule')
  const [focusId, setFocusId] = useState<string | null>(null)

  const visibleDays = activeDay === 'all' ? DAYS : DAYS.filter((d) => d.id === activeDay)

  const showOnMap = (id: string) => {
    setFocusId(id)
    setTab('map')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>What If 2026 🔥</h1>
        <p className="hero-sub">
          Наш план на фестиваль · 24–27 июля · Merritt, BC
          <br />
          <span className="hero-note">
            Региональный бёрн «What If: Cat If?» 🐱 — первый бёрн Лёши и Кати
          </span>
        </p>
      </header>

      <nav className="tab-bar">
        <button
          className={tab === 'schedule' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('schedule')}
        >
          📅 Расписание
        </button>
        <button
          className={tab === 'program' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('program')}
        >
          🎪 Программа
        </button>
        <button
          className={tab === 'map' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('map')}
        >
          🗺️ Карта
        </button>
      </nav>

      {tab === 'map' ? (
        <MapView focusId={focusId} />
      ) : tab === 'program' ? (
        <ProgramView onShowMap={showOnMap} />
      ) : (
        <>
          <section className="guides">
            <h2>📚 Официальные гайды (PDF)</h2>
            <div className="guide-grid">
              {GUIDES.map((g) => (
                <a
                  key={g.file}
                  className="guide-card"
                  href={`${import.meta.env.BASE_URL}${g.file}`}
                  download={g.file}
                >
                  <img
                    className="guide-thumb"
                    src={`${import.meta.env.BASE_URL}${g.image}`}
                    alt={g.title}
                    loading="lazy"
                  />
                  <div>
                    <div className="guide-title">
                      {g.emoji} {g.title}
                    </div>
                    <div className="guide-desc">{g.description}</div>
                    <div className="guide-size">⬇️ Скачать PDF · {g.size}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <nav className="day-filter">
            <button
              className={activeDay === 'all' ? 'day-btn active' : 'day-btn'}
              onClick={() => setActiveDay('all')}
            >
              Все дни
            </button>
            {DAYS.map((d) => (
              <button
                key={d.id}
                className={activeDay === d.id ? 'day-btn active' : 'day-btn'}
                onClick={() => setActiveDay(d.id)}
              >
                {d.emoji} {d.weekday}
              </button>
            ))}
          </nav>

          <main>
            {visibleDays.map((day) => (
              <section key={day.id} className="day">
                <div className="day-header">
                  <span className="day-emoji">{day.emoji}</span>
                  <div>
                    <h2>
                      {day.weekday}, {day.date}
                    </h2>
                    <p className="day-sub">{day.subtitle}</p>
                  </div>
                </div>
                <div className="events">
                  {day.events.map((ev, i) => (
                    <EventCard key={i} ev={ev} onShowMap={showOnMap} />
                  ))}
                </div>
              </section>
            ))}
          </main>
        </>
      )}

      <footer className="footer">
        <p>
          Чек-ин на смены — в приложении Vome за 1 час до начала. Обе смены трезвые.
          Точное расписание событий — в Dust app («What If: Cat If?»), работает офлайн.
        </p>
        <p className="footer-small">
          Официальный сайт: <a href="http://whatif.now" target="_blank" rel="noopener noreferrer">whatif.now</a> ·
          Организатор: GVIAS · Burning Man Regional Event
        </p>
      </footer>
    </div>
  )
}
