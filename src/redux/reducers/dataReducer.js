import { SET_DATA, SET_GITHUB_METRICS, TOGGLE_GITHUB_DETAILS } from "../actions/types";

const initialState = {
  data: "No data",
  github: {
    stars: 200,
    forks: 10,
    watchers: 100,
    data: [
      {
        id: 'marketplace',
        stars: 10,
        watchers: 5,
        forks: 6,
      },
      {
        id: 'payments',
        stars: 100,
        watchers: 45,
        forks: 3,
      },
      {
        id: 'comms',
        stars: 90,
        watchers: 50,
        forks: 1,
      }
    ],
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
