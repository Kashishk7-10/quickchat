import React from 'react';

const MessageBubble = ({ msg, user }) => {
  if (!msg || (!msg.text && !msg.image)) return null;

  const isSelf = msg.sender === user;
  const formattedTime = msg.time || new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex items-end gap-2 ${isSelf ? 'justify-end' : 'justify-start'} px-2`}>
      {!isSelf && (
        <img
          src={msg.avatar || '/default-avatar.png'}
          alt="avatar"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
      )}
      <div
        className={`max-w-[70%] p-3 rounded-xl text-sm shadow-md relative ${
          isSelf ? 'bg-gradient-to-r from-[#6C63FF] to-[#7EE8FA] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'
        }`}
      >
        {!isSelf && msg.sender && (
          <div className="text-xs font-semibold text-blue-500 mb-1">{msg.sender}</div>
        )}

        {msg.image ? (
          <img src={msg.image} alt="sent img" className="rounded-lg max-w-full h-auto mb-1" />
        ) : (
          <div className="whitespace-pre-wrap">{msg.text}</div>
        )}

        <div className={`text-[10px] mt-1 text-right flex items-center justify-end gap-1 ${isSelf ? 'text-white/70' : 'text-gray-400'}`}>
          {formattedTime}
          {isSelf && <span className="text-xs">✔✔</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;