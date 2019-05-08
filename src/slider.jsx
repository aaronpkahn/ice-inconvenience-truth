import React, { Component } from 'react'

export default class Slider extends Component {  
  render() {
    const { header } = this.props
    return(
      <div>
        <label className="control-label">
          <strong>{header}</strong>
        </label>
        <select onChange={this.props.onChange}>
          <option value="20">20</option>
          <option value="30" selected>30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
    )
  }
}