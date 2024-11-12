"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import MaskedInput from "react-input-mask"; // Importando a biblioteca para máscara

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

    alert("Entrega salva com sucesso!");
    router.push("/Entregas");
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: "",
    descricao: "",
    Clientes: "",
    Fornecedores: "",
    endereco: "",
    cep: "",
    cidade: "",
    nomeRecebedor: "",
    dataEntrega: "",
  };

  // Validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    Clientes: Yup.string().required("Campo obrigatório"),
    Fornecedores: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    cep: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    nomeRecebedor: Yup.string().required("Campo obrigatório"),
    dataEntrega: Yup.string().required("Campo obrigatório"),
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
                  <Form.Label>Endereço:</Form.Label>
                  <Form.Control
                    name="endereco"
                    type="text"
                    value={values.endereco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.endereco && !errors.endereco}
                    isInvalid={touched.endereco && errors.endereco}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endereco}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>CEP:</Form.Label>
                  <MaskedInput
                    mask="99999-999"
                    name="cep"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    isValid={touched.cep && !errors.cep}
                    isInvalid={touched.cep && errors.cep}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cep}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Cidade:</Form.Label>
                  <Form.Control
                    name="cidade"
                    type="text"
                    value={values.cidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cidade && !errors.cidade}
                    isInvalid={touched.cidade && errors.cidade}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cidade}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Nome do Recebedor:</Form.Label>
                  <Form.Control
                    name="nomeRecebedor"
                    type="text"
                    value={values.nomeRecebedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nomeRecebedor && !errors.nomeRecebedor}
                    isInvalid={touched.nomeRecebedor && errors.nomeRecebedor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nomeRecebedor}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Data da Entrega:</Form.Label>
                  <MaskedInput
                    mask="99/99/9999"
                    name="dataEntrega"
                    value={values.dataEntrega}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    isValid={touched.dataEntrega && !errors.dataEntrega}
                    isInvalid={touched.dataEntrega && errors.dataEntrega}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataEntrega}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="text-end">
                <Button className="me-2" href="/Entregas">
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
