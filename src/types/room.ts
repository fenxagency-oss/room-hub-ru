export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  status: "available" | "occupied" | "maintenance";
  amenities: string[];
  imageUrl?: string;
}

export const AMENITY_OPTIONS = [
  { id: "tv", label: "Телевизор / Экран", icon: "Monitor" },
  { id: "whiteboard", label: "Маркерная доска", icon: "Presentation" },
  { id: "coffee", label: "Кофе и чай", icon: "Coffee" },
  { id: "projector", label: "Проектор", icon: "Projector" },
  { id: "wifi", label: "Wi-Fi", icon: "Wifi" },
  { id: "ac", label: "Кондиционер", icon: "Wind" },
] as const;

export const STATUS_LABELS: Record<Room["status"], string> = {
  available: "Свободно",
  occupied: "Занято",
  maintenance: "Обслуживание",
};
