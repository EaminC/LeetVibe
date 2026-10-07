import type { Metadata } from "next";
import { ProblemCard } from "@/components/problem-card";
import { getAllProblems, getProblemStats } from "@/lib/problems";

export const metadata: Metadata = {
  title: "Problems",
  description:
    "LeetVibe problem notes, learning traces, and final implementations.",
};

export default function ProblemsPage() {
  const problems = getAllProblems();
  const stats = getProblemStats();

  return (
    <section>
      <p className="eyebrow">Practice archive</p>
      <h1>Problems</h1>
      <p className="lead">
        A growing archive of LeetCode practice notes: what the problem asks,
        how the solution emerged, and what to remember next time.
      </p>

      <div className="stat-grid">
        <div className="stat">
          <strong>{stats.total}</strong>
          <span>total</span>
        </div>
        <div className="stat">
          <strong>{stats.easy}</strong>
          <span>easy</span>
        </div>
        <div className="stat">
          <strong>{stats.hard}</strong>
          <span>hard</span>
        </div>
      </div>

      <div className="section">
        {problems.length > 0 ? (
          <div className="problem-grid">
            {problems.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No problems yet. Add an MDX note under <code>content/problems</code>.
          </div>
        )}
      </div>
    </section>
  );
}
