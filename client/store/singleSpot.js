import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_SPOT = "GET_SPOT";
const ADD_SPOT = "ADD_SPOT";
/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const getSpot = (spot) => ({ type: GET_SPOT, spot });
// const addSpot = (spot)=>{
//   return {
//     type:ADD_SPOT,
//     spot
//   }

// }
/**
 * THUNK CREATORS
 */
export const getSingleSpotThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/spots/${id}`);
      const spot = {
        id: data.id.S,
        description: data.description.S,
        image: data.image.S,
        name: data.name.S,
      };
      dispatch(getSpot(spot));
    } catch (error) {
      console.error(error);
    }
  };
};
// export const addSpotThunk = (id, name, image, description) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post(`/api/spots/add`,{id,name, image, description});
//       // const spot = {
//       //   id: data.id.S,
//       //   description: data.description.S,
//       //   image: data.image.S,
//       //   name: data.name.S,
//       // };
//       dispatch(addSpot(spot));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPOT:
      return action.spot;
      // case ADD_SPOPT:
      //   action.spot
    default:
      return state;
  }
}
