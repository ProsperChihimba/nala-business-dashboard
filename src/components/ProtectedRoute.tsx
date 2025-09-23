import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Spinner, Text, Center } from '@chakra-ui/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, token } = useAuth();

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'token:', token ? 'Present' : 'Missing');

  if (isLoading) {
    console.log('ProtectedRoute - Showing loading spinner');
    return (
      <Center height="100vh">
        <Box textAlign="center">
          <Spinner size="xl" color="#073DFC" />
          <Text mt={4} fontFamily="IBM Plex Sans, sans-serif">
            Loading...
          </Text>
        </Box>
      </Center>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    console.log('Current token:', token);
    console.log('Current localStorage token:', localStorage.getItem('doctorToken'));
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute - Authenticated, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
