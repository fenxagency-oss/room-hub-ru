import { LayoutDashboard, Users, DoorOpen, CalendarCheck, TrendingUp, Clock } from "lucide-react";

const STATS = [
  { label: "Пользователей", value: "1,284", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Помещений", value: "24", change: "+2", icon: DoorOpen, color: "text-info" },
  { label: "Активных броней", value: "47", change: "+8%", icon: CalendarCheck, color: "text-success" },
  { label: "Загрузка сегодня", value: "73%", change: "+5%", icon: TrendingUp, color: "text-warning" },
];

const RECENT_BOOKINGS = [
  { id: 1, user: "Алексей Петров", room: "Зал «Орион»", time: "10:00–12:00", status: "active" as const },
  { id: 2, user: "Мария Иванова", room: "Переговорная «Альфа»", time: "13:00–14:30", status: "active" as const },
  { id: 3, user: "Дмитрий Козлов", room: "Студия «Дельта»", time: "09:00–10:00", status: "done" as const },
  { id: 4, user: "Елена Смирнова", room: "Коворкинг «Гамма»", time: "15:00–17:00", status: "rejected" as const },
  { id: 5, user: "Сергей Волков", room: "Зал «Орион»", time: "11:00–12:30", status: "active" as const },
];

const STATUS_MAP = {
  active: { label: "Активна", cls: "bg-success/10 text-success" },
  done: { label: "Завершена", cls: "bg-muted text-muted-foreground" },
  rejected: { label: "Отклонена", cls: "bg-destructive/10 text-destructive" },
};

const OverviewPage = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Панель управления</h1>
        <p className="text-sm text-muted-foreground mt-1">Обзор текущей активности пространств</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} strokeWidth={1.5} className={stat.color} />
              <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock size={18} strokeWidth={1.5} className="text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Последние бронирования</h2>
          </div>
        </div>
        <div className="divide-y divide-border">
          {RECENT_BOOKINGS.map((booking) => {
            const st = STATUS_MAP[booking.status];
            return (
              <div key={booking.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {booking.user.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{booking.user}</p>
                    <p className="text-xs text-muted-foreground">{booking.room} · {booking.time}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.cls}`}>
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
