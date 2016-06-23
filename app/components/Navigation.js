import React, {Component} from 'react'
import ReactRouter, {Link} from 'react-router'

class Navigation extends Component {
  render() {
    return (

      <div className='navigation'>
        <Link to='/'>
          <div type='button'>Home</div>
        </Link>
        <Link to='/about'>
          <div type='button'>About</div>
        </Link>
        <Link to='/contact'>
          <div type='button'>Contact</div>
        </Link>
      </div>

    )
  }
}

export default Navigation
