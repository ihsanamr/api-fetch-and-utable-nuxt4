# API Fetch & UTable Practice (Nuxt 4)

A small practice project to learn how to fetch API data in Nuxt 4 and display it with Nuxt UI's `UTable`.

## Overview

- **Server API route** (`server/api/users.get.ts`) proxies requests to [DummyJSON](https://dummyjson.com/users), maps the response to a simpler shape, and returns `{ users, total }`.
- **User page** (`app/pages/index.vue`) fetches `/api/users` with `useFetch`, showing a searchable, sortable, and paginated table.
- **Search** is debounced (400ms) and resets the page to 1.
- **Sorting** is done on the server (`manualSorting: true`), so the table only sends the sort state to the API.
- **Pagination** uses `UPagination` with 10 items per page.
- **URL sync** keeps `q`, `page`, `sort`, and `order` in the query string, so the table state can be shared or reloaded.
- **Types** for the API response and mapped user live in `shared/types/user.ts`.
- **`sortableColumn()`** helper (`app/utils/sortableColumn.ts`) builds sortable table columns with sort icons.

## Tech Stack

- Nuxt 4
- Nuxt UI 4
- Tailwind CSS 4
- DummyJSON (external API)

## Setup

Install dependencies:

```bash
npm install
```

## Development Server

Start the dev server on `http://localhost:3000`:

```bash
npm run dev
```

## Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```
