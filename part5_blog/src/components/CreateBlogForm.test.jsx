import { render, screen, fireEvent } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('check, that the form calls the event handler it received as props with the right details when a new blog is created', () => {

  const blog = {
    title: 'Hangar 18',
    author: 'Megadeth',
    url : 'https://www.youtube.com/watch?v=rUGIocJK9Tc',
    likes: 0
  }

  const mockOnSubmit = vi.fn()

  const { container } = render(<CreateBlogForm
    addBlog={mockOnSubmit}
  />)

  fireEvent.change(container.querySelector('input#title'), { target : { value : 'Hangar 18' } })
  fireEvent.change(container.querySelector('input#author'), { target : { value : 'Megadeth' } })
  fireEvent.change(container.querySelector('input#url'), { target : { value : 'https://www.youtube.com/watch?v=rUGIocJK9Tc' } })

  fireEvent.click(container.querySelector('button[type="submit"]'))

  expect(mockOnSubmit).toHaveBeenCalledWith({
    title: 'Hangar 18',
    author: 'Megadeth',
    url : 'https://www.youtube.com/watch?v=rUGIocJK9Tc',
  })
})