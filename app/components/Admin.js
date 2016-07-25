import React, { Component } from 'react'
import '../main.css'
import { getFetchConfig } from '../utils/helperFunctions'
import update from 'react-addons-update'

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      images: [],
      about: '',
      categoryName: '',
      showNewCategoryForm: false,
      showEditCategoryForm: false,
      editCategoryId: null,

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

  editCategory(id, name) {
    this.setState({
      categoryName:name,
      showEditCategoryForm:!this.state.showEditCategoryForm,
      editCategoryId:id,
    })
  }

  renderCategoryForm() {
    return (
      <div>
        <input
          className='field'
          placeholder='Create new category'
          value={this.state.categoryName}
          onChange={(e) => {this.handleCategoryChange(e.target.value)}}>
        </input>
        <button
          className='field'
          onClick={() => {this.submitCategory()}}>OK</button>
      </div>
    )
  }

  render() {

    console.log(this.state)

    return (
      <div className='main-container'>
        <h1 className='adminLogo'>DRATELE PHOTOGRAPHY admin panel</h1>
        <div className='admin'>

          <div className='adminCategories'>
            <h2>CATEGORIES:</h2>

            <div className='buttonAddNew' onClick={()=>{this.setState({
                showNewCategoryForm:!this.state.showNewCategoryForm,
                categoryName:'',
                editCategoryId:null
              })}}>
              + Add new category
            </div>
            {this.state.showNewCategoryForm && <div>{this.renderCategoryForm()}</div>}


            {this.state.categories.map((cat, i) => {
              let images = this.state.images.filter(img => img.categoryId === cat.id)
              return <div key={i}>
                <h3 className='catName'>{cat.name}
                  {this.state.showEditCategoryForm && this.state.editCategoryId === cat.id && <div className='editField'>{this.renderCategoryForm()}</div>}
                  <div className='button' onClick={()=>{this.editCategory(cat.id, cat.name)}}>
                  Rename
                  </div>
                  <div className='button' onClick={()=>{this.deleteCategory(cat.id)}}>
                  Delete category
                  </div>
                  <div className='button' onClick=''>
                  + Add new photo
                  </div>
                </h3>

                {images.map((img, j) =>
                  <div  className='thumbContainer' key={j}>
                    <img className='thumb' src={`/${img.imagePath}`} />
                    <div className='thumb-overlay'>
                      <span>{img.title}</span>
                      <div className='buttonAddNew' onClick=''>Delete</div>
                    </div>
                  </div>
                )}
                <hr/>
              </div>
            })}
          </div>

          <div className='adminAbout'>
            <h2>ABOUT:</h2>
              <textarea
                className='field'
                value={this.state.about}
                onChange={(e) => {this.handleAboutChange(e.target.value)}}>
              </textarea>
            <div
              className='buttonAddNew'
              type='submit'
              onClick={() => {this.onUpdateAbout()}}
              >Update Text
            </div>
          </div>

        </div>
      </div>
    )
  }

  handleCategoryChange(value) {
    this.setState({categoryName: value})
  }

  submitCategory() {
    if (this.state.editCategoryId) {

      let body = {
        id: this.state.editCategoryId,
        name: this.state.categoryName
      }

      fetch('/api/categories', getFetchConfig(body, 'PUT'))
      .then((response) => {
        if (!response.ok) return Promise.reject(response.statusText)
        return response.json()
      })
      .then(cat => {
        let index = this.state.categories.findIndex(el => el.id === cat.id)
        this.setState(
          Object.assign({}, this.state, {
            categories: update(this.state.categories, {[[index]]: {$set: cat}}),
            showEditCategoryForm: false
          })
        )
      })
      .catch(err => console.log('Serv: ', err))

    } else {
      fetch('/api/categories', getFetchConfig({name:this.state.categoryName}, 'POST'))
      .then((response) => {
        if (!response.ok) return Promise.reject(response.statusText)
        return response.json()
      })
      .then(cat => {
        console.log(cat)
        this.setState(
          Object.assign({}, this.state, {
            categories: update(this.state.categories, {$push: [cat]}),
            showNewCategoryForm: false
          })
        )
      })
      .catch(err => console.log('Serv: ', err))
    }
  }

  deleteCategory(id) {
    fetch(`/api/categories/delete/${id}`, getFetchConfig(null, 'GET'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(res => {
      console.log(res)
      let index = this.state.categories.findIndex(el => el.id === id)
      this.setState(
        Object.assign({}, this.state, {
          categories: update(this.state.categories, {$splice: [[index, 1]]}),
        })
      )
    })
    .catch(err => console.log('Serv: ', err))
  }

  handleAboutChange(value) {
    this.setState({about: value})
  }

  onUpdateAbout() {
    fetch('/api/about', getFetchConfig({about:this.state.about}, 'POST'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(text => {
      // let index = this.state.categories.findIndex(el => el.id === cat.id)
      this.setState(
        Object.assign({}, this.state, {
          categories: update(this.state.about, {$set: text})
        })
      )
    })
    .catch(err => console.log('Serv: ', err))
  }



}

export default Admin
