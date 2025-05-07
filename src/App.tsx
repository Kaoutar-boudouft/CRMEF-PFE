
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";
import Dashboard from "./pages/Teacher/Dashboard";
import Students from "./pages/Teacher/Students";
import Classes from "./pages/Teacher/Classes";
import Planning from "./pages/Teacher/Planning";
import GenerateDiagnostiqueTest from "./pages/Teacher/GenerateTestDiagnostique";
import ConsultDiagnostiqueTest from "./pages/Teacher/ConsultTestDiagnostique";
import Affectation from "./pages/Teacher/Affectation";
import CreateStudent from "./pages/Teacher/CreateStudent";
import CreateClass from "./pages/Teacher/CreateClass";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentDiagnosticTest from "./pages/Student/StudentDiagnosticTest";
import StudentCourse from "./pages/Student/StudentCourse";
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
          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-diagnostique-test/:courseId" element={<StudentDiagnosticTest />} />
          <Route path="/student-course/:courseId" element={<StudentCourse />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
