import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import {shopRoutes} from "@packages/shared/src/routes/shop";
import {adminRoutes} from "@packages/shared/src/routes/admin";
import {capitalize} from "@packages/shared/src/utils/formatters";

export const App = () => {

  return <div>
    <h1>{capitalize('HOST MODULE')}</h1>
    <div>
      <Link to="/">Home</Link>{' | '}
      <Link to={shopRoutes.main}>Shop Main</Link>{' | '}
      <Link to={shopRoutes.sub}>Shop Sub</Link>{' | '}
      <Link to={adminRoutes.about}>About</Link>
    </div>

    <div>
      <label htmlFor="test">Test</label>
      <input type="text" id="test" name="test" />
      <button className={classes.button}>Click!</button>
    </div>

    <Outlet />
  </div>
};