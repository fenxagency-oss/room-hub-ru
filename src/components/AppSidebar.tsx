import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, UsersRound, DoorOpen, CalendarCheck,
  MessageCircle, CalendarDays, Newspaper, Building2, ChevronLeft,
  Megaphone, LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_SECTIONS = [
  {
    title: "Основное",
    items: [
      { to: "/dashboard", label: "Обзор", icon: LayoutDashboard },
      { to: "/dashboard/users", label: "Пользователи", icon: Users },
      { to: "/dashboard/teams", label: "Команды", icon: UsersRound },
    ],
  },
  {
    title: "Управление",
    items: [
      { to: "/dashboard/rooms", label: "Помещения", icon: DoorOpen },
      { to: "/dashboard/bookings", label: "Бронирования", icon: CalendarCheck },
    ],
  },
  {
    title: "Контент",
    items: [
      { to: "/dashboard/events", label: "Мероприятия", icon: CalendarDays },
      { to: "/dashboard/news-users", label: "Новости (пользов.)", icon: Newspaper },
      { to: "/dashboard/news-team", label: "Новости (команда)", icon: Megaphone },
    ],
  },
  {
    title: "Поддержка",
    items: [
      { to: "/dashboard/support", label: "Тех. поддержка", icon: MessageCircle },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { admin, logout } = useAuth();

  return (
    <aside
      className={`h-screen sticky top-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-200 ${
        collapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <Building2 size={16} className="text-sidebar-primary-foreground" strokeWidth={2} />
        </div>
        {!collapsed && (
          <span className="text-sm font-bold text-sidebar-accent-foreground tracking-tight">
            Spaces Admin
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted px-2 mb-1.5">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.to === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname.startsWith(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/dashboard"}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <item.icon
                      size={18}
                      strokeWidth={1.5}
                      className={isActive ? "text-sidebar-primary" : ""}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Admin info + Logout */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        {!collapsed && admin && (
          <div className="px-2.5 py-2">
            <p className="text-xs font-semibold text-sidebar-accent-foreground truncate">{admin.name}</p>
            <p className="text-[10px] text-sidebar-muted truncate">{admin.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut size={18} strokeWidth={1.5} />
          {!collapsed && <span>Выйти</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 border-t border-sidebar-border flex items-center justify-center text-sidebar-muted hover:text-sidebar-foreground transition-colors shrink-0"
      >
        <ChevronLeft
          size={16}
          className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>
    </aside>
  );
}
