import React from "react";
import { Card, Button, Form, Input } from "antd";
import styled from "styled-components";

import history from "../../services/history.js";

const FriendCreate = () => {
  return (
    <StyledCard
      size="large"
      title="Cadastrar amigo"
      extra={
        <div class="container">
          <Button type="primary" style={{ marginRight: 4 }}>
            Adicionar
          </Button>
          <Button onClick={() => history.goBack()}>Retornar</Button>
        </div>
      }
    >
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 5 }}
          layout="horizontal"
          size="large"
        >
          <Form.Item label="Nome">
            <Input />
          </Form.Item>

          <Form.Item label="Email">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
`;

export default FriendCreate;
