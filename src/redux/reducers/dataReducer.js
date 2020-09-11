import { SET_DATA } from "../actions/types";

const initialState = {
  data: "No data",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return { ...state, data: action.payload.data };
    }
    default: {
      return state;
    }
  }
};

export default dataReducer;
