"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function EntregasPage() {
  const [Entregas, setEntregas] = useState([]);

  // Carrega as Entregas quando a tela é acessada
  useEffect(() => {
    // Busca as Entregas do localStorage, se não existir, inicia uma lista vazia
    const EntregasLocalStorage = JSON.parse(localStorage.getItem("Entregas")) || [];
    setEntregas(EntregasLocalStorage);
    console.log(EntregasLocalStorage);
  }, []);

  // Função para exclusão de uma Entregas
  function excluir(Entregas) {
    if (window.confirm(`Deseja realmente excluir a Entregas ${Entregas.nome}?`)) {
      const novaLista = Entregas.filter((item) => item.id !== Entregas.id);
      localStorage.setItem("Entregas", JSON.stringify(novaLista));
      setEntregas(novaLista);
      alert("Entregas excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Entregas"}>
      <div className="text-end mb-2">
        <Button href="/Entregas/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as Entregas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Curso</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Entregas.map((Entregas) => (
            <tr key={Entregas.id}>
              <td>{Entregas.nome}</td>
              <td>{Entregas.descricao}</td>
              <td>{Entregas.status}</td>
              <td>{Entregas.curso}</td>
              <td>{Entregas.professor}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/Entregas/form?id=${Entregas.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(Entregas)}>
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
