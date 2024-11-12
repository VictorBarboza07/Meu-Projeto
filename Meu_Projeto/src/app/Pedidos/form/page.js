"use client"; 

import Pagina from "@/components/Pagina";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useRouter } from "next/navigation";

export default function CadastroPedidos() {
  const [pedidos, setPedidos] = useState({
    quantidadePacotes: "",
    status: "em_transito",  
    nomeRecebedor: "",
    cpf: "",
    cnpj: "",
  });

  const router = useRouter();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedidos({ ...pedidos, [name]: value });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const pedidosLocalStorage = JSON.parse(localStorage.getItem("Pedidos")) || [];
    const novoPedido = { ...pedidos, id: Date.now() };
    pedidosLocalStorage.push(novoPedido);
    localStorage.setItem("Pedidos", JSON.stringify(pedidosLocalStorage));
    alert("Pedido cadastrado com sucesso!");
    router.push("/pedidos"); 
  };

  return (
    <div>
      <h2>Cadastro de Pedidos</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formQuantidadePacotes">
          <Form.Label>Quantidade de Pacotes</Form.Label>
          <Form.Control
            type="text"
            name="quantidadePacotes"
            value={pedidos.quantidadePacotes}
            onChange={handleChange}
            required
            pattern="[0-9]*"
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={pedidos.status}
            onChange={handleChange}
            required
          >
            <option value="em_transito">Em Trânsito</option>
            <option value="entregue">Entregue</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formNomeRecebedor">
          <Form.Label>Nome do Recebedor</Form.Label>
          <Form.Control
            type="text"
            name="nomeRecebedor"
            value={pedidos.nomeRecebedor}
            onChange={handleChange}
            required
            pattern="[A-Z ]*"
          />
        </Form.Group>

        <Form.Group controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <InputMask
            mask="999.999.999-99"
            value={pedidos.cpf}
            onChange={handleChange}
            name="cpf"
            required
          >
            {(inputProps) => <Form.Control {...inputProps} />}
          </InputMask>
        </Form.Group>

        <Form.Group controlId="formCnpj">
          <Form.Label>CNPJ</Form.Label>
          <InputMask
            mask="99.999.999/9999-99"
            value={pedidos.cnpj}
            onChange={handleChange}
            name="cnpj"
            required
          >
            {(inputProps) => <Form.Control {...inputProps} />}
          </InputMask>
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar Pedido
        </Button>
      </Form>
    </div>
  );
}
