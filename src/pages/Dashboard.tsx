import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRooms } from "@/store/rooms";
import { RoomCard } from "@/components/RoomCard";
import { RoomFormDialog } from "@/components/RoomFormDialog";
import { Room } from "@/types/room";
import { Plus, LogOut, Building2, LayoutGrid, Search } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { rooms, addRoom, updateRoom, deleteRoom } = useRooms();
  const [formOpen, setFormOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | undefined>();
  const [search, setSearch] = useState("");

  const filteredRooms = rooms.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === "available").length,
    occupied: rooms.filter((r) => r.status === "occupied").length,
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormOpen(true);
  };

  const handleSubmit = (data: Omit<Room, "id">) => {
    if (editingRoom) {
      updateRoom(editingRoom.id, data);
    } else {
      addRoom(data);
    }
    setEditingRoom(undefined);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingRoom(undefined);
  };

  return (
    <div className="min-h-svh bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 size={20} className="text-primary" strokeWidth={1.5} />
            <span className="text-sm font-medium text-foreground">Панель управления</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors press-effect"
          >
            <LogOut size={14} strokeWidth={1.5} /> Выйти
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Всего помещений", value: stats.total, icon: LayoutGrid },
            { label: "Свободно", value: stats.available, color: "text-success" },
            { label: "Занято", value: stats.occupied, color: "text-warning" },
          ].map((stat) => (
            <div key={stat.label} className="border border-border rounded-lg p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-2xl font-medium tabular-nums ${"color" in stat ? stat.color : "text-foreground"}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск помещений..."
              className="w-full bg-muted border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-md hover:opacity-90 press-effect transition-all text-sm"
          >
            <Plus size={16} strokeWidth={1.5} /> Добавить
          </button>
        </div>

        {/* Room Grid */}
        {filteredRooms.length === 0 ? (
          <div className="border border-dashed border-border rounded-lg py-16 flex flex-col items-center gap-3">
            <Building2 size={32} className="text-muted-foreground/50" strokeWidth={1} />
            <p className="text-sm text-muted-foreground">Нет доступных комнат</p>
            <button
              onClick={() => setFormOpen(true)}
              className="text-sm text-primary hover:underline press-effect"
            >
              Добавить пространство
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onEdit={handleEdit}
                onDelete={deleteRoom}
              />
            ))}
          </div>
        )}
      </main>

      <RoomFormDialog
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initial={editingRoom}
      />
    </div>
  );
};

export default Dashboard;
