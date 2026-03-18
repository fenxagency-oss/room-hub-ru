import { Room, STATUS_LABELS, AMENITY_OPTIONS } from "@/types/room";
import { Users, Clock, Pencil, Trash2, Monitor, Presentation, Coffee, Projector, Wifi, Wind } from "lucide-react";
import { useState } from "react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={14} strokeWidth={1.5} />,
  Presentation: <Presentation size={14} strokeWidth={1.5} />,
  Coffee: <Coffee size={14} strokeWidth={1.5} />,
  Projector: <Projector size={14} strokeWidth={1.5} />,
  Wifi: <Wifi size={14} strokeWidth={1.5} />,
  Wind: <Wind size={14} strokeWidth={1.5} />,
};

const STATUS_COLORS: Record<Room["status"], string> = {
  available: "bg-success/10 text-success",
  occupied: "bg-warning/10 text-warning",
  maintenance: "bg-muted text-muted-foreground",
};

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
}

export function RoomCard({ room, onEdit, onDelete }: RoomCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(room.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const amenityDetails = room.amenities
    .map((id) => AMENITY_OPTIONS.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <div className="border border-border rounded-xl bg-card hover:shadow-sm transition-all group">
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">{room.name}</h3>
            {room.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{room.description}</p>
            )}
          </div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-3 ${STATUS_COLORS[room.status]}`}>
            {STATUS_LABELS[room.status]}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 tabular-nums">
            <Users size={13} strokeWidth={1.5} /> {room.capacity} чел.
          </span>
          <span className="flex items-center gap-1.5 tabular-nums">
            <Clock size={13} strokeWidth={1.5} /> {room.pricePerHour.toLocaleString("ru-RU")} ₽/час
          </span>
        </div>

        {amenityDetails.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {amenityDetails.map((a) => (
              <span key={a!.id} className="flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                {ICON_MAP[a!.icon]} {a!.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex border-t border-border">
        <button
          onClick={() => onEdit(room)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors press-effect"
        >
          <Pencil size={13} strokeWidth={1.5} /> Редактировать
        </button>
        <div className="w-px bg-border" />
        <button
          onClick={handleDelete}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs transition-colors press-effect ${
            confirmDelete
              ? "text-destructive bg-destructive/10"
              : "text-muted-foreground hover:text-destructive hover:bg-destructive/5"
          }`}
        >
          <Trash2 size={13} strokeWidth={1.5} />
          {confirmDelete ? "Подтвердить?" : "Удалить"}
        </button>
      </div>
    </div>
  );
}
