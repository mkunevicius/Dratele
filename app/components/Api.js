import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../main.css'

class Api extends Component {
  render() {
    return (

      <div className='main-container'>
        <h1>DRATELE PHOTORAPHY</h1>

        {/*<ReactCSSTransitionGroup
          transitionName="appear"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {React.cloneElement(this.props.children, {key:this.props.location.pathname})}
        </ReactCSSTransitionGroup>*/}
        <div>
          {/*{this.props.children}*/}
        </div>

      </div>

    )
  }
}

export default Api
