import { useContext } from 'react';
import { User } from '../context/use-user';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
  const { userName } = useContext(User);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">My Website</Navbar.Brand>{/* тут вставити якийсь логотип чи назву */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <div className='user-name__header'>{userName}</div>
    </Navbar>
  );
  }