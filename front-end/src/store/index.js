import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import createStore from "./createStore";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import persistReducers from "./persistReducers";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middleware);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
