"use client";

import Pagina from "@/components/Pagina";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaSave } from "react-icons/fa";

export default function ModelosForm(props) {
  const router = useRouter();
  const id = props.searchParams?.id; // Ajuste para pegar o id do searchParams

  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [cor, setCor] = useState("");
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

  const modelosOpcoes = ["Adidas", "Nike", "Mizuno", "Olympikus", "Oakley"];
  const tamanhosOpcoes = [36, 37, 38, 39, 40, 41, 42, 43];

  useEffect(() => {
    if (id) {
      const ModelosLocalStorage = JSON.parse(localStorage.getItem("Modelos")) || [];
      const modelo = ModelosLocalStorage.find((item) => item.id === id);
      if (modelo) {
        setModeloSelecionado(modelo.modelo);
        setCor(modelo.cor);
        setTamanhoSelecionado(modelo.tamanho);
      }
    }
  }, [id]);

  function salvarModelo() {
    const novoModelo = {
      id: id || Date.now().toString(),
      modelo: modeloSelecionado,
      cor,
      tamanho: tamanhoSelecionado,
    };

    const ModelosLocalStorage = JSON.parse(localStorage.getItem("Modelos")) || [];
    const modelosAtualizados = id
      ? ModelosLocalStorage.map((item) => (item.id === id ? novoModelo : item))
      : [...ModelosLocalStorage, novoModelo];

    localStorage.setItem("Modelos", JSON.stringify(modelosAtualizados));
    alert("Modelo salvo com sucesso!");
    router.push("/Modelos");
  }

  return (
    <Pagina titulo="Cadastro de Modelo">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Modelo</Form.Label>
          <Form.Select
            value={modeloSelecionado}
            onChange={(e) => setModeloSelecionado(e.target.value)}
          >
            <option value="">Selecione o modelo</option>
            {modelosOpcoes.map((modelo) => (
              <option key={modelo} value={modelo}>
                {modelo}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cor</Form.Label>
          <Form.Control
            type="text"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            placeholder="Digite a cor do modelo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tamanho</Form.Label>
          <Form.Select
            value={tamanhoSelecionado}
            onChange={(e) => setTamanhoSelecionado(e.target.value)}
          >
            <option value="">Selecione o tamanho</option>
            {tamanhosOpcoes.map((tamanho) => (
              <option key={tamanho} value={tamanho}>
                {tamanho}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" onClick={salvarModelo}>
          <FaSave /> Salvar
        </Button>
      </Form>
    </Pagina>
  );
}
