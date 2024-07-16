import React, { useState, useEffect } from "react";
import { io } from "socket.io-client"; 

const socket = io("http://localhost:3000"); 

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const handleSend = () => {
    socket.emit("chatMessage", message); 
    setMessage("");
  };

  return (
    <>
      <div>
        <h1>Chat Room</h1>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send message</button>
        <div>
          {chat.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </>
  );
}
