import React, {Component, PropTypes} from 'react';
import {getFetchConfig} from '../utils/helperFunctions';
import ReactRouter, {Link} from 'react-router';
import classnames from 'classnames';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import '../main.css'
import MobileNav from 'react-icons/lib/io/navicon-round';

class Categories extends Component {

  constructor() {
    super();
    this.state = {
      categories: [],
      activeItem: window.location.pathname,
      dropdownOpen: false
    };
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

  handleClick(path) {
    this.setState({ activeItem: path });
  }

  onSelectDropdown() {
    this.setState({dropdownOpen: false})
  }

  render() {

    let homeClasses = classnames('menuItem');
    let contactClasses = classnames('menuItem');
    let aboutClasses = classnames('menuItem');
    let dropdownClasses = classnames('dropdown--active');

    if (this.state.dropdownOpen === false)
      dropdownClasses = classnames({'dropdown--active': false});

    if (this.state.activeItem === '/')
      homeClasses = classnames('menuItem', {active: true});

    if (this.state.activeItem === '/about')
      aboutClasses = classnames('menuItem', {active: true});

    if (this.state.activeItem === '/contact')
      contactClasses = classnames('menuItem', {active: true});

    return (
      <div className='main-container'>

        <Dropdown className={dropdownClasses}>
          <DropdownTrigger><MobileNav /></DropdownTrigger>
          <DropdownContent>
            <ul onClick={() => {this.onSelectDropdown()}}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <hr/>
            <ul>
              {this.state.categories.map((cat, i) => {
                let catClasses = classnames('menuItem', {
                  active: this.state.activeItem === `/gallery/${cat.name}`
                });
                return <li key={i}><Link to={`/gallery/${cat.name}`}
                    onClick={this.handleClick.bind(this, `/gallery/${cat.name}`)}
                    type='button'
                    >
                    {cat.name}
                </Link></li>
              })}
            </ul>
          </DropdownContent>
        </Dropdown>


        <div className='categories'>

          {this.state.categories.map((cat, i) => {
            let catClasses = classnames('menuItem', {
              active: this.state.activeItem === `/gallery/${cat.name}`
            });
            return <Link key={i} to={`/gallery/${cat.name}`}
                className={catClasses}
                onClick={this.handleClick.bind(this, `/gallery/${cat.name}`)}
                type='button'
                >
                {cat.name}
            </Link>
          })}

        </div>

        <div className='navigation'>
          <Link to='/'
              className={homeClasses}
              onClick={this.handleClick.bind(this, '/')}
              type='button'>
              Home
          </Link>
          <Link to='/about'
              className={aboutClasses}
              onClick={this.handleClick.bind(this, '/about')}
              type='button'>
              About
          </Link>
          <Link to='/contact'
            className={contactClasses}
            onClick={this.handleClick.bind(this, '/contact')}
            type='button'>
              Contact
          </Link>
        </div>
      </div>
    );
  }
}

export default Categories
