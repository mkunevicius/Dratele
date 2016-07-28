import React, { Component } from 'react'
import '../../main.css'
import { getFetchConfig } from '../../utils/helperFunctions'
import update from 'react-addons-update'
import AdminImageList from './AdminImageList'
import AdminAbout from './AdminAbout'


class Admin extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryName: '',
      showNewCategoryForm: false,
      showEditCategoryForm: false,
      editCategoryId: null
    };
  }

  // get all data from server
  componentDidMount() {
    fetch('/api/admin/categories', getFetchConfig(null, 'GET'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(data => {
      this.setState({
        categories: data.categories
      })
    })
  }

  // if editing existing category name
  editCategory(id, name) {
    this.setState({
      categoryName:name,
      showEditCategoryForm:!this.state.showEditCategoryForm,
      editCategoryId:id,
    })
  }

  // Input for add new / edit category
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
          className='button'
          onClick={() => {this.submitCategory()}}>OK</button>
      </div>
    )
  }

  render() {
    console.log(this.state)
    return (
      <div className='main-container'>
        <h1 className='adminLogo'>DRATELE PHOTOGRAPHY admin
          <p>Logged in as: </p>
        </h1>
        <div className='admin'>
          <div className='adminCategories'>
            <h2>CATEGORIES:</h2>

            <div className='buttonAdd' onClick={()=>{this.setState({
                showNewCategoryForm:!this.state.showNewCategoryForm,
                categoryName:'',
                editCategoryId:null
              })}}>
              + Add new category
            </div>
            {this.state.showNewCategoryForm && <div>{this.renderCategoryForm()}</div>}
            {this.state.categories.map((cat, i) => {
              return <div key={i}>

                <div>
                  <h3 className='catName'>{cat.name}</h3>
                  {this.state.showEditCategoryForm && this.state.editCategoryId === cat.id && <div className='editField'>{this.renderCategoryForm()}</div>}
                  <div className='button' onClick={()=>{this.editCategory(cat.id, cat.name)}}>
                  Rename
                  </div>
                  <div className='button' onClick={()=>{this.deleteCategory(cat.id)}}>
                  Delete category
                  </div>
                </div>

                <AdminImageList categoryId={cat.id} />
                <hr/>

              </div>
            })}
          </div>

          <AdminAbout />

        </div>
      </div>
    )
  }

  // Category name input change handler
  handleCategoryChange(value) {
    this.setState({categoryName: value})
  }

  // Add new / edit category
  submitCategory() {
    // Edit category name
    if (this.state.editCategoryId) {
      let body = {
        id: this.state.editCategoryId,
        name: this.state.categoryName
      }
      fetch('/api/admin/categories', getFetchConfig(body, 'PUT'))
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
      // Add new category
    } else {
      fetch('/api/admin/categories', getFetchConfig({name:this.state.categoryName}, 'POST'))
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

  // Delete category
  deleteCategory(id) {
    if (confirm('Ramune, do you really want to delete this image?')) {
      fetch(`/api/admin/categories/delete/${id}`, getFetchConfig(null, 'GET'))
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
  }

} // end class Admin Component

export default Admin
