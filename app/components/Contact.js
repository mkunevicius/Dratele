import React, {Component, PropTypes} from 'react'

class Contact extends Component {
  render() {
    return (

      <div>
        <h1>This is {this.props.route.header}</h1>
        <p>Some contact text and links</p>
      </div>

    )
  }
}

export default Contact
