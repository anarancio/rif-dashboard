import { SET_DATA, SET_GITHUB_METRICS, TOGGLE_GITHUB_DETAILS } from "../actions/types";

const initialState = {
  data: "No data",
  github: {
    stars: 0,
    forks: 0,
    watchers: 0,
    data: [],
    dataByAttrs: {
      stars: [],
      watchers: [],
      forks: [],
    }
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
      const data = action.payload.data.data;
      
      let theStars = 0;
      let theForks = 0;
      let theWatchers = 0;
      let githubData = [];

      let starsArr = [];
      let watchersArr = [];
      let forksArr = [];

      let dataByAttribute = {
        stars: [],
        watchers: [],
        forks: [],
      };

      data.forEach(function(summary,index) { 
        theStars += summary.repo_stars;
        theForks += summary.repo_forks;
        theWatchers += summary.repo_watchers;

        if(!starsArr[summary.repo_category]) {
          starsArr[summary.repo_category] = {
            category: summary.repo_category,
            value: 0,
          };
          watchersArr[summary.repo_category] = {
            category: summary.repo_category,
            value: 0,
          };
          forksArr[summary.repo_category] = {
            category: summary.repo_category,
            value: 0,
          };
        }
        starsArr[summary.repo_category].value += summary.repo_stars;
        watchersArr[summary.repo_category].value += summary.repo_watchers;
        forksArr[summary.repo_category].value += summary.repo_forks;

        githubData.push({
          id: summary.id,
          category: summary.repo_category,
          stars: summary.repo_stars,
          watchers: summary.repo_watchers,
          forks: summary.repo_forks,
        });
      });

      for (let item in starsArr){
        dataByAttribute.stars.push( starsArr[item] );
      }
      for (let item in watchersArr){
        dataByAttribute.watchers.push( watchersArr[item] );
      }
      for (let item in forksArr){
        dataByAttribute.forks.push( forksArr[item] );
      }
      
      return { ...state,  github: {
        stars: theStars,
        forks: theForks,
        watchers: theWatchers,
        data: githubData,
        dataByAttrs: dataByAttribute,
      }}
    }
    default: {
      return state;
    }
  }
};

export default dataReducer;
