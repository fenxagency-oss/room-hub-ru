import { useState, useCallback } from "react";
import { Room } from "@/types/room";

const INITIAL_ROOMS: Room[] = [
  {
    id: "1",
    name: "Зал «Орион»",
    description: "Просторный конференц-зал с панорамными окнами и современным оборудованием.",
    capacity: 20,
    pricePerHour: 3500,
    status: "available",
    amenities: ["tv", "whiteboard", "coffee", "wifi", "ac"],
  },
  {
    id: "2",
    name: "Переговорная «Альфа»",
    description: "Компактная переговорная для небольших встреч и брейнштормов.",
    capacity: 6,
    pricePerHour: 1500,
    status: "occupied",
    amenities: ["tv", "whiteboard", "wifi"],
  },
  {
    id: "3",
    name: "Коворкинг «Гамма»",
    description: "Открытое рабочее пространство с индивидуальными рабочими местами.",
    capacity: 30,
    pricePerHour: 800,
    status: "available",
    amenities: ["coffee", "wifi", "ac"],
  },
  {
    id: "4",
    name: "Студия «Дельта»",
    description: "Творческая студия для мастер-классов и воркшопов.",
    capacity: 15,
    pricePerHour: 2500,
    status: "maintenance",
    amenities: ["projector", "whiteboard", "coffee", "wifi"],
  },
];

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);

  const addRoom = useCallback((room: Omit<Room, "id">) => {
    const newRoom: Room = { ...room, id: crypto.randomUUID() };
    setRooms((prev) => [...prev, newRoom]);
  }, []);

  const updateRoom = useCallback((id: string, updates: Partial<Room>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  }, []);

  const deleteRoom = useCallback((id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { rooms, addRoom, updateRoom, deleteRoom };
}
