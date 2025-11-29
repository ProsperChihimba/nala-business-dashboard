import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RegistrationFormData {
  user?: {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
  };
  password?: string;
  confirmPassword?: string;
  specialization?: string;
  license_number?: string;
  phone_number?: string;
  address?: string;
  experience_years?: number;
  bio?: string;
  profile_picture?: string;
  is_available?: boolean;
}

interface RegistrationContextType {
  formData: RegistrationFormData;
  updateFormData: (data: RegistrationFormData) => void;
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
  const [formData, setFormData] = useState<RegistrationFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (data: RegistrationFormData) => {
    setFormData(prev => {
      const newData: RegistrationFormData = {
        ...prev,
        ...data,
      };
      
      if (data.user) {
        newData.user = {
          ...prev.user,
          ...data.user,
        };
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
