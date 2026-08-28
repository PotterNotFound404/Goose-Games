# GooseGames

GooseGames is a polished gaming storefront concept built as a full-stack web app with a custom Node server, live IGDB cover fetching, a curated storefront experience, community features, wheel rewards, checkout flow, and a Gemini-powered game assistant.

The project is designed to feel like a premium game marketplace while remaining lightweight and easy to deploy. It ships with static storefront pages, a dynamic backend, environment-based secrets, and a local-first fallback system so it still works even when external services are unavailable.

## Overview

GooseGames combines:
- a responsive storefront UI with game cards, deals, filters, and product detail pages
- a server-backed cover fetcher using IGDB
- a daily spin wheel with redeemable discount rewards
- a shopping cart and checkout flow
- a community page with Easter-egg interactions and animated effects
- a Gemini-based chat assistant with a graceful local fallback
- localized interface text for multiple languages

## Live Features

- Game catalog browsing and filtering
- Deal cards and promotional sections
- Product detail pages with edition selection and pricing
- Cart drawer and persistent cart state
- Promo code rewards and discount logic
- Community showcase with custom animations and surprise interactions
- AI assistant for game recommendations and storefront help
- Localized UI strings
- Desktop-friendly visual effects with reduced-motion safeguards

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js HTTP server
- External APIs: IGDB + Gemini
- Storage: localStorage for cart, settings, wheel state and UI preferences
- Deployment-ready: environment variables for secrets and API configuration

## Project Structure

```text
GooseGames-Frontend-main/
├── .env.example              # template variables for local/deployment setup
├── .gitignore                # ignores secrets and local install files
├── README.md                 # project documentation
├── about.html                # about page
├── account.html              # account page
├── cart.html                 # cart drawer markup
├── checkout.html             # checkout page
├── community.html            # community showcase
├── deals.html                # deals listing
├── detail.html               # product detail page
├── footer.html               # shared footer fragment
├── header.html               # shared header and search
├── index.html                # homepage
├── search.html               # search results page
├── server.js                 # main Node server + API routes
├── style.css                 # styling and visual system
├── package.json              # Node project metadata
├── cover-cache/              # cached IGDB cover data
├── js/
│   ├── cart.js               # cart logic and rendering
│   ├── chatbot.js            # chat UI and message handling
│   ├── common.js             # shared page initialization
│   ├── covers.js             # cover fetching logic
│   ├── data.js               # product catalog and metadata
│   ├── effects.js            # magnetic cursor + visual effects
│   ├── i18n.js               # localization system
│   ├── jokes.js              # quote generator / Easter egg content
│   ├── loader.js             # intro/loading behaviors
│   ├── page.js               # page-specific UI logic
│   ├── randomGame.js         # random game modal
│   ├── settings.js           # UI preferences and toggles
│   ├── ui.js                 # shared cart UI rendering
│   ├── utils.js              # helper functions
│   └── wheel.js              # daily wheel logic and reward handling
├── netlify/
│   └── functions/
│       └── cover.js          # serverless helper for cover fetching (if used by deployment)
└── potternotfound404 logo.jpg
```

## Secret Handling

This project intentionally keeps secrets out of the repository.

Create a local `.env` file in the project root with values like:

```env
IGDB_CLIENT_ID=your_igdb_client_id_here
IGDB_CLIENT_SECRET=your_igdb_client_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

Do not commit `.env` to GitHub. The repository includes `.env.example` as a safe template and `.gitignore` ignores the real secret file.

## Setup

### 1. Install dependencies

This project uses the standard Node runtime and no external package install is required for the base app, but you may still want to install dependencies if a hosting tool expects them.

```bash
npm install
```

### 2. Create your local environment file

```bash
copy .env.example .env
```

Then update the values with your own keys.

### 3. Run locally

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

## API Behavior

The server exposes two major API endpoints:

### `/api/cover`
Fetches or serves a game cover image from IGDB, with local caching to reduce repeated requests.

### `/api/chat`
Uses the Gemini API when `GEMINI_API_KEY` is configured. If no key is set, the app falls back to a local offline response generator so the UI remains functional.

## Deployment Notes

This project is designed for a Node hosting environment that supports environment variables, such as:
- Render
- Railway
- Fly.io
- other Node-capable PaaS providers

Do not expose API keys in frontend JavaScript or public static hosting.

## Gameplay / UX Notes

GooseGames is built around a warm, playful storefront identity:
- bright storefront cards and decision-making UI
- game discovery journeys and sale-driven browsing
- playful but usable checkout flow
- community content and hidden interactions
- motion-rich finishing touches without breaking accessibility

## Security and Best Practices

- use environment variables for secrets
- keep `.env` out of version control
- do not hardcode client secrets into source files
- prefer server-side API calls over browser-exposed credentials
- keep fallback logic in place so the app stays usable without external services

## License

This project is intended for educational/demo use and is not production-finance software.

## Credits

Built as a full storefront concept with interactive storefront patterns, game discovery UI, community humor, and promotional interactions.
