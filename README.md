# Dreamkont — фронтенд-вёрстка

Многостраничный корпоративный сайт компании Dreamkont. Сборка на **Vite 7**, шаблоны — **Handlebars**, стили — **SCSS**, логика — **vanilla JS (ES-модули)**.

Вёрстка предназначена для интеграции с **Evolution CMS** (формы через FormSender).

## Требования

- Node.js 20+
- npm

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте в браузере адрес из вывода терминала (обычно `http://localhost:5173/`).

Страница `index.html` — навигация по макетам для разработки. Остальные страницы — полноценные макеты.

## npm-скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Продакшн-сборка в `dist/` |
| `npm run preview` | Просмотр собранного `dist/` |

## Структура проекта

```
dreamkont/
├── public/                 # Статика (копируется как есть)
│   └── assets/             # Иконки, favicon, sprite.svg
├── src/                    # Корень dev-сервера (root в vite.config)
│   ├── *.html              # Страницы
│   ├── partials/           # Handlebars-партиалы ({{>_header}}, …)
│   ├── js/
│   │   ├── app.js          # Точка входа
│   │   ├── components/     # Модули по функциям
│   │   ├── config/
│   │   └── utils/
│   └── styles/
│       ├── style.scss      # Главный файл стилей
│       ├── blocks/         # Секции страниц
│       ├── components/     # UI-компоненты
│       └── helpers/        # Миксины, функции, media
├── dist/                   # Результат `npm run build`
├── vite.config.js
└── package.json
```

## Страницы

| Файл | Назначение |
|------|------------|
| `index.html` | Список ссылок (только для разработки) |
| `main.html` | Главная |
| `about.html` | О компании |
| `contacts.html` | Контакты + форма + реквизиты |
| `news.html` | Список новостей |
| `news-item.html` | Страница новости |
| `portfolio.html` | Портфолио |
| `product-item.html` | Карточка продукта |
| `team.html` | Команда |
| `404.html` | Страница ошибки |

## HTML и партиалы

Партиалы лежат в `src/partials/` и подключаются в страницах:

```html
{{>_header}}
{{>_hero}}
{{>_footer}}
{{>_callback-modal}}
```

Папка партиалов задаётся в `vite.config.js` (`vite-plugin-handlebars`).

Чтобы добавить новую страницу:

1. Скопируйте существующий `.html` в `src/`.
2. Подключите нужные партиалы.
3. Добавьте файл в `build.rollupOptions.input` в `vite.config.js`.

## Стили

- Препроцессор: **SCSS** (modern API).
- Новые блоки секций — в `src/styles/blocks/`, подключать в `style.scss` через `@use`.
- Переиспользуемые элементы — в `src/styles/components/`.
- PostCSS: autoprefixer, сортировка и объединение media queries, cssnano.

Шрифты: `Montserrat` (woff2), подключаются в `partials/_head.html`.

## JavaScript

Точка входа — `src/js/app.js`. Подключается на страницах:

```html
<script type="module" src="/js/app.js"></script>
```

Основные модули:

| Модуль | Назначение |
|--------|------------|
| `Navigation.js` | Мобильное меню, выпадающие пункты |
| `Modal.js` | Модалка «Заказать звонок» |
| `swiper.js` | Слайдеры (hero, отзывы, сертификаты) |
| `aos.js` | Анимации при скролле |
| `inputmask.js` | Маска телефона |
| `counter.js` | Анимация цифр в блоке команды |
| `cookieNotice.js` | Уведомление о cookie |
| `formPrivacy.js` | Чекбокс согласия в формах |
| `FormSenderInit.js` | Отправка форм в EvoCMS |

Библиотеки: Swiper, Fancybox (`@fancyapps/ui`), AOS, Inputmask.

## Формы и CMS

Формы обёрнуты в `.form-wrapper`. Для работы с EvoCMS на проде подключаются `FormSender` и `FormSenderMessager` (со стороны CMS).

В статической вёрстке:

- модалка обратного звонка — `partials/_callback-modal.html`;
- форма на контактах — `partials/_contact-form.html`;
- чекбокс `privacy_agree` обязателен перед отправкой;
- уведомления — компонент `toast.js`.

## Cookie-уведомление

Партиал `_cookie-notice.html` подключается в `_callback-modal.html` (на всех страницах с подвалом). Согласие сохраняется в `localStorage` (`dreamkont_cookie_consent_v1`).

## Сборка для продакшена

```bash
npm run build
```

Артефакты попадают в `dist/`. Содержимое `dist/` загружается на хостинг или в `htdocs` Evolution CMS.

При интеграции с CMS пути к ассетам и формам должны совпадать с продакшеном (`/assets/…`, `/privacy` и т.д.).

## Конфигурация Vite

- `root: "./src"` — исходники в `src/`
- `publicDir: "./../public"` — статика из `public/`
- `build.outDir: "./../dist"`
- dev-сервер: `0.0.0.0:5173`

## Зависимости

**dependencies:** `@fancyapps/ui`, `aos`, `inputmask`

**devDependencies:** `vite`, `vite-plugin-handlebars`, `sass`, `postcss`, `autoprefixer`, `cssnano`, `swiper`

---

© Dreamkont
