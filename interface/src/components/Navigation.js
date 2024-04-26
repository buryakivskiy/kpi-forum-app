import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { SignOut } from '../store/modules/auth/actions/authAction';
import Default from '../Assets/default.png'
import Logo from '../Assets/kpi-big-logo.png'
import './Navigation.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false)

  const currentState = useSelector((state) => state);
  
  const { isAuthenticated, currentUser } = currentState.Auth;

  const dispatch = useDispatch()

  const logoutUser  = () => dispatch(SignOut());



  let imagePreview = null;
  if(currentUser && currentUser.avatar_path){
    imagePreview = (<img className="img_style_nav" src={currentUser.avatar_path} alt="profile 1"/>);
  } else {
    imagePreview = (<img className="img_style_nav" src={Default} alt="profile 2"/>);
  }

  const logout = (e) => {
    e.preventDefault()
    logoutUser()
  }

  const userProfile = isAuthenticated ?  `/profile/${currentState.Auth.currentUser.id}` : ""

  const SignedInLinks = (
              <React.Fragment>
                  <NavItem className="mt-2" style={{marginRight: "15px" }}>
                    <p style={{ color: "white" }}>Привіт, {currentUser.firstName}</p>
                  </NavItem>
                  <NavItem className="mt-2" style={{marginRight: "15px" }}>
                    <NavLink to="/createpost" style={{ color: "white" }}>Створити тему</NavLink>
                  </NavItem>
                  <NavItem className="mt-2" style={{marginRight: "15px" }}>
                    <NavLink to="/authposts" style={{ color: "white" }}>Мої теми</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {imagePreview}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <NavLink to={userProfile}>Профіль</NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link onClick={logout} to={'/login'}>Вийти</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </React.Fragment>

            )

  const SignedOutLinks = (
                <React.Fragment>
                  <NavItem style={{marginRight: "20px" }}>
                    <Link to='/login' style={{ color: "white" }}>Увійти</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/signup' style={{ color: "white" }}>Зареєструватись</Link>
                  </NavItem>
                </React.Fragment>
              )


  return (
    <div className="mb-3">
      <Navbar color="primary" light expand="md"> 
        <NavbarBrand className="mx-auto" href="/">
          <img alt={'logo'} src={Logo} width={40} height={40}/>
          <span style={{ color: "white", fontWeight: "bold", margin: 10}}>IPZE-FORUM</span>
        </NavbarBrand>
        
        <NavbarToggler onClick={() => setIsOpen(!isOpen) } /> 

        <Collapse isOpen={isOpen} navbar> 
          <Nav className="ml-auto" navbar>
            { isAuthenticated ? SignedInLinks: SignedOutLinks }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation
