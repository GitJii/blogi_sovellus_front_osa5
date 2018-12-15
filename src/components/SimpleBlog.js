import React from 'react'

const SimpleBlog = ({ simpleBlog, onClick }) => (
  <div className="wrapper">
    <div className="authorAndTitle">
      {simpleBlog.title} {simpleBlog.author}
    </div>
    <div className="likes">
      blog has {simpleBlog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog