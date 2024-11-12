"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function FornecedoresPage() {
  const [Fornecedores, setFornecedores] = useState([]);

  // Executado quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const FornecedoresLocalStorage =
      JSON.parse(localStorage.getItem("Fornecedores")) || [];
    // Guarda a lista no estado
    setFornecedores(FornecedoresLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(fornecedor) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nomeEmpresa}?`)
    ) {
      // Filtra a lista antiga removendo o fornecedor selecionado
      const novaLista = Fornecedores.filter((item) => item.id !== fornecedor.id);
      // Grava no localStorage a nova lista
      localStorage.setItem("Fornecedores", JSON.stringify(novaLista));
      // Atualiza o estado com a nova lista
      setFornecedores(novaLista);
      alert("Fornecedor excluído com sucesso!");
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
            <th>Nome da Empresa</th>
            <th>CNPJ</th>
            <th>IE</th>
            <th>Transportadora</th>
            <th>Gerente</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Fornecedores.map((fornecedor) => {
            return (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nomeEmpresa}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.ie}</td>
                <td>{fornecedor.transportadora}</td>
                <td>{fornecedor.gerente}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/Fornecedores/form?id=${fornecedor.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(fornecedor)}>
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
