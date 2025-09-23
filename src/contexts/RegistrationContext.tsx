import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DoctorRegistrationData } from '../services/api';

interface RegistrationContextType {
  formData: Partial<DoctorRegistrationData>;
  updateFormData: (data: Partial<DoctorRegistrationData>) => void;
  resetFormData: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<DoctorRegistrationData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (data: Partial<DoctorRegistrationData>) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        ...data,
      };
      
      if (data.user) {
        newData.user = {
          username: data.user.username || prev.user?.username || '',
          first_name: data.user.first_name || prev.user?.first_name || '',
          last_name: data.user.last_name || prev.user?.last_name || '',
          email: data.user.email || prev.user?.email || '',
        };
      }
      
      // Handle password separately since it's at root level
      if (data.password !== undefined) {
        newData.password = data.password;
      }
      
      return newData;
    });
  };

  const resetFormData = () => {
    setFormData({});
    setError(null);
    setIsLoading(false);
  };

  return (
    <RegistrationContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
