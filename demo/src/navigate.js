import { createBrowserHistory } from 'history';
import createNavigation from 'nav-paths';
import * as Paths from 'paths';

export { Paths };
export const history = createBrowserHistory();
export default createNavigation(history, Paths);
