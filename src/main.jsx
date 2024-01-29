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
import MetricsPage from './pages/MetricsPage';
import RouteValidator from './api/RouteValidator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <RouteValidator>
                  <HomePage />
                </RouteValidator>
              }
            />
            <Route
              path="/groupchat"
              element={
                <RouteValidator>
                  <GroupChat />
                </RouteValidator>
              }
            />
            <Route
              path="/sendinvitations"
              element={
                <RouteValidator>
                  <SendInvitations />
                </RouteValidator>
              }
            />
            <Route
              path="/invitations"
              element={
                <RouteValidator>
                  <Invitations />
                </RouteValidator>
              }
            />
            <Route
              path="/metrics"
              element={
                <RouteValidator>
                  <MetricsPage />
                </RouteValidator>
              }
            />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            <Route path="*" element={<div>404</div>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
