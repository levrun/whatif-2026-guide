# What If 2026 — наш план 🔥

Личное расписание фестиваля [What If 2026](http://whatif.now) (региональный бёрн, Merritt BC, 24–27 июля 2026) + официальные PDF-гайды для скачивания.

**Live:** https://levrun.github.io/whatif-2026-guide/

## Что внутри

- 📅 Расписание по дням на русском: смены волонтёров, церемония эффигии, события для новичков
- 📖 What Where When Guide 2026 (официальный гайд, PDF)
- 🏛️ Temple Guardians Guidebook (методичка Хранителя Храма, PDF)

## Стек

Vite 8 + React 19 + TypeScript. Деплой на GitHub Pages через GitHub Actions (OIDC).

## Разработка

```bash
npm install
npm run dev      # dev-сервер
npm run build    # tsc + vite build -> dist/
```

Пуш в `main` автоматически деплоит на GitHub Pages (~1–2 мин).
