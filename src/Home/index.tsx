// src/home/StyledForm.tsx
import React from 'react';
import { Form, Input, Select, Button, Row, Col, Typography } from 'antd';
import './style.css';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Home: React.FC = () => {
  return (
    <div className="form-container">
      <div className="form-header">
        <Title level={2}>Bem vindo</Title>
        <Paragraph>Vamos iniciar com algumas perguntas, assim iremos verificar qual a forma mais eficaz de geração de energia para o seu caso</Paragraph>
      </div>
      <Form layout="vertical" className="styled-form">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="Kwh Mensal" className="form-item">
              <Input type='number' placeholder="Informe a quantidade" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tipo de Fase" className="form-item">
              <Select placeholder="Selecione o tipo de fase">
                <Option value="MONOFASICO">MONOFÁSICO</Option>
                <Option value="BIFASICO">BIFÁSICO</Option>
                <Option value="TRIFASICO">TRIFÁSICO</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Animal" className="form-item">
              <Select placeholder="Selecione o tipo de animal">
                <Option value="AVES">AVES</Option>
                <Option value="CAPRINOS">CAPRINOS</Option>
                <Option value="BOVINOS">BOVINOS</Option>
                <Option value="EQUINOS">EQUINOS</Option>
                <Option value="SUINOS_M">SUÍNOS_M</Option>
                <Option value="SUINOS_F">SUÍNOS_F</Option>
                <Option value="LEITOES">LEITÕES</Option>
                <Option value="BOVINOS_L">BOVINOS_L</Option>
                <Option value="BEZERRO">BEZERRO</Option>
                <Option value="BOIS_CORTE">BOIS_CORTE</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Aeroicidencia" className="form-item">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item label="k">
                    <Input type='number' placeholder="Digite aqui" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="c">
                    <Input type='number' placeholder="Digite aqui" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Irradiação Solar" className="form-item">
              <Row gutter={[16, 16]}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <Col span={4} key={month}>
                    <Form.Item label={month}>
                      <Input placeholder={month} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item className="form-item">
              <Button type="primary" htmlType="submit" className="submit-button">
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
    </div>
  );
}

export default Home;
