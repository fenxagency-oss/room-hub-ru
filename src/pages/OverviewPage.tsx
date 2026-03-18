import { Users, DoorOpen, CalendarCheck, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const STATS = [
  { label: "Пользователей", value: "1,284", change: "+12%", up: true, icon: Users, color: "text-primary" },
  { label: "Помещений", value: "24", change: "+2", up: true, icon: DoorOpen, color: "text-info" },
  { label: "Активных броней", value: "47", change: "+8%", up: true, icon: CalendarCheck, color: "text-success" },
  { label: "Загрузка сегодня", value: "73%", change: "-3%", up: false, icon: TrendingUp, color: "text-warning" },
];

const WEEKLY_BOOKINGS = [
  { day: "Пн", бронирования: 32, доход: 48000 },
  { day: "Вт", бронирования: 45, доход: 67500 },
  { day: "Ср", бронирования: 38, доход: 57000 },
  { day: "Чт", бронирования: 52, доход: 78000 },
  { day: "Пт", бронирования: 61, доход: 91500 },
  { day: "Сб", бронирования: 28, доход: 42000 },
  { day: "Вс", бронирования: 15, доход: 22500 },
];

const MONTHLY_REVENUE = [
  { month: "Янв", доход: 820000 },
  { month: "Фев", доход: 950000 },
  { month: "Мар", доход: 1100000 },
  { month: "Апр", доход: 980000 },
  { month: "Май", доход: 1250000 },
  { month: "Июн", доход: 1180000 },
  { month: "Июл", доход: 1350000 },
  { month: "Авг", доход: 1420000 },
  { month: "Сен", доход: 1280000 },
  { month: "Окт", доход: 1500000 },
  { month: "Ноя", доход: 1380000 },
  { month: "Дек", доход: 1620000 },
];

const ROOM_USAGE = [
  { name: "Зал «Орион»", value: 35 },
  { name: "Переговорная «Альфа»", value: 25 },
  { name: "Коворкинг «Гамма»", value: 20 },
  { name: "Студия «Дельта»", value: 15 },
  { name: "Другие", value: 5 },
];

const BOOKING_STATUS_DATA = [
  { name: "Активные", value: 47, color: "hsl(152, 55%, 40%)" },
  { name: "Завершённые", value: 128, color: "hsl(25, 12%, 70%)" },
  { name: "Отклонённые", value: 12, color: "hsl(0, 72%, 51%)" },
];

const PIE_COLORS = ["hsl(9, 33%, 47%)", "hsl(210, 75%, 50%)", "hsl(152, 55%, 40%)", "hsl(38, 92%, 50%)", "hsl(25, 12%, 70%)"];

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs text-muted-foreground">
          {p.name}: <span className="font-semibold text-foreground">{typeof p.value === "number" && p.value > 1000 ? `${(p.value / 1000).toFixed(0)}K ₽` : p.value}</span>
        </p>
      ))}
    </div>
  );
};

const OverviewPage = () => {
  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Панель управления</h1>
        <p className="text-sm text-muted-foreground mt-1">Обзор текущей активности пространств</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <stat.icon size={20} strokeWidth={1.5} className={stat.color} />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                stat.up ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
              }`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly bookings bar chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Бронирования за неделю</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={WEEKLY_BOOKINGS} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="бронирования" fill="hsl(9, 33%, 47%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Room usage pie */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Загрузка помещений</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ROOM_USAGE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {ROOM_USAGE.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {ROOM_USAGE.map((r, i) => (
              <div key={r.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                <span className="text-muted-foreground flex-1 truncate">{r.name}</span>
                <span className="font-semibold text-foreground tabular-nums">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly revenue area */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Доход по месяцам (₽)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MONTHLY_REVENUE}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(9, 33%, 47%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(9, 33%, 47%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="доход" stroke="hsl(9, 33%, 47%)" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Booking statuses */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Статусы бронирований</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={BOOKING_STATUS_DATA} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {BOOKING_STATUS_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {BOOKING_STATUS_DATA.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-muted-foreground flex-1">{s.name}</span>
                <span className="font-semibold text-foreground tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly revenue bar */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Доход за неделю (₽)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={WEEKLY_BOOKINGS} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="доход" fill="hsl(210, 75%, 50%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
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
