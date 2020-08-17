import React from "react";
import { connect } from "react-redux";
import { getAllSpotsThunk,addSpotThunk,removeSpotThunk } from "./store/allSpots";
import { Link } from "react-router-dom";
import AddSpotForm from './AddSpotForm'
class AllSpots extends React.Component {
  componentDidMount() {
    this.props.getSpots();
  }
  render() {
    
    const spots = this.props.spots;
    console.log('all spots are',spots)
    return (
      <div className="parentOfSpots">
        <h1>Welcome to the most beautiful places of Belarus!</h1>
        {spots.map((spot) => {
          return (
            <div key={spot.id} className="spot">
              
              <div> 
                <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
              </div>
              <img src={spot.image} className="image"/>
              <div>
                <button
                      className="buttonCreateNewCampusOrStudent"
                      onClick={() => this.props.removeSpot(spot.id)}
                    >
                      Remove
                    </button>
                </div>
            </div>
          );
        })} 
        <div>
        
            <AddSpotForm addSpot = {this.props.addSpot} />
          
      </div>
      </div>
    
    );
  }
}

const mapState = (state) => {
  return {
    spots: state.spots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSpots: () => dispatch(getAllSpotsThunk()),
    addSpot:(id,name,image,description)=>dispatch(addSpotThunk(id,name,image,description)),
    removeSpot:(id)=>dispatch(removeSpotThunk(id))
  };
};

export default connect(mapState, mapDispatch)(AllSpots);
