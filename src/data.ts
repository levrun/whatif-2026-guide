export type EventKind = 'shift' | 'main' | 'event' | 'food' | 'info' | 'dance'

export interface DayEvent {
  time: string
  title: string
  place?: string
  description: string
  kind: EventKind
  booked?: boolean
  image?: string
  mapId?: string
}

export interface FestivalDay {
  id: string
  date: string
  weekday: string
  emoji: string
  subtitle: string
  events: DayEvent[]
}

export const DAYS: FestivalDay[] = [
  {
    id: 'friday',
    date: '24 июля',
    weekday: 'Пятница',
    emoji: '🚗',
    subtitle: 'Приезд, лагерь и первая смена',
    events: [
      {
        time: '15:00–16:00',
        title: 'Приезд на фестиваль',
        place: '1000 Midday Valley Road, Merritt, BC',
        description:
          'Заезд через ворота: билеты, браслеты, проверка машины. Говорим «It’s our first burn!» — новичкам все рады.',
        kind: 'info',
        mapId: 'flowhub',
        image: 'ev/arrival.png',
      },
      {
        time: '16:00–19:00',
        title: 'Ставим лагерь + ужин',
        description:
          'Палатка, тень, вода. Запас времени до смены — без спешки.',
        kind: 'info',
        image: 'ev/camp.jpg',
      },
      {
        time: '17:30–19:30',
        title: 'Commissary — бесплатный ужин волонтёрам',
        place: 'Commissary (стикер брать в Volunteer Hub)',
        description:
          'В день смены кормят бесплатно: сначала берём Meal Sticker в Volunteer Hub, потом идём в Commissary.',
        kind: 'food',
        mapId: 'commissary',
        image: 'ev/commissary.jpg',
      },
      {
        time: '17:30–18:30',
        title: 'Kizomba — урок танца + social 💃',
        place: 'Mystic Lounge',
        description:
          'Парный танец из Анголы для Кати и Лёши перед сменой: «Feel the energy, listen to the heart». Показывают с нуля.',
        kind: 'dance',
        mapId: 'mysticlounge',
        image: 'ev/kizomba.png',
      },
      {
        time: '19:00',
        title: 'Открывается чек-ин на смену',
        description: 'Отметиться в приложении Vome или на портале за час до начала.',
        kind: 'info',
      },
      {
        time: '20:00–23:30',
        title: 'СМЕНА: Gate Crew (Лёша)',
        place: 'Главные ворота · Flow Team',
        description:
          'Встречаем приезжающих: проверка билетов, браслеты, «Welcome home!». Команда большая, английский простой и повторяющийся. Трезвая смена. Обучение на месте, до ворот довозят.',
        kind: 'shift',
        mapId: 'flowhub',
        booked: true,
      },
      {
        time: '23:30–02:00',
        title: 'Ночные данс-флоры после смены 🌙',
        place: 'По всей плайе',
        description:
          'Смена кончилась — танцы только начинаются! Ищите Chasing Pussy Noodle Bar на «random dance floors»: лапша + танцы до 2 ночи.',
        kind: 'dance',
        image: 'ev/nightdance.jpg',
      },
    ],
  },
  {
    id: 'saturday',
    date: '25 июля',
    weekday: 'Суббота',
    emoji: '🔥',
    subtitle: 'Главный день — церемония эффигии',
    events: [
      {
        time: '11:00–12:30',
        title: 'Brunch and Beats',
        place: 'Aurora on the River',
        description:
          'Французские тосты, блины, мимозы + drag-шоу. Можно просто смотреть.',
        kind: 'food',
        mapId: 'aurora',
        image: 'ev/brunch.jpg',
      },
      {
        time: '11:00–12:00',
        title: 'You Can Polka to That! ⭐',
        place: 'Bootti Frutti',
        description:
          'Учат польке с нуля. «Партнёр не обязателен, есть бесконтактные варианты» — идеально для скромных.',
        kind: 'event',
        mapId: 'boottifrutti',
        image: 'ev/polka.jpg',
      },
      {
        time: '12:00',
        title: 'Бесплатный лёд (GVIAS)',
        place: 'Слева от Battery Library (North Camp #1)',
        description: 'Пакеты по 7 фунтов, разбирают за час. Приходить к 12:00.',
        kind: 'info',
        mapId: 'ice',
        image: 'ev/ice.jpg',
      },
      {
        time: '12:00–16:00',
        title: 'Snowcone Dance Party 💃',
        place: 'The Really Lost Penguins',
        description:
          'Танцы под DJ и живую MEWзыку со снежными конусами. Свободный непарный дэнс — заходим когда хотим.',
        kind: 'dance',
        mapId: 'penguins',
        image: 'ev/snowcone.jpg',
      },
      {
        time: '13:30–14:30',
        title: 'Twerkshop! 💃',
        place: 'Silly Hat Society',
        description:
          '«Shake what your mama gave yah!» — beginner friendly, весёлый и непарный урок тверка от Kelsey и Zara.',
        kind: 'dance',
        mapId: 'sillyhat',
        image: 'ev/twerkshop.jpg',
      },
      {
        time: '14:00–16:00',
        title: 'Floatie Races — гонки на надувнушках ⭐',
        place: 'Река, старт у моста',
        description:
          'Матрасы дают, призы и фризи. Знакомство через игру — английский не нужен.',
        kind: 'event',
        mapId: 'bridge',
        image: 'ev/floatie.jpg',
      },
      {
        time: '15:00–16:30',
        title: 'Fusion Partner Dancing 💃',
        place: "The Cat's Pajamas",
        description:
          'Парные танцы в носках в уютном крытом данс-спейсе — для настроения «иногда в паре можно». Показывают с нуля.',
        kind: 'dance',
        mapId: 'catspajamas',
        image: 'ev/fusion.jpg',
      },
      {
        time: '16:00–18:00',
        title: 'Kitten’ Around — мастерим кошачьи ушки ⭐',
        place: 'Centre Camp',
        description:
          'Тема года — «What If: Cat If?» 🐱. Делаем ушки/хвосты — готовим костюмы к вечерней церемонии.',
        kind: 'event',
        mapId: 'centrecamp',
        image: 'ev/kitten.jpg',
      },
      {
        time: '19:00–22:00',
        title: 'Saturday DJ Lineup',
        place: 'Silly Hat Society',
        description: 'Разогрев перед церемонией: Vene C → Nix → Matty Reed.',
        kind: 'dance',
        mapId: 'sillyhat',
        image: 'ev/djlineup.jpg',
      },
      {
        time: '22:00–23:30',
        title: 'The «Burn» Ceremony + Effigy Afterparty',
        place: 'Эффигия (34 фута)',
        description:
          'Кульминация фестиваля: перформанс, поднятие рук «the Man», LED-шоу вместо огня (сжигать нельзя по договору с площадкой) — и сразу афтепати: «shake your booty during the Effigy afterparty!»',
        kind: 'main',
        mapId: 'effigy',
        image: 'ev/effigy.jpg',
      },
      {
        time: '23:30–00:30',
        title: 'Midnight Sharkcuterie + танцы у Ravebots',
        place: 'Ravebots (Aurora on the River)',
        description:
          'Ночной пир сразу после церемонии: DJ Red Dragon и DJ Tango «serving up some tasty beats». Танцуем до упаду, лапша на данс-флорах до 2:00.',
        kind: 'dance',
        mapId: 'ravebots',
        image: 'ev/sharkcuterie.jpg',
      },
    ],
  },
  {
    id: 'sunday',
    date: '26 июля',
    weekday: 'Воскресенье',
    emoji: '🏛️',
    subtitle: 'Спокойный день и смена в Храме',
    events: [
      {
        time: '11:00–12:00',
        title: 'Geoff’s Pancake Breakfast',
        place: 'Church of Respect',
        description: 'Воскресные блинчики от Джеффа.',
        kind: 'food',
        mapId: 'church',
        image: 'ev/pancakes.jpg',
      },
      {
        time: '11:00–12:30',
        title: 'Brunch and Beats — танцы под 80-е 💃',
        place: 'Aurora on the River',
        description:
          'DJ Starrdust с хитами 80-х + drag-шоу Lesley Eve. Французские тосты, блины, мимозы — танцуем с вилкой в руке.',
        kind: 'dance',
        mapId: 'aurora',
        image: 'ev/brunch.jpg',
      },
      {
        time: '13:00–14:30',
        title: 'Tea Monk ⭐',
        place: 'Странствующий — ищите ковёр',
        description:
          'Чай, таро и «терапевтическое искусство слушания». Тепло и небольно для интровертов.',
        kind: 'event',
        image: 'ev/teamonk.jpg',
      },
      {
        time: '13:00–15:00',
        title: 'Break a Bear',
        place: 'The Cottage',
        description:
          'Разбираем и пересобираем плюшевых мишек во франкенштейнов. Весёлое парное безумие.',
        kind: 'event',
        mapId: 'cottage',
        image: 'ev/bear.jpg',
      },
      {
        time: '13:00–15:00',
        title: 'Contact Improv 💃 (для Лёши)',
        place: 'Cult Cafe',
        description:
          'Контактная импровизация от Cult Cafe — той же команды, что делала экстатик-данс в четверг. Свободное движение, ближайшее к экстатику в наши дни (сам Ecstatic Dance был в четверг до приезда). All levels welcome.',
        kind: 'dance',
        mapId: 'cultcafe',
        image: 'ev/improv.jpg',
      },
      {
        time: '14:30–15:30',
        title: 'Blindfolded Chocolate Experience ⭐',
        place: 'Fever Dream',
        description:
          'Дегустация шоколада с завязанными глазами — сенсорика вместо слов.',
        kind: 'event',
        mapId: 'feverdream',
        image: 'ev/chocolate.jpg',
      },
      {
        time: '19:00',
        title: 'Чек-ин на смену в Vome',
        description: 'За час до начала. Взять: тёплую одежду (ночь в горах!), воду, фонарик.',
        kind: 'info',
      },
      {
        time: '20:00–23:00',
        title: 'СМЕНА: Temple Guardians (Лёша)',
        place: 'Храм · Foundations',
        description:
          'Хранитель Храма: «невидимое служение» — тихое присутствие в сакральном пространстве, мягкая забота о людях в горе, свечи и безопасность. Вечером — закрывающий ритуал Храма. Трезвая смена. Говорить почти не нужно.',
        kind: 'shift',
        mapId: 'temple',
        image: 'ev/temple.jpg',
        booked: true,
      },
    ],
  },
  {
    id: 'monday',
    date: '27 июля',
    weekday: 'Понедельник',
    emoji: '🧹',
    subtitle: 'Сборы и отъезд',
    events: [
      {
        time: 'Утро',
        title: 'Собираем лагерь + MOOP-sweep',
        description:
          'Leave No Trace: прочёсываем стоянку, забираем весь мусор до последней блёстки. Matter Out Of Place не оставляем.',
        kind: 'info',
        image: 'ev/moop.png',
      },
      {
        time: 'День',
        title: 'Выезд домой',
        description: 'Прощаемся с What If 2026. До следующего бёрна! 🎪',
        kind: 'info',
      },
    ],
  },
]

export interface GuideLink {
  file: string
  title: string
  description: string
  size: string
  emoji: string
  image: string
}

export const GUIDES: GuideLink[] = [
  {
    file: 'WWW-Guide-WhatIf-2026.pdf',
    title: 'What Where When Guide 2026',
    description:
      'Официальный гайд фестиваля: все 141 событие, лагеря и арт по дням (family-friendly издание, 30 стр.)',
    size: '3.5 МБ',
    emoji: '📖',
    image: 'guide-www-art.png',
  },
  {
    file: 'Temple-Guardians-Guidebook.pdf',
    title: 'Temple Guardians Guidebook',
    description:
      'Официальная методичка Хранителя Храма: философия, обязанности, что взять на смену (4 стр.)',
    size: '105 КБ',
    emoji: '🏛️',
    image: 'guide-guardian-logo.jpg',
  },
]
