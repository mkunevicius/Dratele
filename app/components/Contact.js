import React, {Component, PropTypes} from 'react'

class Contact extends Component {
  render() {
    return (

      <div className='contact'>
        <h1>{this.props.route.header}</h1>
        <p>Some contact text and links</p>
      </div>

    )
  }
}

export default Contact
