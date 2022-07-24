import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from '../../utils/firebase/firebase.utils.js'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles.jsx';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { showDropdown } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/' className="logo-container">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop' className="nav-link">
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' className="nav-link" onClick={signOutUser}>
                Sign Out
              </NavLink>
            ) : ( 
              <NavLink to='/auth' className="nav-link">
                Sign In
              </NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
      {
        showDropdown && <CartDropdown />
      }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;