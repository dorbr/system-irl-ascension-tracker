
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-rpg-dark flex flex-col">
      <main className="flex-1 container max-w-md mx-auto pb-16 pt-2 px-3">
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};

export default MobileLayout;
