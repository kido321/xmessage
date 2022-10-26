import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import MoreVert from "@mui/icons-material/MoreVert";
import AttachFile from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const bottomRef = useRef(null);
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [seed, setseed] = useState("");
  const [messages, setmessages] = useState([]);
  const [q, setq] = useState([]);
  const [roomName, setroomName] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();

    (async () => {
      const docRef = collection(db, "rooms", roomId, "message");
      await addDoc(docRef, {
        message: input,
        name: user.displayName,
        timestamp: serverTimestamp(),
      });
      setInput("");
    })();
  };
  useEffect(() => {
    if (roomId) {
      (async () => {
        const docRef = doc(db, "rooms", roomId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setroomName(docSnap.data().name);
          setseed(Math.random(12, 1234));
        }
      })();

      (async () => {
        const docRef = collection(db, "rooms", roomId, "message");
        const q = query(docRef, orderBy("timestamp", "asc"));
        await onSnapshot(q, (snapshot) => {
          setmessages(snapshot.docs.map((doc) => doc.data()));
        });
      })();
    }
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
        />
        <div className="chat_headerinfo">
          <h3>{roomName}</h3>
          <p>
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerright">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}{" "}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}{" "}
            </span>
          </p>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
