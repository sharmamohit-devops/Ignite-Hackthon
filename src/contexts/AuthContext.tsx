// Auth Context for global state management
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, initializeStorage } from '@/lib/localStorage';
import { login as authLogin, signup as authSignup, logout as authLogout, type LoginCredentials, type SignupData } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize storage and check for existing session
  useEffect(() => {
    initializeStorage();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = authLogin(credentials);
    if (response.success && response.user) {
      setUser(response.user);
    }
    return {
      success: response.success,
      error: response.error
    };
  };

  const signup = async (data: SignupData) => {
    const response = authSignup(data);
    if (response.success && response.user) {
      setUser(response.user);
    }
    return {
      success: response.success,
      error: response.error
    };
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: user !== null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
