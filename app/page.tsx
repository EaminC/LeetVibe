import Link from "next/link";
import { ProblemCard } from "@/components/problem-card";
import { getProblemStats, getRecentProblems } from "@/lib/problems";

export default function Home() {
  const recentProblems = getRecentProblems();
  const stats = getProblemStats();

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">LeetCode learning journal</p>
          <h1>LeetVibe</h1>
          <p className="lead">
            A practice log for capturing what AI helped me understand, the
            final implementation, complexity notes, and reflections from each
            LeetCode session.
          </p>
          <div className="actions">
            <Link href="/problems" className="button">
              Browse problems
            </Link>
            <a
              href="https://github.com/EaminC/LeetVibe"
              className="button secondary"
              target="_blank"
              rel="noreferrer"
            >
              View repo
            </a>
          </div>
        </div>
        <aside className="card" aria-label="LeetVibe workflow">
          <p className="eyebrow">Daily flow</p>
          <h2>Pick. Vibe. Solve. Reflect.</h2>
          <p className="muted">
            Each entry starts from a LeetCode problem and ends as a durable note:
            what I learned, where I got unstuck, and the code I would keep.
          </p>
          <div className="stat-grid">
            <div className="stat">
              <strong>{stats.total}</strong>
              <span>entries</span>
            </div>
            <div className="stat">
              <strong>{stats.medium}</strong>
              <span>medium</span>
            </div>
            <div className="stat">
              <strong>{stats.tags}</strong>
              <span>tags</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Recent notes</p>
            <h2>Latest practice</h2>
          </div>
          <Link href="/problems">All problems</Link>
        </div>

        {recentProblems.length > 0 ? (
          <div className="problem-grid">
            {recentProblems.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            Add the first note under <code>content/problems</code> to start the
            journal.
          </div>
        )}
      </section>
    </>
  );
}
