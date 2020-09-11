import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const getStore = (initialState = {}) => {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument())
  );
  return createStore(rootReducer, initialState, enhancer);
};

const Store = getStore();

export default Store;
