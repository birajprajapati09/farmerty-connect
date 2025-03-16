
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'consumer';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: 'farmer' | 'consumer') => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage using localStorage
const saveUserToStorage = (user: User) => {
  localStorage.setItem('farmerty_user', JSON.stringify(user));
};

const getUserFromStorage = (): User | null => {
  const userStr = localStorage.getItem('farmerty_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // On initial load, check if user exists in storage
  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // This is a simplified mock authentication
      // In a real app, you would make an API call to validate credentials
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation - in a real app, this would be server-side
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      // Generate a mock user based on email
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name: email.split('@')[0], // Use part of email as name
        role: Math.random() > 0.5 ? 'farmer' : 'consumer', // Randomly assign a role
      };
      
      // Save user to state and storage
      setUser(mockUser);
      saveUserToStorage(mockUser);
      toast.success(`Welcome back, ${mockUser.name}!`);
      navigate('/');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, role: 'farmer' | 'consumer') => {
    try {
      setIsLoading(true);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app, this would be server-side
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name,
        role,
      };
      
      // Save user to state and storage
      setUser(newUser);
      saveUserToStorage(newUser);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('farmerty_user');
    toast.info('You have been signed out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
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
