import { useState, useRef, useEffect } from "react";
import { Send, Search, Circle } from "lucide-react";

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: "admin" | "user";
  text: string;
  time: string;
}

const MOCK_CHATS: ChatUser[] = [
  { id: "1", name: "Алексей Петров", lastMessage: "Не могу забронировать зал", time: "14:32", unread: 2, online: true },
  { id: "2", name: "Мария Иванова", lastMessage: "Спасибо за помощь!", time: "13:15", unread: 0, online: true },
  { id: "3", name: "Дмитрий Козлов", lastMessage: "Проблема с оплатой", time: "12:00", unread: 1, online: false },
  { id: "4", name: "Елена Смирнова", lastMessage: "Когда починят проектор?", time: "11:45", unread: 3, online: false },
  { id: "5", name: "Сергей Волков", lastMessage: "Всё работает, спасибо", time: "10:20", unread: 0, online: true },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "1", sender: "user", text: "Здравствуйте! Не могу забронировать зал «Орион» на завтра.", time: "14:28" },
    { id: "2", sender: "admin", text: "Здравствуйте! Какое время вас интересует?", time: "14:30" },
    { id: "3", sender: "user", text: "С 10:00 до 12:00, пишет что зал недоступен.", time: "14:31" },
    { id: "4", sender: "user", text: "Не могу забронировать зал", time: "14:32" },
  ],
  "2": [
    { id: "1", sender: "user", text: "Добрый день! Как отменить бронирование?", time: "13:00" },
    { id: "2", sender: "admin", text: "Перейдите в раздел «Мои бронирования» и нажмите «Отменить».", time: "13:10" },
    { id: "3", sender: "user", text: "Спасибо за помощь!", time: "13:15" },
  ],
};

const SupportPage = () => {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [chatSearch, setChatSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredChats = MOCK_CHATS.filter((c) =>
    c.name.toLowerCase().includes(chatSearch.toLowerCase())
  );

  const currentMessages = messages[selectedChat] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: crypto.randomUUID(),
      sender: "admin",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), msg],
    }));
    setNewMessage("");
  };

  const selectedUser = MOCK_CHATS.find((c) => c.id === selectedChat);

  return (
    <div className="flex h-[calc(100vh)] animate-fade-in">
      {/* Chat list */}
      <div className="w-[300px] border-r border-border flex flex-col bg-card shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">Тех. поддержка</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Поиск чатов..."
              className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full text-left px-4 py-3 border-b border-border transition-colors ${
                selectedChat === chat.id ? "bg-primary/5" : "hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {chat.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{chat.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-muted-foreground truncate">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="h-14 px-5 flex items-center gap-3 border-b border-border bg-card shrink-0">
          {selectedUser && (
            <>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {selectedUser.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedUser.name}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Circle size={6} className={selectedUser.online ? "fill-success text-success" : "fill-muted-foreground text-muted-foreground"} />
                  {selectedUser.online ? "Онлайн" : "Офлайн"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {currentMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.sender === "admin"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === "admin" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card shrink-0">
          <div className="flex items-center gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Введите сообщение..."
              className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 press-effect transition-all disabled:opacity-40"
            >
              <Send size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
