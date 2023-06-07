// import { useContext } from 'react';
// import { User } from '../context/use-user'; 

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import clock from '../images/clock.png'

export default function Header() {
  // const { userName } = useContext(User);
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='navbar'>
      <Navbar.Brand href="/">
        <img
          src={clock}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="clock"
        />
        <span className='brand__name'>REMINDER</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#"  className="nav__item-name">About</Nav.Link>
          <Nav.Link href="#"  className="nav__item-name">Contacts</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Особистий кабінет" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#"  className="nav__item-name">Login</NavDropdown.Item>
            <NavDropdown.Item href="#"  className="nav__item-name">Register</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

}


