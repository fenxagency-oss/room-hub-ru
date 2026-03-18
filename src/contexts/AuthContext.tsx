import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface Admin {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const ADMINS = [
  { email: "admin@spaces.ru", password: "admin123", name: "Администратор", role: "Главный администратор" },
  { email: "manager@spaces.ru", password: "manager123", name: "Менеджер", role: "Менеджер пространств" },
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const saved = localStorage.getItem("spaces_admin");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string) => {
    const found = ADMINS.find((a) => a.email === email && a.password === password);
    if (found) {
      const adminData = { email: found.email, name: found.name, role: found.role };
      setAdmin(adminData);
      localStorage.setItem("spaces_admin", JSON.stringify(adminData));
      return { success: true };
    }
    return { success: false, error: "Неверный email или пароль" };
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem("spaces_admin");
  }, []);

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return { admin: null, isAuthenticated: false, login: () => ({ success: false, error: "Not initialized" }), logout: () => {} } as AuthContextType;
  }
  return ctx;
}
