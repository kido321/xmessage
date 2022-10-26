import React from "react";
import "./sidebar.css";
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
import { Avatar, IconButton } from "@mui/material";
import db from "./firebase.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
function Sidebarchat({ id, name, addNewChat }) {
  const [messages, setmessages] = useState([]);
  const [q, setq] = useState([]);
  const [roomName, setroomName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [seed, setseed] = useState("");
  useEffect(() => {
    setseed(Math.random(12, 1232));
  }, []);

  const creatRoom = () => {
    const roomName = prompt("Please enter name for chat");
    (async () => {
      if (roomName) {
        const roomRef = collection(db, "rooms");
        await addDoc(roomRef, { name: roomName });
      }
    })();
  };
  useEffect(() => {
    (async () => {
      const docRef = collection(db, "rooms", id, "message");
      const q = query(docRef, orderBy("timestamp", "desc"));
      await onSnapshot(q, (snapshot) => {
        setmessages(snapshot.docs.map((doc) => doc.data()));
      });
    })();
  }, []);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
        />
        <div className="sidebarchat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={creatRoom} className="sidebar_chat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default Sidebarchat;
