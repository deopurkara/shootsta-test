import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Search definition test cases', () => {
  it('should render home page', async () => {
    render(<App />)
    expect(screen.getByText('Definitions:')).toBeInTheDocument()
  })

  it('should list all definitions for valid search term', async () => {
    render(<App />)
    const inputElement = screen.getByLabelText('item')
    fireEvent.change(inputElement, { target: { value: 'dog' } })
    expect(screen.getByText('Definitions:')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(
      await screen.findByText(/A mammal, Canis familiaris/)
    ).toBeInTheDocument()
  })

  it('should throw error for invalid search term', async () => {
    render(<App />)
    const inputElement = screen.getByLabelText('item')
    fireEvent.change(inputElement, { target: { value: 'asdadsdad' } })
    expect(screen.getByText('Definitions:')).toBeInTheDocument()
    try {
      fireEvent.click(screen.getByRole('button'))
      expect(
        await screen.findByText(
          /Sorry pal, we couldn't find definitions for the word you were looking for./
        )
      ).toBeInTheDocument()
    } catch (err) {
      expect(err).toHaveErrorMessage('No Definitions Found')
    }
  })
})
