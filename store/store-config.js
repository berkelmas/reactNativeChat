import { applyMiddleware, compose, createStore } from "redux";
import { createRootReducer } from "./reducers/index";
import thunk from "redux-thunk";

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    applyMiddleware(thunk)
  );

  return store;
}
