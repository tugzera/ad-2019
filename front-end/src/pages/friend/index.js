import React from "react";
import { Card, Button, Table, Row } from "antd";
import { FaUserPlus } from "react-icons/fa";

import history from "../../services/history.js";

import "./styles.css";

const Friend = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      email: "johndoe@test.com",
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      email: "johndoe@test.com",
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      email: "johndoe@test.com",
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "",
      dataIndex: "",
      render: (text, record) => (
        <>
          <Button
            type="secondary"
            style={{ marginRight: 5 }}
            onClick={() => history.push(`/friends/edit/${record.key}`)}
          >
            Editar
          </Button>
          <Button danger type="primary">
            Excluir
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Card
        size="large"
        bodyStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
        title="Amigos cadastrados"
        extra={
          <Button
            type="primary"
            onClick={() => history.push("/friends/create")}
          >
            <FaUserPlus />
          </Button>
        }
      >
        <Row align="middle" justify="center">
          <Table
            columns={columns}
            dataSource={data}
            tableLayout="fixed"
            style={{
              maxWidth: 800,
            }}
          ></Table>
        </Row>
      </Card>
    </>
  );
};

export default Friend;
