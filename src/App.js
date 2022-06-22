import { useState } from 'react'
import './App.css'

export default function App() {
  const [definitions, setDefinitions] = useState([])
  const [item, setItem] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${item}`
    )
    if (!response.ok) {
      const message = await response.text()
      setError(JSON.parse(message))
      setDefinitions([])
      setLoading(false)
      throw new Error(message.title)
    }
    setLoading(false)
    setError('')
    const jsonData = await response.json()
    const definitionsAll = jsonData[0].meanings[0].definitions
    setDefinitions(definitionsAll)
  }

  return (
    <div className='App'>
      <div>
        <input
          name='item'
          value={item}
          onChange={(e) => setItem(e.target.value)}
          aria-label='item'
        />
        <button
          name='Search'
          disabled={item.trim() === ''}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      <div>
        <h2>Definitions:</h2>
        {error && (
          <div>
            <div>{`${error.title}`}</div>
            <div>{`${error.message}`}</div>
          </div>
        )}
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <ul>
            {Object.keys(definitions).map((element, i) => (
              <li key={`list-${i}`}>{definitions[element].definition}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
