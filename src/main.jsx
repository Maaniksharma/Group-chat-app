/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import HomePage from './pages/Homepage';
import { ToastProvider } from './contexts/ToastContext';
import GroupChat from './pages/GroupChat';
import SendInvitations from './pages/SendInvitations';
import Invitations from './pages/Invitations';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/verifyemail" element={<VerifyEmail />} />
              <Route path="/groupchat" element={<GroupChat />} />
              <Route path="/sendinvitations" element={<SendInvitations />} />
              <Route path="/invitations" element={<Invitations />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
