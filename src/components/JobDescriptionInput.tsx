import { Briefcase } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-primary" />
        Job Description
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here... e.g., 'Looking for a Senior Full-Stack Developer with 5+ years of experience in React, Node.js, and cloud services...'"
        className="w-full h-44 p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm leading-relaxed"
      />
      <p className="text-xs text-muted-foreground">
        Include skills, experience, and qualifications for better matching accuracy.
      </p>
    </div>
  );
};

export default JobDescriptionInput;
