import React, {Component} from 'react'
import '../main.css'
import {getFetchConfig} from '../utils/helperFunctions';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      images: [],
      about: ''
    };
  }

  componentDidMount() {
    fetch('/api/data', getFetchConfig(null, 'GET'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(data => {
      this.setState({
        categories: data.categories,
        images: data.images,
        about: data.about.text
      })
    })
  }

  render() {
    return (
      <div className='main-container'>
        <h1 className='adminLogo'>DRATELE PHOTORAPHY admin panel</h1>

        <div className='admin'>

          <div className='adminCategories'>
            <h2>CATEGORIES:</h2>
            <form>
              <input className='field' placeholder='Create new category'></input>
              <button className='field' type='submit' name='submit'>Create New</button>
            </form>
            {this.state.categories.map((cat, i) => {
              let images = this.state.images.filter(img => img.categoryId === cat.id)
              return <div key={i}>
                <h3 className='catName'>{cat.name}</h3>
                {images.map((img, j) =>
                  <div  className='thumbContainer' key={j}>
                    <img className='thumb' src={`/${img.imagePath}`} />
                  </div>
                )}
                <hr/>
              </div>
            })}
          </div>

          <div className='adminAbout'>
            <h2>ABOUT:</h2>
            <form>
            <textarea className='field' value={this.state.about}></textarea>
            <button className='field' type='submit' name='submit'>Update Text</button>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

export default Admin
