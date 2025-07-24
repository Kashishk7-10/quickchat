import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import Login from './components/Login'

function App() {
  const [username, setUsername] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-purple-200">
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <ChatWindow username={username} />
      )}
    </div>
  )
}

export default App
