import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { User } from '../context/use-user';
import { ModalActive } from '../context/use-modal';
import clock from '../images/clock.png';

const showDropdown = (handleLoginClick, handleRegistrationClick) => {
  return (
    <>
      <NavDropdown title="Особистий кабінет" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#"  className="nav__item-name" onClick={handleLoginClick}>Login</NavDropdown.Item>
        <NavDropdown.Item href="#"  className="nav__item-name" onClick={handleRegistrationClick}>Register</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

const showUserName = (userName, handleLogout) => {
  return (
    <>
      <Nav.Link  className="btn btn-light logout" onClick={handleLogout}>Logout</Nav.Link>
      <Nav.Link className='user-name__header'>{userName}</Nav.Link>
    </>
  );
};

export default function Header() {
  const { userName, setUserName } = useContext(User);

  const { setModalActive, setShowLoginForm, setShowRegistrationForm } = useContext(ModalActive);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
    setModalActive(true)
  };

  const handleRegistrationClick = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
    setModalActive(true)
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    setUserName('');
    navigate('/');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='navbar'>
      <img
          src={clock}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="clock"
      />
      <Navbar.Brand href="#/" style={{border: "0px"}} >
        <span className='brand__name'>REMINDER</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#/" className="nav__item-name">Home</Nav.Link>
          <Nav.Link href="#/about" className="nav__item-name">About</Nav.Link>
          <Nav.Link href="#/contacts" className="nav__item-name">Contacts</Nav.Link>
          <Nav.Link href="#/tasks"  className="nav__item-name">Tasks</Nav.Link>
        </Nav>
        <Nav>
          {
            userName === ''
            ? showDropdown(handleLoginClick, handleRegistrationClick)
            : showUserName(userName, handleLogout)
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


