import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ScreeningWorkspace from "@/components/ScreeningWorkspace";

const Index = () => {
  const workspaceRef = useRef<HTMLDivElement>(null);

  const scrollToWorkspace = () => {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onGetStarted={scrollToWorkspace} />
      <HowItWorks />
      <div ref={workspaceRef}>
        <ScreeningWorkspace />
      </div>
      <footer className="py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <a href="https://github.com/rutikakengal" target="_blank" rel="noreferrer" className="text-primary hover:underline">
            Rutika Kengal
          </a>{" "}
          · AI-Powered Resume Screening & Ranking System
        </p>
      </footer>
    </div>
  );
};

export default Index;
