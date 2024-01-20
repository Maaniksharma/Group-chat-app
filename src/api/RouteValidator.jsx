import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function RouteValidator({ children }) {
  const { user } = useAuth();
  if (!user.userName) {
    return <Navigate to="/login" />;
  } else return children;
}
