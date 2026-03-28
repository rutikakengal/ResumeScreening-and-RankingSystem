import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowUp, Sparkles } from "lucide-react";
import ResumeUploader from "./ResumeUploader";
import JobDescriptionInput from "./JobDescriptionInput";
import RankingResults from "./RankingResults";
import { extractTextFromPdf } from "@/lib/pdfExtractor";
import { rankResumes, type RankedResult } from "@/lib/tfidfRanker";

const ScreeningWorkspace = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState<RankedResult[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const canSubmit = files.length > 0 && jobDescription.trim().length > 10;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsProcessing(true);
    setResults(null);
    setProgress(0);

    try {
      // Extract text from all PDFs (like the original Python: extract_text_from_pdf)
      const totalSteps = files.length + 1;
      const resumeTexts: string[] = [];
      const fileNames: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const text = await extractTextFromPdf(files[i]);
        resumeTexts.push(text);
        fileNames.push(files[i].name);
        setProgress(Math.round(((i + 1) / totalSteps) * 90));
      }

      // Run TF-IDF + Cosine Similarity ranking (original algorithm)
      const ranked = rankResumes(jobDescription, resumeTexts, fileNames);
      setProgress(100);

      // Small delay to show 100% progress
      await new Promise((r) => setTimeout(r, 300));

      setResults(ranked);
    } catch (error) {
      console.error("Error processing resumes:", error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Upload + Job Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-6">
              <ResumeUploader files={files} onFilesChange={setFiles} />
            </div>
            <div className="glass-card rounded-2xl p-6">
              <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || isProcessing}
              className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all glow-primary flex items-center gap-3"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Resumes...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Rank Resumes
                  <ArrowUp className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Progress bar (like original Streamlit progress) */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                className="max-w-md w-full"
              >
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Processing... {progress}%
                </p>
              </motion.div>
            )}
          </div>

          {/* Results */}
          <div ref={resultsRef}>
            {results && <RankingResults results={results} />}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScreeningWorkspace;
