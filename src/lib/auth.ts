// Authentication Service
import { 
  getUserByEmail, 
  createUser, 
  setCurrentUser, 
  getCurrentUser, 
  clearCurrentUser,
  type User 
} from './localStorage';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'resident' | 'secretary' | 'area-head';
  flat?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Login function
export const login = (credentials: LoginCredentials): AuthResponse => {
  const { email, password } = credentials;

  // Validate input
  if (!email || !password) {
    return {
      success: false,
      error: 'Email and password are required'
    };
  }

  // Find user
  const user = getUserByEmail(email);

  if (!user) {
    return {
      success: false,
      error: 'User not found. Please check your email or sign up.'
    };
  }

  // Check password
  if (user.password !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please try again.'
    };
  }

  // Set current user
  setCurrentUser(user);

  return {
    success: true,
    user
  };
};

// Signup function
export const signup = (data: SignupData): AuthResponse => {
  const { email, password, name, role, flat, phone } = data;

  // Validate input
  if (!email || !password || !name || !role) {
    return {
      success: false,
      error: 'All fields are required'
    };
  }

  // Check if user already exists
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return {
      success: false,
      error: 'User with this email already exists'
    };
  }

  // Create new user
  const newUser = createUser({
    email,
    password,
    name,
    role,
    flat,
    phone,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
  });

  // Set current user
  setCurrentUser(newUser);

  return {
    success: true,
    user: newUser
  };
};

// Logout function
export const logout = (): void => {
  clearCurrentUser();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Get current authenticated user
export const getAuthUser = (): User | null => {
  return getCurrentUser();
};

// Get redirect path based on role
export const getRedirectPath = (role: string): string => {
  switch (role) {
    case 'resident':
      return '/dashboard';
    case 'secretary':
      return '/secretary/dashboard';
    case 'area-head':
      return '/area-head/dashboard';
    default:
      return '/dashboard';
  }
};
