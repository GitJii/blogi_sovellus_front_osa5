import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      password: '',
      user: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlog,
      author: this.state.user.name,
      url: 'URL tulee tänne'
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: ''
        })
      })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })

    console.log('logging in with', this.state.username, this.state.password)
  }

  handleBlogChange = (event) => {
    this.setState({ newBlog: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

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

  render() {
    const loginForm = () => (
      <div>
        <h3>Log in</h3>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>Write a new blog</h2>

        <form onSubmit={this.addBlog}>
          <input
            value={this.state.newBlog}
            onChange={this.handleBlogChange}
          />
          <button type="submit">lähetä</button>
        </form>
      </div>
    )

    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            {blogForm()}
          </div>
        }

        <h2>Blogs</h2>

        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App;
