import { useState } from "react";
import { Search, MoreHorizontal, UserPlus, Pencil, Trash2, Download, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

const INITIAL_USERS: User[] = [
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
const TEAMS = ["Дизайн", "Разработка", "Маркетинг", "HR", "Продажи"];

const emptyUser = (): Omit<User, "id"> => ({
  name: "", email: "", team: "Дизайн", role: "user", status: "active", bookings: 0,
  joined: new Date().toLocaleDateString("ru-RU"),
});

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState<Omit<User, "id">>(emptyUser());
  const [menuId, setMenuId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditUser(null);
    setForm(emptyUser());
    setDialogOpen(true);
  };

  const openEdit = (user: User) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, team: user.team, role: user.role, status: user.status, bookings: user.bookings, joined: user.joined });
    setDialogOpen(true);
    setMenuId(null);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Заполните имя и email");
      return;
    }
    if (editUser) {
      setUsers((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)));
      toast.success("Пользователь обновлён");
    } else {
      const newUser: User = { ...form, id: crypto.randomUUID() };
      setUsers((prev) => [...prev, newUser]);
      toast.success("Пользователь добавлен");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
    setMenuId(null);
    toast.success("Пользователь удалён");
  };

  const toggleBlock = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u))
    );
    setMenuId(null);
    toast.success("Статус обновлён");
  };

  const exportCSV = () => {
    const header = "Имя,Email,Команда,Роль,Статус,Брони,Дата регистрации";
    const rows = users.map((u) =>
      `"${u.name}","${u.email}","${u.team}","${ROLE_MAP[u.role]}","${STATUS_MAP[u.status].label}",${u.bookings},"${u.joined}"`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Отчёт экспортирован");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Пользователи</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление аккаунтами пользователей</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
            <Download size={14} /> Экспорт
          </Button>
          <Button size="sm" onClick={openCreate} className="gap-1.5">
            <UserPlus size={14} /> Добавить
          </Button>
        </div>
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
                    <td className="px-5 py-3.5 text-right relative">
                      <button
                        onClick={() => setMenuId(menuId === user.id ? null : user.id)}
                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {menuId === user.id && (
                        <div className="absolute right-5 top-12 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] animate-fade-in">
                          <button onClick={() => openEdit(user)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                            <Pencil size={14} /> Редактировать
                          </button>
                          <button onClick={() => toggleBlock(user.id)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                            {user.status === "active" ? "🚫 Заблокировать" : "✅ Разблокировать"}
                          </button>
                          <button onClick={() => { setDeleteConfirm(user.id); setMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                            <Trash2 size={14} /> Удалить
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Пользователи не найдены</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editUser ? "Редактировать пользователя" : "Новый пользователь"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Имя</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Имя Фамилия" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="email@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Команда</label>
                <select value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none">
                  {TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Роль</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as User["role"] })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none">
                  {Object.entries(ROLE_MAP).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Статус</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as User["status"] })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none">
                <option value="active">Активен</option>
                <option value="blocked">Заблокирован</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">Отмена</Button>
              <Button onClick={handleSave} className="flex-1">{editUser ? "Сохранить" : "Добавить"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Удалить пользователя?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Это действие нельзя отменить. Пользователь будет удалён навсегда.</p>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="flex-1">Отмена</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1">Удалить</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
