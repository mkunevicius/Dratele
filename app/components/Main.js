import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../main.css'
import Navigation from '../components/Navigation'

class Main extends Component {
  render() {
    return (

      <div className='main-container'>

        This is Main
        <Navigation />

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
