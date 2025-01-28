import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './AddBlog'

test('renders only title and author of the blog naturally', () => {
  const blog = {
    title: 'tykolentti',
    author: 'tyko',
    url: 'tyko.io'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blogHidden')
  expect(div).toHaveTextContent('tykolentti')

  const hiddenDiv = container.querySelector('.blogShown')
  expect(hiddenDiv).toBeNull()
})

test('clicking blog show button shows the detailed information of the blog', async () => {
  const blog = {
    title: 'tykolentti',
    author: 'tyko',
    url: 'tyko.io',
    user: {
      id: '123123124124',
      name: 'tykki t'
    }
  }

  const mockAddLikeHandler = vi.fn()

  const mockRemoveBlogHandler = vi.fn()

  const { container } = render(
    <Blog
      blog={blog}
      likeHandler={mockAddLikeHandler}
      removeHandler={mockRemoveBlogHandler}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blogShown')
  expect(div).toHaveTextContent('tyko.io')
})

test('clicking like button twice triggers the like event handler twice', async () => {
  const blog = {
    title: 'tykolentti',
    author: 'tyko',
    url: 'tyko.io',
    user: {
      id: '123123124124',
      name: 'tykki t'
    }
  }

  const mockAddLikeHandler = vi.fn()

  const mockRemoveBlogHandler = vi.fn()

  const { container } = render(
    <Blog
      blog={blog}
      likeHandler={mockAddLikeHandler}
      removeHandler={mockRemoveBlogHandler}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockAddLikeHandler.mock.calls).toHaveLength(2)
})

test('blog form handled correctly', async () => {
  const user = userEvent.setup()
  const mockCreate = vi.fn()
  render(<BlogForm createBlog={mockCreate}/>)

  const titleInput = screen.getByPlaceholderText('title of the blog')
  const authorInput = screen.getByPlaceholderText('author of the blog')
  const urlInput = screen.getByPlaceholderText('url to the blog')
  const sendBlog = screen.getByText('create')

  await user.type(titleInput, 'tykon seikkailut')
  await user.type(authorInput, 'tykki t')
  await user.type(urlInput, 'tykki.title')

  await user.click(sendBlog)

  console.log(mockCreate.mock.calls)
  expect(mockCreate.mock.calls[0][0].title).toBe('tykon seikkailut')
  expect(mockCreate.mock.calls[0][0].author).toBe('tykki t')
  expect(mockCreate.mock.calls[0][0].url).toBe('tykki.title')
  expect(mockCreate.mock.calls).toHaveLength(1)
})