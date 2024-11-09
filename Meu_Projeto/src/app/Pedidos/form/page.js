"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function CadastroPedidos() {
  const [pedidos, setPedidos] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    modelos: "",
    clientes: "",
    periodo: "",
    matricula: "",
    foto: "",
  });

  const [modelos, setModelos] = useState([]);
  const [clientes, setClientes] = useState([]);

  const router = useRouter();

  // Carregar Modelos do localStorage
  useEffect(() => {
    const modelosLocalStorage = JSON.parse(localStorage.getItem("Modelos")) || [];
    setModelos(modelosLocalStorage);
  }, []);

  // Filtrar Clientes quando a Modelos for selecionada
  useEffect(() => {
    if (pedidos.modelos) {
      const clientesLocalStorage = JSON.parse(localStorage.getItem("Clientes")) || [];
      const clientesFiltrados = clientesLocalStorage.filter(
        (c) => c.modelosId === pedidos.modelos
      );
      setClientes(clientesFiltrados);
    } else {
      setClientes([]);
    }
  }, [pedidos.modelos]);

  // Manipular mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedidos({ ...pedidos, [name]: value });
  };

  // Manipular o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const pedidosLocalStorage = JSON.parse(localStorage.getItem("Pedidos")) || [];
    const novoPedido = { ...pedidos, id: Date.now() };
    pedidosLocalStorage.push(novoPedido);
    localStorage.setItem("Pedidos", JSON.stringify(pedidosLocalStorage));
    alert("Pedido cadastrado com sucesso!");
    router.push("/pedidos"); // Ajustado para refletir o alias da pasta 'app'
  };

  return (
    <Pagina titulo={"Cadastro de Pedidos"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={pedidos.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSobrenome">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            name="sobrenome"
            value={pedidos.sobrenome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={pedidos.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDataNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="dataNascimento"
            value={pedidos.dataNascimento}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="tel"
            name="telefone"
            value={pedidos.telefone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formModelos">
          <Form.Label>Modelos</Form.Label>
          <Form.Control
            as="select"
            name="modelos"
            value={pedidos.modelos}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um Modelo</option>
            {modelos.map((modelo) => (
              <option key={modelo.id} value={modelo.id}>
                {modelo.nome}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formClientes">
          <Form.Label>Clientes</Form.Label>
          <Form.Control
            as="select"
            name="clientes"
            value={pedidos.clientes}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formPeriodo">
          <Form.Label>Período</Form.Label>
          <Form.Control
            type="text"
            name="periodo"
            value={pedidos.periodo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formMatricula">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control
            type="text"
            name="matricula"
            value={pedidos.matricula}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formFoto">
          <Form.Label>Foto</Form.Label>
          <Form.Control
            type="text"
            name="foto"
            value={pedidos.foto}
            onChange={handleChange}
            placeholder="URL da foto"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar Pedido
        </Button>
      </Form>
    </Pagina>
  );
}
