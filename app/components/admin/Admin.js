import React, { Component } from 'react'
import '../../main.css'
import { getProtectedFetchConfig } from '../../utils/helperFunctions'
import update from 'react-addons-update'
import { browserHistory } from 'react-router';
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

  // get all categories server
  componentDidMount() {
    fetch('/api/admin/categories', getProtectedFetchConfig(null, 'GET'))
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
      categoryName: name,
      showEditCategoryForm: !this.state.showEditCategoryForm,
      editCategoryId: id
    })
  }

  // on cancel
  cancelSubmitCategory() {
    this.setState({
      showNewCategoryForm: false,
      showEditCategoryForm: false,
      editCategoryId: null
     })
  }

  // Input field for add new / edit category
  renderCategoryForm() {
    return (
      <div className='rename'>
        <input
          className='field'
          placeholder='Enter category name'
          value={this.state.categoryName}
          onChange={(e) => {this.handleCategoryChange(e.target.value)}}>
        </input>
        <div
          className='button'
          onClick={() => {this.submitCategory()}}>OK</div>
        <div
          className='button'
          onClick={() => {this.cancelSubmitCategory()}}>Cancel</div>
      </div>
    )
  }

  // on log out
  logout() {
    localStorage.removeItem('token')
    browserHistory.push('/login')

    // fetch('/logout', getProtectedFetchConfig(null, 'GET'))
    // .then((response) => {
    //   if (!response.ok) return Promise.reject(response.statusText)
    //   return response.json()
    // })
    // .then((response) => {
    //   localStorage.removeItem('token')
    //   browserHistory.push('/login')
    // })
  }

  render() {
    return (
      <div className='main-container'>
        <h1 className='logo'>DRATELE PHOTOGRAPHY
          <p>Logged in as: dratele
            <span className='button' onClick={()=>{this.logout()}}> Log out</span>
          </p>
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
            <hr />
            {this.state.categories.map((cat, i) => {
              return (
                <div key={i}>

                  <div>
                    {(!this.state.editCategoryId || this.state.editCategoryId !== cat.id) &&
                    <h3 className='catName'>{cat.name}</h3>}
                    {this.state.showEditCategoryForm && this.state.editCategoryId === cat.id &&
                    <div className='editField'>{this.renderCategoryForm()}</div>}
                    {(!this.state.editCategoryId || this.state.editCategoryId !== cat.id) &&
                    <div className='button' onClick={()=>{this.editCategory(cat.id, cat.name)}}>
                    Rename
                    </div>}
                    <div className='button' onClick={()=>{this.deleteCategory(cat.id)}}>
                    Delete category
                    </div>
                  </div>

                  <AdminImageList categoryId={cat.id} />
                  <hr />
                </div>
              ) // end return
            })}
          </div>
          <AdminAbout />
        </div>
      </div>
    ) // end return
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
      fetch('/api/admin/categories', getProtectedFetchConfig(body, 'PUT'))
      .then((response) => {
        if (!response.ok) return Promise.reject(response.statusText)
        return response.json()
      })
      .then(cat => {
        let index = this.state.categories.findIndex(el => el.id === cat.id)
        this.setState(
          Object.assign({}, this.state, {
            categories: update(this.state.categories, {[[index]]: {$set: cat}}),
            showEditCategoryForm: false,
            editCategoryId: null
          })
        )
      })
      .catch(err => console.log('Serv: ', err))
      // Add new category
    } else {
      fetch('/api/admin/categories', getProtectedFetchConfig({name:this.state.categoryName}, 'POST'))
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
    if (confirm('Ramune, do you really want to delete this category with all images?')) {
      fetch(`/api/admin/categories/delete/${id}`, getProtectedFetchConfig(null, 'GET'))
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
