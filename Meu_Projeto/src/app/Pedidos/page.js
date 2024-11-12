"use client"; 

import Pagina from "@/components/Pagina"; 
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import InputMask from "react-input-mask";

export default function PedidossPage() {
  const [Pedidoss, setPedidoss] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const PedidossLocalStorage = JSON.parse(localStorage.getItem("Pedidoss")) || [];
    setPedidoss(PedidossLocalStorage);
  }, []);

  const excluir = (Pedidos) => {
    if (window.confirm(`Deseja realmente excluir o Pedidos de ${Pedidos.nomeRecebedor}?`)) {
      const novaLista = Pedidoss.filter((item) => item.id !== Pedidos.id);
      localStorage.setItem("Pedidoss", JSON.stringify(novaLista));
      setPedidoss(novaLista);
      alert("Pedidos excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de Pedidoss"}>
      <div className="text-end mb-2">
        <Button href="/Pedidoss/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Quantidade de Pacotes</th>
            <th>Status do Pedidos</th>
            <th>Nome do Recebedor</th>
            <th>CPF</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
          {Pedidoss.map((Pedidos) => (
            <tr key={Pedidos.id}>
              <td>{Pedidos.quantidadePacotes}</td>
              <td>{Pedidos.status}</td>
              <td>{Pedidos.nomeRecebedor}</td>
              <td>
                <InputMask mask="999.999.999-99" value={Pedidos.cpf} disabled>
                  {(inputProps) => <input {...inputProps} />}
                </InputMask>
              </td>
              <td>
                <InputMask mask="99999-999" value={Pedidos.cep} disabled>
                  {(inputProps) => <input {...inputProps} />}
                </InputMask>
              </td>
              <td className="text-center">
                <Button className="me-2" href={`/Pedidoss/form?id=${Pedidos.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(Pedidos)}>
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
