import api from "src/api";
import { SET_DATA } from "src/redux/actions/types";

export const getData = () => async (dispatch) => {
  const fullUrl =
    "https://spreadsheets.google.com/feeds/cells/1ukyfSbFD8WdtN0DXNMGi9I5YOeYHE_8x_Na6wNZKbAk/1/public/full?alt=json";
  try {
    const res = await api.get(fullUrl);
    const { data } = res;
    return dispatch({ type: SET_DATA, payload: { data: JSON.stringify(data) } });
  } catch (error) {
    console.error(error);
    return dispatch({
      type: SET_DATA,
      payload: { data: 'Error when fetching' },
    });
  }
};
