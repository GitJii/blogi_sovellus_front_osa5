import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import SuccessNotification from './components/SuccessNotification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      password: '',
      visible: '',
      fullBlog: '',
      user: null,
      success: null,
      error: null
    }
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }

    blogService
      .getAll()
      .then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        this.setState({ blogs })
      })
  }

  addBlog = (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      this.blogForm.toggleVisibility()

      blogService
        .create(blogObject)
        .then(newBlog => {
          this.setState({
            blogs: this.state.blogs.concat(newBlog),
            title: '',
            author: '',
            url: ''
          })
        })

      this.setState({
        success: 'a new blog "' +
          blogObject.title + '" by ' +
          blogObject.author + ' has been added'
      })
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'something went wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })

    console.log('logging in with', this.state.username, this.state.password)
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogLike = (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, changedBlog)
      .then(() => {
        this.setState({
          blogs: this.state.blogs.map(u => u.id !== changedBlog.id ? u : changedBlog)
        })
      })
  }

  handleBlogDelete = (blog) => {

    const deletedBlog = this.state.blogs.find(dBlog =>
      dBlog.id === blog.id
    )

    if (window.confirm('Do you really want to delete blog ' +
      deletedBlog.name + ' made by ' + deletedBlog.author)
    )
      blogService
        .remove(blog.id)
        .then(() => {
          const blogs = this.state.blogs.filter(b => b.id !== blog.id)
          this.setState({
            success: `${deletedBlog.name}  was deleted successfully`,
            blogs: blogs
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        })
  }



  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'either username or password is wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    try {

      window.localStorage.removeItem('loggedBlogappUser')
      this.setState({ username: '', password: '', user: null })
    } catch (exception) {
      this.setState({
        error: 'something went wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    const loginForm = () => {
      return (
        <Togglable buttonLabel="login">
          <LoginForm
            visible={this.state.visible}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange}
            handleSubmit={this.login}
          />
        </Togglable>
      )
    }

    const logoutForm = () => (
      <div>
        <form onSubmit={this.logout}>
          <button type="submit">Log out</button>
        </form>
      </div>
    )


    const blogForm = () => {
      return (
        <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
          <BlogForm
            visible={this.state.visible}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleChange={this.handleBlogChange}
            onSubmit={this.addBlog}
          />
        </Togglable>
      )
    }

    return (
      <div>
        <h1>Blogs</h1>
        <ErrorNotification message={this.state.error} />
        <SuccessNotification message={this.state.success} />

        {
          this.state.user === null ?
            loginForm() :
            <div>
              <p>{this.state.user.name} logged in</p>{logoutForm()}
              {blogForm()}

              <h2>Blogs</h2>

              {this.state.blogs.map(blog =>
                <div >

                  <Blog key={blog.id}
                    currentUser={this.state.user}
                    blog={blog}
                    user={blog.user.name}
                    onLike={() => this.handleBlogLike(blog)}
                    buttonLabel="like"
                    onDelete={() => this.handleBlogDelete(blog)}
                  />

                </div>
              )}
            </div>
        }
      </div >
    )
  }
}

export default App;