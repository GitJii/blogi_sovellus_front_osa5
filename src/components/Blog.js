import React from 'react'
import Url from './Url'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      user: props.user,
      fullBlog: false,
      likes: 0
    }
  }

  toggleFullBlog = () => {
    this.setState({ fullBlog: !this.state.fullBlog })
  }

  likeButton = () => {
    this.setState({ likes: this.state.likes + 1 })
  }

  render() {
    const blogStyle = {
      paddingTop: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 2
    }

    const showWhenVisible = { display: this.state.fullBlog ? '' : 'none' }

    return (
      <div >
        <div>
          <div style={blogStyle}>
            <div onClick={this.toggleFullBlog}>{this.state.blog.title + ' ' + this.state.blog.author}</div>
            <div style={showWhenVisible}>
              <Url address={this.state.blog.url} />
              {this.state.blog.likes + ' likes '}

              <button onClick={this.likeButton}>{this.props.buttonLabel}</button>
              <div></div>
              {'added by ' + this.state.user}
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Blog