import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "../../../services/api";
// import { toaster } from "evergreen-ui";

import history from "../../../services/history";

/**
 * Display a listing of the resource.
 */
export function* findManyEffect() {
  try {
    const response = yield call(api.get, `v1/vendedores`);
    yield put({ type: "@vendedores/BROWSE_SUCCESS", payload: response.data });
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    yield put({ type: "@vendedores/BROWSE_FAILURE", failed });
    // toaster.danger(failed.errors.message);
  }
}

/**
 * Display the specified resource.
 */
export function* findOneEffect({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `v1/vendedores/${id}`);

    yield put({
      type: "@vendedores/READ_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    yield put({ type: "@vendedores/READ_FAILURE", failed });
    // toaster.danger(failed.errors.message);
  }
}

/**
 * Store a newly created resource in storage.
 */
export function* storeEffect({ payload }) {
  try {
    const { data } = payload;
    const response = yield call(api.post, `v1/vendedores`, data);
    yield put({ type: "@vendedores/ADD_SUCCESS", payload: response.data });
    // toaster.success("Vendedor cadastrado com sucesso!!");
    history.goBack();
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    yield put({ type: "@vendedores/ADD_FAILURE", failed });
    // toaster.danger(
    //   `${failed.errors.message}${
    //     failed.errors.details
    //       ? failed.errors.details.map((item) => item.message)
    //       : ""
    //   }`
    // );
  }
}

/**
 * Update the specified resource in storage.
 */
export function* updateEffect({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(api.patch, `v1/vendedores/${id}`, data);

    yield put({ type: "@vendedores/EDIT_SUCCESS", payload: response.data });
    // toaster.success("Vendedor atualizado com sucesso!!");
    history.goBack();
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    yield put({ type: "@vendedores/EDIT_FAILURE", failed });
    // toaster.danger(failed.errors.message);
  }
}

/**
 * Remove the specified resource from storage.
 */
export function* destroyEffect({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `v1/vendedores/${id}`);
    yield put({ type: "@vendedores/DESTROY_SUCCESS", payload: { id } });
    // toaster.success("Vendedor excluído com sucesso!!");
  } catch (error) {
    const failed = error.response
      ? error.response.data
      : { errors: { message: error.message } };
    yield put({ type: "@vendedores/DESTROY_FAILURE", failed });
    // toaster.danger(failed.errors.message);
  }
}

export default all([
  takeLatest("@vendedores/BROWSE_REQUEST", findManyEffect),
  takeLatest("@vendedores/READ_REQUEST", findOneEffect),
  takeLatest("@vendedores/ADD_REQUEST", storeEffect),
  takeLatest("@vendedores/EDIT_REQUEST", updateEffect),
  takeLatest("@vendedores/DESTROY_REQUEST", destroyEffect),
]);
