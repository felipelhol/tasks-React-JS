import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="#home">sistema de cadastro</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Item as={Link} className="nav-link" to="/">Início</Nav.Item>
      <Nav.Item as={Link} className="nav-link" to="/tarefas">Tarefas</Nav.Item>
            
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Busca" className="mr-sm-2" />
      <Button variant="outline-success">Busca</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
  );
}

export default Header;