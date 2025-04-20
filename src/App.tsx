import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth-utils";
import ProtectedRoute from "./utils/protected-route";

// Pages
import Index from "./pages/Index";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Appointment from "./pages/Appointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import AdminLogin from "./pages/AdminLogin";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feedback from "./pages/Feedback";
import BookRecommendations from "./pages/BookRecommendations";
import MovieRecommendations from "./pages/MovieRecommendations";
import SongRecommendations from "./pages/SongRecommendations";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Admin route protection

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem("adminAuth") === "true";
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(()=> {
    setIsAdmin(localStorage.getItem("adminAuth") === "true");
  }, [])
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              {!isAdmin && (
                <>
                  {" "}
                  <Route
                    path="/"
                    element={
                      isAuthenticated() ? (
                        <Navigate to="/home" replace />
                      ) : (
                        <Index />
                      )
                    }
                  />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />{" "}
                </>
              )}

              <Route path="/admin-login" element={<AdminLogin />} />

              {/* Admin routes */}
              <Route
                path="/counselor-dashboard"
                element={
                  <AdminRoute>
                    <CounsellorDashboard />
                  </AdminRoute>
                }
              />

              {/* Protected routes - require authentication */}

              {!isAdmin && (
                <>
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/appointment"
                    element={
                      <ProtectedRoute>
                        <Appointment />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/appointment-history"
                    element={
                      <ProtectedRoute>
                        <AppointmentHistory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/chatbot"
                    element={
                      <ProtectedRoute>
                        <Chatbot />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/feedback"
                    element={
                      <ProtectedRoute>
                        <Feedback />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/books"
                    element={
                      <ProtectedRoute>
                        <BookRecommendations />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/movies"
                    element={
                      <ProtectedRoute>
                        <MovieRecommendations />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/songs"
                    element={
                      <ProtectedRoute>
                        <SongRecommendations />
                      </ProtectedRoute>
                    }
                  />{" "}
                </>
              )}

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
