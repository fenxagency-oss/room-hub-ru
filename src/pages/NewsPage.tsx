import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, Image, X } from "lucide-react";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  status: "published" | "draft";
  author: string;
}

interface NewsPageProps {
  channel: "users" | "team";
}

const CHANNEL_META = {
  users: { title: "Новости для пользователей", subtitle: "Публикации для всех пользователей платформы" },
  team: { title: "Новости для команды Spaces", subtitle: "Внутренние новости и обновления" },
};

const MOCK_NEWS: Record<string, NewsPost[]> = {
  users: [
    { id: "1", title: "Обновление приложения v3.2", content: "Мы добавили новые функции бронирования и улучшили интерфейс.", imageUrl: "", date: "18.03.2026", status: "published", author: "Администрация" },
    { id: "2", title: "Новый зал «Сириус»", content: "Открытие нового конференц-зала на 30 человек с панорамным видом.", imageUrl: "", date: "15.03.2026", status: "published", author: "Администрация" },
    { id: "3", title: "Акция: скидка 20% на вечерние часы", content: "Бронируйте залы после 18:00 со скидкой до конца месяца.", imageUrl: "", date: "12.03.2026", status: "draft", author: "Маркетинг" },
  ],
  team: [
    { id: "1", title: "Итоги квартала Q1 2026", content: "Рост загруженности на 23%, открытие 3 новых помещений.", imageUrl: "", date: "18.03.2026", status: "published", author: "CEO" },
    { id: "2", title: "Новые стандарты обслуживания", content: "Обновлённые инструкции для технического персонала.", imageUrl: "", date: "14.03.2026", status: "published", author: "HR" },
    { id: "3", title: "Корпоратив 28 марта", content: "Командный тимбилдинг в зале «Орион». Начало в 18:00.", imageUrl: "", date: "10.03.2026", status: "draft", author: "HR" },
  ],
};

const STATUS_MAP = {
  published: { label: "Опубликовано", cls: "bg-success/10 text-success" },
  draft: { label: "Черновик", cls: "bg-warning/10 text-warning" },
};

const NewsPage = ({ channel }: NewsPageProps) => {
  const meta = CHANNEL_META[channel];
  const [news, setNews] = useState(MOCK_NEWS[channel]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [previewPost, setPreviewPost] = useState<NewsPost | null>(null);

  const filtered = news.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: "", content: "", author: "" });
    setShowForm(true);
  };

  const openEdit = (post: NewsPost) => {
    setEditingId(post.id);
    setForm({ title: post.title, content: post.content, author: post.author });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title) return;
    if (editingId) {
      setNews((prev) => prev.map((n) => n.id === editingId ? { ...n, ...form } : n));
    } else {
      setNews((prev) => [{
        id: crypto.randomUUID(),
        title: form.title,
        content: form.content,
        imageUrl: "",
        date: new Date().toLocaleDateString("ru-RU"),
        status: "draft" as const,
        author: form.author || "Администрация",
      }, ...prev]);
    }
    setForm({ title: "", content: "", author: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePublish = (id: string) => {
    setNews((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: n.status === "published" ? "draft" : "published" as NewsPost["status"] } : n
      )
    );
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{meta.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{meta.subtitle}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:opacity-90 press-effect transition-all text-sm">
          <Plus size={16} strokeWidth={1.5} /> Создать пост
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск публикаций..." className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl animate-fade-in p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">{editingId ? "Редактировать пост" : "Новая публикация"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Заголовок" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Текст публикации..." rows={4} className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Автор" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              <div className="flex items-center gap-3 p-3 border border-dashed border-border rounded-lg text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                <Image size={18} strokeWidth={1.5} />
                <span className="text-sm">Загрузить изображение</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-border text-foreground font-medium py-2.5 rounded-lg hover:bg-muted press-effect transition-all text-sm">Отмена</button>
              <button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 press-effect transition-all text-sm">{editingId ? "Сохранить" : "Создать"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setPreviewPost(null)} />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl animate-fade-in p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">{previewPost.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">{previewPost.date} · {previewPost.author}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_MAP[previewPost.status].cls}`}>{STATUS_MAP[previewPost.status].label}</span>
                <button onClick={() => setPreviewPost(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{previewPost.content}</p>
            </div>
            <button onClick={() => setPreviewPost(null)} className="w-full border border-border text-foreground font-medium py-2.5 rounded-lg hover:bg-muted press-effect transition-all text-sm">Закрыть</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((post) => {
          const st = STATUS_MAP[post.status];
          return (
            <div key={post.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground truncate">{post.title}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${st.cls}`}>{st.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setPreviewPost(post)} className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Превью">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => togglePublish(post.id)} className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title={post.status === "published" ? "Снять с публикации" : "Опубликовать"}>
                    {post.status === "published" ? "📤" : "📥"}
                  </button>
                  <button onClick={() => openEdit(post)} className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Редактировать">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive" title="Удалить">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="border border-dashed border-border rounded-xl py-12 text-center">
            <p className="text-sm text-muted-foreground">Публикации не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
