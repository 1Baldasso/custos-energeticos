import { Card, Form, Input } from "antd";

const AerogeradorForm: React.FC = () => {
  return (
    <>
      <Form.List name={"potenciais"} initialValue={Array(21).fill({}, 0, 21)}>
        {(fields) => (
          <>
            <Card size="small" title="Potênciais">
              {fields.map(({ key, name }) => (
                <>
                  <Form.Item name={[name, "valor"]} hidden />
                  <Form.Item
                    label={`Velocidade ${key} ms`}
                    name={[name, "potencia"]}
                    required
                  >
                    <Input />
                  </Form.Item>
                </>
              ))}
            </Card>
          </>
        )}
      </Form.List>
    </>
  );
};

export default AerogeradorForm;
