import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    // Demo login — accepts any credentials
    navigate("/dashboard");
  };

  return (
    <div className="min-h-svh flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[380px] space-y-8"
      >
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              Вход в панель
            </h1>
            <p className="text-sm text-muted-foreground">
              Управление рабочими пространствами
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="admin@spaces.ru"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-muted border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-foreground text-background font-medium py-2.5 rounded-md hover:opacity-90 press-effect transition-all text-sm"
          >
            Войти
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          Spaces Admin Hub · v1.0
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
