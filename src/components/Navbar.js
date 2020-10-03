import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as Navigation, Nav } from 'react-bootstrap';
import './Navbar.css'

const Navbar = () => {
  return (
    <Navigation collapseOnSelect expand="lg"
      variant="dark"
      className="navbar"
      fixed="top"
    >
      <Link
        className="navbar-brand"
        to="/">
        <span className="span1">AI</span>
        <span className="span2"> BG Remover</span>
      </Link>
      <Navigation.Toggle aria-controls="responsive-navbar-nav" />
      <Navigation.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="nav_link">
            <Link to="/">Home</Link></Nav.Link>
          <Nav.Link className="nav_link">
            <Link to="https://remove.bg">Api</Link></Nav.Link>
        </Nav>
      </Navigation.Collapse>
    </Navigation>
  )
}

export default Navbar;
