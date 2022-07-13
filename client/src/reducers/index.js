import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import fileReducer from "./fileReducer";
import appReducer from "./appReducer";
import uploadReducer from "./uploadReducer";


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    app: appReducer,
    upload: uploadReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))