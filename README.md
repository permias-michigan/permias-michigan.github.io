# PERMIAS Michigan website

Website for the Indonesian Students Association at U-M. It's plain HTML, CSS, and JavaScript, so there's no build step.

## Pages
`index.html` (home), `events.html`, `event.html` (one full page per event), and `team.html`.

## Update the content
Nearly everything is in `js/content.js`. The home and about text is in `index.html`.

**Add an upcoming event:** add an entry to `events` with a future `date`. It appears under Upcoming events, and moves to Past events automatically after that date.

```js
{
  id: "thanksgiving-2026",        // lowercase, used in the page link
  date: "2026-11-21",             // last day of the event, YYYY-MM-DD
  title: "Thanksgiving Dinner",
  dateLabel: "November 21, 2026",
  venue: "Location",
  summary: "One sentence for the event list.",
  overview: ["A paragraph for the event page."],
  highlights: [],
  signup: "https://link-to-signup",
  photos: [],
  links: []
}
```

**Add photos:** resize them to about 1600 px wide, save them in `assets/events/<event-id>/`, then list them on the event. They appear on its event page.

```js
photos: [{ src: "assets/events/icf-2026/festival-night.jpg", caption: "Festival Night" }]
```

**Update the team:** add departments and people under `departments` and `members`. Save photos in `assets/team/`. Only add people who agreed to appear publicly.

**Add a homepage photo:** set `heroPhoto` to the photo's path. Use a wide photo at least 1800 px across.

## Preview locally
Open `index.html` in a browser.

## Publish
1. Create a GitHub organization named `permias-umich`.
2. Create a public repo named exactly `permias-umich.github.io`.
3. Upload these files, including the empty `.nojekyll` file and the `assets` folders.
4. Go to **Settings > Pages**, select **Deploy from a branch**, then choose `main` and `/ (root)`.

Don't commit private information. Everything in this repo is public.
