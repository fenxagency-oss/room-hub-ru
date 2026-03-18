import { useState } from "react";
import { useRooms } from "@/store/rooms";
import { RoomCard } from "@/components/RoomCard";
import { RoomFormDialog } from "@/components/RoomFormDialog";
import { Room } from "@/types/room";
import { Plus, Search, DoorOpen } from "lucide-react";

const RoomsPage = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useRooms();
  const [formOpen, setFormOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | undefined>();
  const [search, setSearch] = useState("");

  const filteredRooms = rooms.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Помещения</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление залами и рабочими пространствами</p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:opacity-90 press-effect transition-all text-sm"
        >
          <Plus size={16} strokeWidth={1.5} /> Добавить
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск помещений..."
          className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
      </div>

      {filteredRooms.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl py-16 flex flex-col items-center gap-3">
          <DoorOpen size={32} className="text-muted-foreground/40" strokeWidth={1} />
          <p className="text-sm text-muted-foreground">Нет доступных помещений</p>
          <button onClick={() => setFormOpen(true)} className="text-sm text-primary hover:underline press-effect">
            Добавить пространство
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onEdit={handleEdit} onDelete={deleteRoom} />
          ))}
        </div>
      )}

      <RoomFormDialog open={formOpen} onClose={handleCloseForm} onSubmit={handleSubmit} initial={editingRoom} />
    </div>
  );
};

export default RoomsPage;
