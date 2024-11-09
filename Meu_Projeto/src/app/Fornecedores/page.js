"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function FornecedoresPage() {
  const [Fornecedores, setFornecedores] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const FornecedoresLocalStorage =
      JSON.parse(localStorage.getItem("Fornecedores")) || [];
    // guarda a lista no estado
    setFornecedores(FornecedoresLocalStorage);
    console.log(FornecedoresLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(Fornecedores) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir o Fornecedores ${Fornecedores.nome}?`)
    ) {
      // filtra a lista antiga removando o Fornecedores recebido
      const novaLista = Fornecedores.filter((item) => item.id !== Fornecedores.id);
      // grava no localStorage a nova lista
      localStorage.setItem("Fornecedores", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setFornecedores(novaLista);
      alert("Fornecedores excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Fornecedores"}>
      <div className="text-end mb-2">
        <Button href="/Fornecedores/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os Fornecedores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matricula</th>
            <th>Status</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Fornecedores.map((Fornecedores) => {
            return (
              <tr>
                <td>{Fornecedores.nome}</td>
                <td>{Fornecedores.matricula}</td>
                <td>{Fornecedores.status}</td>
                <td>{Fornecedores.curso}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/Fornecedores/form?id=${Fornecedores.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(Fornecedores)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
