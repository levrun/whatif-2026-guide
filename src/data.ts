export type EventKind = 'shift' | 'main' | 'event' | 'food' | 'info'

export interface DayEvent {
  time: string
  title: string
  place?: string
  description: string
  kind: EventKind
  booked?: boolean
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
      },
      {
        time: '16:00–19:00',
        title: 'Ставим лагерь + ужин',
        description:
          'Палатка, тень, вода. Запас времени до смены — без спешки.',
        kind: 'info',
      },
      {
        time: '17:30–19:30',
        title: 'Commissary — бесплатный ужин волонтёрам',
        place: 'Commissary (стикер брать в Volunteer Hub)',
        description:
          'В день смены кормят бесплатно: сначала берём Meal Sticker в Volunteer Hub, потом идём в Commissary.',
        kind: 'food',
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
        booked: true,
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
      },
      {
        time: '11:00–12:00',
        title: 'You Can Polka to That! ⭐',
        place: 'Bootti Frutti',
        description:
          'Учат польке с нуля. «Партнёр не обязателен, есть бесконтактные варианты» — идеально для скромных.',
        kind: 'event',
      },
      {
        time: '12:00',
        title: 'Бесплатный лёд (GVIAS)',
        place: 'Слева от Battery Library (North Camp #1)',
        description: 'Пакеты по 7 фунтов, разбирают за час. Приходить к 12:00.',
        kind: 'info',
      },
      {
        time: '14:00–16:00',
        title: 'Floatie Races — гонки на надувнушках ⭐',
        place: 'Река, старт у моста',
        description:
          'Матрасы дают, призы и фризи. Знакомство через игру — английский не нужен.',
        kind: 'event',
      },
      {
        time: '16:00–18:00',
        title: 'Kitten’ Around — мастерим кошачьи ушки ⭐',
        place: 'Centre Camp',
        description:
          'Тема года — «What If: Cat If?» 🐱. Делаем ушки/хвосты — готовим костюмы к вечерней церемонии.',
        kind: 'event',
      },
      {
        time: '22:00–23:30',
        title: 'The «Burn» Ceremony — церемония эффигии',
        place: 'Эффигия (34 фута)',
        description:
          'Кульминация фестиваля: перформанс, поднятие рук «the Man», LED-шоу вместо огня (сжигать нельзя по договору с площадкой) и афтепати. «This is not to be missed!»',
        kind: 'main',
      },
      {
        time: '23:30–00:30',
        title: 'Midnight Sharkcuterie',
        place: 'Ravebots (Aurora on the River)',
        description: 'Ночной пир сразу после церемонии + DJ. Еда с маркировкой, есть GF/безлактозные опции.',
        kind: 'food',
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
      },
      {
        time: '13:00–14:30',
        title: 'Tea Monk ⭐',
        place: 'Странствующий — ищите ковёр',
        description:
          'Чай, таро и «терапевтическое искусство слушания». Тепло и небольно для интровертов.',
        kind: 'event',
      },
      {
        time: '13:00–15:00',
        title: 'Break a Bear',
        place: 'The Cottage',
        description:
          'Разбираем и пересобираем плюшевых мишек во франкенштейнов. Весёлое парное безумие.',
        kind: 'event',
      },
      {
        time: '14:30–15:30',
        title: 'Blindfolded Chocolate Experience ⭐',
        place: 'Fever Dream',
        description:
          'Дегустация шоколада с завязанными глазами — сенсорика вместо слов.',
        kind: 'event',
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
}

export const GUIDES: GuideLink[] = [
  {
    file: 'WWW-Guide-WhatIf-2026.pdf',
    title: 'What Where When Guide 2026',
    description:
      'Официальный гайд фестиваля: все 141 событие, лагеря и арт по дням (family-friendly издание, 30 стр.)',
    size: '3.5 МБ',
    emoji: '📖',
  },
  {
    file: 'Temple-Guardians-Guidebook.pdf',
    title: 'Temple Guardians Guidebook',
    description:
      'Официальная методичка Хранителя Храма: философия, обязанности, что взять на смену (4 стр.)',
    size: '105 КБ',
    emoji: '🏛️',
  },
]
