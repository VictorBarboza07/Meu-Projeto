"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function ClienteFormPage(props) {
  const router = useRouter();

  const Clientes = JSON.parse(localStorage.getItem("Clientes")) || [];
  const id = props.searchParams.id;
  const clienteEditado = Clientes.find((item) => item.id === id);

  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados);
      localStorage.setItem("Clientes", JSON.stringify(Clientes));
    } else {
      dados.id = v4();
      Clientes.push(dados);
      localStorage.setItem("Clientes", JSON.stringify(Clientes));
    }

    alert("Cliente salvo com sucesso!");
    router.push("/Clientes");
  }

  const initialValues = {
    nome: "",
    endereco: "",
    numero: "",
    pontoReferencia: "",
    cep: "",
    cpf: "",
    email: "",
    telefone: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    numero: Yup.string().required("Campo obrigatório"),
    pontoReferencia: Yup.string().required("Campo obrigatório"),
    cep: Yup.string()
      .matches(/^[0-9]{5}-[0-9]{3}$/, "CEP inválido")
      .required("Campo obrigatório"),
    cpf: Yup.string()
      .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, "CPF inválido")
      .required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    telefone: Yup.string()
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido")
      .required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Cliente"}>
      <Formik
        initialValues={clienteEditado || initialValues}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  placeholder="Digite o nome"
                  style={{ textTransform: "capitalize" }}
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
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name="endereco"
                  type="text"
                  placeholder="Digite o endereço"
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
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Número:</Form.Label>
                <Form.Control
                  name="numero"
                  type="text"
                  placeholder="Digite o número"
                  value={values.numero}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.numero && !errors.numero}
                  isInvalid={touched.numero && errors.numero}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numero}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Ponto de Referência:</Form.Label>
                <Form.Control
                  name="pontoReferencia"
                  type="text"
                  placeholder="Digite o ponto de referência"
                  value={values.pontoReferencia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.pontoReferencia && !errors.pontoReferencia}
                  isInvalid={touched.pontoReferencia && errors.pontoReferencia}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pontoReferencia}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>CEP:</Form.Label>
                <InputGroup>
                  <InputMask
                    mask="99999-999"
                    name="cep"
                    placeholder="00000-000"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.cep && errors.cep ? "is-invalid" : ""
                      }`}
                  />
                  <InputGroup.Text>
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.cep}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>CPF:</Form.Label>
                <InputMask
                  mask="999.999.999-99"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${touched.cpf && errors.cpf ? "is-invalid" : ""
                    }`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cpf}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Exemplo@email.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${touched.telefone && errors.telefone ? "is-invalid" : ""
                    }`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/Clientes">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
