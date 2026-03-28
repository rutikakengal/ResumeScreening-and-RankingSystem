import { motion } from "framer-motion";
import { Trophy, TrendingUp, ChevronDown, ChevronUp, Lightbulb, FileText, Download } from "lucide-react";
import { useState } from "react";
import type { RankedResult } from "@/lib/tfidfRanker";

const ScoreBadge = ({ score }: { score: number }) => {
  const color =
    score > 80 ? "text-score-high bg-score-high/10 border-score-high/30" :
    score > 60 ? "text-score-medium bg-score-medium/10 border-score-medium/30" :
    "text-score-low bg-score-low/10 border-score-low/30";

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold border ${color}`}>
      {score}%
    </span>
  );
};

const ResultCard = ({ result, rank }: { result: RankedResult; rank: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.08 }}
      className="glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all"
    >
      <div
        className="flex items-center gap-4 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Rank */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
          rank === 0 ? "bg-primary/15 text-primary" :
          rank === 1 ? "bg-accent/15 text-accent" :
          "bg-muted text-muted-foreground"
        }`}>
          {rank === 0 ? <Trophy className="w-5 h-5" /> : `#${rank + 1}`}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-foreground truncate flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            {result.fileName}
          </p>
        </div>

        {/* Score */}
        <ScoreBadge score={result.score} />

        {/* Expand */}
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-5 pb-5 border-t border-border/50"
        >
          <div className="pt-4 p-4 rounded-lg bg-muted/50">
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-primary" /> AI Suggestion
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">{result.suggestion}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const RankingResults = ({ results }: { results: RankedResult[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          📊 Resume Rankings
        </h3>
        <span className="text-sm text-muted-foreground font-medium">
          {results.length} resume{results.length !== 1 ? "s" : ""} ranked
        </span>
      </div>

      {/* Summary table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 font-display font-semibold text-muted-foreground">Rank</th>
              <th className="text-left p-4 font-display font-semibold text-muted-foreground">Resume</th>
              <th className="text-center p-4 font-display font-semibold text-muted-foreground">Match Score (%)</th>
              <th className="text-left p-4 font-display font-semibold text-muted-foreground">AI Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.fileName} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 font-bold text-foreground">
                  {i === 0 ? "🏆" : `#${i + 1}`}
                </td>
                <td className="p-4 text-foreground font-medium">{r.fileName}</td>
                <td className="p-4 text-center">
                  <ScoreBadge score={r.score} />
                </td>
                <td className="p-4 text-foreground/70 text-xs max-w-xs">{r.suggestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expandable cards */}
      <div className="space-y-3">
        {results.map((result, i) => (
          <ResultCard key={result.fileName} result={result} rank={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default RankingResults;
