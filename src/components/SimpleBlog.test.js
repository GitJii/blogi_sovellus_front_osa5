import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders the following title, author and likes', () => {
        const simpleBlog = {
            author: 'Jaakko',
            title: 'tere',
            url: 'piste.com',
            likes: 0
    }

        const blogComponent = shallow(<SimpleBlog simpleBlog={simpleBlog} />)
        console.log(blogComponent.debug())

        const authorDiv = blogComponent.find('.authorAndTitle')    
        const titleDiv = blogComponent.find('.authorAndTitle')
        
        
        const likesDiv = blogComponent.find('.likes')
        
        expect(authorDiv.text()).toContain(simpleBlog.author)
        expect(titleDiv.text()).toContain(simpleBlog.title)
        
        expect(likesDiv.text()).toContain(simpleBlog.likes)
        
    })

    it('clicking the button calls event handler once', () => {
        const blog = {
            author: 'Jaakko',
            title: 'tere',
            url: 'piste.com',
            likes: 0
    }
      
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
          <blog
            blog={blog}
            onClick={mockHandler}
          />
        )
      
        const button = blogComponent.find('button')
        button.simulate('click')
      
        expect(mockHandler.mock.calls.length).toBe(1)
      })
})
