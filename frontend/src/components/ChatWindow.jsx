import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const socket = io('http://localhost:5000');

function ChatWindow({ username }) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const chatRef = useRef();

  useEffect(() => {
    socket.emit('join', username);

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('system message', (msg) => {
      setMessages((prev) => [...prev, { system: true, text: msg }]);
    });

    socket.on('typing', (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(null), 3000);
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = (msg) => {
    socket.emit('chat message', msg);
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-[#edf2fb] via-[#e2eafc] to-[#edf2fb] rounded-2xl shadow-2xl p-6 flex flex-col h-[90vh] border border-blue-100">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-4 text-center">
        💬 Office Chatroom
      </h2>

      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto space-y-3 mb-2 px-2 py-1 rounded-md bg-white bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 shadow-inner"
      >
        {messages.map((msg, i) =>
          msg.system ? (
            <div key={i} className="text-center text-sm text-gray-500 italic">
              {msg.text}
            </div>
          ) : (
            <MessageBubble key={i} msg={msg} user={username} />
          )
        )}

        {typingUser && (
          <div className="text-sm italic text-blue-500 ml-3 mb-2">
            {typingUser} is typing...
          </div>
        )}
      </div>

      <MessageInput onSend={sendMessage} username={username} />
    </div>
  );
}

export default ChatWindow;
