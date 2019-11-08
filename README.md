# nav-paths

[![NPM version](https://badgen.net/npm/v/nav-paths)](https://www.npmjs.com/package/nav-paths)
[![License](https://badgen.net/npm/license/nav-paths)](https://www.npmjs.com/package/nav-paths)
[![Build status](https://badgen.net/travis/ryanez/nav-paths)](https://travis-ci.org/ryanez/nav-paths)
[![Coverage Status](https://coveralls.io/repos/github/ryanez/nav-paths/badge.svg?branch=master)](https://coveralls.io/github/ryanez/nav-paths?branch=master)

A simple utility to create Navigation paths for react-router, such way it makes easy to 
have in a single place all your application paths and to create urls to connect your 
different pages.

## Install
```
npm install nav-paths --save
```

## Usage
```js
import navigate from './navigate';
const profileId = 2;
// second parameter `followLink=false` indicates it should
// only create the link.
const profileUrl = navigate.to.ProfileDetails({ profileId }, false);
// /profiles/2

// by default `followLink=true` this will push the url into
// browser history causing immediate navigation.
navigate.to.ProfileEdit({ profileId });
// /profiles/2/edit
```

Create and expose your application paths.

```js
// file paths.js
export const Home = '/';
export const AboutUs = '/about-us';
export const Profiles = '/profiles';
export const ProfileNew = `${Profiles}/new`;
export const ProfileDetails = `${Profiles}/:profileId`;
export const ProfileEdit = `${ProfileDetails}/edit`;

export const HomeWithLanguage = `/:lang`;
export const Customer = `${HomeWithLanguage}/customer/:customerId`;
export const CustomerAddresses = `${Customer}/addresses`
export const Invoices = `${Customer}/invoices`;
export const Invoice = `${Invoices}/:invoiceId`;
export const InvoicePayments = `${Invoice}/payments`;
```

```js
// file navigate.js
import { createBrowserHistory } from 'history';
import createNavigation from 'nav-paths';
import * as Paths from 'paths';

export { Paths };
export const history = createBrowserHistory();
export default createNavigation(history, Paths);
```

## API
### createNavigation
`createNavigation(history, Paths)` Will return an object exposing the navigation utility methods.

- `to.somePath(params, followLink)`. `to` is map containg all the given `paths` as `functions` that can build URLs and navigate to them.
  ```js
  // will immeditelly navigate to home page.
  navigate.to.Home();

  const url = navigate.to.ProfileNew({}, false);
  // will return "/profiles/new" without navigation.

  const profileUrl = navigate.to.ProfileDetails({ profileId: 3 }, false);
  // will return "/profiles/3" without navigation.
  ```

- `from.somePath.to.SomePath(params, followLink)`. `from` is a map of all the given paths where each item contains a `to` property which is also a map to all the given paths. Use this method when you certainly know where you are at a given moment. eg Inside `<InvoicePayments />` component you are sure the current url on the browser will be `/:lang/customer/:customerId/invoices/:invoiceId/payments` and you want to navigate to `/:lang/customer/:customerId/addresses` without having to specify `{lang, customerId}` because they already are on the url.
  ```js
  // having on browser's url "/es-MX/customer/cust-01/invoices/INV009/payment"
  const url = navigate.from.InvoicePayments.to.CustomerAddresses({}, false);
  // -> "/es-MX/customer/cust-01/addresses"

  // you replace only one param from the URL.
  const url = navigate.from.InvoicePayments.to.InvoicePayments({ lang: 'en-us' }, false);
  // -> "/en-us/customer/cust-01/invoices/INV009/payment"
  ```
- `replace.somePath(params, followLink)`. Will replace the given params from the current browser URL.
  ```js
  // having on browser's url "/es-MX/customer/cust-01/invoices/INV009/payment"

  const url = navigate.replace.InvoicePayments({ lang: 'en-US' }, false);
  // -> "/en-US/customer/cust-01/invoices/INV009/payment"
  ```

- `isPath.somePath(url, options)`. Will test the given url with the current history location and return a boolean value.
  ```js
  // having on history pathname "/profiles/4/edit"
  const { isPath } = navigate;

  console.log(isPath.ProfileEdit("/profiles/4/edit"));
  // -> true
  console.log(isPath.ProfileEdit("/profiles/4/edit", { exact: true }));
  // -> true
  console.log(isPath.ProfileEdit("/profiles"));
  // -> true
  console.log(isPath.ProfileEdit("/profiles", { exact: true }));
  // -> false
  console.log(isPath.ProfileEdit("/profiles/new"));
  // -> false
  ```

- `isPath.somePath.exact(url)`. Will test the given url against the current history location with the option `{ exact: true }` as default.
  ```js
  // having on history pathname "/profiles/4/edit"
  const { isPath } = navigate;

  console.log(isPath.ProfileEdit.exact("/profiles/4/edit"));
  // -> true
  console.log(isPath.ProfileEdit.exact("/profiles");
  // -> false
  console.log(isPath.ProfileEdit.exact("/profiles/new"));
  // -> false
  ```
- `clearHash()`. Handy shortcut to remove the hash from the url.
  ```js
  // having on browser url "/profiles/4/edit#help"

  navigate.clearHash();

  // browser's url will be now "/profiles/4/edit"
  ```

- `isActive(url, options)`. Matches the current history.pathname against the given URL, internally uses `matchPath` from `react-router`.
  ```js
  // having on history pathname "/profiles/4/edit"
  const { isActive } = navigate;

  console.log(isActive("/profiles/4/edit"));
  // -> true
  console.log(isActive("/profiles/4/edit", { exact: true }));
  // -> true
  console.log(isActive("/profiles"));
  // -> true
  console.log(isActive("/profiles", { exact: true }));
  // -> false
  console.log(isActive("/profiles/new"));
  // -> false
  ```

- `isActive.exact(url, options)`. Matches the current `history.pathname` against the given URL, internally uses `matchPath` from `react-router` and sets options to `{ exact: true }` by default.
  ```js
  console.log(isActive.exact("/profiles/4/edit"));
  // -> true
  console.log(isActive.exact("/profiles");
  // -> false
  console.log(isActive.exact("/profiles/new"));
  // -> false
  ```