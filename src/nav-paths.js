import { generatePath, matchPath } from 'react-router';

export default createNavigate;

function createNavigate(history, PATHS) {
  const PATHS_KEYS = Object.keys(PATHS);

  function navigate(path = '/', params = {}, followLink = true) {
    const url = generatePath(path, params);

    if (followLink) {
      history.push(url);
    }

    return url;
  }

  function navigateFromTo(fromPath, toPath, params, followLink) {
    const { pathname } = history.location;
    const { params: fromParams = {} } = matchPath(pathname, fromPath);
    return navigate(toPath, { ...fromParams, ...params }, followLink);
  }

  function replaceParams(path, params, ...args) {
    const { pathname } = history.location;
    const match = matchPath(pathname, { path }) || { params: {} };
    return navigate(path, {...match.params, ...params }, ...args);
  }

  navigate.to = PATHS_KEYS.reduce(
    (memo, key) => {
      const path = PATHS[key];
      memo[key] = (...params) => navigate(path, ...params);
      return memo;
    },
    (...params) => navigate(...params)
  );

  navigate.from = PATHS_KEYS.reduce((memoFrom, keyFrom) => {
    const pathFrom = PATHS[keyFrom];
    const to = PATHS_KEYS.reduce((memoTo, keyTo) => {
      const pathTo = PATHS[keyTo];
      memoTo[keyTo] = (...params) => navigateFromTo(pathFrom, pathTo, ...params);
      return memoTo;
    }, {});
    memoFrom[keyFrom] = { to };
    return memoFrom;
  }, {});

  navigate.replace = PATHS_KEYS.reduce((memo, key) => {
    const path = PATHS[key];
    memo[key] = (...args) => replaceParams(path, ...args);
    return memo;
  }, {});

  navigate.isPath = PATHS_KEYS.reduce((memo, key) => {
    const path = PATHS[key];
    memo[key] = (pathname, options = {}) => matchPath(pathname, { path, ...options }) !== null;
    memo[key].exact = (pathname, options = {}) => memo[key](pathname, { exact: true, ...options});
    return memo;
  }, {});

  navigate.clearHash = () => {
    history.location.hash = null;
    history.push(history.location);
  };

  navigate.isActive = (path, options = {}) => {
    const { pathname } = history.location;
    const result  = path && matchPath(pathname, { path, ...options });
    return !!result;
  }

  navigate.isActive.exact = (path, options = {}) => navigate.isActive(path, { exact: true, ...options });

  return navigate;
}