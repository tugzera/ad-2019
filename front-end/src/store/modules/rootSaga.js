import { all } from "redux-saga/effects";
import friends from "./friends/sagas";

export default function* rootSaga() {
  return yield all([friends]);
}
