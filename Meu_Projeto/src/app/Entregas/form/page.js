"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function EntregasFormPage(props) {
  const router = useRouter();

  // Busca a lista de Clientess e Fornecedoreses para usar nos selects
  const Clientess = JSON.parse(localStorage.getItem("Clientess")) || [];
  const FornecedoresEditado = JSON.parse(localStorage.getItem("Fornecedores")) || [];

  // Recupera o ID para edição, se disponível
  const id = props.searchParams.id;
  const Entregas = JSON.parse(localStorage.getItem("Entregas")) || [];
  const EntregasEditada = Entregas.find((item) => item.id == id);

  // Função para salvar os dados do form
  function salvar(dados) {
    if (EntregasEditada) {
      Object.assign(EntregasEditada, dados);
      localStorage.setItem("Entregas", JSON.stringify(Entregas));
    } else {
      dados.id = v4();
      Entregas.push(dados);
      localStorage.setItem("Entregas", JSON.stringify(Entregas));
    }

    alert("Entregas salva com sucesso!");
    router.push("/Entregas");
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: "",
    descricao: "",
    Clientes: "",
    Fornecedores: "",
    status: "",
  };

  // Validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    Clientes: Yup.string().required("Campo obrigatório"),
    Fornecedores: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Entregas"}>
      <Formik
        initialValues={EntregasEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    name="nome"
                    type="text"
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={touched.nome && errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    name="descricao"
                    type="text"
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.descricao && !errors.descricao}
                    isInvalid={touched.descricao && errors.descricao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Clientes:</Form.Label>
                  <Form.Select
                    name="Clientes"
                    value={values.Clientes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.Clientes && !errors.Clientes}
                    isInvalid={touched.Clientes && errors.Clientes}
                  >
                    <option value="">Selecione</option>
                    {Clientess.map((Clientes) => (
                      <option key={Clientes.id} value={Clientes.id}>
                        {Clientes.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.Clientes}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Fornecedores:</Form.Label>
                  <Form.Select
                    name="Fornecedores"
                    value={values.Fornecedores}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.Fornecedores && !errors.Fornecedores}
                    isInvalid={touched.Fornecedores && errors.Fornecedores}
                  >
                    <option value="">Selecione</option>
                    {FornecedoresEditado
                      .filter((prof) => prof.ClientesId === values.Clientes)
                      .map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.nome}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.Fornecedores}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Status:</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.status && !errors.status}
                    isInvalid={touched.status && errors.status}
                  >
                    <option value="">Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="text-end">
                <Button className="me-2" href="/Entregass">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
