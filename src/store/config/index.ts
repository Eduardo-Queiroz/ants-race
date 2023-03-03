import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
//reducer
import reducers from "../reducers";
//saga
import sagaRoot from "../sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(sagaRoot);
