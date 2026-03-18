import { useState } from "react";
import { Search, CalendarCheck, Filter } from "lucide-react";

type BookingStatus = "active" | "done" | "rejected";

interface Booking {
  id: string;
  user: string;
  room: string;
  date: string;
  time: string;
  status: BookingStatus;
  team: string;
}

const MOCK_BOOKINGS: Booking[] = [
  { id: "1", user: "Алексей Петров", room: "Зал «Орион»", date: "18.03.2026", time: "10:00–12:00", status: "active", team: "Дизайн" },
  { id: "2", user: "Мария Иванова", room: "Переговорная «Альфа»", date: "18.03.2026", time: "13:00–14:30", status: "active", team: "Разработка" },
  { id: "3", user: "Дмитрий Козлов", room: "Студия «Дельта»", date: "17.03.2026", time: "09:00–10:00", status: "done", team: "Маркетинг" },
  { id: "4", user: "Елена Смирнова", room: "Коворкинг «Гамма»", date: "17.03.2026", time: "15:00–17:00", status: "rejected", team: "HR" },
  { id: "5", user: "Сергей Волков", room: "Зал «Орион»", date: "18.03.2026", time: "11:00–12:30", status: "active", team: "Разработка" },
  { id: "6", user: "Анна Кузнецова", room: "Переговорная «Альфа»", date: "16.03.2026", time: "14:00–15:00", status: "done", team: "Дизайн" },
  { id: "7", user: "Олег Новиков", room: "Студия «Дельта»", date: "18.03.2026", time: "16:00–18:00", status: "active", team: "Продажи" },
  { id: "8", user: "Ирина Федорова", room: "Зал «Орион»", date: "15.03.2026", time: "10:00–11:00", status: "rejected", team: "HR" },
];

const STATUS_MAP: Record<BookingStatus, { label: string; cls: string }> = {
  active: { label: "Активна", cls: "bg-success/10 text-success" },
  done: { label: "Завершена", cls: "bg-muted text-muted-foreground" },
  rejected: { label: "Отклонена", cls: "bg-destructive/10 text-destructive" },
};

const TABS: { key: BookingStatus | "all"; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "active", label: "Активные" },
  { key: "done", label: "Завершённые" },
  { key: "rejected", label: "Отклонённые" },
];

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_BOOKINGS.filter((b) => {
    const matchTab = activeTab === "all" || b.status === activeTab;
    const matchSearch = b.user.toLowerCase().includes(search.toLowerCase()) || b.room.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Бронирования</h1>
        <p className="text-sm text-muted-foreground mt-1">Контроль бронирований помещений</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-xs font-semibold px-4 py-2 rounded-md transition-all press-effect ${
              activeTab === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени или залу..."
          className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Пользователь</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Помещение</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Дата</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Время</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Команда</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((b) => {
                const st = STATUS_MAP[b.status];
                return (
                  <tr key={b.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">{b.user}</td>
                    <td className="px-5 py-3.5 text-foreground">{b.room}</td>
                    <td className="px-5 py-3.5 tabular-nums text-foreground">{b.date}</td>
                    <td className="px-5 py-3.5 tabular-nums text-foreground">{b.time}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{b.team}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>{st.label}</span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-muted-foreground">
                    Бронирования не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
