"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";

export default function CadastroPedidos() {
  const [pedidos, setPedidos] = useState({
    quantidadePacotes: "",
    status: "em_transito",  // Definido como "Em Trânsito" por padrão
    nomeRecebedor: "",
    cpf: "",
    cnpj: "",
  });

  const router = useRouter();

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
        {/* Campo de Quantidade de Pacotes */}
        <Form.Group controlId="formQuantidadePacotes">
          <Form.Label>Quantidade de Pacotes</Form.Label>
          <Form.Control
            type="text"
            name="quantidadePacotes"
            value={pedidos.quantidadePacotes}
            onChange={handleChange}
            required
            pattern="[0-9]*" // Aceita apenas números
          />
        </Form.Group>
        
        {/* Campo de Status */}
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

        {/* Campo de Nome do Recebedor */}
        <Form.Group controlId="formNomeRecebedor">
          <Form.Label>Nome do Recebedor</Form.Label>
          <Form.Control
            type="text"
            name="nomeRecebedor"
            value={pedidos.nomeRecebedor}
            onChange={handleChange}
            required
            pattern="[A-Z ]*" // Apenas letras maiúsculas e espaços
          />
        </Form.Group>

        {/* Campo de CPF */}
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

        {/* Campo de CNPJ */}
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

        {/* Botão de envio */}
        <Button variant="primary" type="submit">
          Cadastrar Pedido
        </Button>
      </Form>
    </Pagina>
  );
}
