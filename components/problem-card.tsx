import Link from "next/link";
import type { Problem } from "@/lib/problems";

const difficultyClassName = {
  Easy: "difficulty-easy",
  Medium: "difficulty-medium",
  Hard: "difficulty-hard",
} satisfies Record<Problem["difficulty"], string>;

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link href={`/problems/${problem.slug}`} className="problem-card">
      <h3>{problem.title}</h3>
      <div className="problem-meta">
        <span>{problem.date}</span>
        <span>/</span>
        <strong className={difficultyClassName[problem.difficulty]}>
          {problem.difficulty}
        </strong>
        <span>/</span>
        <span>{problem.status}</span>
      </div>
      {problem.summary ? <p className="muted">{problem.summary}</p> : null}
      <div className="tag-list" aria-label="Problem tags">
        {problem.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
