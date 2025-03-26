import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
  const blog = {
    title: 'Hangar 18',
    author: 'Megadeth',
    url : 'https://www.youtube.com/watch?v=rUGIocJK9Tc',
    likes: 0
  }

  const { container } = render(<Blog
    blog={blog}
    increaseLike={() => {}}
    removeBlog={() => {}}
    allowRemove={false}
  />)

  const wrapper = container.querySelector('.blog')
  const titleAndAuthorElement = screen.queryByText(/Hangar 18, Megadeth/) //redundant, but it is done for learning purposes
  const likesElement = screen.queryByText(/likes:/)
  const urlElement = screen.queryByText(/https:\/\/:/)

  expect(titleAndAuthorElement).toBeDefined()
  expect(likesElement).toBeNull()
  expect(urlElement).toBeNull()
  expect(wrapper).toHaveTextContent(
    'Hangar 18, Megadeth'
  )
})

test('blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', () => {
  const blog = {
    title: 'Hangar 18',
    author: 'Megadeth',
    url : 'https://www.youtube.com/watch?v=rUGIocJK9Tc',
    likes: 0,
    user : { name : 'John Doe' }
  }

  const { container } = render(<Blog
    blog={blog}
    increaseLike={() => {}}
    removeBlog={() => {}}
    allowRemove={false}
  />)

  const button = container.querySelector('button#toggle')
  button.click()

  const likesElement = screen.queryByText(/likes:/)
  const urlElement = screen.queryByText(/https:\/\/:/)

  expect(likesElement).toBeDefined()
  expect(urlElement).toBeDefined()
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'Hangar 18',
    author: 'Megadeth',
    url : 'https://www.youtube.com/watch?v=rUGIocJK9Tc',
    likes: 0,
    user : { name : 'John Doe' }
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog
    blog={blog}
    increaseLike={mockHandler}
    removeBlog={() => {}}
    allowRemove={false}
  />)

  const user = userEvent.setup()

  const toggleButton = container.querySelector('button#toggle')
  await user.click(toggleButton)

  const likeButton = container.querySelector('button#likes')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

