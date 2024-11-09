"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function FornecedoresFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Busca a lista de Clientes para usar no select
  const Clientes = JSON.parse(localStorage.getItem("Clientes")) || [];

  // Buscar a lista de Clientes no localStorage, se não existir, inicializa uma lista vazia
  const Fornecedores = JSON.parse(localStorage.getItem("Fornecedores")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista a faculdade com o ID recebido no parametro
  const FornecedoresEditado = Fornecedores.find((item) => item.id == id);
  console.log(FornecedoresEditado);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se FornecedoresEditado existe, mudar os dados e gravar no localStorage
    if (FornecedoresEditado) {
      Object.assign(FornecedoresEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("Fornecedores", JSON.stringify(Fornecedores));
    } else {
      // se FornecedoresEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona a nova faculdade na lista de faculdades
      Fornecedores.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("Fornecedores", JSON.stringify(Fornecedores));
    }

    alert("Fornecedores criado com sucesso!");
    router.push("/Fornecedores");
  }

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    dataNascimento: "",
    matricula: "",
    status: "",
    Clientes: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    Clientes: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Fornecedores"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de FornecedoresEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={FornecedoresEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})

            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
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
                    <Form.Label>Data de Nascimento:</Form.Label>
                    <Form.Control
                      name="dataNascimento"
                      type="date"
                      value={values.dataNascimento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataNascimento && !errors.dataNascimento}
                      isInvalid={
                        touched.dataNascimento && errors.dataNascimento
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataNascimento}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Matricula:</Form.Label>
                    <Form.Control
                      name="matricula"
                      type="text"
                      value={values.matricula}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.matricula && !errors.matricula}
                      isInvalid={touched.matricula && errors.matricula}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.matricula}
                    </Form.Control.Feedback>
                  </Form.Group>

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

                  <Form.Group as={Col}>
                    <Form.Label>Clientes:</Form.Label>
                    <Form.Select
                      name="Clientes"
                      value={values.Clientes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.Clientes&& !errors.Clientes}
                      isInvalid={touched.Clientes&& errors.Clientes}
                    >
                      <option value="">Selecione</option>
                      {Clientes.map((Clientes) => (
                        <option value={Clientes.nome}>{Clientes.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.Clientes}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/faculdades">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Form.Group>
              </Form>
            );
          }
        }
      </Formik>
    </Pagina>
  );
}
