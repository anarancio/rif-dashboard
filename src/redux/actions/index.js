import api from "../../api";
import { 
  SET_DATA, 
  SET_GITHUB_METRICS,
  SET_PROJECT_DATA,
  SET_OKRS
} from "../actions/types";

const API_URL = "http://localhost:2017/public";

export const getProjectData = () => async (dispatch) => {
  const fullUrl =
    "https://spreadsheets.google.com/feeds/cells/1ukyfSbFD8WdtN0DXNMGi9I5YOeYHE_8x_Na6wNZKbAk/1/public/full?alt=json";
  try {
    const res = await api.get(fullUrl);
    const { data } = res;
    dispatch({ type: SET_PROJECT_DATA, payload: { data: JSON.stringify(data) } });
  } catch (error) {
    console.error(error);
  }
};

export const getGithubSummary = () => async (dispatch) => {
  const fullUrl = API_URL + "/github/summary";
  try {
    const res = await api.get(fullUrl);
    dispatch({ type: SET_GITHUB_METRICS, payload: { data: res } });
  } catch (error) {
    console.error(error);
  }
};

export const getOkrsSummary = () => async (dispatch) => {
  const fullUrl = API_URL + "/okrs";
  try {
    const res = await api.get(fullUrl);
    dispatch({ type: SET_OKRS, payload: { data: res } });
  } catch (error) {
    console.error(error);
  }
}