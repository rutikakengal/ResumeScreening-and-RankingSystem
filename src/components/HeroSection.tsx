import { motion } from "framer-motion";
import { Brain, Sparkles, Zap } from "lucide-react";

const HeroSection = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="hero-bg relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[15%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Resume Intelligence</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-primary-foreground">Screen & Rank</span>
          <br />
          <span className="text-gradient">Resumes Instantly</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Upload resumes, describe your ideal candidate, and let AI rank applicants
          by relevance — saving hours of manual screening.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:brightness-110 transition-all glow-primary"
          >
            Start Screening
          </button>
          <a
            href="https://github.com/rutikakengal/AI-powered-Resume-Screening-and-Ranking-System"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-xl border border-primary-foreground/20 text-primary-foreground/80 font-medium text-lg hover:bg-primary-foreground/5 transition-all"
          >
            View on GitHub
          </a>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { icon: Brain, text: "NLP-Based Matching" },
            { icon: Zap, text: "Instant Rankings" },
            { icon: Sparkles, text: "Smart Suggestions" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-primary-foreground/50">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
