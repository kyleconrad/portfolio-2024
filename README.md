Astro build of Kyle Conrad's 2024 portfolio redesign/rebuild using Contentful as the content management system.

---

## Local Setup
Running local set up will install all necessary bundles and dependencies. [Install nvm](https://github.com/nvm-sh/nvm) to ensure you are using the correct node version.
    
    $ cd portfolio-2024
    $ nvm install
    $ npm install

---

## Development
Running development will run a local server with Astro and open the browser to the homepage. It watches all Astro files and Sass then compiles and reloads accordingly. All Contentful space and token information is stored in a secret `.env` file.

	$ cd portfolio-2024
	$ npm run dev

---

## Building
Building will compile and minify all Sass/CSS, compress HTML & JS, and gzip all public content while converting all Astro files and Contentful content into a static site. This will result with the entire site ready in the correct directories for deployment.

    $ cd portfolio-2024
    $ npm run build

---

## Serving & Testing
To test the static site prior to deployment (and for other content audits), the site must be built and then served in its static form. First run the build task, then run preview to open the browser to the homepage with the site built.

    $ cd portfolio-2024
    $ npm run build
    $ npm run preview

---

## Deploying
Deploying pushes the site to Amazon S3 and invalidates all existing Cloudfront caches, ensuring visitors get the most up to date versions of the site and content. You must have the [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and credentials set up. All S3 bucket and Cloudfront distribution information is stored in a secret `.env` file.

    $ cd portfolio-2024
    $ npm run build
    $ npm run deploy

---

## Updating
Updating will check all packages for updates, allow you to select which ones should be updated, update the corresponding package files with the new version, and download and install the selected updates.

    $ cd portfolio-2024
    $ npm install -g npm-check
    $ npm run update