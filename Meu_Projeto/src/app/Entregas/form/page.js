"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";

// Fornecedores pré-definidos para seleção
const fornecedores = ["Fornecedor A", "Fornecedor B", "Fornecedor C"];

export default function EntregasFormPage(props) {
  const router = useRouter();

  const id = props.searchParams.id;
  const Entregas = JSON.parse(localStorage.getItem("Entregas")) || [];
  const EntregasEditada = Entregas.find((item) => item.id == id);

  // Função para salvar ou editar a entrega
  function salvar(dados) {
    console.log("Dados a serem salvos:", dados); // Verifique se os dados estão corretos

    // Se a entrega já existir (edição)
    if (EntregasEditada) {
      Object.assign(EntregasEditada, dados); // Atualiza os dados
      localStorage.setItem("Entregas", JSON.stringify(Entregas)); // Salva no localStorage
    } else {
      dados.id = v4(); // Gera um ID único
      Entregas.push(dados); // Adiciona a nova entrega
      localStorage.setItem("Entregas", JSON.stringify(Entregas)); // Salva no localStorage
    }

    alert("Entrega salva com sucesso!"); // Exibe um alerta
    router.push("/Entregas"); // Redireciona para a lista de entregas
  }

  const initialValues = {
    endereco: "",
    cep: "",
    cidade: "",
    nomeEntregador: "",
    nomeRecebedor: "",
    quantidadePecas: "",
    item: "",
    fornecedor: "",
  };

  const validationSchema = Yup.object().shape({
    endereco: Yup.string().required("Campo obrigatório"),
    cep: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    nomeEntregador: Yup.string().required("Campo obrigatório"),
    nomeRecebedor: Yup.string().required("Campo obrigatório"),
    quantidadePecas: Yup.number().typeError("Somente números").required("Campo obrigatório"),
    item: Yup.string().required("Campo obrigatório"),
    fornecedor: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Entregas"}>
      <Formik
        initialValues={EntregasEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={(dados) => {
          console.log("Enviando dados:", dados);  // Verifique os dados aqui
          salvar(dados);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            {/* Exibindo erros de validação */}
            {Object.keys(errors).length > 0 && (
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            )}

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name="endereco"
                  type="text"
                  style={{ textTransform: "uppercase" }}
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
                  style={{ textTransform: "uppercase" }}
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
                <Form.Label>Nome do Entregador:</Form.Label>
                <Form.Control
                  name="nomeEntregador"
                  type="text"
                  style={{ textTransform: "uppercase" }}
                  value={values.nomeEntregador}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nomeEntregador && !errors.nomeEntregador}
                  isInvalid={touched.nomeEntregador && errors.nomeEntregador}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nomeEntregador}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome do Recebedor:</Form.Label>
                <Form.Control
                  name="nomeRecebedor"
                  type="text"
                  style={{ textTransform: "uppercase" }}
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

              <Form.Group as={Col}>
                <Form.Label>Quantidade de Peças:</Form.Label>
                <Form.Control
                  name="quantidadePecas"
                  type="number"
                  value={values.quantidadePecas}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quantidadePecas && !errors.quantidadePecas}
                  isInvalid={touched.quantidadePecas && errors.quantidadePecas}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantidadePecas}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Item:</Form.Label>
                <Form.Control
                  name="item"
                  type="text"
                  style={{ textTransform: "uppercase" }}
                  value={values.item}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.item && !errors.item}
                  isInvalid={touched.item && errors.item}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.item}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Fornecedor:</Form.Label>
                <Form.Control
                  as="select"
                  name="fornecedor"
                  value={values.fornecedor}
                  onChange={(e) => setFieldValue("fornecedor", e.target.value)}
                  isValid={touched.fornecedor && !errors.fornecedor}
                  isInvalid={touched.fornecedor && errors.fornecedor}
                >
                  <option value="">Selecione</option>
                  {fornecedores.map((fornecedor) => (
                    <option key={fornecedor} value={fornecedor}>
                      {fornecedor}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.fornecedor}
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
        )}
      </Formik>
    </Pagina>
  );
}
