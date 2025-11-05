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
        
        // Try to fetch doctor profile if we have a token and username
        try {
          const storedUsername = localStorage.getItem('doctorUsername');
          if (storedUsername) {
            console.log('Found stored username:', storedUsername, 'fetching doctor profile');
            const doctorProfile = await apiService.getDoctorByUsername(storedUsername, storedToken);
            setDoctor(doctorProfile);
            console.log('Doctor profile loaded successfully:', doctorProfile);
            console.log('Doctor ID:', doctorProfile.id, 'for username:', storedUsername);
          } else {
            console.log('No stored username found, doctor profile will be fetched when needed by components');
          }
        } catch (error) {
          console.warn('Could not load stored doctor profile:', error);
          // Try fallback mapping if API fails
          const storedUsername = localStorage.getItem('doctorUsername');
          if (storedUsername) {
            console.log('API failed, trying fallback mapping for username:', storedUsername);
            const usernameToDoctorId: { [key: string]: number } = {
              'dr_jones': 7,
              'procnotion': 8,
              'liam_harris': 6,
              'isabella_green': 5,
              'henry_white': 4,
              'dr_thompson': 3
            };
            
            if (usernameToDoctorId[storedUsername]) {
              const doctorId = usernameToDoctorId[storedUsername];
              console.log('Using fallback doctor ID:', doctorId, 'for username:', storedUsername);
              const doctorProfile = await apiService.getDoctorProfile(doctorId, storedToken);
              setDoctor(doctorProfile);
              console.log('Doctor profile loaded via fallback:', doctorProfile);
            } else {
              console.warn('No fallback mapping found for username:', storedUsername);
            }
          }
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
      
      // Store token and username
      localStorage.setItem('doctorToken', response.token);
      localStorage.setItem('doctorUsername', credentials.username);
      setToken(response.token);
      setIsAuthenticated(true);
      
      // Fetch doctor profile after successful login
      try {
        console.log('Fetching doctor profile for username:', credentials.username);
        
        // Use the proper API method to get doctor by username
        const doctorProfile = await apiService.getDoctorByUsername(credentials.username, response.token);
        setDoctor(doctorProfile);
        console.log('Doctor profile loaded successfully:', doctorProfile);
        console.log('Doctor ID:', doctorProfile.id, 'for username:', credentials.username);
      } catch (profileError) {
        console.error('Could not fetch doctor profile:', profileError);
        
        // Fallback to hardcoded mapping if API fails
        console.log('API failed, using fallback mapping for username:', credentials.username);
        const usernameToDoctorId: { [key: string]: number } = {
          'dr_jones': 7,
          'procnotion': 8,
          'liam_harris': 6,
          'isabella_green': 5,
          'henry_white': 4,
          'dr_thompson': 3
        };
        
        if (usernameToDoctorId[credentials.username]) {
          const doctorId = usernameToDoctorId[credentials.username];
          console.log('Using fallback doctor ID:', doctorId, 'for username:', credentials.username);
          const doctorProfile = await apiService.getDoctorProfile(doctorId, response.token);
          setDoctor(doctorProfile);
          console.log('Doctor profile loaded via fallback:', doctorProfile);
        } else {
          console.warn('No fallback mapping found for username:', credentials.username);
        }
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
    localStorage.removeItem('doctorUsername');
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