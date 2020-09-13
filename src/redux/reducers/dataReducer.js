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
  },
  projects: [
    {
      name: 'Marketplace - RNS',
      status: "On Track",
      testnet: true,
      mainnet: false,
      events: [
        {
          date: '02/01/2020',
          text: 'event 1',
          deliveryDate: '10/05/2020'
        },{
          date: '02/01/2020',
          text: 'event 2',
          deliveryDate: '10/05/2020'
        },{
          date: '02/01/2020',
          text: 'event 3',
          deliveryDate: '10/05/2020'
        },{
          date: '02/01/2020',
          text: 'event 4',
          deliveryDate: '10/05/2020'
        }
      ]
    },
    {
      name: 'Marketplace - Pinning',
      status: "On Track",
      testnet: false,
      mainnet: false,
      events: [
        {
          date: '02/01/2020',
          text: 'event 11',
          deliveryDate: '10/05/2020'
        },{
          date: '02/01/2020',
          text: 'event 12',
          deliveryDate: '10/05/2020'
        }
      ]
    },
    {
      name: 'Lumino - Transport layer refactor',
      status: "In Design",
      testnet: false,
      mainnet: false,
      events: []
    }
  ]
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
