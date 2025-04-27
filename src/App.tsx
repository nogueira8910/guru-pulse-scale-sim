
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Comparativo from "./pages/Comparativo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <nav className="bg-gray-100 p-4">
          <div className="container mx-auto flex gap-4">
            <Link to="/" className="text-primary hover:underline">Início</Link>
            <Link to="/comparativo" className="text-primary hover:underline">Comparativo</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/comparativo" element={<Comparativo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
