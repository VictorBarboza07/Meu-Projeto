"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table, Row, Col, Card } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  
  const modelosOpcoes = ["Adidas", "Nike", "Mizuno", "Olympikus", "Oakley"];
  const modelosCount = modelosOpcoes.map(
    (modelo) => Modelos.filter((item) => item.modelo === modelo).length
  );

  const data = {
    labels: modelosOpcoes,
    datasets: [
      {
        label: "Quantidade de Modelos",
        data: modelosCount,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quantidade de Modelos Cadastrados",
      },
    },
  };

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

      {/* Gráfico de Barras */}
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <Bar data={data} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Pagina>
  );
}
