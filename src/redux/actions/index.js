import api from "../../api";
import { SET_DATA, SET_GITHUB_METRICS } from "../actions/types";

const API_URL = "http://localhost:2017/public";

export const getData = () => async (dispatch) => {
  const fullUrl =
    "https://spreadsheets.google.com/feeds/cells/1ukyfSbFD8WdtN0DXNMGi9I5YOeYHE_8x_Na6wNZKbAk/1/public/full?alt=json";
  try {
    const res = await api.get(fullUrl);
    const { data } = res;
    dispatch({ type: SET_DATA, payload: { data: JSON.stringify(data) } });
  } catch (error) {
    console.error(error);
    dispatch({ type: SET_DATA, payload: { data: "Error when fetching" } });
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