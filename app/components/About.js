import React, {Component} from 'react'

class About extends Component {

  render() {
    return (
      <div className='about'>
        <h1>{this.props.route.header}</h1>
        <p>Some about text goes here</p>
      </div>
    )
  }

}

export default About
