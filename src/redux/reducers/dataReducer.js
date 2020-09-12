import { SET_DATA, SET_GITHUB_METRICS } from "../actions/types";

const initialState = {
  data: "No data",
  github: {
    stars: 200,
    forks: 10,
    watchers: 100,
  }
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return { ...state, data: action.payload.data };
    }
    case SET_GITHUB_METRICS: {
      return { ...state }
    }
    default: {
      return state;
    }
  }
};

export default dataReducer;
