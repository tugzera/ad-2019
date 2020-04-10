import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Table, Row, Modal, Typography } from "antd";
import { FaUserPlus } from "react-icons/fa";
import collect from "collect.js";

import makeSortedList from "../../utils";
import history from "../../services/history.js";
import Friends from "../../store/modules/friends";

const Friend = () => {
  const dispatch = useDispatch();

  const store = useSelector((value) => value.friends);

  const { items, loading } = store;

  // Function to fetch data from server ** EMPTY ARRAY TO RUN ONCE **
  useEffect(() => {
    dispatch(Friends.findMany());
    // eslint-disable-next-line
  }, []);

  // Function to sort list by name
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

  // Function to control delete item
  const handleDestroy = (id) => {
    dispatch(Friends.destroy(id));
    setModal({
      status: false,
      record: "",
    });
  };

  // Function to sort by string on table
  const handleStringSorter = (stringA, stringB) => {
    const size =
      stringA.length > stringB.length ? stringB.length : stringA.length;
    for (let i = 0; i < size; i++) {
      if (stringA[i].toUpperCase() > stringB[i].toUpperCase()) {
        return 1;
      }
      if (stringA[i].toUpperCase() < stringB[i].toUpperCase()) {
        return -1;
      }
    }
    return 0;
  };

  // Table structure
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => handleStringSorter(a.name, b.name),
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => handleStringSorter(a.name, b.name),
      render: (text) => text,
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

  // Controller for list of selected items
  const [selected, setSelected] = useState();

  // Function to control the selected items on table
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  // Render Extra Button on Card
  const ButtonExtra = () => {
    return (
      <>
        <Button type="primary" onClick={() => history.push("/friends/create")}>
          <FaUserPlus />
        </Button>
      </>
    );
  };

  // Controller for modal state on randomize
  const [randomModal, setRandomModal] = useState(false);

  return (
    <>
      <Modal
        title="Você deseja excluir este amigo da sua lista?"
        visible={modal.status}
        onOk={() => handleDestroy(modal.record)}
        onCancel={() =>
          setModal({
            status: false,
            record: "",
          })
        }
      >
        <p>Após realizada esta ação está não poderá ser desfeita.</p>
      </Modal>

      <Modal
        title="Você deseja confirmar a lista abaixo no jogo do amigo secreto?"
        visible={randomModal}
        onOk={() => {
          console.log(
            makeSortedList(
              collect(selected)
                .map((item) => ({
                  _id: item._id,
                  name: item.name,
                }))
                .toArray()
            )
          );
          setRandomModal(false);
        }}
        onCancel={() => setRandomModal(false)}
      >
        <Typography.Text>
          Será enviado um email informando quem é o amigo secreto de cada
          participante listado abaixo:
          <br />
          <br />
        </Typography.Text>
        {selected &&
          selected.map((item) => (
            <>
              <Typography.Text>{item.name}</Typography.Text>
              <br />
            </>
          ))}
      </Modal>
      <Card
        size="large"
        bodyStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
        title="Amigos cadastrados"
        extra={<ButtonExtra />}
      >
        <Row align="middle" justify="center">
          <Table
            rowKey="_id"
            rowSelection={rowSelection}
            pagination={{ pageSize: 8 }}
            columns={columns}
            dataSource={handleList(items)}
            loading={loading}
            tableLayout="fixed"
            style={{
              maxWidth: 800,
            }}
            footer={() => (
              <Typography.Text>{`Total de registros: ${
                items ? items.length : 0
              }`}</Typography.Text>
            )}
          />
        </Row>
        {selected && selected.length > 0 && (
          <Button
            block
            size="large"
            type="primary"
            disabled={selected.length % 2 === 0 ? false : true}
            onClick={() => setRandomModal(true)}
          >
            SORTEAR AMIGO SECRETO
          </Button>
        )}
      </Card>
    </>
  );
};

export default Friend;
