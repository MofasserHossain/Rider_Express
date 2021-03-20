import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import { UserContext } from '../../App';
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(loggedInUser);
  return (
    <Navbar variant="light" expand="md" className="menu">
      <Container>
        <Navbar.Brand className="logo">
          <Link to="/">Rider Express</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto menu-item">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/destination">Destination</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/blog">Blog</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact">Contact</Link>
            </Nav.Link>
            {loggedInUser.email ? (
              <Nav.Link>
                <span className="color">{loggedInUser.displayName}</span>
              </Nav.Link>
            ) : (
              <Button className="button">
                <Link to="/login">Log In</Link>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
