import { generatePath, matchPath } from 'react-router-dom';

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

  navigate.isPath = PATHS_KEYS.reduce((memo, key) => {
    const path = PATHS[key];
    memo[key] = (pathname, options = {}) => matchPath(pathname, { path, ...options }) !== null;
    return memo;
  }, {});

  navigate.clearHash = () => {
    history.location.hash = null;
    history.push(history.location);
  };

  navigate.isActive = path => {
    const { pathname } = history.location;
    const result  = path && matchPath(pathname, { path });
    return result;
  }

  return navigate;
}