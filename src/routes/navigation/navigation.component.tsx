import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectShowDropdown } from '../../store/cart/cart.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const showDropdown = useSelector(selectShowDropdown);

  const signOutHandler = () => {
    dispatch(signOutStart())
  }
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
              <NavLink as='span' className="nav-link" onClick={signOutHandler}>
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