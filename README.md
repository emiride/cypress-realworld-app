<p align="center">
Forked from cypress.io to demonstrate ability of Playwright on specific set of tests for interview purposes. I was given a set of tests to convert from Cypress to Playwright.
</p>

<p align="center">
  <img style='width: 70%' alt="Cypress Real World App" src="./public/img/rwa-readme-screenshot.png" />
</p>

## Getting Started

The Cypress Real-World App (RWA) is a full-stack Express/React application backed by a local JSON database ([lowdb]).

The app is bundled with [example data](./data/database.json) (`data/database.json`) that contains everything you need to start using the app and run tests out-of-the-box.

> 🚩 **Note**
>
> You can login to the app with any of the [example app users](./data/database.json#L2). The default password for all users is `s3cret`.
> Example users can be seen by running `yarn list:dev:users`.

### Prerequisites

This project requires [Node.js](https://nodejs.org/en/) to be installed on your machine. Refer to the [.node-version](./.node-version) file for the exact version.

[Yarn Classic](https://classic.yarnpkg.com/) is also required. Once you have [Node.js](https://nodejs.org/en/) installed, execute the following to install the npm module [yarn](https://www.npmjs.com/package/yarn) (Classic - version 1) globally.

```shell
npm install yarn@latest -g
```

If you have Node.js' experimental [Corepack](https://nodejs.org/dist/latest/docs/api/corepack.html) feature enabled, then you should skip the step `npm install yarn@latest -g` to install Yarn Classic globally. The RWA project is locally configured for `Corepack` to use Yarn Classic (version 1).

#### Yarn Modern

**This project is not compatible with [Yarn Modern](https://yarnpkg.com/) (version 2 and later).**

### Installation

To clone the repo to your local system and install dependencies, execute the following commands:

```shell
git clone https://github.com/cypress-io/cypress-realworld-app
cd cypress-realworld-app
yarn
```

#### Mac users with M-series chips will need to prepend `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`.

```shell
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install
```

### Run the app

```shell
yarn dev
```

> 🚩 **Note**
>
> The app will run on port `3000` (frontend) and `3001` (API backend) by default. Please make sure there are no other applications or services running on both ports.
> If you want to change the default ports, you can do so by modifying `PORT` and `VITE_BACKEND_PORT` variables in `.env` file.
> However, make sure the modified port numbers in `.env` are not committed into Git since the CI environments still expect the application to run on the default ports.

### Start Playwright tests

```shell
npx playwright test
```

**Notes**

- Playwright is installed on the root of the project and thus can be run from the root of the project. This is not always the case with other projects.
- All Playwright related files are in the `playwright` directory.
- `pages` directory contains the page objects.
- `tests` directory contains the test files.
- `components` directory contains the component objects. These can be reused in pages or called directly in tests.
- `playwright.config.ts` handles running of the app and thus there is no need to seed the database before running the tests, since seeding is done by running `yarn dev`.
- There is a bug in the app when you click on Signup link from `/signin` page. On the first click, it will fire up form validation instead of opening the Signup page. Due to this, I am performing double click on it in the test. This is not a Playwright issue, but an issue with the app itself. I would never do this in a real world, but I would flag this test and report an issue.

## Additional changes that could be made

Because I didn't have enough time for all these changes I will try to list some of them.
- I added a basic Github action to run tests, which you can check in the `.github/workflows` directory. You can see the run of this Github action [here](https://github.com/emiride/cypress-realworld-app/actions/runs/11282348710). I would wire it up with automated reporting, but for now I did it manually [here](https://reporting.emirhodzic.com/).
- I would also extract some parts outside of a test (e.g. cookie handling) and put them in a separate file like utils.ts.
- I thought I would need to add test fixtures, but seeding the database is done by running `yarn dev` and thus I didn't need to do this. At some point I would probably start adding test fixtures instead of `beforeAll beforeEach` hooks.