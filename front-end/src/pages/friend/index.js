import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Table, Row, Modal } from "antd";
import { FaUserPlus } from "react-icons/fa";
import collect from "collect.js";

import history from "../../services/history.js";

import Friends from "../../store/modules/friends";

const Friend = () => {
  const dispatch = useDispatch();

  const store = useSelector((value) => value.friends);

  const { items, loading } = store;

  useEffect(() => {
    dispatch(Friends.findMany());
    // eslint-disable-next-line
  }, []);

  const handleList = (list) => {
    if (list.length > 0) {
      const organizedList = collect(list).sortBy("name").toArray();
      return organizedList;
    }
    return [];
  };

  const [modal, setModal] = useState({
    status: false,
    record: "",
  });

  const handleDestroy = (id) => {
    dispatch(Friends.destroy(id));
    setModal({
      status: false,
      record: "",
    });
  };

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
            onClick={() => history.push(`/friends/edit/${record._id}`)}
          >
            Editar
          </Button>
          <Button
            danger
            type="primary"
            onClick={() =>
              setModal({
                status: true,
                record: record._id,
              })
            }
          >
            Excluir
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Você deseja excluir este amigo da sua lista?"
        visible={modal.status}
        onOk={() => handleDestroy(modal.record)}
        onCancel={() => setModal(false)}
      >
        <p>Após realizar esta ação está não poderá ser desfeita.</p>
      </Modal>
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
            rowKey="_id"
            pagination={{ pageSize: 20 }}
            columns={columns}
            dataSource={handleList(items)}
            loading={loading}
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
