Astro build of Kyle Conrad's 2024 portfolio redesign/rebuild using Contentful as the content management system.

---

## Local Setup
Running local set up will install all necessary bundles and dependencies. [Install nvm](https://github.com/nvm-sh/nvm) to ensure you are using the correct node version.
    
    $ cd portfolio-2024
    $ nvm install
    $ npm install

---

## Development
Running development will run a local server with Astro and open the browser to the homepage. It watches all Astro files and Sass then compiles and reloads accordingly.

	$ cd portfolio-2024
	$ npm run dev

---

## Building
Building will compile and minify all Sass/CSS, compress HTML & JS, and gzip all public content while converting all Astro files and Contentful content into a static site. This will result with the entire site ready in the correct directories for deployment.

    $ cd portfolio-2024
    $ npm run build

---

## Updating
Updating will check all packages for updates, allow you to select which ones should be updated, update the corresponding package files with the new version, and download and install the selected updates.

    $ cd portfolio-2024
    $ npm install -g npm-check
    $ npm run update