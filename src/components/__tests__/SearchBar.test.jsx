import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'
import { vi } from 'vitest'

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Mock debounce hook to return value immediately
vi.mock('../../hooks/UseDebounce', () => ({
  default: (v) => v,
}))

beforeEach(() => {
  mockNavigate.mockReset()
  localStorage.clear()
})

test('renders search input and buttons', () => {
  render(<SearchBar />)
  const input = screen.getByRole('textbox', { name: /search/i })
  expect(input).toBeInTheDocument()
  const searchButton = screen.getByRole('button', { name: /search/i })
  expect(searchButton).toBeInTheDocument()
})

test('shows suggestions while typing and navigates on click', async () => {
  render(<SearchBar />)
  const user = userEvent.setup()
  const input = screen.getByRole('textbox', { name: /search/i })

  await user.type(input, 'React')

  // suggestion should appear
  const suggestion = await screen.findByText(/React tutorial/i)
  expect(suggestion).toBeInTheDocument()

  await user.click(suggestion)

  expect(mockNavigate).toHaveBeenCalledWith('/search/React tutorial')
})

test('clear button clears input', async () => {
  render(<SearchBar />)
  const user = userEvent.setup()
  const input = screen.getByRole('textbox', { name: /search/i })

  await user.type(input, 'Music')
  const clearBtn = screen.getByRole('button', { name: /clear search/i })
  expect(clearBtn).toBeInTheDocument()
  await user.click(clearBtn)
  expect(input).toHaveValue('')
})

test('selecting suggestion saves to recent searches', async () => {
  render(<SearchBar />)
  const user = userEvent.setup()
  const input = screen.getByRole('textbox', { name: /search/i })

  await user.type(input, 'Movies')
  const suggestion = await screen.findByText(/Movies/i)
  await user.click(suggestion)

  // recent searches should be saved in localStorage
  const stored = JSON.parse(localStorage.getItem('recentSearches'))
  expect(stored).toContain('Movies')
})
