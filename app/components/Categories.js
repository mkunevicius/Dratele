import React, {Component, PropTypes} from 'react';
import {getFetchConfig} from '../utils/helperFunctions';
import ReactRouter, {Link} from 'react-router';
import classnames from 'classnames'

class Categories extends Component {

  constructor() {
    super();
    this.state = {
      categories: [],
      active: false,
      hover: false
    };
  }

  handleClick() {
    this.setState({ active: true });
  }
  handleMouseOver() {
    this.setState({ hover: true });
  }
  handleMouseOut() {
    this.setState({ hover: false });
  }

  componentDidMount() {

    fetch('/api/categories', getFetchConfig(null, 'GET'))
      .then((response) => {
        if (!response.ok) return Promise.reject(response.statusText)
        return response.json()
      })
      .then(data => {
        this.setState({
          categories: data
        })
      })
  }

  render() {

    let classes = classnames({
      active: this.state.active,
      hover: this.state.hover,

    });

    return (
      <div className='main-container'>
        <div className='categories'>
          {this.state.categories.map((cat, i) =>
            <Link key={i} to={`/gallery/${cat.name}`}>
              <div
                className={classes}
                onClick={this.handleClick.bind(this)} onMouseOver={this.handleMouseOver.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}
                type='button'
                >
                {cat.name}
              </div>
            </Link>
          )}
        </div>
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
      </div>
    );
  }

}

export default Categories
