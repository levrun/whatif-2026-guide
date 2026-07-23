// Теги для фильтрации программы. Каждое событие тегируется по ключевым словам в title+desc.
export type Tag = 'dance' | 'introvert' | 'food' | 'yoga' | 'craft' | 'music' | 'kids'

export const TAG_META: Record<Tag, { emoji: string; label: string }> = {
  dance: { emoji: '💃', label: 'Танцы' },
  introvert: { emoji: '🤫', label: 'Интроверты' },
  food: { emoji: '🍽️', label: 'Еда' },
  yoga: { emoji: '🧘', label: 'Йога' },
  craft: { emoji: '✂️', label: 'Крафт' },
  music: { emoji: '🎵', label: 'Музыка' },
  kids: { emoji: '👶', label: 'Дети' },
}

const RULES: [Tag, RegExp][] = [
  ['dance', /danc|disco|rave|twerk|polka|kizomba|fusion partner|ecstatic|dj lineup|dj sets|boogie|karaoke|bop|contact improv/i],
  ['introvert', /meditat|sound ?bath|sound journey|sound healing|yin yoga|tea monk|temple|circling|oracle|astro-?camp|porchside|stretching|blindfold|chocolate ceremon|recover|attunement|integration/i],
  ['food', /brunch|noodle|pizza|miso|burger|bbq|steak|grilled cheese|waffle|pancake|ice!?$|freezie|snowcone|caesar|wine|cocktail|mimosa|shamemosa|sharkcuterie|commissary|carajillo|potluck|crumpet|toast/i],
  ['yoga', /yoga|acro|yin|vinyasa|stretch|slackline|slackro|balance/i],
  ['craft', /workshop|diy|craft|paint|bead|earring|puppet|lamp|collage|chain making|hot glue|stamp|pronoun pin|upcycle|fix-?it|wand/i],
  ['music', /music|live.*set|jam!?|acoustic|guitar|loop|open mic|sing|kirtan|didgeridoo|handpan|percussion|karaoke|cabaret|catbaret/i],
  ['kids', /kids|children|child|family|teddy|smol|smøl|toddler|kidsville/i],
]

export function autoTag(title: string, desc: string): Tag[] {
  const hay = title + ' ' + desc
  const tags: Tag[] = []
  for (const [tag, re] of RULES) {
    if (re.test(hay)) tags.push(tag)
  }
  return tags
}
