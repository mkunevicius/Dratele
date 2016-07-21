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

            <div onClick={()=>{this.setState({
                showNewCategoryForm:!this.state.showNewCategoryForm,
                categoryName:'',
                editCategoryId:null
              })}}>
              Add new category
            </div>
            {this.state.showNewCategoryForm && <div>{this.renderCategoryForm()}</div>}

            {this.state.categories.map((cat, i) => {
              let images = this.state.images.filter(img => img.categoryId === cat.id)
              return <div key={i}>
                <h3 className='catName'>{cat.name}</h3>
                <div onClick={()=>{this.editCategory(cat.id, cat.name)}}>
                  edit
                </div>
                <div onClick={()=>{this.deleteCategory(cat.id)}}>
                  delete
                </div>

                {this.state.showEditCategoryForm && this.state.editCategoryId === cat.id && <div>{this.renderCategoryForm()}</div>}

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
            <button
              className='field'
              type='submit'
              onSubmit={this.onUpdateAbout.bind(this)}
              name='submit'>Update Text</button>
            </form>
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
            categories: update(this.state.categories, {[[index]]: {$set: cat}})
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
          categories: update(this.state.categories, {$splice: [[index, 1]]})
        })
      )
    })
    .catch(err => console.log('Serv: ', err))
  }

  onUpdateAbout() {

  }



}

export default Admin
