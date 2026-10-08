import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  CalendarDays,
  Users,
  Megaphone,
  Clock3,
  BookOpen,
  User,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Academics",
    icon: GraduationCap,
    path: "/academics",
  },
  {
    label: "Assignments",
    icon: ClipboardList,
    path: "/assignments",
  },
  {
    label: "Events",
    icon: CalendarDays,
    path: "/events",
  },
  {
    label: "Clubs",
    icon: Users,
    path: "/clubs",
  },
  {
    label: "Announcements",
    icon: Megaphone,
    path: "/announcements",
  },
  {
    label: "Timetable",
    icon: Clock3,
    path: "/timetable",
  },
  {
    label: "Resources",
    icon: BookOpen,
    path: "/resources",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <GraduationCap size={22} strokeWidth={2.2} />
        </div>

        <div className="sidebar-brand">
          <h2>CampusConnect</h2>
          <span>Student Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="nav-heading">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.label}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">
                <Icon size={19} strokeWidth={2} />
              </span>

              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-line"></div>

        <p>CampusConnect</p>
        <span>Student Portal • v1.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;