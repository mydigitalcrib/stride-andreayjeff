# Andrea & Jeff: Weekly Trend Report

Andrea & Jeff's (The Chus) own weekly trend report site. Every issue is one text file in `src/content/issues/`; the
design, layout, animations, filters, saved ideas, copy buttons and Save as PDF are shared, so a new issue never needs
design or code changes.

- **Where it lives:** `github.com/mydigitalcrib/stride-andreayjeff`. Every new Andrea & Jeff issue
  goes here, always.
- **The link to share:** https://mydigitalcrib.github.io/stride-andreayjeff/ (GitHub Pages). Every push
  to `main` publishes the site again within a few minutes (`.github/workflows/publish.yml`).
- **Made from:** the Stride weekly report template, so it has the same design as every Stride weekly report.
- Who it's for ("Made for Andrea & Jeff (The Chus)") is set once in `src/content/settings.yaml`, so new issues
  don't need an `audience:` line.

## Open it

Double-click **`Start Andrea & Jeff Site.bat`** (in the folder above this one). Your browser opens at
http://localhost:4440. Keep the black window open while you look; close it when you're done.

Or, in a terminal in this folder:

```bash
npm install      # first time only
npm run dev      # preview at http://localhost:4440
```

## Add a new issue

1. Start it. In a terminal in this folder, with the topic in quotes:

   ```bash
   npm run new-issue -- "Fitness & Wellness"
   ```

   This makes `src/content/issues/002-fitness-wellness.yaml` with the next number and the week after the last issue.
   To pick the dates yourself, add `--start 2026-11-13`.

2. Fill it in. Replace every `[[ ... ]]` in that file. Issue 001
   (`src/content/issues/001-andrea-jeff.yaml`) is a finished example. Or ask Claude:
   *"Fill in issue 002 from this research"* and attach the week's PDF.

3. Look at it at http://localhost:4440/issues/002-fitness-wellness/ while `npm run dev` is running. New issues start
   as **drafts**: you can preview them, but they're not in the finished site yet.

4. Publish it. In the file, set `draft: false`, and `figuresChecked: true` once every number has been checked against
   the research. Then:

   ```bash
   npm run build    # the finished site, in dist/
   npm test         # checks nothing else changed
   npm run lock-issue -- 002-fitness-wellness
   ```

   Then commit and push to GitHub. The link updates by itself a few minutes later.

   `lock-issue` saves a copy of the issue as it looks now, so a later change can't alter it by accident: `npm test`
   will warn if it does.

The new issue appears on the home page as this week's issue, and every earlier one moves to **Past issues** and the
archive by itself. Each issue keeps its own address forever (`/issues/<file name>/`), and its saved ideas are kept
separately in each reader's browser.

The build stops with a plain message if something's wrong: an issue still has `[[ ... ]]` in it, two issues share a
number, or an idea uses a filter group that doesn't exist.

## Writing an issue

- A headline is a list of lines. `*words*` in a line are set in the serif accent.
- Put text in "quotes" if it starts with a quote mark, an `@` or a `*`, or contains `: ` (a colon then a space).
- Write it for the audience, not as a report: plain words, talking to "you", short sentences. No scores, confidence
  labels, section numbers or charts. Keep the useful caution, in everyday words.
- Never invent creators, numbers, quotes or brand deals. Every figure needs a source under `originals` at the bottom,
  with the date you checked it. If there's no trending sound, say so (issue 001 does).
- The counts fill themselves in: "12 ideas" in the bar and "All 12" on the filter follow however many ideas there are.

## Use different words

The words that aren't part of an issue's content (the series name, who it's for, "Your hook", "How to film it",
"Could suit", button labels and so on) are in **`src/content/settings.yaml`**. Change a word there and it changes on
every page.

For one issue only, add a `labels:` block to its file with just the lines you want to change. For example, for an
audience that doesn't film:

```yaml
labels:
  ideas:
    shots: How to make it
    filming: Making tips
  nav:
    ideas: "{count} ideas to try"
```

Each issue also sets its own:

- `audience:` who it's for, on the cover and in the footer (leave it out for the usual line);
- `homeLine:` the line under the headline on the home page while it's the newest issue;
- `talking.nav:` the link to the audience section in the top bar, such as "What moms are saying".

## The archive

`/issues/` lists every issue, newest first, grouped by month. When there's more than one topic, buttons at the top
show one topic at a time. The home page shows this week's issue, the six before it, and a link to the archive. The
menu's **All issues** button opens the archive.

## How private it is

This repository is **public** and the site is on GitHub Pages, so anyone who finds either can read every issue,
including the files in this repository. There is no login. Treat each issue as something Andrea & Jeff and anyone they
forward the link to may read.

What still helps:

- Search engines are asked not to list or keep a copy of any page (`<meta name="robots">`).
- Clicking through to Instagram or TikTok doesn't reveal the site's address (`<meta name="referrer">`, and
  `rel="noreferrer"` on every outside link).
- No analytics, outside fonts or scripts, share preview or sitemap: no third party is told about the site.
- The pages may only load their own files (a security policy in `src/layouts/Layout.astro`).

What GitHub Pages doesn't do: it ignores `public/_headers` (the extra privacy and security headers only work on
Netlify or Cloudflare Pages), and it doesn't read `robots.txt` from a repository's folder.

To make it private later: make the repository private and publish it with Cloudflare Pages (free with a private
repository), or GitHub Pages with a paid GitHub plan.

The private copies of the original site used by the design tests (`tests/fixtures/original/`,
`tests/reference/original-build/`) are kept out of this repository on purpose. Without them those tests skip.

## Where things live

| What | Where |
| --- | --- |
| Issues, one file each (the file name is the address) | `src/content/issues/` |
| Shared words and labels | `src/content/settings.yaml` |
| Blank issue | `templates/new-issue.yaml` |
| What an issue file may contain (checked on every build) | `src/content.config.ts` |
| Home, archive and issue pages | `src/pages/index.astro`, `src/pages/issues/index.astro`, `src/pages/issues/[slug].astro` |
| One component per report section | `src/components/issue/` |
| Opening things, filters, saved ideas, download, copy, PDF | `src/scripts/issue.ts` |
| Archive topic buttons | `src/scripts/archive.ts` |
| Colors, type, spacing (copied from the Stride website's design system) | `src/styles/tokens.css`, `src/scripts/backdrop.ts` |
| Logo | `public/stride-social-logo.png` |
| Start a new issue / lock a published one | `scripts/new-issue.mjs`, `scripts/lock-issue.mjs` |
| Tests | `tests/` |

## Tests

`npm test` builds the site several ways (about a minute) and checks that:

- issue 001 comes out exactly like the original site's page: the same markup and every style rule
  (`tests/reference/original-build/` is the original build). The one difference is on purpose: the menu's
  **All issues** button opens the archive instead of the home page;
- every locked issue is unchanged;
- with more issues, the home page, archive, filters and counts are right, each issue shows only its own words, drafts
  stay out, and issue 001 still doesn't change;
- unfinished issues and repeated numbers stop the build;
- `npm run new-issue` makes the next issue correctly.

After changing code, run `npm run check`, `npm run build` and `npm test`.
