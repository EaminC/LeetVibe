import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const problemsDirectory = path.join(process.cwd(), "content", "problems");

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Problem = {
  slug: string;
  title: string;
  leetcodeUrl: string;
  difficulty: Difficulty;
  tags: string[];
  date: string;
  status: string;
  summary: string;
  content: string;
};

type ProblemFrontmatter = {
  title?: string;
  leetcodeUrl?: string;
  difficulty?: Difficulty;
  tags?: string[];
  date?: string | Date;
  status?: string;
  summary?: string;
};

function ensureProblemsDirectory() {
  if (!fs.existsSync(problemsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(problemsDirectory)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"));
}

function formatDate(value: string | Date | undefined) {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

function getSlug(fileName: string) {
  return fileName.replace(/\.mdx?$/, "");
}

function parseFrontmatter(source: string) {
  const frontmatterPattern = /^---\n([\s\S]*?)\n---\n?/;
  const match = source.match(frontmatterPattern);

  if (!match) {
    return {
      data: {} as ProblemFrontmatter,
      content: source,
    };
  }

  return {
    data: (parseYaml(match[1]) ?? {}) as ProblemFrontmatter,
    content: source.slice(match[0].length),
  };
}

export function getAllProblems(): Problem[] {
  return ensureProblemsDirectory()
    .map((fileName) => {
      const slug = getSlug(fileName);
      return getProblemBySlug(slug);
    })
    .filter((problem): problem is Problem => Boolean(problem))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRecentProblems(limit = 3) {
  return getAllProblems().slice(0, limit);
}

export function getProblemBySlug(slug: string): Problem | null {
  const filePath = [".mdx", ".md"]
    .map((extension) => path.join(problemsDirectory, `${slug}${extension}`))
    .find((candidate) => fs.existsSync(candidate));

  if (!filePath) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = parseFrontmatter(source);

  return {
    slug,
    title: frontmatter.title ?? slug,
    leetcodeUrl: frontmatter.leetcodeUrl ?? "https://leetcode.com",
    difficulty: frontmatter.difficulty ?? "Medium",
    tags: frontmatter.tags ?? [],
    date: formatDate(frontmatter.date),
    status: frontmatter.status ?? "Solved",
    summary: frontmatter.summary ?? "",
    content,
  };
}

export function getProblemStats() {
  const problems = getAllProblems();
  const tags = new Set(problems.flatMap((problem) => problem.tags));

  return {
    total: problems.length,
    easy: problems.filter((problem) => problem.difficulty === "Easy").length,
    medium: problems.filter((problem) => problem.difficulty === "Medium").length,
    hard: problems.filter((problem) => problem.difficulty === "Hard").length,
    tags: tags.size,
  };
}
