import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/solid";

const MessageArea = ({ selectedUser, onBack }) => {
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
    if (!token) return;

    axios
      .get(`http://127.0.0.1:7999/chat/message/${selectedUser.username}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages(response.data.map((msg) => ({
          id: msg.id,
          sender: msg.sender_username,
          receiver: msg.receiver_username,
          message: msg.message_text,
          attachment: msg.attachment,
          sentAt: msg.sent_at,
        })));
      })
      .catch(console.error);

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/?token=${token}`);
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
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
      setMessages((prev) => [...prev, {
        id: new Date().getTime(),
        sender: username,
        receiver: selectedUser.username,
        message: data.message,
        attachment: data.attachment,
        sentAt: new Date().toISOString(),
      }]);
    }
    setNewMessage("");
    setAttachment(null);
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Please select a user to start chatting.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-primary rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="p-4 bg-white border-b flex items-center space-x-4">
        <button onClick={onBack} className="md:hidden p-2">
          <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
        <img
          src={selectedUser.profile_pic ? `http://127.0.0.1:7999${selectedUser.profile_pic}` : "https://via.placeholder.com/50"}
          alt={selectedUser.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
          <p className="text-sm text-gray-500">{selectedUser.status || "Online"}</p>
        </div>
      </div>

      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-3 flex flex-col hide-scrollbar">
        {messages.map((msg, index) => {
          const isSender = msg.sender === username;
          return (
            <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null} className={`flex items-end ${isSender ? "justify-end" : "justify-start"}`}>
              {!isSender && (
                <img src={selectedUser.profile_pic ? `http://127.0.0.1:7999${selectedUser.profile_pic}` : "https://via.placeholder.com/50"} alt={msg.sender} className="w-10 h-10 rounded-full object-cover mr-2" />
              )}
              <div className={`p-2 rounded-lg max-w-xs break-words ${isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                <p>{msg.message}</p>
                {msg.attachment && (
                  <img src={msg.attachment.startsWith("data:image") ? msg.attachment : `http://127.0.0.1:7999${msg.attachment}`} alt="Attachment" className="mt-1 max-w-xs rounded-lg" />
                )}
              </div>
              {isSender && (
                <img src={profilePic ? `http://127.0.0.1:7999${profilePic}` : "https://via.placeholder.com/50"} alt="You" className="w-10 h-10 rounded-full object-cover ml-2" />
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border-t flex items-center">
        <button className="bg-gray-300 text-black px-3 py-2 rounded mr-2 hover:bg-gray-400" onClick={() => document.getElementById("fileInput").click()}>+</button>
        <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={(e) => setAttachment(URL.createObjectURL(e.target.files[0]))} />
        <input type="text" className="flex-grow border rounded px-2 py-1 mr-2 w-full sm:w-auto" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send</button>
      </div>
    </div>
  );
};

export default MessageArea;