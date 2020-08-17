import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_SPOTS = "GET_SPOTS";
const ADD_SPOT = "ADD_SPOT";
const REMOVE_SPOT = "REMOVE_SPOT";
/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const getSpots = (spots) => ({ type: GET_SPOTS, spots });
const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};
const removeSpot = (id) => {
  return {
    type: ADD_SPOT,
    id,
  };
};

/**
 * THUNK CREATORS
 */
export const getAllSpotsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/spots");
      const spots = data.map((spot) => {
        return {
          description: spot.description.S,
          id: spot.id.S,
          name: spot.name.S,
          image: spot.image.S,
        };
      });
      dispatch(getSpots(spots));
    } catch (error) {
      console.error(error);
    }
  };
};
export const addSpotThunk = (id, name, image, description) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/spots`, {
        id,
        name,
        image,
        description,
      });
      // const spot = {
      //   id: data.id.S,
      //   description: data.description.S,
      //   image: data.image.S,
      //   name: data.name.S,
      // };
      console.log("data from addthunk", data);
      dispatch(addSpot(data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const removeSpotThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/spots/${id}`);
      dispatch(removeSpot(id));
    } catch (error) {
      console.error(error);
    }
  };
};
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPOTS:
      return action.spots;
    case ADD_SPOT:
      return [...state, action.spot];
    case REMOVE_SPOT:
      return state.filter((spot) => spot.id !== action.id);
    default:
      return state;
  }
}
