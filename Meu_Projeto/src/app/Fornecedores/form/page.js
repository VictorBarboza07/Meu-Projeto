"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function FornecedoresFormPage(props) {
  const router = useRouter();

  // Lista de Clientes para o select
  const Clientes = JSON.parse(localStorage.getItem("Clientes")) || [];

  // Buscar a lista de Fornecedores no localStorage
  const Fornecedores = JSON.parse(localStorage.getItem("Fornecedores")) || [];

  const id = props.searchParams.id;
  const FornecedoresEditado = Fornecedores.find((item) => item.id == id);

  function salvar(dados) {
    if (FornecedoresEditado) {
      Object.assign(FornecedoresEditado, dados);
      localStorage.setItem("Fornecedores", JSON.stringify(Fornecedores));
    } else {
      dados.id = v4();
      Fornecedores.push(dados);
      localStorage.setItem("Fornecedores", JSON.stringify(Fornecedores));
    }

    alert("Fornecedor salvo com sucesso!");
    router.push("/Fornecedores");
  }

  const initialValues = {
    nomeEmpresa: "",
    cnpj: "",
    ie: "",
    transportadora: "",
    gerente: "",
    telefone: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    nomeEmpresa: Yup.string().required("Campo obrigatório"),
    cnpj: Yup.string().required("Campo obrigatório"),
    ie: Yup.string().required("Campo obrigatório"),
    transportadora: Yup.string().required("Campo obrigatório"),
    gerente: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Fornecedores"}>
      <Formik
        initialValues={FornecedoresEditado || initialValues}
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
                <Form.Label>Nome da Empresa:</Form.Label>
                <Form.Control
                  name="nomeEmpresa"
                  type="text"
                  value={values.nomeEmpresa.toUpperCase()}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "nomeEmpresa", value: e.target.value.toUpperCase() },
                    })
                  }
                  onBlur={handleBlur}
                  isValid={touched.nomeEmpresa && !errors.nomeEmpresa}
                  isInvalid={touched.nomeEmpresa && errors.nomeEmpresa}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nomeEmpresa}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>CNPJ:</Form.Label>
                <InputMask
                  name="cnpj"
                  mask="99.999.999/9999-99"
                  value={values.cnpj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      isValid={touched.cnpj && !errors.cnpj}
                      isInvalid={touched.cnpj && errors.cnpj}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.cnpj}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>IE:</Form.Label>
                <InputMask
                  name="ie"
                  mask="999999999"
                  value={values.ie}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      isValid={touched.ie && !errors.ie}
                      isInvalid={touched.ie && errors.ie}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.ie}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Transportadora:</Form.Label>
                <Form.Control
                  name="transportadora"
                  type="text"
                  value={values.transportadora.toUpperCase()}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "transportadora", value: e.target.value.toUpperCase() },
                    })
                  }
                  onBlur={handleBlur}
                  isValid={touched.transportadora && !errors.transportadora}
                  isInvalid={touched.transportadora && errors.transportadora}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.transportadora}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Gerente:</Form.Label>
                <Form.Control
                  name="gerente"
                  type="text"
                  value={values.gerente.toUpperCase()}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "gerente", value: e.target.value.toUpperCase() },
                    })
                  }
                  onBlur={handleBlur}
                  isValid={touched.gerente && !errors.gerente}
                  isInvalid={touched.gerente && errors.gerente}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.gerente}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <InputMask
                  name="telefone"
                  mask="(99) 99999-9999"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
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
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/Fornecedores">
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
