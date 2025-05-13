
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Index from "./pages/Index";
import DoctorDetails from "./pages/DoctorDetails";
import BookingPage from "./pages/BookingPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QAPage from "./pages/QAPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import MenuPage from "./pages/MenuPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/qa/:id" element={<QuestionDetailPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
