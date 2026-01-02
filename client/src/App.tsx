import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Martingale from "./pages/Martingale";
import Grid from "./pages/Grid";
import Guide from "./pages/Guide";
import Placeholder from "./pages/Placeholder";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/overview"} component={Overview} />
      <Route path={"/martingale"} component={Martingale} />
      <Route path={"/grid"} component={Grid} />
      <Route path={"/guide"} component={Guide} />
      <Route path={"/arbitrage"}>{() => <Placeholder type="arbitrage" />}</Route>
      <Route path={"/dca"}>{() => <Placeholder type="dca" />}</Route>
      <Route path={"/trailing"}>{() => <Placeholder type="trailing" />}</Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
