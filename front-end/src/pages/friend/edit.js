import React from "react";
import { Card, Button, Form, Input } from "antd";

import history from "../../services/history.js";

const FriendCreate = ({ match }) => {
  return (
    <Card
      size="large"
      title="Cadastrar amigo"
      bodyStyle={{
        justifyContent: "center",
      }}
      extra={
        <div class="container">
          <Button type="primary" style={{ marginRight: 4 }}>
            Adicionar
          </Button>
          <Button onClick={() => history.goBack()}>Retornar</Button>
        </div>
      }
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 6 }}
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
    </Card>
  );
};

export default FriendCreate;
