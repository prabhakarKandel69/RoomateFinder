import React, { useEffect, useState } from "react";

const MessageArea = ({ selectedUser }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const roomName = selectedUser ? `${username}_${selectedUser.username}` : null;

  useEffect(() => {
    if (!roomName) return;
  
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomName}/`,
      token ? [`Bearer ${token}`] : []
    );
  
    ws.onopen = () => {
      console.log("WebSocket connected successfully");
    };
  
    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
  
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
  
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    setSocket(ws);
  
    return () => {
      ws.close();
    };
  }, [roomName, token]);

  const sendMessage = () => {
    if (!newMessage && !attachment) return;

    const data = {
      message: newMessage,
      attachment: attachment ? attachment : null,
    };

    socket?.send(JSON.stringify(data));
    setNewMessage("");
    setAttachment(null);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        setAttachment(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex items-center justify-center h-full text-gray-500">
          Please select a user to start chatting.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Profile Info Section */}
      <div className="p-4 bg-white border-b flex items-center space-x-4">
        <img
          src={`http://127.0.0.1:7999${selectedUser.profile_pic} `|| "https://via.placeholder.com/50"}
          alt={selectedUser.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
          <p className="text-sm text-gray-500">{selectedUser.status || "Online"}</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === username ? "bg-blue-200" : "bg-gray-300"
            }`}
          >
            <strong>{msg.sender}</strong>: {msg.message}
            {msg.attachment_url && (
              <img
                src={msg.attachment_url}
                alt="Attachment"
                className="mt-2 max-w-xs rounded"
              />
            )}
          </div>
        ))}
      </div>

      {/* Message Input Section */}
      <div className="p-4 bg-white border-t flex items-center">
        <input
          type="text"
          className="flex-grow border rounded px-2 py-1 mr-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="mr-2"
          onChange={handleAttachmentChange}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageArea;
