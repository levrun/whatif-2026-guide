// Пиксельные координаты на официальной карте map-2026.png (2550x1723),
// оценены по позициям номеров лагерей. Точность ±30px — для навигации хватает.
export interface MapMarker {
  id: string
  name: string
  emoji: string
  x: number
  y: number
  note?: string
}

export const MAP_W = 2550
export const MAP_H = 1723

export const MARKERS: MapMarker[] = [
  { id: 'flowhub', name: 'Flow Hub / Greeters (въезд)', emoji: '🚗', x: 1438, y: 60, note: 'Заезд, смена Gate Crew (пт)' },
  { id: 'temple', name: 'Temple (Храм)', emoji: '🏛️', x: 237, y: 692, note: 'Смена Temple Guardians (вс 20:00)' },
  { id: 'effigy', name: 'Effigy (Эффигия)', emoji: '🔥', x: 228, y: 1114, note: '«Burn» Ceremony сб 22:00' },
  { id: 'centrecamp', name: 'Centre Camp', emoji: '⛺', x: 433, y: 998, note: 'Kitten’ Around сб 16:00' },
  { id: 'volhub', name: 'Volunteer Hub', emoji: '🎫', x: 455, y: 1038, note: 'Meal Sticker + чек-ин смен' },
  { id: 'commissary', name: 'Commissary', emoji: '🍽️', x: 628, y: 1233, note: 'Бесплатный ужин волонтёрам' },
  { id: 'ice', name: 'Ice (XIV)', emoji: '🧊', x: 55, y: 313, note: 'Бесплатный лёд пт/сб 12:00' },
  { id: 'penguins', name: 'The Really Lost Penguins', emoji: '🐧', x: 1384, y: 413, note: 'Snowcone Dance Party' },
  { id: 'sillyhat', name: 'Silly Hat Society', emoji: '🎩', x: 1047, y: 333, note: 'Twerkshop, DJ Lineup' },
  { id: 'church', name: 'Church of Respect', emoji: '🥞', x: 513, y: 306, note: 'Блинчики вс 11:00' },
  { id: 'catspajamas', name: 'The Cat’s Pajamas', emoji: '🐱', x: 1274, y: 570, note: 'Fusion Partner Dancing' },
  { id: 'cottage', name: 'The Cottage', emoji: '🏡', x: 291, y: 288, note: 'Break a Bear вс 13:00' },
  { id: 'boottifrutti', name: 'Bootti Frutti', emoji: '🍑', x: 1051, y: 1457, note: 'Полька сб 11:00' },
  { id: 'feverdream', name: 'Fever Dream', emoji: '🍫', x: 892, y: 1160, note: 'Шоколад вслепую вс 14:30' },
  { id: 'mysticlounge', name: 'Mystic Lounge', emoji: '💃', x: 974, y: 1096, note: 'Kizomba пт 17:30' },
  { id: 'cultcafe', name: 'Cult Cafe', emoji: '☕', x: 1034, y: 819, note: 'Contact Improv вс 13:00' },
  { id: 'aurora', name: 'Aurora on the River', emoji: '🥂', x: 1192, y: 828, note: 'Brunch and Beats 11:00' },
  { id: 'ravebots', name: 'Ravebots', emoji: '🤖', x: 1320, y: 1329, note: 'Sharkcuterie + танцы сб 23:30' },
  { id: 'bridge', name: 'Мост (река)', emoji: '🛟', x: 127, y: 492, note: 'Floatie Races сб 14:00' },
]
