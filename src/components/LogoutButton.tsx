import React from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { logout, doctor } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button
      onClick={handleLogout}
      size="sm"
      variant="outline"
      colorScheme="red"
      fontFamily="IBM Plex Sans, sans-serif"
    >
      Logout {doctor?.user?.first_name && `(${doctor.user.first_name})`}
    </Button>
  );
};

export default LogoutButton;
