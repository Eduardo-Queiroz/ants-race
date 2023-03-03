import { fork } from "redux-saga/effects";

import authSaga from "./ant";

export default function* root() {
  try {
    yield fork(authSaga);
  } catch (e) {
    console.error(e);
  }
}
