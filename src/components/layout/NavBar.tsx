
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, History, User, Users } from "lucide-react";

const NavBar = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/crew", icon: Users, label: "Road" },
    { to: "/stats", icon: BarChart2, label: "Stats" },
    { to: "/shadows", icon: History, label: "Shadows" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-lg border-t border-border z-50">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 ${
                  isActive
                    ? "text-rpg-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
