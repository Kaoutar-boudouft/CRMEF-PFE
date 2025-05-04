
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Planning from "./pages/Planning";
import GenerateDiagnostiqueTest from "./pages/GenerateTestDiagnostique";
import ConsultDiagnostiqueTest from "./pages/ConsultTestDiagnostique";
import Affectation from "./pages/Affectation";
import CreateStudent from "./pages/CreateStudent";
import CreateClass from "./pages/CreateClass";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/generate-diagnostique-Test" element={<GenerateDiagnostiqueTest />} />
          <Route path="/consult-diagnostique-Test" element={<ConsultDiagnostiqueTest />} />
          <Route path="/affectation" element={<Affectation />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/create-class" element={<CreateClass />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
