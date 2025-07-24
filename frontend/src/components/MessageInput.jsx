import { useState, useRef } from 'react';
import { FaPaperclip, FaSmile } from 'react-icons/fa';
import Picker from 'emoji-picker-react';

function MessageInput({ onSend, username }) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;

    onSend({
      sender: username,
      text,
      time: new Date().toLocaleTimeString(),
    });

    setText('');
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;

      const isImage = file.type.startsWith('image/');

      onSend({
        sender: username,
        text: '',
        image: isImage ? base64 : '',
        file: !isImage ? { name: file.name, url: base64 } : null,
        time: new Date().toLocaleTimeString(),
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative bg-white p-3 rounded-xl shadow-md border border-gray-200">
      {showEmojiPicker && (
  <div className="absolute bottom-14 left-0 z-10 bg-white shadow-lg rounded-lg p-2">
    <div className="flex justify-end">
      <button
        onClick={() => setShowEmojiPicker(false)}
        className="text-gray-500 hover:text-red-500 text-sm font-bold"
        title="Close"
      >
        ✖
      </button>
    </div>
    <Picker onEmojiClick={onEmojiClick} theme="light" />
  </div>
)}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-blue-500 hover:text-blue-700"
          title="Emoji"
        >
          <FaSmile size={22} />
        </button>

        <button
          onClick={handleAttachmentClick}
          className="text-blue-500 hover:text-blue-700"
          title="Attach file"
        >
          <FaPaperclip size={22} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-full font-medium hover:from-blue-600 hover:to-cyan-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
