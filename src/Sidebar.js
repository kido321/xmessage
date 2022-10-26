import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Sidebarchat from "./Sidebarchat";
import db from "./firebase";
import { collection, docs, onSnapshot, getDocs } from "firebase/firestore";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setrooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    (async () => {
      await onSnapshot(collection(db, "rooms"), (snapshot) => {
        setrooms(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
      });
    })();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerright">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchcontainer">
          <SearchOutlined />
          <input placeholder="Search" type="text" />
        </div>
      </div>
      <Sidebarchat addNewChat />
      <div className="sidebar_chats">
        {rooms.map((room) => (
          <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
