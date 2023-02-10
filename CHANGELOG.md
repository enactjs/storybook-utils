## Unreleased

* Updated `babel.js` to use `babel-preset-enact` module that holds the babel config for Enact.

## 5.0.2 (December 16, 2022)

* Fixed not showing controls of some stories without `storyStoreV7` option.

## 5.0.1 (November 3, 2022)

* Added `Primary`, `Stories`, and `Title` to the docs addon exports for customizing the docs page.
* Fixed not loading stories without `storyStoreV7` option by making `cjs` file not be treated as an asset or resource.
* Replaced deprecated `register` with `manager` for addons.
* Fixed `showName` warning by changing `title` property to `name` value in the controls addon.

## 5.0.0 (September 16, 2022)

* Migrated to storybook 6.5 and webpack 5.
* Updated `eslint` related dependencies.

## 4.2.0 (June 7, 2022)

* Added `color` type control.

## 4.1.1 (February 17, 2022)

* Added `@babel/plugin-proposal-class-properties` plugin to fix sampler build.

## 4.1.0 (November 9, 2021)

* Replaced `@storybook/addon-knobs` with `@storybook/addon-controls` for the local knobs and `@storybook/addon-toolbars` for the global knobs.

## 4.0.5 (October 12, 2021)

* Removed `sanitize.css` dependency.
* Updated `postcss` related dependencies including `postcss-normalize` 10.0.1.

## 4.0.4 (September 28, 2021)

* Added `sanitize.css` module for supporting `postcss-normalize`.

## 4.0.3 (September 10, 2021)

* Added `export-namespace-from` Babel plugin.

## 4.0.2 (August 17, 2021)

* Removed some Babel plugins which were already included in the recent `@babel/preset-env`.

## 4.0.1 (June 30, 2021)

* Changed to the storybook released module version to `6.2.9` to avoid build error temporarily.

## 4.0.0 (March 16, 2021)

* Migrate storybook from 5.3 to 6.1.
* Replace `@storybook/addon-info` with `@storybook/addon-docs`.

## 3.0.0 (February 16, 2021)

* Updated dependencies including React17.

## 2.0.0 (August 3, 2020)

* Updated codebase to latest Enact linting standards.
* Updates dependencies for latest releases.
* Added `postcss-normalize` support.
* Adds `optional-chaining` , `nullish-coalescing-operator`, and `numeric-separator` Babel plugins.
* Excludes `transform-typeof-symbol` Babel transform.

## 1.0.2 (February 19, 2020)

* Resolve `ilib` dependency direct from storybook project resolution.

## 1.0.1 (January 23, 2020)

* Update module resolve order such that relative node_modules take priority.

## 1.0.0 (January 21, 2020)

* Initial code abstraction/migration from `enact-sampler`
* Updated codebase for latest release of Storybook
