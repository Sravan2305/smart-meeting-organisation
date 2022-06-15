import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddMeeting } from "./components";
import { Home } from "./components";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddMeeting />} />
    </Routes>
  );
};
