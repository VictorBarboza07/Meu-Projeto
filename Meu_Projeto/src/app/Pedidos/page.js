"use client"; 

import Pagina from "@/components/Pagina"; 
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import InputMask from "react-input-mask";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const pedidosLocalStorage = JSON.parse(localStorage.getItem("Pedidos")) || [];
    setPedidos(pedidosLocalStorage);
  }, []);

  const excluir = (pedido) => {
    if (window.confirm(`Deseja realmente excluir o pedido de ${pedido.nomeRecebedor}?`)) {
      const novaLista = pedidos.filter((item) => item.id !== pedido.id);
      localStorage.setItem("Pedidos", JSON.stringify(novaLista));
      setPedidos(novaLista);
      alert("Pedido excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de Pedidos"}>
      <div className="text-end mb-2">
        <Button href="/pedidos/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Quantidade de Pacotes</th>
            <th>Status do Pedido</th>
            <th>Nome do Recebedor</th>
            <th>CPF</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.quantidadePacotes}</td>
              <td>{pedido.status}</td>
              <td>{pedido.nomeRecebedor}</td>
              <td>
                <InputMask mask="999.999.999-99" value={pedido.cpf} disabled>
                  {(inputProps) => <input {...inputProps} />}
                </InputMask>
              </td>
              <td>
                <InputMask mask="99999-999" value={pedido.cep} disabled>
                  {(inputProps) => <input {...inputProps} />}
                </InputMask>
              </td>
              <td className="text-center">
                <Button className="me-2" href={`/pedidos/form?id=${pedido.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(pedido)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
