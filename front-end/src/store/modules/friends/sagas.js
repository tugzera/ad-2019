import { all, call, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";
import api from "../../../services/api";

import history from "../../../services/history";

/**
 * Display a listing of the resource.
 */
export function* findManyEffect() {
  try {
    const response = yield call(api.get, `friends`);
    yield put({ type: "@friends/BROWSE_SUCCESS", payload: response.data });
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    yield put({ type: "@friends/BROWSE_FAILURE", failed });
  }
}

/**
 * Display the specified resource.
 */
export function* findOneEffect({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `friends/${id}`);
    yield put({
      type: "@friends/READ_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    yield put({ type: "@friends/READ_FAILURE", failed });
  }
}

/**
 * Store a newly created resource in storage.
 */
export function* storeEffect({ payload }) {
  try {
    const { data } = payload;
    const response = yield call(api.post, `friends`, data);
    yield put({ type: "@friends/ADD_SUCCESS", payload: response.data });
    history.goBack();
    message.success("Amigo cadastrado com sucesso!");
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    message.error("Desculpe, não foi possível cadastrar.");
    yield put({ type: "@friends/ADD_FAILURE", failed });
  }
}

/**
 * Update the specified resource in storage.
 */
export function* updateEffect({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(api.put, `friends/${id}`, data);

    yield put({ type: "@friends/EDIT_SUCCESS", payload: response.data });
    history.goBack();
    message.success("Amigo atualizado com sucesso!");
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    message.error("Desculpe, não foi possível atualizar.");
    yield put({ type: "@friends/EDIT_FAILURE", failed });
  }
}

/**
 * Remove the specified resource from storage.
 */
export function* destroyEffect({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `friends/${id}`);
    yield put({ type: "@friends/DESTROY_SUCCESS", payload: { id } });
    message.success("Amigo excluído com sucesso!");
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    message.error("Desculpe, não foi possível excluir este item.");
    yield put({ type: "@friends/DESTROY_FAILURE", failed });
  }
}

export default all([
  takeLatest("@friends/BROWSE_REQUEST", findManyEffect),
  takeLatest("@friends/READ_REQUEST", findOneEffect),
  takeLatest("@friends/ADD_REQUEST", storeEffect),
  takeLatest("@friends/EDIT_REQUEST", updateEffect),
  takeLatest("@friends/DESTROY_REQUEST", destroyEffect),
]);
