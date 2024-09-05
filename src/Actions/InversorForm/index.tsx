import { Form, Input, Select } from "antd";
import { TipoFase } from "../../infrastructure.types";

const InversorForm: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Tensão de Entrada Máxima"
        name="tensaoEntradaMax"
        required
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Tensão de Saída Mínima" name="tensaoSaidaMin" required>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Tensão de Saída Máxima" name="tensaoSaidaMax" required>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Tipo de Fase" name="tipoFase" required>
        <Select>
          <Select.Option value={TipoFase.MONOFASICO}>Monofásico</Select.Option>
          <Select.Option value={TipoFase.BIFASICO}>Bifásico</Select.Option>
          <Select.Option value={TipoFase.TRIFASICO}>Trifásico</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default InversorForm;
