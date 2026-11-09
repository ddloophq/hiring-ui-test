# hire-test

Hiring exercise for a **frontend / UI** role.

The backend (Next.js Pages Router, Prisma/SQLite, tRPC, Inngest) is already wired. Your job is to improve the UI/UX — layout, hierarchy, interaction, and how information is shown. Data and APIs are ready to use; treat the current screens as a rough first cut.

---

## How this works

- **Timebox:** aim for **90–120 minutes**. Stop when you’d stop on a real ticket — depth beats coverage.
- **Getting started:** click **Use this template → Create a new repository** on GitHub and set the new repository to **Private**. Please don't fork this repository or open a pull request against it.
- **Deliverable:** your changes in your private repository, plus a short note (`NOTES.md`) on what you did and why. When you're done, invite the reviewer as a collaborator (**Settings → Collaborators → Add people**).
- We’ll walk through the work together afterward; be ready to explain decisions.

---

## Setup & run

Requires [Bun](https://bun.sh).

```bash
cp .env.example .env
bun install
bun run db:push
bun run db:seed
bun run dev:all
```

Open [http://localhost:3000](http://localhost:3000).

`dev:all` runs two processes: the Next.js app and the [Inngest](https://www.inngest.com) dev server, which handles the background job that completes extract orders. Without the Inngest dev server, ordering an extract fails. Its dashboard, at [http://localhost:8288](http://localhost:8288), lists events and function runs. To use separate terminals, run `bun run dev` and `bun run dev:inngest` instead.

| Command                           | What it does                                   |
| --------------------------------- | ---------------------------------------------- |
| `bun run dev:all`                 | Next.js + Inngest dev servers together         |
| `bun run dev`                     | Next.js dev server only                        |
| `bun run dev:inngest`             | Inngest dev server only                        |
| `bun run db:seed`                 | Reset demo project (Thames Digital + Meridian) |
| `bun run db:reset`                | Wipe DB, push schema, re-seed                  |
| `bun run db:studio`               | Prisma Studio (inspect data)                   |
| `bun run lint` / `bun run format` | Biome                                          |
| `bun run typecheck`               | TypeScript                                     |

No auth. Local-only.

---

## What the app does

1. **Projects** — create and open projects
2. **Companies** — add companies from a fixed sample catalog (4 companies)
3. **Extracts** — order a company extract; it stays `PENDING` for ~10s while a background job simulates the registry lookup, then becomes `READY` with snapshot data
4. **Versions** — each later order for the same company uses a slightly different snapshot (shareholders / share classes change over time)
5. **Compare** — pick two ready extracts and view them side by side

Sample catalog + extract snapshots live in `src/server/sample-data/companies.ts`. Prefer using existing tRPC procedures over inventing new APIs unless you truly need something new. Feel free to add new APIs if it would be better to compute some data on the backend.

---

## Suggested starting point

Start with these two — they exercise the most interesting UI problems in this app:

1. **Pending order UX** — after you click “Order extract”, the order stays `PENDING` for ~10s before becoming `READY`. Make that wait feel clear and intentional.
2. **Compare experience** — the compare page is two bare selects + two columns. Improve how people pick versions and how differences between extracts are shown (layout, highlight what changed, optional charts).

The seed project includes two companies:

- **Thames Digital Solutions PLC** — your main playground. It has the richest extract history (new share classes, big ownership swings, a founder nearly exiting). Order extracts **v1 → v2 → v3** so the story shows up in compare.
- **Meridian Health Technologies Ltd** — a real-world-sized cap table: 30–60 shareholders across up to six share classes, people holding several classes, long names, and holdings from 12 shares to millions. Whatever you build should still work here.

Highland Forge Ltd and Belfast Marine Components Ltd are quieter contrasts (and Highland is part of the stretch below).

---

## Optional improvement tasks

None of these are required. After the starting point (or instead, if you prefer), pick what interests you. Go deep on a few rather than skimming many, and be ready to explain trade-offs.

### Cross-company link (strong stretch)

On Thames extracts **v2+**, **Highland Forge Ltd** appears as a shareholder. It is also a company in the sample catalog (`companyNumber` is set on that shareholder row in the sample data).

How would you **identify** that link in the UI, and let someone **add Highland to the project and order an extract in one go** — without sending them on a scavenger hunt through the project “add company” form?

### Information design

- **Ownership summary table** — for a ready extract, show who owns what (shareholder × class, totals, % of class / overall)
- **Share-class structure view** — clearer than a plain list (rights, voting, nominal value)
- **Diff on compare** — highlight what changed between two extracts (added/removed shareholders, share count deltas, new share classes)
- **Project overview** — denser project page: company count, extract counts, last ordered, pending orders

### Charts & visualisations

- **Ownership pie / bar chart** — distribution of shares for an extract (by shareholder or by class)
- **Ownership over time** — after several extracts, chart how a shareholder’s stake (or class totals) moved across versions
- **Compare charts** — same chart side by side, or an overlay/delta view for two versions

### Interaction & polish

- **Empty & error states** — no projects, no companies, fewer than two extracts to compare, failed requests
- **Compare picker** — better than two bare `<select>`s (e.g. version chips, dates, “latest vs previous”)
- **Navigation & hierarchy** — breadcrumbs, clearer page titles, less “list of links” feel
- **Responsive layout** — usable on laptop and narrower screens; compare especially
- **Design system lite** — consistent type scale, spacing, colour; don’t need a full component library

### Stretch (only if you have time)

- Export / print-friendly extract view
- Filter or search companies within a project
- Light animation where it clarifies state (e.g. pending → ready), not decoration for its own sake

---

## Constraints

- Keep using **tRPC** for data (pages already have queries/mutations set up)
- **Tailwind** is available; Biome for lint/format
- **Add whatever you need** — chart libraries, UI kits, animation libs, icons, etc. are all fine
- Backend changes are allowed if they unblock a UI idea — keep them small and justified
- We’re evaluating **UI craft and product sense**, not backend architecture

## AI tools

**Use as much AI as you want** — Cursor, Copilot, ChatGPT, Claude, etc. That’s expected. We care about the quality of the result and how you explain your decisions, not whether you typed every line by hand.

Good luck.
