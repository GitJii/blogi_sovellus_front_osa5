import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      password: '',
      user: null,
      success: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

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
        success: 'a new blog ' +  
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
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }

    const logoutForm = () => (

      <div>
        <form onSubmit={this.logout}>
          <button type="submit">Log out</button>
        </form>
      </div>
    )


    const blogForm = () => (
      <div>
        <h2>Write a new blog</h2>

        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleBlogChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleBlogChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleBlogChange}
            />
          </div>
          <button type="submit">send</button>
        </form>
      </div>
    )

    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={this.state.error} />
        <Notification message={this.state.success}/>

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>{logoutForm()}
            {blogForm()}

            <h2>Blogs</h2>

            {this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog} />
            )}
          </div>
        }
      </div>
    )
  }
}

export default App;