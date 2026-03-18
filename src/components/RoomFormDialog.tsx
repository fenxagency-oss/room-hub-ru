import { useState } from "react";
import { Room, AMENITY_OPTIONS } from "@/types/room";
import { X, Monitor, Presentation, Coffee, Projector, Wifi, Wind } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={16} strokeWidth={1.5} />,
  Presentation: <Presentation size={16} strokeWidth={1.5} />,
  Coffee: <Coffee size={16} strokeWidth={1.5} />,
  Projector: <Projector size={16} strokeWidth={1.5} />,
  Wifi: <Wifi size={16} strokeWidth={1.5} />,
  Wind: <Wind size={16} strokeWidth={1.5} />,
};

interface RoomFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (room: Omit<Room, "id">) => void;
  initial?: Room;
}

export function RoomFormDialog({ open, onClose, onSubmit, initial }: RoomFormDialogProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [capacity, setCapacity] = useState(initial?.capacity ?? 10);
  const [pricePerHour, setPricePerHour] = useState(initial?.pricePerHour ?? 1000);
  const [status, setStatus] = useState<Room["status"]>(initial?.status ?? "available");
  const [amenities, setAmenities] = useState<string[]>(initial?.amenities ?? []);

  if (!open) return null;

  const toggleAmenity = (id: string) => {
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, capacity, pricePerHour, status, amenities });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-card border border-border rounded-lg shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-medium text-foreground">
            {initial ? "Редактировать пространство" : "Новое пространство"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Название
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Зал «Название»"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Описание пространства
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] bg-muted border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Краткое описание комнаты, её назначения и особенностей..."
            />
          </div>

          {/* Capacity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Вместимость
              </label>
              <input
                type="number"
                min={1}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground tabular-nums focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Цена / час (₽)
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={pricePerHour}
                onChange={(e) => setPricePerHour(Number(e.target.value))}
                className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground tabular-nums focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Статус
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Room["status"])}
              className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
            >
              <option value="available">Свободно</option>
              <option value="occupied">Занято</option>
              <option value="maintenance">Обслуживание</option>
            </select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Удобства и оборудование
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITY_OPTIONS.map((item) => {
                const checked = amenities.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors ${
                      checked
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAmenity(item.id)}
                      className="sr-only"
                    />
                    <span className="flex items-center gap-2 text-sm">
                      {ICON_MAP[item.icon]} {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-border text-foreground font-medium py-2.5 rounded-md hover:bg-muted press-effect transition-all text-sm"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground font-medium py-2.5 rounded-md hover:opacity-90 press-effect transition-all text-sm"
            >
              {initial ? "Сохранить" : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
