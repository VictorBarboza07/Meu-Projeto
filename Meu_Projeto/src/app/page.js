"use client";

import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function HomePage() {
  const Modelos = JSON.parse(localStorage.getItem("Modelos")) || [];
  const Clientes = JSON.parse(localStorage.getItem("Clientes")) || [];
  const Fornecedores = JSON.parse(localStorage.getItem("Fornecedores")) || [];
  const Entregas = JSON.parse(localStorage.getItem("Entregas")) || [];
  const Pedidos = JSON.parse(localStorage.getItem("Pedidos")) || [];

  const lista = [
    {
      nome: "Modelos",
      imagem:
        "https://i0.wp.com/www.perunning.com.br/wp-content/uploads/2023/03/tenis-de-corrida-varios-modelos.jpg?fit=1000%2C669&ssl=1",
      quantidade: Modelos.length,
      link: "/Modelos",
    },
    {
      nome: "Clientes",
      imagem:
        "https://www.salesforce.com/br/blog/wp-content/uploads/sites/6/2023/06/cinco-Dicas-para-fidelizar-clientes-com-CRM.jpg?w=768&h=503",
      quantidade: Clientes.length,
      link: "/Clientes",
    },
    {
      nome: "Fornecedores",
      imagem:
        "https://ibid.com.br/blog/wp-content/uploads/2015/03/Gestione-Collaborazione-Complessit%C3%A0-Imc-1024x610.jpg",
      quantidade: Fornecedores.length,
      link: "/Fornecedores",
    },
    {
      nome: "Entregas",
      imagem:
        "https://www.frenet.com.br/wp-content/uploads/2022/01/motoboy-conectado-na-sua-loja-virtual.png",
      quantidade: Entregas.length,
      link: "/Entregas",
    },
    {
      nome: "Pedidos",
      imagem:
        "https://www.pedidook.com.br/images/icon/geral/goals-pana.png?id=2ea8532d81d201a22530",
      quantidade: Pedidos.length,
      link: "/Pedidos",
    },
  ];

  return (
    <Pagina titulo={"Royal Shoes"}>
      <Row md={4}>
        {lista.map((item) => (
          <Col className="py-2">
            <Card style={{ height: "100%" }}>
              <Card.Img src={item.imagem} style={{ height: "100%" }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className="text-end">
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}