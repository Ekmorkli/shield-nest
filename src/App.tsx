import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MatrixRain, FloatingBinaryCode, CircuitNodes, EnergyOrbs } from "@/components/robotic-effects";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-shield-dark text-foreground relative overflow-hidden">
          {/* Robotic Background Effects */}
          <MatrixRain />
          <FloatingBinaryCode />
          <CircuitNodes />
          <EnergyOrbs />
          
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
