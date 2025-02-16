import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ logOut, currentUser }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" variant="light"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as={Link} to="/blogs" >Blogs</Nav.Link>
          <Nav.Link href="#" as={Link} to="/users" >Users</Nav.Link>
          <Nav.Link>{currentUser.name} logged in</Nav.Link>
          <Button onClick={logOut}>log out</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu