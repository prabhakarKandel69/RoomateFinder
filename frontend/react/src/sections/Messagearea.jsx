import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const MessageArea = ({ selectedUser }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const username = localStorage.getItem("username");
  const profilePic = localStorage.getItem("image");
  const roomName = selectedUser ? `${username}_${selectedUser.username}` : null;

  useEffect(() => {
    if (!roomName) return;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found");
      return;
    }

    // Fetch old messages from API
    axios
      .get(`http://127.0.0.1:7999/chat/message/${selectedUser.username}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages(
          response.data.map((msg) => ({
            id: msg.id,
            sender: msg.sender_username,
            receiver: msg.receiver_username,
            message: msg.message_text,
            attachment: msg.attachment
                ? `http://127.0.0.1:7999${msg.attachment}`
              : null,

            sentAt: msg.sent_at,
          }))
        );
      })
      .catch((error) => console.error("Error fetching messages:", error));

    // WebSocket connection
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomName}/?token=${token}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket Message Received:", data); // Debugging

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.id,
          sender: data.sender,
          receiver: data.receiver,
          message: data.message,
          attachment: data.attachment_url
              ? `http://127.0.0.1:7999/media/${data.attachment_url}`
              : null, 
          sentAt: data.sent_at,
        },
      ]);
    };

    setSocket(ws);
    return () => ws.close();
  }, [roomName]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() && !attachment) return;

    const data = { message: newMessage.trim(), attachment };
    if (socket) {
      socket.send(JSON.stringify(data));
      setMessages((prev) => [
        ...prev,
        {
          id: new Date().getTime(),
          sender: username,
          receiver: selectedUser.username,
          message: data.message,
          attachment: data.attachment,
          sentAt: new Date().toISOString(),
        },
      ]);
    }

    setNewMessage("");
    setAttachment(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAttachment(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Profile Info */}
      <div className="p-4 bg-white border-b flex items-center space-x-4">
        <img
          src={
            selectedUser.profile_pic
              ? `http://127.0.0.1:7999${selectedUser.profile_pic}`
              : "https://via.placeholder.com/50"
          }
          alt={selectedUser.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
          <p className="text-sm text-gray-500">{selectedUser.status || "Online"}</p>
        </div>
      </div>

      {/* Messages List */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-3 flex flex-col">
        {messages.map((msg, index) => {
          const isSender = msg.sender === username;
          const senderProfilePic = isSender
            ? (profilePic ? `http://127.0.0.1:7999${profilePic}` : "https://via.placeholder.com/50")
            : (selectedUser.profile_pic ? `http://127.0.0.1:7999${selectedUser.profile_pic}` : "https://via.placeholder.com/50");

          return (
            <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null} className={`flex items-end ${isSender ? "justify-end" : "justify-start"}`}>
              {!isSender && (
                <img
                  src={senderProfilePic}
                  alt={msg.sender}
                  className="w-10 h-10 rounded-full object-cover mr-2"
                />
              )}

              <div className={`p-2 rounded-lg max-w-xs break-words ${isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                <p>{msg.message}</p>
                {msg.attachment && (
                  <img
                    src={msg.attachment}
                    alt="Attachment"
                    className="mt-1 max-w-xs rounded-lg"
                  />
                )}
              </div>

              {isSender && (
                <img
                  src={senderProfilePic}
                  alt="You"
                  className="w-10 h-10 rounded-full object-cover ml-2"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t flex items-center">
        {/* Attachment Button */}
        <button
          className="bg-gray-300 text-black px-3 py-2 rounded mr-2 hover:bg-gray-400"
          onClick={() => document.getElementById("fileInput").click()}
        >
          +
        </button>

        {/* Hidden File Input */}
        <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleAttachmentChange} />

        {/* Message Input */}
        <input
          type="text"
          className="flex-grow border rounded px-2 py-1 mr-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* Send Button */}
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageArea;
