import React from 'react'
import Url from './Url'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fullBlog: false
    }
  }

  toggleFullBlog = () => {
    this.setState({ fullBlog: !this.state.fullBlog })
  }

  render() {
    const blogStyle = {
      paddingTop: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 2
    }

    const showWhenVisible = { display: this.state.fullBlog ? '' : 'none' }

    const { user, title, author, url, likes } = this.props.blog
/*Näin ei saa tehdä    const { onLike } = this.props.onLike */

    return (
      <div >
        <div>
          <div style={blogStyle}>
            <div onClick={this.toggleFullBlog}>{title + ' ' + author}</div>
            <div style={showWhenVisible}>
              <Url address={url} />
              {likes + ' likes '}

              <button onClick={this.props.onLike}>{this.props.buttonLabel}</button>
              <div></div>
              {'added by ' + user.name}
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Blog