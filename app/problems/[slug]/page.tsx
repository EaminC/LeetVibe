import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllProblems, getProblemBySlug } from "@/lib/problems";

type ProblemPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProblems().map((problem) => ({
    slug: problem.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProblemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    return {
      title: "Problem not found",
    };
  }

  return {
    title: problem.title,
    description: problem.summary,
  };
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  return (
    <article className="problem-shell">
      <Link href="/problems">Back to problems</Link>
      <div className="problem-title">
        <p className="eyebrow">{problem.date}</p>
        <h1>{problem.title}</h1>
        <div className="problem-meta">
          <span>{problem.difficulty}</span>
          <span>/</span>
          <span>{problem.status}</span>
          <span>/</span>
          <a href={problem.leetcodeUrl} target="_blank" rel="noreferrer">
            LeetCode
          </a>
        </div>
        <div className="tag-list">
          {problem.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {problem.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
