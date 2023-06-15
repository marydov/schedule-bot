import { User } from '../context/use-user'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import clock from '../images/clock.png'
import { useContext } from 'react';
import { ModalActive } from '../context/use-modal';
import { useNavigate } from 'react-router-dom';

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
      <button className="btn btn-light logout" onClick={handleLogout}>
        Logout
      </button>
      <div className='user-name__header'>{userName}</div>
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

  const handleHomePageClick = () => {
    navigate('/');
  }

  const handleTaskPageClick = () => {
    navigate('tasks');
  }

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
          <Nav.Link href="#"  className="nav__item-name" onClick={handleHomePageClick}>Home</Nav.Link>
          <Nav.Link href="#"  className="nav__item-name" onClick={handleTaskPageClick}>Tasks</Nav.Link>
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


