import { useState } from "react";
import {
  Users, DoorOpen, CalendarCheck, TrendingUp, Clock, ArrowUpRight, ArrowDownRight,
  Download, ShoppingCart, Smartphone, BarChart3, Activity
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart
} from "recharts";

const formatTenge = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M ₸`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K ₸`;
  return `${v} ₸`;
};

const STATS = [
  { label: "Активных пользователей", value: "3,847", change: "+18%", up: true, icon: Users, color: "text-primary" },
  { label: "Скачиваний приложения", value: "12,560", change: "+24%", up: true, icon: Download, color: "text-info" },
  { label: "Продаж за месяц", value: "1,284", change: "+15%", up: true, icon: ShoppingCart, color: "text-success" },
  { label: "Выручка за месяц", value: "8.4M ₸", change: "+9%", up: true, icon: TrendingUp, color: "text-warning" },
  { label: "Активных броней", value: "47", change: "+8%", up: true, icon: CalendarCheck, color: "text-primary" },
  { label: "Помещений", value: "24", change: "+2", up: true, icon: DoorOpen, color: "text-info" },
  { label: "Загрузка сегодня", value: "73%", change: "-3%", up: false, icon: Activity, color: "text-destructive" },
  { label: "Онлайн сейчас", value: "182", change: "+12", up: true, icon: Smartphone, color: "text-success" },
];

const PERIOD_OPTIONS = [
  { label: "1 мес", value: "1m" },
  { label: "3 мес", value: "3m" },
  { label: "6 мес", value: "6m" },
  { label: "1 год", value: "1y" },
] as const;

type Period = typeof PERIOD_OPTIONS[number]["value"];

const MONTHLY_DATA_FULL = [
  { month: "Янв", продажи: 820, выручка: 4100000, бронирования: 310, загрузка: 62 },
  { month: "Фев", продажи: 950, выручка: 4750000, бронирования: 365, загрузка: 68 },
  { month: "Мар", продажи: 1100, выручка: 5500000, бронирования: 420, загрузка: 72 },
  { month: "Апр", продажи: 980, выручка: 4900000, бронирования: 385, загрузка: 65 },
  { month: "Май", продажи: 1250, выручка: 6250000, бронирования: 480, загрузка: 78 },
  { month: "Июн", продажи: 1180, выручка: 5900000, бронирования: 450, загрузка: 75 },
  { month: "Июл", продажи: 1350, выручка: 6750000, бронирования: 510, загрузка: 82 },
  { month: "Авг", продажи: 1420, выручка: 7100000, бронирования: 540, загрузка: 85 },
  { month: "Сен", продажи: 1280, выручка: 6400000, бронирования: 490, загрузка: 79 },
  { month: "Окт", продажи: 1500, выручка: 7500000, бронирования: 570, загрузка: 88 },
  { month: "Ноя", продажи: 1380, выручка: 6900000, бронирования: 525, загрузка: 83 },
  { month: "Дек", продажи: 1620, выручка: 8100000, бронирования: 615, загрузка: 91 },
];

const getMonthlyData = (period: Period) => {
  const counts: Record<Period, number> = { "1m": 1, "3m": 3, "6m": 6, "1y": 12 };
  return MONTHLY_DATA_FULL.slice(-counts[period]);
};

const WEEKLY_BOOKINGS = [
  { day: "Пн", бронирования: 32, выручка: 480000 },
  { day: "Вт", бронирования: 45, выручка: 675000 },
  { day: "Ср", бронирования: 38, выручка: 570000 },
  { day: "Чт", бронирования: 52, выручка: 780000 },
  { day: "Пт", бронирования: 61, выручка: 915000 },
  { day: "Сб", бронирования: 28, выручка: 420000 },
  { day: "Вс", бронирования: 15, выручка: 225000 },
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

const USER_GROWTH = [
  { month: "Янв", новые: 320, всего: 1200, скачивания: 580 },
  { month: "Фев", новые: 410, всего: 1610, скачивания: 720 },
  { month: "Мар", новые: 380, всего: 1990, скачивания: 690 },
  { month: "Апр", новые: 520, всего: 2510, скачивания: 850 },
  { month: "Май", новые: 480, всего: 2990, скачивания: 940 },
  { month: "Июн", новые: 390, всего: 3380, скачивания: 780 },
  { month: "Июл", новые: 450, всего: 3830, скачивания: 1100 },
  { month: "Авг", новые: 610, всего: 4440, скачивания: 1350 },
  { month: "Сен", новые: 550, всего: 4990, скачивания: 1200 },
  { month: "Окт", новые: 680, всего: 5670, скачивания: 1500 },
  { month: "Ноя", новые: 720, всего: 6390, скачивания: 1650 },
  { month: "Дек", новые: 810, всего: 7200, скачивания: 1800 },
];

const SALES_BY_TYPE = [
  { name: "Почасовая аренда", value: 45, color: "hsl(9, 33%, 47%)" },
  { name: "Полдня", value: 25, color: "hsl(210, 75%, 50%)" },
  { name: "Полный день", value: 18, color: "hsl(152, 55%, 40%)" },
  { name: "Подписка", value: 12, color: "hsl(38, 92%, 50%)" },
];

const PIE_COLORS = ["hsl(9, 33%, 47%)", "hsl(210, 75%, 50%)", "hsl(152, 55%, 40%)", "hsl(38, 92%, 50%)", "hsl(25, 12%, 70%)"];

const RECENT_BOOKINGS = [
  { id: 1, user: "Алексей Петров", room: "Зал «Орион»", time: "10:00–12:00", amount: 15000, status: "active" as const },
  { id: 2, user: "Мария Иванова", room: "Переговорная «Альфа»", time: "13:00–14:30", amount: 7500, status: "active" as const },
  { id: 3, user: "Дмитрий Козлов", room: "Студия «Дельта»", time: "09:00–10:00", amount: 12000, status: "done" as const },
  { id: 4, user: "Елена Смирнова", room: "Коворкинг «Гамма»", time: "15:00–17:00", amount: 5000, status: "rejected" as const },
  { id: 5, user: "Сергей Волков", room: "Зал «Орион»", time: "11:00–12:30", amount: 11250, status: "active" as const },
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
          {p.name}: <span className="font-semibold text-foreground">
            {typeof p.value === "number" && p.value > 1000 ? formatTenge(p.value) : p.value}
          </span>
        </p>
      ))}
    </div>
  );
};

const PeriodSelector = ({ value, onChange }: { value: Period; onChange: (p: Period) => void }) => (
  <div className="flex gap-1 bg-muted rounded-lg p-0.5">
    {PERIOD_OPTIONS.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
          value === opt.value
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

const OverviewPage = () => {
  const [revenuePeriod, setRevenuePeriod] = useState<Period>("6m");
  const [occupancyPeriod, setOccupancyPeriod] = useState<Period>("6m");

  const revenueData = getMonthlyData(revenuePeriod);
  const occupancyData = getMonthlyData(occupancyPeriod);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Панель управления</h1>
        <p className="text-sm text-muted-foreground mt-1">Обзор текущей активности пространств</p>
      </div>

      {/* Stats grid */}
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

      {/* Row 1: Revenue + Sales by type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Выручка по месяцам (₸)</h2>
            <PeriodSelector value={revenuePeriod} onChange={setRevenuePeriod} />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(9, 33%, 47%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(9, 33%, 47%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => formatTenge(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="выручка" stroke="hsl(9, 33%, 47%)" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Продажи по типу</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={SALES_BY_TYPE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {SALES_BY_TYPE.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {SALES_BY_TYPE.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-muted-foreground flex-1">{s.name}</span>
                <span className="font-semibold text-foreground tabular-nums">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Weekly bookings + Room usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Бронирования и выручка за неделю</h2>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={WEEKLY_BOOKINGS} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => formatTenge(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="бронирования" fill="hsl(9, 33%, 47%)" radius={[6, 6, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="выручка" stroke="hsl(210, 75%, 50%)" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

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

      {/* Row 3: Occupancy trend + Users growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Заполняемость переговорных (%)</h2>
            <PeriodSelector value={occupancyPeriod} onChange={setOccupancyPeriod} />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={occupancyData}>
              <defs>
                <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152, 55%, 40%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152, 55%, 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="загрузка" stroke="hsl(152, 55%, 40%)" strokeWidth={2} fill="url(#occGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Рост пользователей и скачиваний</h2>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={USER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="новые" fill="hsl(9, 33%, 47%)" radius={[4, 4, 0, 0]} barSize={16} name="Новые пользователи" />
              <Bar dataKey="скачивания" fill="hsl(210, 75%, 50%)" radius={[4, 4, 0, 0]} barSize={16} name="Скачивания" />
              <Line type="monotone" dataKey="всего" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} name="Всего пользователей" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4: Sales trend + Booking statuses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Динамика продаж и бронирований</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={MONTHLY_DATA_FULL}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(25, 15%, 90%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(15, 10%, 48%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="продажи" stroke="hsl(9, 33%, 47%)" strokeWidth={2} dot={{ r: 3 }} name="Продажи" />
              <Line type="monotone" dataKey="бронирования" stroke="hsl(210, 75%, 50%)" strokeWidth={2} dot={{ r: 3 }} name="Бронирования" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Статусы бронирований</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={BOOKING_STATUS_DATA} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
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
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-foreground tabular-nums">{booking.amount.toLocaleString()} ₸</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>
                    {st.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
