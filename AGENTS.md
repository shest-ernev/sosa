# AGENTS

## Repo Shape

- В репозитории **2 независимых Node-проекта** (не workspace): `server/` (NestJS) и `client/` (Vite + React). Все `npm install` и `npm run ...` запускать внутри соответствующей папки.
- Корневой `README.md` не содержит рабочей инструкции по запуску.

## Exact Commands

- Server (`/server`): `npm run start:dev`, `npm run build`, `npm run lint`, `npm test`.
- Client (`/client`): `npm run dev`, `npm run build`, `npm run lint`, `npm run swagger`.
- OpenAPI типы клиента генерируются командой `npm run swagger` из `http://localhost:8001/api/swagger-json` в `client/src/shared/types/swagger/index.ts` (файл автогенерируемый, руками не редактировать).

## Runtime Coupling / Env

- Сервер читает env из `server/.env` (шаблон: `server/.env.example`), значения по умолчанию в коде почти отсутствуют.
- `PORT` обязателен для сервера (`server/src/shared/config/server/index.ts`).
- Клиентский API URL захардкожен как `http://localhost:8001/api` в `client/src/shared/config/server/index.ts`; порт/префикс backend должны совпадать.
- Vite dev server клиента поднимается на `8000` (`client/vite.config.ts`).

## Architecture Entrypoints

- Server entrypoint: `server/src/main.ts`; global prefix: `/api`; Swagger UI: `/api/swagger`.
- Server module graph начинается с `server/src/app/index.ts`; фичи лежат в `server/src/app/<feature>/` (обычно `index.ts`, `module/`, `schemas/`).
- Client entrypoint: `client/src/main.tsx` -> `client/src/app/index.tsx` (Providers + Layout + Router).
- Client сохраняет слои `app/pages/widgets/features/entities/shared`; в `shared` много barrel-export через `index.ts`.

## Conventions Worth Preserving

- Использовать `type`, не `interface`.
- В типах сначала обязательные поля, потом optional.
- Избегать циклических импортов.
- При рендере списков через `map` всегда указывать `key`.
- Импорты держать сгруппированными и по алфавиту внутри групп (в проекте это устоявшееся правило).
- Алиас `@/*` указывает на `src/*` и в client, и в server.

## Verification Notes

- `server` lint запускается с `--fix` и **меняет файлы** (`server/package.json`).
- В репозитории сейчас нет `*.spec.ts` и нет `server/test/`; `npm test` на сервере может вернуть, что тесты не найдены.

## Known Quirk (Do Not “Fix” Accidentally)

- В `server/src/shared/config/db/index.ts` поле `name` берется из `process.env.DB_PASSWORD` (а не `DB_NAME`). Это текущее поведение проекта; менять только по явному запросу.
