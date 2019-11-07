# nav-paths
A simple utility to create Navigation paths for react-router, such way it makes easy to 
have in a single place all your application paths and to create urls to connect your 
different pages.

## Install
```
npm install nav-paths --save
```

## Useage
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
### craeteNavigation
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

- `from.somePath.toSomePath(params, followLink)`. `from` is a map of all the given paths where each item contains a `to` property which is also a map to all the given paths. Use this method when you certainly know where you are at a given moment. eg Inside `<ProfileDetails />` component you are sure the current url on the browser will be `/profiles/:profileId/details` and you want yo build a new URL and reuse the `:profileId`.
  ```js
  // havig on browser "/profiles/5"
  const url = navigate.from.ProfileDetails.to.ProfileEdit({}, false);
  // will return "/profiles/5/edit" without navigation.

  // having on browser "/mexico/en-us/company/xyz/products/add"
  // the path would be "/:country/:language/company/:companyId/products/addd"
  // and you want to switch language.
  navigate.from.CompanyProducts.to.CompanyProducts({ language: 'es-mx' });
  ```