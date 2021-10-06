<div align="center">

![Logo](https://github.com/alvis/presetter/raw/master/assets/logo.svg)

🏄🏻 _A collection of opinionated configurations for a Gatsby project in typescript for presetter_

•   [Quick Start](#quick-start)   •   [Project Structure](#project-structure)   •   [Customisation](#customisation)   •   [Scripts](#script-template-summary)   •

[![build](https://img.shields.io/github/workflow/status/alvis/presetter/code%20test?style=flat-square)](https://github.com/alvis/presetter/actions)
[![maintainability](https://img.shields.io/codeclimate/maintainability/alvis/presetter?style=flat-square)](https://codeclimate.com/github/alvis/presetter/maintainability)
[![coverage](https://img.shields.io/codeclimate/coverage/alvis/presetter?style=flat-square)](https://codeclimate.com/github/alvis/presetter/test_coverage)
[![security](https://img.shields.io/snyk/vulnerabilities/github/alvis/presetter/packages/preset-web/package.json.svg?style=flat-square)](https://snyk.io/test/github/alvis/presetter?targetFile=packages/preset-web/package.json&style=flat-square)
[![dependencies](https://img.shields.io/david/alvis/presetter?path=packages/preset-web&style=flat-square)](https://david-dm.org/alvis/presetter?path=packages/preset-web)
[![license](https://img.shields.io/github/license/alvis/presetter.svg?style=flat-square)](https://github.com/alvis/presetter/blob/master/LICENSE)

</div>

## Features

**@alvis/preset-gatsby** is an opinionated preset for you to setup a Gatsby project in a fraction of time you usually take via [**presetter**](https://github.com/alvis/presetter). It includes all the goodies from [`presetter-preset-strict`](https://github.com/alvis/presetter/tree/master/packages/preset-strict), [`presetter-preset-web`](https://github.com/alvis/presetter/tree/master/packages/preset-web), [`presetter-preset-react`](https://github.com/alvis/presetter/tree/master/packages/preset-react) and all essential Gatsby plugins below:

**Essential**

- 👥 Babel
- 🚿 ESLint
- 🐶 Husky
- 🧪 Jest
- 💅 Prettier
- 📤 Standard Version
- 💯 Typescript

**Web**

- 🕸️ GraphQL 15
- 💄 PostCSS 8
- 💨 TailwindCSS 2

**React**

- ✨ TSX support
- 🧪 @testing-library/react
- 📝 Recommended rules from eslint-plugin-react

**Gatsby**

- `gatsby-link`
- `gatsby-plugin-graphql-codegen`
- ~~`gatsby-plugin-image`~~ NOTE: gatsby-plugin-image is not an ordinary plugin but a mix of plugin and react components. Install it as a dependency of your project instead.
- `gatsby-plugin-manifest`
- `gatsby-plugin-mdx`
- `gatsby-plugin-postcss`
- `gatsby-plugin-react-helmet`
- `gatsby-plugin-sharp`
- `gatsby-react-router-scroll`
- `gatsby-source-filesystem`
- `gatsby-transformer-sharp`
- `webpack`
- `webpack-bundle-analyzer`

## Quick Start

[**FULL DOCUMENTATION IS AVAILABLE HERE**](https://github.com/alvis/presetter/blob/master/README.md)

1. Bootstrap your project with `@alvis/preset-gatsby`

```shell
npx presetter use github:alvis/preset-gatsby
```

That's. One command and you're set.

2. Develop and run life cycle scripts provided by the preset

At this point, all development packages specified in the preset are installed,
and now you can try to run some example life cycle scripts (e.g. run prepare).

## Project Structure

After installation, your project file structure should resemble the following or with more configuration files if you also installed other presets.

Implement your business logic under `source` and prepare tests under `spec`.

**TIPS** You can always change the source directory to other (e.g. src) by setting the `source` variable in `.presetterrc.json`. See the [customisation](https://github.com/alvis/presetter/blob/master/packages/preset-essentials#customisation) section below for more details.

```
(root)
 ├─ .babelrc
 ├─ .eslintrc.json
 ├─ .git
 ├─ .husky
 ├─ .jestrc.json
 ├─ .lintstagedrc.json
 ├─ .npmignore
 ├─ .prettierrc.json
 ├─ .preseterrc.json
 ├─ node_modules
 ├─ source
 │   ├─ <folders>
 │   ├─ index.ts
 │   ├─ (auxiliary).ts
 ├─ spec
 │   ├─ *.spec.ts
 ├─ types
 │   ├─ image.d.ts
 │   ├─ style.d.ts
 │   ├─ (auxiliary).d.ts
 ├─ package.json
 ├─ tsconfig.json
 └─ tsconfig.build.json
```

## Customisation

By default, this preset exports a handy configuration for a Gatsby project.
But you can further customise (either extending or replacing) the configuration by specifying the change in the config file (`.presetterrc` or `.presetterrc.json`).

These settings are available in the `config` field in the config file. For directories, the setting is specified in the `variable` field.

The structure of `.presetterrc` should follow the interface below:

```ts
interface PresetterRC {
  /** name of the preset e.g. presetter-preset-essentials */
  name: string | string[];
  /** additional configuration passed to the preset for generating the configuration files */
  config?: {
    //  ┌─ configuration for other tools via other presets (e.g. presetter-preset-rollup)
    // ...

    /** configuration to be merged with .babelrc */
    babel?: Record<string, unknown>;
    /** configuration to be merged with .eslintrc */
    eslint?: Record<string, unknown>;
    /** configuration to be merged with .jestrc */
    jest?: Record<string, unknown>;
    /** configuration to be merged with .lintstagedrc */
    lintstaged?: Record<string, unknown>;
    /** patterns to be added to .npmignore */
    npmignore?: string[];
    /** configuration to be merged with .presetterrc */
    prettier?: Record<string, unknown>;
    /** configuration to be merged with tsconfig.json */
    tsconfig?: Record<string, unknown>;
    /** a list of config files not to be created */
    ignores?: string[];
  };
  /** relative path to root directories for different file types */
  variable?: {
    /** the directory containing the whole repository (default: .) */
    root?: string;
    /** the directory containing all source code (default: source) */
    source?: string;
    /** the directory containing all typing files (default: types) */
    types?: string;
    /** the directory containing all output tile (default: source) */
    output?: string;
    /** the directory containing all test files (default: spec) */
    test?: string;
  };
}
```

## Script Template Summary

- **`run build`**: Build a Gatsby site
- **`run clean`**: Clean up any previously built
- **`run develop -- <file path>`**: Create a local development server for site preview
- **`run test`**: Run all tests
- **`run watch`**: Rerun all tests whenever the source has change
- **`run coverage`**: Run all test with coverage report
- **`run release`**: Bump the version and automatically generate a change log
- **`run release -- --prerelease <tag>`**: Release with a prerelease tag
