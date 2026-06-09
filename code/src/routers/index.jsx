import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute, { AnonymousRoute } from './ProtectedRoute';
import adminRoutes from './adminRoutes';
import studentRoutes from './studentRoutes';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AnonymousRoute>
        <Login />
      </AnonymousRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      // Admin paths nested under role check
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: adminRoutes,
      },
      // Student paths nested under role check
      {
        path: 'student',
        element: <ProtectedRoute allowedRoles={['student']} />,
        children: studentRoutes,
      },
      // Catch-all route to redirect back to root
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
