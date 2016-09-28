import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../main.css'
import Categories from './Categories'

class Main extends Component {
  render() {
    return (

      <div className='main-container'>
        <h1 className='logo'>DRATELE PHOTOGRAPHY</h1>
        <Categories />

        <ReactCSSTransitionGroup
          transitionName="appear"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {React.cloneElement(this.props.children, {key:this.props.location.pathname})}
        </ReactCSSTransitionGroup>

      </div>

    )
  }
}

export default Main
