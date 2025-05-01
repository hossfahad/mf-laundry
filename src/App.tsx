
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Request from "./pages/Request";
import RequestConfirmation from "./pages/RequestConfirmation";
import Admin from "./pages/Admin";
import AdminRequestDetail from "./pages/AdminRequestDetail";
import AdminEditRequest from "./pages/AdminEditRequest";
import AdminAddRequest from "./pages/AdminAddRequest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/request" element={<Request />} />
          <Route path="/request/confirmation" element={<RequestConfirmation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/request/:id" element={<AdminRequestDetail />} />
          <Route path="/admin/edit/:id" element={<AdminEditRequest />} />
          <Route path="/admin/add" element={<AdminAddRequest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
