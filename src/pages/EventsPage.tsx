import { useState } from "react";
import { Plus, Search, Calendar, MoreHorizontal, Image, Pencil, Trash2 } from "lucide-react";

interface EventPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  endDate: string;
  status: "active" | "draft" | "ended";
  location: string;
}

const MOCK_EVENTS: EventPost[] = [
  { id: "1", title: "Воркшоп по дизайну", description: "Мастер-класс по UI/UX дизайну для начинающих специалистов.", imageUrl: "", date: "20.03.2026", endDate: "20.03.2026", status: "active", location: "Зал «Орион»" },
  { id: "2", title: "Нетворкинг-вечер", description: "Открытая встреча для резидентов пространства.", imageUrl: "", date: "25.03.2026", endDate: "25.03.2026", status: "draft", location: "Коворкинг «Гамма»" },
  { id: "3", title: "Лекция: Стартапы 2026", description: "Приглашённый спикер расскажет о трендах стартап-индустрии.", imageUrl: "", date: "10.03.2026", endDate: "10.03.2026", status: "ended", location: "Студия «Дельта»" },
  { id: "4", title: "Хакатон «SpaceCode»", description: "48-часовой хакатон для команд разработчиков.", imageUrl: "", date: "01.04.2026", endDate: "03.04.2026", status: "active", location: "Зал «Орион»" },
];

const STATUS_MAP = {
  active: { label: "Активно", cls: "bg-success/10 text-success" },
  draft: { label: "Черновик", cls: "bg-warning/10 text-warning" },
  ended: { label: "Завершено", cls: "bg-muted text-muted-foreground" },
};

const EventsPage = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState(MOCK_EVENTS);

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const [form, setForm] = useState({ title: "", description: "", date: "", endDate: "", location: "", status: "draft" as EventPost["status"] });

  const handleAdd = () => {
    if (!form.title) return;
    setEvents((prev) => [
      ...prev,
      { ...form, id: crypto.randomUUID(), imageUrl: "" },
    ]);
    setForm({ title: "", description: "", date: "", endDate: "", location: "", status: "draft" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Мероприятия</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление событиями и мероприятиями</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:opacity-90 press-effect transition-all text-sm"
        >
          <Plus size={16} strokeWidth={1.5} /> Создать
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск мероприятий..."
          className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
      </div>

      {/* Event form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl animate-fade-in p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Новое мероприятие</h2>
            <div className="space-y-3">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Название мероприятия" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Описание..." rows={3} className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Дата начала</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Дата окончания</label>
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
              </div>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Место проведения" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              <div className="flex items-center gap-3 p-3 border border-dashed border-border rounded-lg text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                <Image size={18} strokeWidth={1.5} />
                <span className="text-sm">Загрузить изображение</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-border text-foreground font-medium py-2.5 rounded-lg hover:bg-muted press-effect transition-all text-sm">Отмена</button>
              <button onClick={handleAdd} className="flex-1 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 press-effect transition-all text-sm">Создать</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((event) => {
          const st = STATUS_MAP[event.status];
          return (
            <div key={event.id} className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-sm transition-shadow">
              <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Calendar size={32} className="text-primary/30" strokeWidth={1} />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${st.cls}`}>{st.label}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{event.date}{event.endDate !== event.date ? ` — ${event.endDate}` : ""}</span>
                  <span>·</span>
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="flex border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors press-effect">
                  <Pencil size={13} /> Редактировать
                </button>
                <div className="w-px bg-border" />
                <button onClick={() => handleDelete(event.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors press-effect">
                  <Trash2 size={13} /> Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
