import "./App.css";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.js";
import Chat from "./Chat.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Routes>
              <Route
                path="/rooms/:roomId"
                element={[<Sidebar />, <Chat />]}
              ></Route>
              <Route path="/" element={<Sidebar />}></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
