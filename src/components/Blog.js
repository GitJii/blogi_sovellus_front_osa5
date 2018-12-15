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


    const { user, title, author, url, likes } = this.props.blog
    const { onLike } = this.props
    const { onDelete } = this.props
    const { currentUser } = this.props

    const showWhenVisible = { display: this.state.fullBlog ? '' : 'none' }
    const showIfRightUser = { display: (user.name === currentUser.name || user.name === undefined) ? 'none' : '' }


    return (
      <div >
        <div>
          <div style={blogStyle}>
            <div onClick={this.toggleFullBlog}>{title + ' ' + author}</div>
            <div style={showWhenVisible}>
              <Url address={url} />
              {likes + ' likes '}

              <button onClick={onLike}>{"like"}</button>
              <div></div>
              {'added by ' + user.name}
              <div></div>
              <div style={showIfRightUser}>
                <button onClick={onDelete}>{"delete"}</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Blog