import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Reducer, initialState } from "./reducer";

export const ConfigureStore = () => {
	const store = createStore(
		Reducer, // reducer
		initialState // our initialState
	);

	return store;
};
