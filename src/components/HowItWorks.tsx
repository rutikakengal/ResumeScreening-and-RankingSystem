import { motion } from "framer-motion";
import { Upload, FileSearch, BarChart3, Lightbulb } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Resumes", desc: "Drag & drop PDF resumes into the uploader" },
  { icon: FileSearch, title: "Describe Role", desc: "Enter the job description and requirements" },
  { icon: BarChart3, title: "AI Analysis", desc: "NLP engine extracts and matches skills" },
  { icon: Lightbulb, title: "Get Rankings", desc: "View scored & ranked candidates instantly" },
];

const HowItWorks = () => (
  <section className="py-20 bg-muted/30">
    <div className="container max-w-5xl px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-display font-bold text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        How It <span className="text-gradient">Works</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 text-center group hover:border-primary/30 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <step.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs font-bold text-primary mb-2 block">Step {i + 1}</span>
            <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
