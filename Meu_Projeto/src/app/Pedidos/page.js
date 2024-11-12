"use client"; 

import Pagina from "@/components/Pagina"; 
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import InputMask from "react-input-mask";

export default function PedidosPage() {
  const [Pedidos, setPedidos] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const PedidosLocalStorage = JSON.parse(localStorage.getItem("Pedidos")) || [];
    setPedidos(PedidosLocalStorage);
  }, []);

  const excluir = (Pedidos) => {
    if (window.confirm(`Deseja realmente excluir o Pedidos de ${Pedidos.nomeRecebedor}?`)) {
      const novaLista = Pedidos.filter((item) => item.id !== Pedidos.id);
      localStorage.setItem("Pedidos", JSON.stringify(novaLista));
      setPedidos(novaLista);
      alert("Pedidos excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de Pedidos"}>
      <div className="text-end mb-2">
        <Button onClick={() => router.push("/Pedidos/form")}>
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Pedidos.map((Pedidos) => (
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
                <Button className="me-2" onClick={() => router.push(`/Pedidos/form?id=${Pedidos.id}`)}>
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
