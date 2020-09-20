import { 
  SET_DATA, 
  SET_GITHUB_METRICS, 
  TOGGLE_GITHUB_DETAILS,
  SET_PROJECT_DATA,
  SET_OKRS
} from "../actions/types";

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
  okrs: {
    rifPrice: 0,
    staking: {
      rdoc: 0,
      total: 0,
      totalUsd: 0,
      percentage: 0,
    }
  },
  projects: []
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return { ...state, data: action.payload.data };
    }
    case SET_OKRS: {
      console.log("SET_OKRS");
      const data = action.payload.data.data;
      const okrValue = {
        rifPrice: data.rifPrice,
        staking: {
          rdoc: data.rdoc,
          total: data.rdoc,
          totalUsd: data.rdoc * data.rifPrice,
          percentage: (((data.rdoc * data.rifPrice) * 100) / 13000000),
        }
      };
      return { ...state, okrs: okrValue };
    }
    case SET_PROJECT_DATA: {
      const json = JSON.parse(action.payload.data);
      const entries = json.feed.entry;

      let projectsData = [];
      let pos = 5; // we start in entry 5 because until 4 is the header of the spreadsheet
      
      while (pos < entries.length) {
        const categoryValue = entries[pos].content['$t'];
        pos++;
        const projectValue = entries[pos].content['$t'];
        pos++;
        const statusValue = entries[pos].content['$t'];
        pos++;
        const testnetValue = entries[pos].content['$t'];
        pos++;
        const mainnetValue = entries[pos].content['$t'];
        pos++;

        const entry = {
          category: categoryValue,
          name: projectValue,
          status: statusValue,
          testnet: testnetValue,
          mainnet: mainnetValue,
          events: [],
        };
        projectsData.push(entry);
      }

      return { ...state, projects: projectsData }
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
