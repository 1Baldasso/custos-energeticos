// src/home/StyledForm.tsx
import React, { useMemo } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  Modal,
  Table,
  Descriptions,
  Collapse,
  Divider,
  TableProps,
} from "antd";
import "./style.css";
import { ResponseType, TipoAnimal, TipoFase } from "../infrastructure.types";
import axios from "axios";
import { maskMoney } from "./maskMoney";
import { getAnimalNome } from "./getAnimalNome";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Home: React.FC = () => {
  const [form] = Form.useForm();
  const [response, setResponse] = React.useState<ResponseType | undefined>(
    undefined
  );
  const [modalVisible, setModalVisible] = React.useState(false);

  const columns: TableProps["columns"] = [
    {
      title: "Ano",
      dataIndex: "ano",
      key: "ano",
      fixed: "left",
      rowScope: "row",
    },
    ...Array.from({ length: 26 }, (_, i) => ({
      title: `Ano ${i}`,
      dataIndex: `ano${i}`,
      key: `ano${i}`,
    })),
  ];

  const aeroDataSource: TableProps["dataSource"] = useMemo(
    () => [
      {
        key: "anoEn",
        ano: "Geração de Energia",
        ...response?.aerogerador.tabela.energiaGerada.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = item.valor;
            return acc;
          },
          {}
        ),
      },
      {
        key: "anoCusto",
        ano: "Custo Implantação",
        ...response?.aerogerador.tabela.custoImplantacao.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = maskMoney(item.valor);
            return acc;
          },
          {}
        ),
      },
      {
        key: "anoManutencao",
        ano: "Manutenção",
        ...response?.aerogerador.tabela.manutencao.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = maskMoney(item.valor);
            return acc;
          },
          {}
        ),
      },
    ],
    [response]
  );
  const bioDataSource: TableProps["dataSource"] = useMemo(
    () => [
      {
        key: "anoEn",
        ano: "Geração de Energia",
        ...response?.biodigestor.tabela.energiaGerada.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = item.valor;
            return acc;
          },
          {}
        ),
      },
      {
        key: "anoCusto",
        ano: "Custo Implantação",
        ...response?.biodigestor.tabela.custoImplantacao.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = maskMoney(item.valor);
            return acc;
          },
          {}
        ),
      },
      {
        key: "anoManutencao",
        ano: "Manutenção",
        ...response?.biodigestor.tabela.manutencao.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = maskMoney(item.valor);
            return acc;
          },
          {}
        ),
      },
    ],
    [response]
  );
  const fotoDataSource: TableProps["dataSource"] = useMemo(
    () => [
      {
        key: "anoEn",
        ano: "Geração de Energia",
        ...response?.fotovoltaico.tabela.energiaGerada.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = item.valor;
            return acc;
          },
          {}
        ),
      },
      {
        key: "anoCusto",
        ano: "Custo Implantação",
        ...response?.fotovoltaico.tabela.custoImplantacao.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = maskMoney(item.valor);
            return acc;
          },
          {}
        ),
      },
      {
        key: "anoManutencao",
        ano: "Manutenção",
        ...response?.fotovoltaico.tabela.manutencao.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, item, index) => {
            acc[`ano${index}`] = maskMoney(item.valor);
            return acc;
          },
          {}
        ),
      },
    ],
    [response]
  );

  const handleEnviar = () => {
    axios
      .post<ResponseType>(
        `${import.meta.env.VITE_API_BASE_URL}/Energia`,
        form.getFieldsValue()
      )
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
        setModalVisible(true);
        form.resetFields();
      });
  };

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return (
    <div className="form-container">
      <div className="form-header">
        <Title level={2}>Bem vindo</Title>
        <Paragraph>
          Vamos iniciar com algumas perguntas, assim iremos verificar qual a
          forma mais eficaz de geração de energia para o seu caso
        </Paragraph>
      </div>
      <Form form={form} layout="vertical" className="styled-form">
        <Divider orientation="left">DADOS INICIAIS</Divider>
        <Row gutter={[16, 16]}>
          {meses.map((mes, index) => (
            <Col span={4}>
              <Form.Item
                label={`kWh ${mes}`}
                className="form-item"
                name={["consumos", index]}
              >
                <Input
                  type="number"
                  placeholder="Informe a quantidade"
                  step={0.01}
                />
              </Form.Item>
            </Col>
          ))}
          <Col span={24}>
            <Form.Item
              label="Tipo de Fase"
              className="form-item"
              name={["tipoFase"]}
            >
              <Select placeholder="Selecione o tipo de fase">
                <Option value={TipoFase.MONOFASICO}>MONOFÁSICO</Option>
                <Option value={TipoFase.BIFASICO}>BIFÁSICO</Option>
                <Option value={TipoFase.TRIFASICO}>TRIFÁSICO</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Custo kWh"
              className="form-item"
              name={["custokwh"]}
            >
              <Input type="number" placeholder="Digite aqui" step={0.01} />
            </Form.Item>
          </Col>
          <Divider orientation="left">DIMENSIONAMENTO BIODIGESTOR</Divider>
          <Col span={24}>
            <Form.Item label="Animal" className="form-item" name={["animal"]}>
              <Select placeholder="Selecione o tipo de animal">
                <Option value={TipoAnimal.AVES}>
                  {getAnimalNome(TipoAnimal.AVES)}
                </Option>
                <Option value={TipoAnimal.CAPRINOS}>
                  {getAnimalNome(TipoAnimal.CAPRINOS)}
                </Option>
                <Option value={TipoAnimal.BOVINOS}>
                  {getAnimalNome(TipoAnimal.BOVINOS)}
                </Option>
                <Option value={TipoAnimal.EQUINOS}>
                  {getAnimalNome(TipoAnimal.EQUINOS)}
                </Option>
                <Option value={TipoAnimal.SUINOS_M}>
                  {getAnimalNome(TipoAnimal.SUINOS_M)}
                </Option>
                <Option value={TipoAnimal.SUINOS_F}>
                  {getAnimalNome(TipoAnimal.SUINOS_F)}
                </Option>
                <Option value={TipoAnimal.LEITOES}>
                  {getAnimalNome(TipoAnimal.LEITOES)}
                </Option>
                <Option value={TipoAnimal.BOVINOS_L}>
                  {getAnimalNome(TipoAnimal.BOVINOS_L)}
                </Option>
                <Option value={TipoAnimal.BEZERROS}>
                  {getAnimalNome(TipoAnimal.BEZERROS)}
                </Option>
                <Option value={TipoAnimal.BOIS_CORTE}>
                  {getAnimalNome(TipoAnimal.BOIS_CORTE)}
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Divider orientation="left">DIMENSIONAMENTO SISTEMA EÓLICO</Divider>
          <Col span={24}>
            <Form.Item label="Aeroicidencia" className="form-item">
              <span>
                Encontre os valores{" "}
                <a
                  href="https://cresesb.cepel.br/index.php?section=atlas_eolico"
                  target="_blank"
                >
                  aqui
                </a>{" "}
              </span>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Parâmetro de forma adimensional (k)"
                    name={["valoresAeroincidencia", "k"]}
                  >
                    <Input
                      type="number"
                      placeholder="Digite aqui"
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Parâmetro de escala em unidades de velocidade do vento. (c)"
                    name={["valoresAeroincidencia", "c"]}
                  >
                    <Input
                      type="number"
                      placeholder="Digite aqui"
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Divider orientation="left">
            DIMENSIONAMENTO SISTEMA FOTOVOLTAICO
          </Divider>
          <Col span={24}>
            <Form.Item
              label="Irradiação Solar Média Mensal (Plano Inclinado - Ângulo igual a latitude)"
              className="form-item"
              name={["incidenciaSolarMediaMensal"]}
            >
              <Input type="number" step={0.01} />
            </Form.Item>
            <span>
              Acesse{" "}
              <a
                href="https://cresesb.cepel.br/index.php?section=sundata"
                target="_blank"
              >
                aqui
              </a>
            </span>
          </Col>
          <Col span={24}>
            <Form.Item className="form-item">
              <Button
                type="primary"
                onClick={() => handleEnviar()}
                className="submit-button"
              >
                Enviar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="form-footer">
        <Title level={5}>Obrigado por participar</Title>
        <Paragraph>Agradecemos a sua participação</Paragraph>
      </div>
      <Modal
        maskClosable={false}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        width={"95%"}
        open={modalVisible}
        title="Resultados"
      >
        {response && (
          <div>
            <Title level={4}>Informações do sistema</Title>
            <Descriptions layout="vertical">
              <Descriptions.Item label="Melhor forma de geração de energia">
                <b>{response.melhor}</b>
              </Descriptions.Item>
            </Descriptions>
            <Divider orientation="left">Aerogeradores</Divider>
            <Descriptions layout="vertical">
              <Descriptions.Item label="LCOE">
                {response.aerogerador.lcoe}
              </Descriptions.Item>
              <Descriptions.Item label="Custo Implantação">
                {maskMoney(response.aerogerador.custoImplantacao)}
              </Descriptions.Item>
              <Descriptions.Item label="Aerogerador">
                {`${response.aerogerador.dadosExtra.aerogerador.modelo}`}
              </Descriptions.Item>
            </Descriptions>
            <Divider orientation="left">Fotovoltaico</Divider>
            <Descriptions layout="vertical">
              <Descriptions.Item label="LCOE">
                {response.fotovoltaico.lcoe}
              </Descriptions.Item>
              <Descriptions.Item label="Custo Implantação">
                {maskMoney(response.fotovoltaico.custoImplantacao)}
              </Descriptions.Item>
              <Descriptions.Item label="Painel Solar">
                {`${response.fotovoltaico.dadosExtra.quantidade} painéis - ${response.fotovoltaico.dadosExtra.painelSolar.marca}/${response.fotovoltaico.dadosExtra.painelSolar.modelo}`}
              </Descriptions.Item>
              <Descriptions.Item label="Inversor">
                {`${response.fotovoltaico.dadosExtra.inversorSolar.marca}/${response.fotovoltaico.dadosExtra.inversorSolar.modelo}`}
              </Descriptions.Item>
            </Descriptions>
            <Divider orientation="left">Biodigestor</Divider>
            <Descriptions layout="vertical">
              <Descriptions.Item label="LCOE">
                {response.biodigestor.lcoe}
              </Descriptions.Item>
              <Descriptions.Item label="Custo Implantação">
                {maskMoney(response.biodigestor.custoImplantacao)}
              </Descriptions.Item>
              <Descriptions.Item label="Número mínimo de animais">
                {`${
                  response.biodigestor.dadosExtra.numeroMinimoAnimais
                } - ${getAnimalNome(response.biodigestor.dadosExtra.animal)}`}
              </Descriptions.Item>
            </Descriptions>
            <Divider orientation="left">Tabelas</Divider>
            <Collapse>
              <Collapse.Panel header="Tabela Aerogerador" key="1">
                <Table
                  columns={columns}
                  dataSource={aeroDataSource}
                  scroll={{ x: 5000 }}
                />
              </Collapse.Panel>
              <Collapse.Panel header="Tabela Fotovoltaico" key="2">
                <Table
                  columns={columns}
                  dataSource={fotoDataSource}
                  scroll={{ x: 5000 }}
                />
              </Collapse.Panel>
              <Collapse.Panel header="Tabela Biodigestor" key="3">
                <Table
                  columns={columns}
                  dataSource={bioDataSource}
                  scroll={{ x: 5000 }}
                />
              </Collapse.Panel>
            </Collapse>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
