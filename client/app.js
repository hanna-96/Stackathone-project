// import React from "react";
// import { connect } from "react-redux";
// import { getAllSpotsThunk } from "./store/allSpots";
// import { Link } from "react-router-dom";

// class App extends React.Component {
//   componentDidMount() {
//     this.props.getSpots();
//   }
//   render() {
//     console.log('all spots are',this.props)
//     const spots = this.props.spots;
//     return (
//       <div className="parentOfSpots">
//         <h1>Welcome to the most beautiful places of Belarus!</h1>
//         {spots.map((spot) => {
//           return (
//             <div key={spot.id} className="spot">
//               <p>
//                 <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
//               </p>
//               <img src={spot.image} className="image" />
//               {/* <div>{spot.name}</div> */}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     spots: state.spots,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     getSpots: () => dispatch(getAllSpotsThunk()),
//   };
// };

// export default connect(mapState, mapDispatch)(App);
