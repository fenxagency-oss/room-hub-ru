import { useState } from "react";
import { Search, MoreHorizontal, UserPlus, Shield, Ban, Mail } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  team: string;
  role: "user" | "admin" | "moderator";
  status: "active" | "blocked";
  bookings: number;
  joined: string;
}

const MOCK_USERS: User[] = [
  { id: "1", name: "Алексей Петров", email: "petrov@mail.ru", team: "Дизайн", role: "user", status: "active", bookings: 23, joined: "12.01.2025" },
  { id: "2", name: "Мария Иванова", email: "ivanova@corp.ru", team: "Разработка", role: "admin", status: "active", bookings: 45, joined: "03.11.2024" },
  { id: "3", name: "Дмитрий Козлов", email: "kozlov@biz.ru", team: "Маркетинг", role: "user", status: "blocked", bookings: 12, joined: "28.02.2025" },
  { id: "4", name: "Елена Смирнова", email: "smirnova@work.ru", team: "HR", role: "moderator", status: "active", bookings: 67, joined: "15.09.2024" },
  { id: "5", name: "Сергей Волков", email: "volkov@dev.ru", team: "Разработка", role: "user", status: "active", bookings: 8, joined: "20.03.2025" },
  { id: "6", name: "Анна Кузнецова", email: "kuznetsova@co.ru", team: "Дизайн", role: "user", status: "active", bookings: 31, joined: "08.12.2024" },
];

const ROLE_MAP = { user: "Пользователь", admin: "Администратор", moderator: "Модератор" };
const STATUS_MAP = {
  active: { label: "Активен", cls: "bg-success/10 text-success" },
  blocked: { label: "Заблокирован", cls: "bg-destructive/10 text-destructive" },
};

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const filtered = MOCK_USERS.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Пользователи</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление аккаунтами пользователей</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:opacity-90 press-effect transition-all text-sm">
          <UserPlus size={16} strokeWidth={1.5} /> Добавить
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени или email..."
          className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Пользователь</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Команда</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Роль</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Брони</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Статус</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => {
                const st = STATUS_MAP[user.status];
                return (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-foreground">{user.team}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-medium text-muted-foreground">{ROLE_MAP[user.role]}</span>
                    </td>
                    <td className="px-5 py-3.5 tabular-nums text-foreground">{user.bookings}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
