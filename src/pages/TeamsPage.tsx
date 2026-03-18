import { useState } from "react";
import { Search, Plus, Users, MoreHorizontal } from "lucide-react";

interface Team {
  id: string;
  name: string;
  lead: string;
  members: number;
  activeBookings: number;
  color: string;
}

const MOCK_TEAMS: Team[] = [
  { id: "1", name: "Дизайн", lead: "Анна Кузнецова", members: 8, activeBookings: 5, color: "bg-primary/10 text-primary" },
  { id: "2", name: "Разработка", lead: "Мария Иванова", members: 15, activeBookings: 12, color: "bg-info/10 text-info" },
  { id: "3", name: "Маркетинг", lead: "Дмитрий Козлов", members: 6, activeBookings: 3, color: "bg-warning/10 text-warning" },
  { id: "4", name: "HR", lead: "Елена Смирнова", members: 4, activeBookings: 2, color: "bg-success/10 text-success" },
  { id: "5", name: "Продажи", lead: "Сергей Волков", members: 10, activeBookings: 7, color: "bg-destructive/10 text-destructive" },
];

const TeamsPage = () => {
  const [search, setSearch] = useState("");
  const filtered = MOCK_TEAMS.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Команды</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление группами пользователей</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:opacity-90 press-effect transition-all text-sm">
          <Plus size={16} strokeWidth={1.5} /> Создать команду
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск команд..."
          className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((team) => (
          <div key={team.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${team.color}`}>
                <Users size={18} strokeWidth={1.5} />
              </div>
              <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground opacity-0 group-hover:opacity-100">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <h3 className="text-base font-semibold text-foreground">{team.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Руководитель: {team.lead}</p>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <p className="text-lg font-bold text-foreground tabular-nums">{team.members}</p>
                <p className="text-[11px] text-muted-foreground">участников</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground tabular-nums">{team.activeBookings}</p>
                <p className="text-[11px] text-muted-foreground">активных броней</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
