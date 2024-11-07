"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Modelos">Modelos</Nav.Link>
            <Nav.Link href="/Clientes">Clientes</Nav.Link>
            <Nav.Link href="/Entregas">Entregas</Nav.Link>
            <Nav.Link href="/Fornecedores">Fornecedores</Nav.Link>
            <Nav.Link href="/Pedidos">Pedidos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="bg-dark text-center text-white py-2">
        <h1>Royal Shoes</h1>
      </div>

      <Container className="mt-2">{children}</Container>
    </>
  );
}
