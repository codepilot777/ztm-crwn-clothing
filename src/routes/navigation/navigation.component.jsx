import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from '../../utils/firebase/firebase.utils.js'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);


  return (
    <Fragment>
      <div className="navigation">
        <Link to='/' className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to='/shop' className="nav-link">
            SHOP
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>
                Sign Out
              </span>
            ) : ( 
              <Link to='/auth' className="nav-link">
                Sign In
              </Link>
            )
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;