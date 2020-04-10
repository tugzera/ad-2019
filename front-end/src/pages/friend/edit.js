import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Form, Input, Skeleton } from "antd";
import * as Yup from "yup";

import Friends from "../../store/modules/friends";

import useForm from "../../hooks/useForm";
import history from "../../services/history.js";

const FriendCreate = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;

  const store = useSelector((value) => value.friends);

  const { data, loading } = store;

  useEffect(() => {
    dispatch(Friends.findOne(id));
    // eslint-disable-next-line
  }, []);
  const { onChangeText, onValidate, onFailed, values, errors } = useForm(data);

  const onSubmit = async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required("O nome é obrigatório."),
      email: Yup.string()
        .email("Insira um e-mail válido.")
        .required("O e-mail é obrigatório."),
    });

    try {
      await onValidate(schema);
      dispatch(Friends.update(id, values));
    } catch (error) {
      // toaster.warning('Os dados fornecidos são inválidos.');
      onFailed(error);
    }
  };

  return (
    <Card
      size="large"
      title="Editar amigo"
      bodyStyle={{
        justifyContent: "center",
      }}
      extra={
        <div className="container">
          <Button type="primary" style={{ marginRight: 4 }} onClick={onSubmit}>
            Adicionar
          </Button>
          <Button onClick={() => history.goBack()}>Retornar</Button>
        </div>
      }
    >
      <Skeleton loading={loading} avatar active />
      {loading === false && (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 6 }}
          layout="horizontal"
          size="large"
        >
          <Form.Item
            label="Nome"
            validateStatus={errors && errors.name ? "error" : ""}
            help={errors && errors.name ? errors.name : ""}
          >
            <Input
              value={values && values.name ? values.name : ""}
              onChange={(evt) => onChangeText("name", evt.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors && errors.email ? "error" : ""}
            help={errors && errors.email ? errors.email : ""}
          >
            <Input
              value={values && values.email ? values.email : ""}
              onChange={(evt) => onChangeText("email", evt.target.value)}
            />
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default FriendCreate;
