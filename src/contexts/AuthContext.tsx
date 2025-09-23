import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, LoginCredentials, DoctorResponse } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  doctor: DoctorResponse | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true to check stored auth
  const [doctor, setDoctor] = useState<DoctorResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = localStorage.getItem('doctorToken');
      console.log('Checking stored token:', storedToken ? 'Found' : 'Not found');
      
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        console.log('Authentication state set to true');
        
        // Try to fetch doctor profile if we have a token
        try {
          // We need to get the username from somewhere - for now, let's try a different approach
          // We'll let the components handle this when they need the doctor ID
          console.log('Token found, but doctor profile will be fetched when needed');
        } catch (error) {
          console.warn('Could not load stored authentication:', error);
        }
      } else {
        console.log('No stored token found, user not authenticated');
      }
      
      // Always set loading to false after checking
      setIsLoading(false);
    };
    
    loadStoredAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting login with credentials:', credentials);
      
      const response = await apiService.loginDoctor(credentials);
      console.log('Login successful, received token:', response.token);
      
      // Store token
      localStorage.setItem('doctorToken', response.token);
      setToken(response.token);
      setIsAuthenticated(true);
      
      // Fetch doctor profile after successful login
      try {
        console.log('Fetching doctor profile for username:', credentials.username);
        
        // For now, use hardcoded mapping since the API doesn't filter by username correctly
        let doctorId = 7; // Default to dr_jones (Sarah Jones)
        
        // Map usernames to doctor IDs
        const usernameToDoctorId: { [key: string]: number } = {
          'dr_jones': 7,
          'procnotion': 8,
          'liam_harris': 6,
          'isabella_green': 5,
          'henry_white': 4
        };
        
        if (usernameToDoctorId[credentials.username]) {
          doctorId = usernameToDoctorId[credentials.username];
        }
        
        console.log('Using doctor ID:', doctorId, 'for username:', credentials.username);
        const doctorProfile = await apiService.getDoctorProfile(doctorId, response.token);
        setDoctor(doctorProfile);
        console.log('Doctor profile loaded successfully:', doctorProfile);
      } catch (profileError) {
        console.error('Could not fetch doctor profile:', profileError);
        // Continue with login even if profile fetch fails
      }
      
      console.log('Login successful, token received:', response.token);
      
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('doctorToken');
    setToken(null);
    setIsAuthenticated(false);
    setDoctor(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        doctor,
        token,
        login,
        logout,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};