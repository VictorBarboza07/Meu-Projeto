"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function ModelosPage() {
  const [Modelos, setModelos] = useState([]);

  useEffect(() => {
    const ModelosLocalStorage = JSON.parse(localStorage.getItem("Modelos")) || [];
    setModelos(ModelosLocalStorage);
  }, []);

  function excluir(modelo) {
    if (window.confirm(`Deseja realmente excluir o modelo ${modelo.modelo}?`)) {
      const novaLista = Modelos.filter((item) => item.id !== modelo.id);
      localStorage.setItem("Modelos", JSON.stringify(novaLista));
      setModelos(novaLista);
      alert("Modelo excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo="Lista de Modelos de Tênis">
      <div className="text-end mb-2">
        <Button href="/Modelos/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Tamanho</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Modelos.map((modelo) => (
            <tr key={modelo.id}>
              <td>{modelo.modelo}</td>
              <td>{modelo.cor}</td>
              <td>{modelo.tamanho}</td>
              <td className="text-center">
                <Button className="me-2" href={`/Modelos/form?id=${modelo.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(modelo)}>
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
