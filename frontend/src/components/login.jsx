import React, { useState } from 'react'
import chatIcon from '../assets/chat-icon.png'

const Login = ({ onLogin }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onLogin(name)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e3f2fd] via-[#f3e5f5] to-[#fce4ec] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm text-center space-y-6 border border-gray-100"
      >
        {/* Logo & Title */}
        <div className="flex items-center justify-center space-x-3">
          <img
            src={chatIcon}
            alt="OfficeChat Icon"
            className="h-8 w-8"
          />
          <h2 className="text-2xl font-extrabold text-gray-800">
            Office<span className="text-indigo-600">Chat</span>
          </h2>
        </div>

        {/* Subheading */}
        <p className="text-sm font-bold text-blue-600">
          Enter your name to join the team chat
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 placeholder:text-gray-400 text-gray-800"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-full hover:from-purple-600 hover:to-pink-500 transition duration-200 shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login