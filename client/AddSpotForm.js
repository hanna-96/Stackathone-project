import React, {Component} from 'react'
export default class AddSpotForm extends Component {
  constructor() {
    super()
    this.state = {
      id:"",
      name: '',
      image: '',
      description: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addSpot(this.state.id,this.state.name,this.state.image,this.state.description)

    // this.props.addSpot(this.state)
    this.setState({
      id:"",
      name: '',
      image: '',
      description: ''
    })
  }
  render() {
    console.log('the props i  form',this.props)
    return (
      <div className="box">
        {/* <h1>Add form</h1> */}
         <form onSubmit={this.handleSubmit}>
          <h1 className="title is-5">Add new product</h1>
          <div>
            <input
              className="input"
              placeholder="Spot id"
              type="text"
              name="id"
              onChange={this.handleChange}
              value={this.state.id}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Spot name"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <br />

          <div>
            <input
              className="input"
              placeholder="Spot image"
              type="text"
              name="image"
              onChange={this.handleChange}
              value={this.state.image}
            />
          </div>
          <br />

          <div>
            <input
              className="input"
              placeholder="Spot description"
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>
          <br />

          <button className="button is-success is-light" type="submit">
            Submit
          </button>
        </form> 
        <br />
      </div>
    )
  }
}
