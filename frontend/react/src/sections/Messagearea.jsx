import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const MessageArea = ({ selectedUser }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const chatContainerRef = useRef(null); // Reference for auto-scrolling

  const username = localStorage.getItem("username");
  const roomName = selectedUser ? `${username}_${selectedUser.username}` : null;

  useEffect(() => {
    if (!roomName) return;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found");
      return;
    }

    // Fetch older messages
    axios
      .get(`http://127.0.0.1:7999/chat/message/${selectedUser.username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Fetched older messages:", response.data);
        const formattedMessages = response.data.map((msg) => ({
          id: msg.id,
          sender: msg.sender_username,
          receiver: msg.receiver_username,
          message: msg.message_text,
          attachment: msg.attachment,
          sentAt: msg.sent_at,
        }));
        setMessages(formattedMessages); // Keep messages in natural order (oldest to latest)
        
        // Scroll to bottom after loading messages
        setTimeout(() => {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }, 100);
      })
      .catch((error) => {
        console.error("Error fetching older messages:", error.response?.data || error.message);
      });

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/?token=${token}`);

    ws.onopen = () => {
      console.log("WebSocket connected successfully");
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]); // Append new messages at the bottom
      
      // Scroll to bottom when a new message is received
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 100);
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
  }, [roomName]);

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
          src={`http://127.0.0.1:7999${selectedUser.profile_pic}` || "https://via.placeholder.com/50"}
          alt={selectedUser.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
          <p className="text-sm text-gray-500">{selectedUser.status || "Online"}</p>
        </div>
      </div>

      {/* Messages List (Oldest at Top, Latest at Bottom) */}
      <div
        ref={chatContainerRef} // Attach ref to enable auto-scroll
        className="flex-grow overflow-y-auto p-4 space-y-3 flex flex-col"
      >
        {messages.map((msg, index) => {
          const isSender = msg.sender === username;
          const senderProfilePic = isSender
            ? `http://127.0.0.1:7999${localStorage.getItem("image")}`
            : `http://127.0.0.1:7999${selectedUser.profile_pic}`;

          return (
            <div key={index} className={`flex items-end ${isSender ? "justify-end" : "justify-start"}`}>
              {!isSender && (
                <img
                  src={senderProfilePic || "https://via.placeholder.com/50"}
                  alt={msg.sender}
                  className="w-10 h-10 rounded-full object-cover mr-2"
                />
              )}

              <div
                className={`p-3 rounded-lg max-w-xs break-words ${
                  isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                <p>{msg.message}</p>
                {msg.attachment && (
                  <img src={msg.attachment} alt="Attachment" className="mt-2 max-w-xs rounded-lg" />
                )}
              </div>

              {isSender && (
                <img
                  src={senderProfilePic || "https://via.placeholder.com/50"}
                  alt="You"
                  className="w-10 h-10 rounded-full object-cover ml-2"
                />
              )}
            </div>
          );
        })}
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

        <input type="file" accept="image/*" className="mr-2" onChange={handleAttachmentChange} />

        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageArea;
