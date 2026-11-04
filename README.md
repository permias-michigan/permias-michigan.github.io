# PERMIAS Michigan website

Website for the Indonesian Students Association at U-M. It's plain HTML, CSS, and JavaScript, so there's no build step.

## Update the content
- **Team, members, earlier events, and contact links:** edit `js/content.js`.
- **ICF and the About text:** edit `index.html`.
- **Photos:** add them to `assets/`, then set `photo: "assets/name.jpg"` in `js/content.js`. Only add people who agreed to appear publicly.

## Preview locally
Open `index.html` in a browser.

## Publish
1. Create a GitHub organization named `permias-umich`.
2. Create a public repo named exactly `permias-umich.github.io`.
3. Upload these files, including the empty `.nojekyll` file.
4. Go to **Settings > Pages**, select **Deploy from a branch**, then choose `main` and `/ (root)`.

Don't commit private information. Everything in this repo is public.
