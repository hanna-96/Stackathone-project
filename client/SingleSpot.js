import React from "react";
import { connect } from "react-redux";
import { getSingleSpotThunk } from "./store/singleSpot";

class SingleSpot extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleSpot(id);
  }
  render() {
    return (
      <div key={this.props.spot.id}>
        <div className="title">
          {this.props.spot.name}
        </div>
        <div className="image">
          <img src={this.props.spot.image} className = "image" />
        </div>
        <div className="description">
          {this.props.spot.description}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spot: state.spot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleSpot: (id) => dispatch(getSingleSpotThunk(id)),
    //     editProduct: (id, product) =>
    //       dispatch(updateSingleProductThunk(id, product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleSpot);
