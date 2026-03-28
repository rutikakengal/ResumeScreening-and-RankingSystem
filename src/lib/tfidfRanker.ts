/**
 * TF-IDF + Cosine Similarity based resume ranking
 * Port of the original Python algorithm using sklearn's TfidfVectorizer + cosine_similarity
 */

// Tokenize: lowercase, split on non-alphanumeric, filter short tokens
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+#]+/)
    .filter((t) => t.length > 1);
}

// Build vocabulary from all documents
function buildVocab(docs: string[][]): string[] {
  const vocabSet = new Set<string>();
  docs.forEach((tokens) => tokens.forEach((t) => vocabSet.add(t)));
  return Array.from(vocabSet).sort();
}

// Compute term frequency for a document
function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
  // Normalize by document length
  const len = tokens.length || 1;
  tf.forEach((v, k) => tf.set(k, v / len));
  return tf;
}

// Compute IDF across all documents
function inverseDocumentFrequency(docs: string[][], vocab: string[]): Map<string, number> {
  const n = docs.length;
  const idf = new Map<string, number>();

  vocab.forEach((term) => {
    const docCount = docs.filter((tokens) => tokens.includes(term)).length;
    // Smooth IDF like sklearn: log((1+n)/(1+df)) + 1
    idf.set(term, Math.log((1 + n) / (1 + docCount)) + 1);
  });

  return idf;
}

// Build TF-IDF vector for a document
function tfidfVector(tf: Map<string, number>, idf: Map<string, number>, vocab: string[]): number[] {
  return vocab.map((term) => (tf.get(term) || 0) * (idf.get(term) || 0));
}

// L2 normalize a vector
function l2Normalize(vec: number[]): number[] {
  const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  if (norm === 0) return vec;
  return vec.map((v) => v / norm);
}

// Cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

export interface RankedResult {
  fileName: string;
  score: number; // 0-100
  suggestion: string;
}

// Generate AI suggestion based on score (matching original Python logic)
function generateResumeTips(score: number): string {
  if (score > 80) {
    return "🔥 Excellent match! Your resume is well-optimized.";
  } else if (score > 60) {
    return "✅ Good match! Consider adding more relevant keywords.";
  } else {
    return "⚡ Low match! Try improving your skills section and adding industry-specific terms.";
  }
}

/**
 * Rank resumes against a job description using TF-IDF & Cosine Similarity.
 * This is a direct port of the original Python algorithm.
 */
export function rankResumes(
  jobDescription: string,
  resumeTexts: string[],
  fileNames: string[]
): RankedResult[] {
  // Tokenize all documents (job description + resumes)
  const allDocs = [jobDescription, ...resumeTexts].map(tokenize);

  // Build vocabulary and IDF
  const vocab = buildVocab(allDocs);
  const idf = inverseDocumentFrequency(allDocs, vocab);

  // Compute TF-IDF vectors
  const vectors = allDocs.map((tokens) => {
    const tf = termFrequency(tokens);
    const vec = tfidfVector(tf, idf, vocab);
    return l2Normalize(vec);
  });

  const jobVector = vectors[0];
  const resumeVectors = vectors.slice(1);

  // Compute cosine similarity scores
  const results: RankedResult[] = resumeVectors.map((vec, i) => {
    const similarity = cosineSimilarity(jobVector, vec);
    const score = Math.round(similarity * 100 * 100) / 100; // percentage with 2 decimals
    return {
      fileName: fileNames[i],
      score,
      suggestion: generateResumeTips(score),
    };
  });

  // Sort by score descending (like original: sort_values ascending=False)
  return results.sort((a, b) => b.score - a.score);
}
