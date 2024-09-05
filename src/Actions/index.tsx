/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Form, Input, InputNumber, Modal, Radio } from "antd";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import AerogeradorForm from "./AerogeradorForm";
import InversorForm from "./InversorForm";

const Actions: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [tipo, setTipo] = useState(undefined);
  const sendData = () => {
    form.validateFields().then((values) => {
      if (!tipo) return;
      console.log(values);
      const str = localStorage.getItem(tipo) || "[]";
      const obj = JSON.parse(str) as any[];
      obj.push(values);
      localStorage.setItem(tipo, JSON.stringify(obj));
      setVisible(false);
    });
  };
  const clearItems = () => {
    localStorage.removeItem("aerogeradores");
    localStorage.removeItem("paineisSolares");
    localStorage.removeItem("inversoresSolares");
    alert("Itens removidos com sucesso!");
  };
  return (
    <>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => sendData()}
        okButtonProps={{ disabled: !tipo }}
      >
        <Flex style={{ justifyContent: "center" }}>
          <Radio.Group value={tipo} onChange={(x) => setTipo(x.target.value)}>
            <Radio.Button value="aerogeradores">Aerogerador</Radio.Button>
            <Radio.Button value="paineisSolares">Painel Solar</Radio.Button>
            <Radio.Button value="inversoresSolares">
              Inversor Solar
            </Radio.Button>
          </Radio.Group>
        </Flex>
        <Form form={form} layout="vertical">
          <Form.Item label="Modelo" name="modelo" required>
            <Input />
          </Form.Item>
          {tipo !== "aerogeradores" && (
            <Form.Item label="Marca" name="marca" required>
              <Input />
            </Form.Item>
          )}
          <Form.Item label="Potência" name="potencia" required>
            <Input type="number" step={0.01} />
          </Form.Item>
          {tipo === "aerogeradores" && <AerogeradorForm />}
          {tipo === "inversoresSolares" && <InversorForm />}
          <Form.Item
            label="Custo"
            name={tipo === "aerogeradores" ? "custoInterno" : "valor"}
            required
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              step="0.01"
              decimalSeparator=","
              type="number"
              precision={2}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ width: "100%", maxWidth: 1000 }}>
        <Flex style={{ justifyContent: "space-between", width: "100%" }}>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Adicionar
          </Button>
          <Button
            type="dashed"
            icon={<CloseCircleOutlined />}
            onClick={clearItems}
          >
            Limpar
          </Button>
        </Flex>
      </div>
    </>
  );
};
export default Actions;
