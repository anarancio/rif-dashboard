import { combineReducers } from "redux";
import dataReducer from "src/redux/reducers/dataReducer";
import sidebarReducer from 'src/redux/reducers/sidebarReducer';

const rootReducer = combineReducers({ dataReducer, sidebarReducer });

export default rootReducer;
